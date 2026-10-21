import assert from 'node:assert/strict';
import fs from 'node:fs';
import { get as httpGet } from 'node:http';
import { get as httpsGet } from 'node:https';
import { chromium } from 'playwright';

const origin = process.argv[2] || 'http://localhost:3000';
const sitemap = await (await fetch(origin + '/sitemap.xml')).text();
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert.equal(new Set(locations).size, locations.length, 'No duplicate sitemap URLs');
for (const match of sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
  assert.ok(Number.isFinite(Date.parse(match[1])) && Date.parse(match[1]) <= Date.now(), 'Valid, non-future lastmod');
}
const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
const links = new Set();
const report = [];
try {
  for (const url of locations) {
    const route = new URL(url).pathname;
    await page.goto(origin + route, { waitUntil: 'networkidle' });
    const data = await page.evaluate(() => {
      const headingLevels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => +h.tagName[1]);
      const ids = [...document.querySelectorAll('[id]')].map(e => e.id);
      const anchors = [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href'));
      const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent));
      return { headingLevels, ids, anchors, schemas };
    });
    assert.equal(data.headingLevels.filter(level => level === 1).length, 1, route + ' one H1');
    assert.ok(data.headingLevels.every((level, i, all) => level <= (all[i - 1] || 0) + 1), route + ' heading hierarchy');
    assert.equal(new Set(data.ids).size, data.ids.length, route + ' unique element IDs');
    for (const anchor of data.anchors) {
      if (anchor.startsWith('#') && anchor.length > 1) assert.ok(data.ids.includes(decodeURIComponent(anchor.slice(1))), route + ' ' + anchor);
      if (anchor.startsWith('/') && !anchor.startsWith('//')) links.add(anchor);
    }
    for (const schema of data.schemas) {
      assert.equal(schema['@context'], 'https://schema.org', route + ' schema context');
      assert.ok(schema['@id']?.startsWith('https://saaim.site'), route + ' stable schema ID');
      if (schema['@type'] === 'SoftwareSourceCode') assert.ok(schema.codeRepository.startsWith('https://github.com/'), route + ' repository');
      if (schema['@type'] === 'ProfilePage') assert.equal(schema.mainEntity['@id'], 'https://saaim.site/#person');
      if (schema['@type'] === 'BreadcrumbList') assert.deepEqual(schema.itemListElement.map(i => i.position), schema.itemListElement.map((_, i) => i + 1));
    }
    if (route === '/projects' || route === '/services') {
      const index = data.schemas.find(schema => schema['@type'] === 'ItemList');
      assert.ok(index, route + ' has a machine-readable item list');
      assert.equal(index.numberOfItems, index.itemListElement.length, route + ' item count matches');
      assert.ok(index.numberOfItems >= 3, route + ' has real indexed entries');
      for (const [i, entry] of index.itemListElement.entries()) {
        assert.equal(entry.position, i + 1, route + ' item position');
        assert.ok(entry.item.name && entry.item.description, route + ' descriptive entries');
        if (route === '/projects') assert.ok(data.anchors.includes(new URL(entry.item.url).pathname), 'Indexed project has a visible link: ' + entry.item.url);
      }
      if (route === '/services') {
        const visibleServices = await page.locator('.engineeringServiceCard h3').allTextContents();
        assert.deepEqual(index.itemListElement.map(entry => entry.item.name), visibleServices, 'Indexed services match visible cards');
        assert.ok(await page.locator('.serviceFaq h3').count() >= 10, 'Expanded FAQs remain visible to visitors');
      }
    }
    report.push({ route, headings: data.headingLevels, schemas: data.schemas.map(s => s['@type']) });
  }
  for (const href of links) {
    const url = new URL(href, origin);
    const response = await fetch(url, { redirect: 'manual' });
    assert.equal(response.status, 200, href + ' has no broken link or redirect');
    if (url.hash && !/\.(pdf|png|svg|webp|mp4)$/i.test(url.pathname)) {
      await page.goto(url.origin + url.pathname, { waitUntil: 'networkidle' });
      assert.ok(await page.evaluate(id => !!document.getElementById(id), decodeURIComponent(url.hash.slice(1))), href + ' target anchor');
    }
  }
  for (const [route, host, target] of [
    ['/services?source=test', 'www.saaim.site', 'https://saaim.site/services?source=test'],
    ['/about?source=test', 'www.saaim.site', 'https://saaim.site/professional-experience?source=test'],
    ['/work/fitter-health-platform?source=test', 'saaim.online', 'https://saaim.site/projects/fitter-health-platform?source=test'],
  ]) {
    // Node fetch normalizes Host; a raw request verifies domain routing accurately.
    const response = await new Promise((resolve, reject) => {
      (origin.startsWith('https:') ? httpsGet : httpGet)(origin + route, { headers: { Host: host } }, response => {
        response.resume();
        resolve(response);
      }).on('error', reject);
    });
    assert.equal(response.statusCode, 308, host + route);
    assert.equal(response.headers.location, target, 'Direct canonical redirect preserves queries');
  }
  const notFound = await fetch(origin + '/this-page-does-not-exist');
  assert.equal(notFound.status, 404);
  assert.ok((await notFound.text()).includes('noindex'), '404 is noindex');
  const robots = await (await fetch(origin + '/robots.txt')).text();
  assert.ok(robots.includes('Allow: /') && robots.includes('Sitemap: https://saaim.site/sitemap.xml'));
  assert.ok(!robots.includes('Disallow: /_next'), 'Rendering assets are crawlable');
  const llms = await fetch(origin + '/llms.txt');
  assert.equal(llms.status, 200);
  assert.ok(llms.headers.get('content-type').includes('text/plain'));
  const readingIndex = await llms.text();
  assert.ok(readingIndex.includes('Saaim Abdullah'));
  for (const route of [
    '/expertise/backend-api-engineering',
    '/expertise/data-engineering-pipelines',
    '/expertise/rag-ai-engineering',
    '/expertise/aws-cloud-devops',
    '/expertise/full-stack-saas-products',
    '/expertise/distributed-systems-reliability',
    '/expertise/recommendation-ml-systems',
    '/engineering-notes/reliable-background-jobs-webhooks-idempotency',
    '/engineering-notes/tenant-isolated-rag-with-pgvector',
    '/engineering-notes/kafka-spark-airflow-pipeline-design',
    '/engineering-notes/django-nextjs-aws-application-delivery'
  ]) assert.ok(readingIndex.includes('https://saaim.site' + route), 'Missing optional reading index entry: ' + route);
  await page.goto(origin + '/professional-experience', { waitUntil: 'networkidle' });
  assert.ok(await page.locator('video').evaluate(video => video.loop && video.muted && video.controls && video.paused), 'Accessible reel respects reduced motion');
  fs.mkdirSync('.audit', { recursive: true });
  fs.writeFileSync('.audit/production-checks.json', JSON.stringify({ routes: report, internalLinks: [...links], status: 'passed' }, null, 2));
  console.log(`PASS: ${report.length} routes, ${links.size} internal destinations, headings, schema, anchors, domain redirects, 404, robots, llms.txt, and reduced-motion video`);
} finally {
  await browser.close();
}
