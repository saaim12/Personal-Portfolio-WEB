import assert from 'node:assert/strict';
import fs from 'node:fs';
import matter from 'gray-matter';
import { chromium } from 'playwright';
import { headingId } from '../src/utils/headingId.ts';

const base = process.argv[2] || 'http://localhost:3000';
const directory = 'src/app/projects/content';
const projects = fs.readdirSync(directory).filter(file => file.endsWith('.mdx')).map(file => ({
  slug: file.slice(0, -4), ...matter(fs.readFileSync(`${directory}/${file}`, 'utf8')),
}));
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const { slug, data, content } of projects) {
      const response = await page.goto(`${base}/projects/${slug}`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, slug);
      assert.equal(await page.locator('.caseSummary').textContent(), data.summary, slug + ' updated summary');
      assert.equal(await page.locator('meta[name="description"]').getAttribute('content'), data.seoDescription);
      const headings = [...content.matchAll(/^#{2,3} (.+)$/gm)].map(match => match[1]);
      assert.deepEqual(await page.locator('.caseStudyBody h2, .caseStudyBody h3').allTextContents(), headings, slug + ' complete chapters');
      const anchors = await page.locator('.caseStudyBody h2, .caseStudyBody h3').evaluateAll(elements => elements.map(e => e.id));
      assert.deepEqual(anchors, headings.map(headingId), slug + ' heading links');
      const expectedTables = [...content.matchAll(/^\| ---/gm)].length;
      assert.equal(await page.locator('.caseStudyBody table').count(), expectedTables, slug + ' semantic tables');
      assert.equal(await page.locator('.caseStudyBody table').filter({ has: page.locator('thead th') }).count(), expectedTables);
      const expectedLinks = [...content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map(match => match[2]);
      for (const href of expectedLinks) assert.ok(await page.locator('.caseStudyBody a').evaluateAll((links, href) => links.some(a => a.getAttribute('href') === href), href), slug + ' source ' + href);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), slug + ' responsive bounds at ' + width);
      await page.evaluate(async () => {
        for (const image of document.images) image.loading = 'eager';
        await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
      });
      assert.deepEqual(await page.evaluate(() => [...document.images].filter(i => !i.naturalWidth).map(i => i.src)), [], slug + ' existing images load');
    }
    await page.goto(base + '/projects', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('.galleryGrid .folderProject').count(), 6);
    assert.equal(await page.locator('.learningEntry').count(), 4);
    assert.equal(await page.locator('.learningEntry img').count(), 0);
    for (const slug of ['algorithms-in-python', 'ml-data-foundations']) {
      const post = projects.find(project => project.slug === slug);
      assert.ok((await page.locator('.learningEntry').allTextContents()).some(text => text.includes(post.data.summary)), slug + ' learning summary');
    }
    console.log(`Verified ${projects.length} project pages and Learnings at ${width}px`);
  }
  await page.goto(base, { waitUntil: 'networkidle' });
  for (const article of await page.locator('.featuredProjects .folderProject').all()) {
    const href = await article.locator('.projectLink').getAttribute('href');
    const project = projects.find(p => '/projects/' + p.slug === href);
    assert.equal(await article.locator('.folderCopy > p').textContent(), project.data.cardSummary || project.data.summary);
  }
  const sitemap = await (await page.request.get(base + '/sitemap.xml')).text();
  assert.ok(sitemap.includes('/projects/temporary-url-service<'));
  assert.ok(sitemap.includes('/projects/algorithms-in-python<'));
  assert.ok(!sitemap.includes('(1)'));
  assert.deepEqual(errors, [], 'No browser runtime errors');
  console.log('Home summaries, source links, chapters, tables, metadata, and stable sitemap routes verified');
} finally {
  await browser.close();
}
