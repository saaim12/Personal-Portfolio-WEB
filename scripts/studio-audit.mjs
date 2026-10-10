import { chromium } from 'playwright';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base = process.argv[2] || 'http://localhost:4400';
const out = '.audit-redesign/verification';
await mkdir(out, {recursive:true});
const routes = ['/', '/about', '/experience', '/work', '/services', '/journal', '/playground', '/contact', ...(await readdir('src/app/work/projects')).filter(f=>f.endsWith('.mdx')).map(f=>'/work/'+f.slice(0,-4))];
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
const results = [];
for (const width of [320, 768, 1440]) {
 await page.setViewportSize({width,height:width===1440?1000:844});
 for (const route of routes) {
  const response = await page.goto(base+route,{waitUntil:'networkidle',timeout:120000});
  assert.equal(response.status(),200,route);
  assert.equal(await page.locator('h1').count(),1,'One main heading: '+route);
  await page.evaluate(()=>document.fonts.ready);
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
for(const asset of ['/SaaimCV.pdf','/Fitter-Recommendation-Letter.pdf','/sitemap.xml'])assert.equal((await page.request.get(base+asset)).status(),200,asset);
const missing=await page.goto(base+'/does-not-exist');assert.equal(missing.status(),404);
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base+'/');
assert.equal(await page.locator('.floatingAvatar').first().evaluate(e=>getComputedStyle(e).animationName),'none');
await writeFile(out+'/report.json',JSON.stringify({results,errors,interactions:'passed'},null,2));
await browser.close();
assert.equal(errors.length,0,'Runtime errors');
assert.equal(results.filter(r=>r.scroll>r.width+2||r.overflow.length||r.broken.length).length,0,'Layout or asset failures');
console.log('PASS: '+results.length+' route/viewport checks; menu, keyboard, filters, contact validation, PDFs, sitemap, 404, and reduced motion.');

