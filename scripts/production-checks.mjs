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
      const scriptBytes = performance.getEntriesByType('resource').filter(entry => entry.initiatorType === 'script').reduce((sum, entry) => sum + entry.decodedBodySize, 0);
      return { headingLevels, ids, anchors, schemas, scriptBytes };
    });
    assert.equal(data.headingLevels.filter(level => level === 1).length, 1, route + ' one H1');
    assert.ok(data.headingLevels.every((level, i, all) => level <= (all[i - 1] || 0) + 1), route + ' heading hierarchy');
    assert.equal(new Set(data.ids).size, data.ids.length, route + ' unique element IDs');
    if (route === '/' || route.startsWith('/projects/')) assert.ok(data.scriptBytes < 750_000, route + ' startup JavaScript stays below the 750 KB decoded budget: ' + data.scriptBytes);
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
    if (route.startsWith('/expertise/') || route.startsWith('/engineering-notes/')) {
      const article = data.schemas.find(schema => schema['@type'] === 'Article');
      const updatedAt = await page.locator('.editorialByline time').getAttribute('datetime');
      assert.equal(article.dateModified, updatedAt, route + ' visible and structured update dates agree');
      assert.ok(Date.parse(updatedAt) <= Date.now(), route + ' has no future update date');
      assert.equal(article.author.name, 'Saaim Abdullah', route + ' identifies its author');
      assert.equal(await page.locator('.editorialByline a[rel="author"]').getAttribute('href'), '/professional-experience');
      assert.ok((await page.locator('main').innerText()).includes(article.abstract), route + ' summary is visible to readers');
      const visibleTargets = new Set(data.anchors.map(href => new URL(href, url).href));
      for (const citation of article.citation) assert.ok(visibleTargets.has(citation), route + ' citations have visible source links: ' + citation);
      const breadcrumb = data.schemas.find(schema => schema['@type'] === 'BreadcrumbList');
      assert.equal(breadcrumb.itemListElement.length, 3, route + ' includes its parent breadcrumb');
      assert.equal(new URL(breadcrumb.itemListElement[1].item).pathname, '/' + route.split('/')[1]);
      assert.ok(await page.locator('.engineeringAnswer').isVisible(), route + ' leads with a direct answer');
    }
    if (['/expertise', '/engineering-notes', '/sitemap'].includes(route)) {
      const collection = data.schemas.find(schema => schema['@type'] === 'CollectionPage');
      assert.ok(collection.mainEntity.numberOfItems > 0, route + ' has a populated collection index');
      assert.equal(collection.mainEntity.numberOfItems, collection.mainEntity.itemListElement.length);
      const visiblePaths = new Set(data.anchors.map(href => new URL(href, url).pathname));
      for (const entry of collection.mainEntity.itemListElement) assert.ok(visiblePaths.has(new URL(entry.item.url).pathname), route + ' collection entries are linked visibly');
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
  const notFoundHtml = await notFound.text();
  assert.ok(notFoundHtml.includes('noindex'), '404 is noindex');
  assert.ok(/<meta name="googlebot" content="[^"]*noindex/.test(notFoundHtml), '404 does not inherit an indexable Googlebot directive');
  assert.ok(!/rel="canonical"/.test(notFoundHtml), '404 does not inherit the home canonical');
  const robots = await (await fetch(origin + '/robots.txt')).text();
  assert.ok(robots.includes('Allow: /') && robots.includes('Sitemap: https://saaim.site/sitemap.xml'));
  assert.ok(!robots.includes('Disallow: /_next'), 'Rendering assets are crawlable');
  const llms = await fetch(origin + '/llms.txt');
  assert.equal(llms.status, 200);
  assert.ok(llms.headers.get('content-type').includes('text/plain'));
  const readingIndex = await llms.text();
  assert.ok(readingIndex.includes('Saaim Abdullah'));
  for (const url of locations) {
    assert.ok(readingIndex.includes(url), 'llms.txt should link to every published sitemap route: ' + url);
  }
  const sitemapImages = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(match => match[1]);
  assert.ok(sitemapImages.length >= 20, 'Project covers and diagrams are discoverable in the image sitemap');
  for (const image of new Set(sitemapImages)) assert.equal((await fetch(origin + new URL(image).pathname, { method: 'HEAD' })).status, 200, 'Sitemap image is accessible: ' + image);
  await page.goto(origin + '/professional-experience', { waitUntil: 'networkidle' });
  assert.ok(await page.locator('video').evaluate(video => video.loop && video.muted && video.controls && video.paused), 'Accessible reel respects reduced motion');
  fs.mkdirSync('.audit', { recursive: true });
  fs.writeFileSync('.audit/production-checks.json', JSON.stringify({ routes: report, internalLinks: [...links], status: 'passed' }, null, 2));
  console.log(`PASS: ${report.length} routes, ${links.size} internal destinations, headings, schema, anchors, domain redirects, 404, robots, llms.txt, and reduced-motion video`);
} finally {
  await browser.close();
}
