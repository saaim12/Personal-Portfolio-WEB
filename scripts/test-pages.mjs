import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright';

const root = path.resolve('out');
assert.ok(fs.existsSync(path.join(root, 'index.html')), 'Run npm run build:pages first');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const canonical = home.match(/rel="canonical" href="([^"]+)"/)?.[1];
assert.ok(canonical, 'Export has a canonical URL');
const basePath = new URL(canonical).pathname.replace(/\/$/, '');
const missing = [];
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = http.createServer((request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); } catch { response.writeHead(400).end(); return; }
  if (basePath && pathname !== basePath && !pathname.startsWith(basePath + '/')) { response.writeHead(404).end(); missing.push(pathname); return; }
  const relative = pathname.slice(basePath.length);
  let file = path.resolve(root, '.' + relative);
  if (!file.startsWith(root + path.sep) && file !== root) { response.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { missing.push(pathname); response.writeHead(404).end(); return; }
  response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Content-Length': fs.statSync(file).size });
  fs.createReadStream(file).pipe(response);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
const telemetry = [];
page.on('pageerror', error => errors.push(error.message));
page.on('request', request => {
  if (new URL(request.url()).pathname.startsWith('/_vercel/')) telemetry.push(request.url());
});
try {
  const projects = fs.readdirSync('src/app/projects/content').filter(file => file.endsWith('.mdx')).map(file => '/projects/' + file.slice(0, -4));
  const expertise = ['/expertise','/expertise/backend-api-engineering','/expertise/data-engineering-pipelines','/expertise/rag-ai-engineering','/expertise/aws-cloud-devops','/expertise/full-stack-saas-products','/expertise/distributed-systems-reliability','/expertise/recommendation-ml-systems'];
  const notes = ['/engineering-notes','/engineering-notes/reliable-background-jobs-webhooks-idempotency','/engineering-notes/tenant-isolated-rag-with-pgvector','/engineering-notes/kafka-spark-airflow-pipeline-design','/engineering-notes/django-nextjs-aws-application-delivery'];
  const routes = ['/', '/services', '/professional-experience', '/projects', '/journal', '/contact', ...expertise, ...notes, ...projects];
  const links = new Set();
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto(origin + basePath + route + (route === '/' ? '' : '/'), { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, route);
      assert.equal(await page.locator('h1').count(), 1, route);
      await page.evaluate(async () => { for (const image of document.images) image.loading = 'eager'; await Promise.all([...document.images].map(image => image.decode().catch(() => {}))); });
      assert.deepEqual(await page.evaluate(() => [...document.images].filter(image => !image.naturalWidth).map(image => image.src)), [], route + ' images');
      const bounds = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth, offenders: [...document.querySelectorAll('body *')].filter(element => { const rect = element.getBoundingClientRect(); return rect.width > 0 && (rect.right > innerWidth + 2 || rect.left < -2) && getComputedStyle(element).position !== 'fixed'; }).slice(0,12).map(element => ({ tag: element.tagName, className: typeof element.className === 'string' ? element.className : '', right: Math.round(element.getBoundingClientRect().right), left: Math.round(element.getBoundingClientRect().left) })) }));
      assert.ok(bounds.page <= bounds.viewport + 2, route + ' mobile bounds ' + JSON.stringify(bounds));
      for (const href of await page.locator('a[href^="/"]').evaluateAll(anchors => anchors.map(a => a.getAttribute('href')))) links.add(href.split('#')[0]);
      if (basePath) assert.ok([...links].every(href => href.startsWith(basePath + '/') || href === basePath), 'Native links preserve the repository prefix');
    }
    console.log(`PASS: ${routes.length} exported pages at ${width}px`);
  }
  for (const href of links) assert.equal((await page.request.get(origin + href)).status(), 200, href);
  await page.goto(origin + basePath + '/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects', exact: true }).click();
  await page.waitForURL('**/projects/');
  await page.getByRole('button', { name: /Learnings/ }).click();
  assert.equal(await page.locator('.learningEntry').count(), 4);
  assert.equal(await page.locator('.galleryGrid .folderProject').count(), 0);
  await page.goto(origin + basePath + '/contact/', { waitUntil: 'networkidle' });
  await page.getByLabel('What’s on your mind?').fill('A static deployment enquiry about a software engineering role.');
  await page.getByRole('button', { name: 'Next (1/2)', exact: true }).click();
  await page.getByLabel('And who’s saying hello?').fill('Deployment check');
  await page.getByLabel('Your email').fill('visitor@example.com');
  assert.ok(await page.locator('form').evaluate(form => form.checkValidity()));
  await page.goto(origin + basePath + '/work/fitter-health-platform/', { waitUntil: 'networkidle' });
  await page.waitForURL('**/projects/fitter-health-platform/');
  for (const asset of ['/robots.txt', '/sitemap.xml', '/llms.txt', '/images/social-preview.png', '/SaaimCV.pdf', '/Fitter-Recommendation-Letter.pdf']) assert.equal((await page.request.get(origin + basePath + asset)).status(), 200, asset);
  assert.ok(fs.existsSync(path.join(root, '.nojekyll')));
  assert.ok(fs.existsSync(path.join(root, '404.html')));
  assert.deepEqual(errors, [], 'No hydration or browser errors');
  assert.deepEqual(telemetry, [], 'Vercel monitoring is disabled on GitHub Pages');
  assert.deepEqual(missing, [], 'No missing assets or RSC navigation files');
  console.log('PASS: repository paths, internal links, client navigation, filters, contact form, redirects, metadata, and downloads');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
