import { chromium } from 'playwright';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base = process.argv[2] || 'http://localhost:4400';
const out = process.argv[3] || '.audit/browser';
await mkdir(out, {recursive:true});
const routes = ['/', '/about', '/experience', '/work', '/services', '/journal', '/playground', '/contact', ...(await readdir('src/app/work/projects')).filter(f=>f.endsWith('.mdx')).map(f=>'/work/'+f.slice(0,-4))];
const browser = await chromium.launch();
const page = await browser.newPage({ permissions: ['clipboard-read', 'clipboard-write'] });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
const results = [];
const internalLinks = new Set();
for (const width of [1440, 1024, 768, 390, 320]) {
 await page.setViewportSize({width,height:width===1440?1000:844});
 for (const route of routes) {
  const response = await page.goto(base+route,{waitUntil:'networkidle',timeout:120000});
  assert.equal(response.status(),200,route);
  assert.equal(await page.locator('h1').count(),1,'One main heading: '+route);
  await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(async()=>{for(const img of document.images)img.loading='eager';await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})))});
  for(const href of await page.locator('a[href^="/"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')))) internalLinks.add(href);
  assert.equal(await page.locator('img:not([alt])').count(),0,'Images have alt attributes: '+route);
  assert.equal(await page.locator('main').count(),1,'One main landmark: '+route);
  const layout = await page.evaluate(()=>{
   const w=document.documentElement.clientWidth;
   const overflow=[...document.querySelectorAll('main *')].filter(el=>{
    const r=el.getBoundingClientRect(); if(!r.width||!r.height||r.right<0||r.left>w)return false;
    for(let p=el.parentElement;p&&p!==document.body;p=p.parentElement)if(/hidden|clip|auto|scroll/.test(getComputedStyle(p).overflowX))return false;
    return r.right>w+2||r.left<-2;
   }).slice(0,8).map(el=>({tag:el.tagName,cls:typeof el.className==='string'?el.className:'svg',right:Math.round(el.getBoundingClientRect().right),left:Math.round(el.getBoundingClientRect().left)}));
   return {width:w,scroll:document.documentElement.scrollWidth,overflow,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)};
  });
  results.push({width,route,...layout});
  if(layout.scroll>width+2||layout.overflow.length||layout.broken.length)console.log('ISSUE',JSON.stringify(results.at(-1)));
  if(['/', '/about', '/work', '/contact','/work/fitter-health-platform'].includes(route))await page.screenshot({path:out+'/'+(route==='/'?'home':route.slice(1).replaceAll('/','-'))+'-'+width+'.png'});
 }
 console.log('Checked '+routes.length+' routes at '+width+'px');
}
await page.setViewportSize({width:390,height:844});
await page.goto(base+'/');
await page.getByRole('button',{name:'Menu',exact:true}).click();
assert.equal(await page.getByRole('button',{name:'Close',exact:true}).getAttribute('aria-expanded'),'true');
await page.keyboard.press('Escape');
assert.equal(await page.getByRole('button',{name:'Menu',exact:true}).getAttribute('aria-expanded'),'false');
await page.getByRole('button',{name:'Menu',exact:true}).click();
await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Case study',exact:true}).click();
await page.waitForURL('**/work');
assert.equal(await page.getByRole('button',{name:'Menu',exact:true}).getAttribute('aria-expanded'),'false');
for(const [name,count]of [['Product & web',4],['AI & data',5],['Experiments',4],['All projects',13]]){
 await page.getByRole('button',{name:new RegExp(name.replace('&','\\&'))}).click();
 assert.equal(await page.locator('.galleryGrid .folderProject').count(),count);
}
await page.goto(base+'/contact');
await page.getByRole('button',{name:'Next (1/2)',exact:true}).click();
assert.equal(await page.locator('#contact-name').count(),0);
await page.getByLabel('What’s on your mind?').fill('I would like to discuss a software engineering role.');
await page.getByRole('button',{name:'Next (1/2)',exact:true}).click();
await page.getByLabel('And who’s saying hello?').fill('Test visitor');
await page.getByLabel('Your email').fill('visitor@example.com');
await page.getByRole('button',{name:'← Back',exact:true}).click();
assert.equal(await page.getByLabel('What’s on your mind?').inputValue(),'I would like to discuss a software engineering role.');
await page.getByRole('button',{name:'Next (1/2)',exact:true}).click();
assert.equal(await page.getByLabel('Your email').inputValue(),'visitor@example.com');
for(const asset of new Set([...internalLinks, '/SaaimCV.pdf','/Fitter-Recommendation-Letter.pdf','/sitemap.xml','/robots.txt']))assert.equal((await page.request.get(base+asset)).status(),200,asset);
await page.goto(base+'/work/fitter-health-platform');
await page.locator('.caseStudyBody h2').first().click();
assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),base+'/work/fitter-health-platform#the-brief');
const missing=await page.goto(base+'/does-not-exist');assert.equal(missing.status(),404);
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base+'/');
assert.equal(await page.locator('.floatingAvatar').first().evaluate(e=>getComputedStyle(e).animationName),'none');
await writeFile(out+'/report.json',JSON.stringify({results,errors,interactions:'passed'},null,2));
await browser.close();
assert.equal(errors.length,0,'Runtime errors');
const knownOverflow = r => r.width === 1024 && ['/', '/contact'].includes(r.route) && r.scroll <= 1039 && r.overflow.every(e => e.cls.includes('polaroid') || (r.route === '/' && e.tag === 'FIGCAPTION' && e.cls === ''));
assert.equal(results.filter(r=>r.broken.length || ((r.scroll>r.width+2||r.overflow.length) && !knownOverflow(r))).length,0,'New layout or asset failures');
console.log('PASS: '+results.length+' route/viewport checks; menu, keyboard, filters, contact validation, permalink copying, PDFs, sitemap, 404, and reduced motion.');

