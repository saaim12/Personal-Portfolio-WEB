import assert from "node:assert/strict";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

async function publicPaths() {
  const [{ sitePages }, { specialties }, { engineeringNotes }, files] = await Promise.all([
    import("../src/resources/site-navigation.ts"),
    import("../src/resources/specialties.ts"),
    import("../src/resources/engineering-notes.ts"),
    readdir("src/app/projects/content"),
  ]);
  return [...sitePages.map(page => page.path), ...specialties.map(item => `/expertise/${item.slug}`),
    ...engineeringNotes.map(note => `/engineering-notes/${note.slug}`),
    ...files.filter(file => file.endsWith(".mdx")).map(file => `/projects/${file.slice(0, -4)}`)];
}

const decode = value => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&apos;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">");

export async function checkDiscovery({ origin, canonicalBase = "https://saaim.site", indexable = true, expectedPaths, checkHeaders = true }) {
  origin = origin.replace(/\/$/, "");
  canonicalBase = canonicalBase.replace(/\/$/, "");
  expectedPaths ??= await publicPaths();
  const expectedUrls = expectedPaths.map(path => canonicalBase + (path === "/" ? "" : path)).sort();
  const read = async path => {
    const response = await fetch(origin + path, { redirect: "manual" });
    assert.equal(response.status, 200, path + " is directly available");
    return { response, text: await response.text() };
  };

  const xml = await read("/sitemap.xml");
  assert.match(xml.response.headers.get("content-type"), /(?:application|text)\/xml/);
  const xmlUrls = [...xml.text.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map(match => decode(match[1])).sort();
  assert.deepEqual(xmlUrls, indexable ? expectedUrls : [], "Sitemap covers canonical public HTML pages exactly once, or is empty on a mirror");
  for (const match of xml.text.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) assert.ok(Number.isFinite(Date.parse(match[1])) && Date.parse(match[1]) <= Date.now(), "Valid non-future content date");

  const robots = await read("/robots.txt");
  assert.match(robots.response.headers.get("content-type"), /text\/plain/);
  assert.deepEqual([...robots.text.matchAll(/^User-Agent:\s*(.+)$/gim)].map(match => match[1].trim()), ["*"], "All crawlers inherit one unambiguous policy");
  assert.match(robots.text, /^Allow:\s*\/$/m);
  assert.ok(!/^(?:Disallow|Crawl-delay|Host|Noindex):/im.test(robots.text), "No rendering blocks or unsupported directives");
  assert.deepEqual([...robots.text.matchAll(/^Sitemap:\s*(.+)$/gim)].map(match => match[1].trim()), indexable ? [canonicalBase + "/sitemap.xml"] : []);

  const directory = await read("/llms.txt");
  const alias = await read("/llm.txt");
  assert.equal(alias.text, directory.text, "Both LLM spellings serve the same maintained document");
  assert.ok(Buffer.byteLength(directory.text) < 20_000, "The reading directory stays below 20 KB");
  assert.equal([...directory.text.matchAll(/^# /gm)].length, 1, "One site heading");
  assert.match(directory.text, /^> .+/m);
  assert.match(directory.text, /^## Optional$/m);
  assert.ok(directory.text.endsWith("\n"), "The directory ends as a complete text document");
  const linkedUrls = [...directory.text.matchAll(/\[(?:\\.|[^\]])+\]\((https?:\/\/[^\s)]+)\)/g)].map(match => match[1]);
  const canonicalPages = linkedUrls.filter(url => expectedUrls.includes(url)).sort();
  assert.deepEqual(canonicalPages, expectedUrls, "The LLM directory covers each public page once");
  for (const { response } of [directory, alias]) {
    assert.match(response.headers.get("content-type"), /text\/plain/);
    if (checkHeaders) {
      assert.equal(response.headers.get("link"), `<${canonicalBase}/llms.txt>; rel="canonical"`);
      assert.equal(response.headers.get("x-robots-tag"), "noindex, follow", "Helper files point readers to HTML search destinations");
      assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    }
  }

  const html = await read("/sitemap" + (checkHeaders ? "" : "/"));
  const groups = [...html.text.matchAll(/<section\b[^>]*class="[^"]*\bsiteMapGroup\b[^"]*"[^>]*>([\s\S]*?)<\/section>/g)];
  const prefix = new URL(origin).pathname.replace(/\/$/, "");
  const htmlPaths = groups.flatMap(group => [...group[1].matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => {
    const path = new URL(decode(match[1]), origin + "/").pathname;
    assert.ok(!prefix || path.startsWith(prefix + "/") || path === prefix, "HTML sitemap retains the repository prefix");
    return path.slice(prefix.length).replace(/\/$/, "") || "/";
  })).sort();
  assert.deepEqual(htmlPaths, expectedPaths.slice().sort(), "HTML and machine directories agree");
  const describedBy = html.text.match(/<link\b[^>]*rel="describedby"[^>]*>/)?.[0] ?? "";
  assert.ok(describedBy.includes(`href="${canonicalBase}/llms.txt"`), "HTML advertises the reading directory");

  for (const path of expectedPaths) assert.equal((await fetch(origin + path + (!checkHeaders && path !== "/" ? "/" : ""), { method: "HEAD" })).status, 200, path + " is reachable");
  const report = { status: "passed", pages: expectedPaths.length, indexable, directoryBytes: Buffer.byteLength(directory.text), xmlPages: xmlUrls.length };
  await mkdir(".audit", { recursive: true });
  await writeFile(`.audit/discovery-${indexable ? "production" : "mirror"}.json`, JSON.stringify(report, null, 2));
  console.log(`PASS: ${report.pages} public pages; HTML/XML/LLM coverage, alias, URL prefixes, dates, response types and robots policy (${indexable ? "production" : "noindex mirror"}).`);
  return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await checkDiscovery({ origin: process.argv[2] || "http://localhost:3000", canonicalBase: process.env.NEXT_PUBLIC_SITE_URL || "https://saaim.site" });
}
