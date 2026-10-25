import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { urlsForChanges } from './indexnow-changes.mjs';

const host = 'saaim.site';
const origin = `https://${host}`;
const key = process.env.INDEXNOW_KEY;
const statePath = '.indexnow-state/snapshot.json';
const keyUrl = `${origin}/${key}.txt`;
if (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw new Error('INDEXNOW_KEY is absent or invalid');

async function fetchWithRetry(url) {
  let lastError;
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
      return response;
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt}/5 failed: ${error.message}`);
      if (attempt < 5) await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  throw lastError;
}

const verification = (await (await fetchWithRetry(keyUrl)).text()).trim();
if (verification !== key) throw new Error(`Live IndexNow key file does not match ${keyUrl}`);
console.log('Verified live IndexNow ownership key.');

const xml = await (await fetchWithRetry(`${origin}/sitemap.xml`)).text();
const current = {};
const extract = (body, name) => body.match(new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`))?.[1]?.trim() ?? '';
for (const match of xml.matchAll(/<url\s*>([\s\S]*?)<\/url>/g)) {
  const loc = extract(match[1], 'loc').replaceAll('&amp;', '&');
  const modified = extract(match[1], 'lastmod');
  const parsed = new URL(loc);
  if (parsed.protocol !== 'https:' || parsed.hostname !== host || parsed.username || parsed.password || parsed.hash) {
    throw new Error(`Unsafe/noncanonical URL in sitemap: ${loc}`);
  }
  current[loc] = modified;
}
if (Object.keys(current).length === 0) throw new Error('Sitemap is empty or cannot be parsed; refusing to advance state.');
console.log(`Discovered ${Object.keys(current).length} published URLs.`);

let previous = { urls: {}, sha: null };
try { previous = JSON.parse(await readFile(statePath, 'utf8')); } catch (err) {
  if (err.code !== 'ENOENT') throw err;
}
const previousUrls = previous.urls ?? {};
const notify = new Set();
if (process.env.INDEXNOW_FORCE_ALL === 'true') {
  for (const url of Object.keys(current)) notify.add(url);
}
for (const [url, updated] of Object.entries(current)) {
  if (!(url in previousUrls) || previousUrls[url] !== updated) notify.add(url);
}
for (const url of Object.keys(previousUrls)) {
  if (!(url in current)) notify.add(url);
}

const oldSha = previous.sha;
const newSha = process.env.GITHUB_SHA || '';
if (oldSha && newSha && oldSha !== newSha) {
  try {
    const changed = execFileSync('git', ['diff', '--name-only', oldSha, newSha], { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
    for (const url of urlsForChanges(changed, Object.keys(current), origin)) notify.add(url);
  } catch (err) {
    console.warn(`Unable to compare Git revisions: ${err.message}. Submitting all published URLs to avoid missing changes.`);
    for (const url of Object.keys(current)) notify.add(url);
  }
}

const eligible = [...notify].filter(url => url in current || url in previousUrls).sort();
if (eligible.length) {
  for (let offset = 0; offset < eligible.length; offset += 10000) {
    const urlList = eligible.slice(offset, offset + 10000);
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation: keyUrl, urlList }),
      signal: AbortSignal.timeout(30000),
    });
    const body = await response.text();
    console.log(`IndexNow submission: HTTP ${response.status}; URLs: ${urlList.length}; details: ${body.slice(0, 300)}`);
    if (![200, 202].includes(response.status)) throw new Error(`IndexNow rejected ${urlList.length} URLs (HTTP ${response.status})`);
    for (const url of urlList) console.log(`  ${url}`);
  }
} else {
  console.log('No added, changed, or removed URLs since last successful notification.');
}
await mkdir('.indexnow-state', { recursive: true });
await writeFile(statePath, JSON.stringify({ sha: newSha, urls: current, submittedAt: new Date().toISOString() }, null, 2) + '\n');
