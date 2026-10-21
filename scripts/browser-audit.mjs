import { chromium } from 'playwright';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base = process.argv[2] || 'http://localhost:4400';
const out = process.argv[3] || '.audit/browser';
await mkdir(out, {recursive:true});
const slugs = (await readdir('src/app/projects/content')).filter(f=>f.endsWith('.mdx')).map(f=>f.slice(0,-4));
const specialtyRoutes = ['/expertise/backend-api-engineering','/expertise/data-engineering-pipelines','/expertise/rag-ai-engineering','/expertise/aws-cloud-devops','/expertise/full-stack-saas-products','/expertise/distributed-systems-reliability','/expertise/recommendation-ml-systems'];
const noteRoutes = ['/engineering-notes/reliable-background-jobs-webhooks-idempotency','/engineering-notes/tenant-isolated-rag-with-pgvector','/engineering-notes/kafka-spark-airflow-pipeline-design','/engineering-notes/django-nextjs-aws-application-delivery'];
const routes = ['/', '/professional-experience', '/projects', '/services', '/journal', '/contact','/expertise','/engineering-notes',...specialtyRoutes,...noteRoutes,...slugs.map(slug=>'/projects/'+slug)];
const browser = await chromium.launch();
const page = await browser.newPage({ permissions: ['clipboard-read', 'clipboard-write'] });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
const results = [];
const internalLinks = new Set();
const contrast = [];
const redirects = [];
const widths = process.env.AUDIT_INTERACTIONS_ONLY === '1' ? [] : process.env.AUDIT_WIDTHS ? process.env.AUDIT_WIDTHS.split(',').map(Number) : [1440, 1024, 768, 390, 320];
assert.ok(widths.every(width => Number.isInteger(width) && width > 0), 'Valid audit viewport widths');
for (const width of widths) {
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
    // Rotating decorative SVG paths can extend outside their viewBox without
    // overflowing the document or obscuring interactive content.
    if(el.closest('svg[aria-hidden="true"]'))return false;
    const r=el.getBoundingClientRect(); if(!r.width||!r.height||r.right<0||r.left>w)return false;
    for(let p=el.parentElement;p&&p!==document.body;p=p.parentElement)if(/hidden|clip|auto|scroll/.test(getComputedStyle(p).overflowX))return false;
    return r.right>w+2||r.left<-2;
   }).slice(0,8).map(el=>({tag:el.tagName,cls:typeof el.className==='string'?el.className:'svg',right:Math.round(el.getBoundingClientRect().right),left:Math.round(el.getBoundingClientRect().left)}));
   return {width:w,scroll:document.documentElement.scrollWidth,overflow,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)};
  });
  results.push({width,route,...layout});
  if(layout.scroll>width+2||layout.overflow.length||layout.broken.length)console.log('ISSUE',JSON.stringify(results.at(-1)));
  if(route.startsWith('/projects/')) {
   assert.equal(await page.locator('.caseCover img').evaluate(e=>getComputedStyle(e).objectFit),'contain','Project cover fits without cropping: '+route);
   for(const diagram of await page.locator('.caseDiagram').evaluateAll(images=>images.map(img=>({href:img.closest('a')?.getAttribute('href'),target:img.closest('a')?.getAttribute('target'),label:img.closest('a')?.getAttribute('aria-label'),ratio:img.clientWidth/img.clientHeight,naturalRatio:img.naturalWidth/img.naturalHeight})))){
    assert.ok(diagram.href?.startsWith('/images/'),'Architecture has a full-size local image: '+route);
    assert.equal(diagram.target,'_blank','Architecture opens separately: '+route);
    assert.ok(diagram.label?.includes('full size'),'Architecture has an accessible link name: '+route);
    assert.ok(Math.abs(diagram.ratio/diagram.naturalRatio-1)<.02,'Architecture keeps its proportions: '+route);
   }
  }
  if(['/', '/professional-experience', '/projects', '/contact','/projects/fitter-health-platform'].includes(route))await page.screenshot({path:out+'/'+(route==='/'?'home':route.slice(1).replaceAll('/','-'))+'-'+width+'.png'});
 }
 console.log('Checked '+routes.length+' routes at '+width+'px');
}
await page.setViewportSize({width:390,height:844});
await page.goto(base+'/');
await page.getByRole('button',{name:'Menu',exact:true}).click();
assert.equal(await page.getByRole('button',{name:'Close',exact:true}).getAttribute('aria-expanded'),'true');
const navigation=page.getByRole('navigation',{name:'Main navigation'});
assert.equal(await page.locator('a:focus').getAttribute('href'),await navigation.getByRole('link').first().getAttribute('href'),'Opening the mobile menu focuses its first link');
for(const [name,href]of [['Professional Experience','/professional-experience'],['Projects','/projects'],['Services','/services']])assert.equal(await navigation.getByRole('link',{name,exact:true}).getAttribute('href'),href);
assert.equal(await navigation.getByRole('link',{name:/Journal|My Blog/}).getAttribute('href'),'/journal');
for(const [name,href]of [[/Resume/,'/SaaimCV.pdf'],[/Email/,'mailto:']]){
 const link=page.locator('header').getByRole('link',{name}).filter({visible:true});
 assert.equal(await link.count(),1,'One visible mobile '+name+' link');
 assert.ok((await link.getAttribute('href')).startsWith(href),'Mobile '+name+' target');
 await page.keyboard.press('Tab');await link.focus();
 assert.ok(await link.evaluate(e=>e.matches(':focus-visible')&&parseFloat(getComputedStyle(e).outlineWidth)>0),'Mobile '+name+' has a visible keyboard focus indicator');
}
await page.keyboard.press('Escape');
assert.equal(await page.getByRole('button',{name:'Menu',exact:true}).getAttribute('aria-expanded'),'false');
assert.equal(await page.getByRole('button',{name:'Menu',exact:true}).evaluate(e=>e===document.activeElement),true,'Escape restores focus to the menu button');
await page.getByRole('button',{name:'Menu',exact:true}).click();
await navigation.getByRole('link',{name:'Projects',exact:true}).click();
await page.waitForURL('**/projects');
assert.equal(await page.getByRole('button',{name:'Menu',exact:true}).getAttribute('aria-expanded'),'false');
for(const [name,count,learnings]of [['Product & web',2,0],['AI & data',4,0],['Learnings',0,4],['All projects',6,4]]){
 await page.getByRole('button',{name:new RegExp(name.replace('&','\\&'))}).click();
 assert.equal(await page.locator('.galleryGrid .folderProject').count(),count);
 assert.equal(await page.locator('.learningEntry').count(),learnings);
 assert.equal(await page.locator('.projectLearnings img').count(),0);
 assert.equal(await page.locator('.galleryToolbar [role="status"]').textContent(),(count+learnings)+' projects to explore');
}
assert.equal(slugs.length,10,'Ten current projects');
await page.goto(base+'/professional-experience');
assert.equal(await page.locator('.storyCard').count(),0,'Removed story cards stay removed');
assert.equal(await page.locator('#bio h2').textContent(),'My Story / My Bio');
assert.equal(await page.locator('.personalStoryMoments figure').count(),4,'Personal photos and video accompany the story');
assert.equal(await page.locator('.roleCard li').count(),14,'Both roles show all responsibilities without expansion');
assert.equal(await page.locator('.roleCard details').count(),0,'Experience details are not collapsed');
await page.locator('.professionalSections a[href="#career"]').click();
await page.waitForFunction(()=>document.querySelector('.professionalSections a[href="#career"]')?.getAttribute('aria-current')==='location');
assert.equal(await page.locator('#career h2').textContent(),'My Work Experience');
await page.goto(base+'/contact');
await page.getByRole('button',{name:'Next (1/2)',exact:true}).click();
assert.equal(await page.locator('#contact-name').count(),0);
await page.getByLabel('What’s on your mind?').fill('I would like to discuss a software engineering role.');
await page.getByRole('button',{name:'Next (1/2)',exact:true}).click();
await page.getByLabel('And who’s saying hello?').fill('Test visitor');
await page.getByLabel('Your email').fill('invalid-email');
assert.equal(await page.getByLabel('Your email').evaluate(e=>e.checkValidity()),false,'Invalid email is rejected');
await page.getByLabel('Your email').fill('visitor@example.com');
await page.getByRole('button',{name:'← Back',exact:true}).click();
assert.equal(await page.getByLabel('What’s on your mind?').inputValue(),'I would like to discuss a software engineering role.');
await page.getByRole('button',{name:'Next (1/2)',exact:true}).click();
assert.equal(await page.getByLabel('Your email').inputValue(),'visitor@example.com');
for(const asset of new Set([...internalLinks, '/SaaimCV.pdf','/Fitter-Recommendation-Letter.pdf','/sitemap.xml','/robots.txt']))assert.equal((await page.request.get(base+asset)).status(),200,asset);
for(const [from,to]of [['/about','/professional-experience'],['/experience','/professional-experience'],['/work','/projects'],['/work/fitter-health-platform','/projects/fitter-health-platform'],['/case-study','/projects'],['/case-studies','/projects'],['/case-study/fitter-health-platform','/projects/fitter-health-platform'],['/case-studies/fitter-health-platform','/projects/fitter-health-platform']]){
 const response=await page.request.get(base+from,{maxRedirects:0});
 assert.ok([301,308].includes(response.status()),'Permanent redirect: '+from);
 assert.equal(new URL(response.headers().location,base).pathname,to,'Redirect destination: '+from);
 redirects.push({from,to,status:response.status()});
}
await page.goto(base+'/projects/fitter-health-platform');
await page.locator('.caseStudyBody h2').first().click();
assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),base+'/projects/fitter-health-platform#a-health-tech-product-is-not-just-a-set-of-endpoints');
for(const route of ['/does-not-exist','/playground','/projects/bookstore-platform','/projects/web-sentiment-pipeline','/projects/interactive-portfolio'])assert.equal((await page.goto(base+route)).status(),404,'Removed or missing page: '+route);
await page.setViewportSize({width:1440,height:1000});
// Sample solid control surfaces; imagery and decorative overlays need visual review.
async function sampleContrast(selector,state){
 const records=await page.locator(selector).evaluateAll(elements=>elements.map(element=>{
  const rgba=value=>{const values=value.match(/[\d.]+/g)?.map(Number)||[0,0,0];return [...values.slice(0,3),values[3]??1]};
  const composite=(front,back)=>[0,1,2].map(i=>front[i]*front[3]+back[i]*(1-front[3]));
  const ancestors=[];for(let node=element;node;node=node.parentElement)ancestors.push(node);
  let background=[255,255,255];for(const ancestor of ancestors.reverse())background=composite(rgba(getComputedStyle(ancestor).backgroundColor),background);
  const style=getComputedStyle(element),foreground=rgba(style.color);foreground[3]*=Number(style.opacity);
  const luminance=color=>color.map(c=>c/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((sum,c,i)=>sum+c*[.2126,.7152,.0722][i],0);
  const values=[luminance(composite(foreground,background)),luminance(background)].sort((a,b)=>a-b);
  return {text:element.textContent.trim().replace(/\s+/g,' ').slice(0,90),ratio:(values[1]+.05)/(values[0]+.05),minimum:parseFloat(style.fontSize)>=24||(parseFloat(style.fontSize)>=18.66&&parseInt(style.fontWeight)>=700)?3:4.5,foreground:style.color,background};
 }));
 contrast.push(...records.map(record=>({route:new URL(page.url()).pathname,selector,state,...record})));
}
for(const [route,selectors]of [
 ['/', ['.navLinks > a:visible','.navActions > a:not(.navAvatar):visible','.studioButton > span:last-child','.footerLinks a','.boardLinks a']],
 ['/projects',['.galleryFilters button','.galleryFilters button span']],
 ['/contact',['.formActions button','.contactDirect a']],
]){
 await page.goto(base+route,{waitUntil:'networkidle'});
 for(const selector of selectors){
  await sampleContrast(selector,'normal');
  const controls=page.locator(selector);
  for(let i=0;i<await controls.count();i++){
   const control=controls.nth(i);await control.hover();await page.waitForTimeout(250);
   await control.evaluate(e=>e.setAttribute('data-audit-contrast',''));
   await sampleContrast('[data-audit-contrast]','hover');
   await control.evaluate(e=>e.removeAttribute('data-audit-contrast'));
  }
 }
}
await page.goto(base+'/',{waitUntil:'networkidle'});
const footer=page.locator('footer');
for(const name of ['GitHub','LinkedIn','Medium','Resume']){
 const link=footer.getByRole('link',{name:new RegExp(name)});
 assert.equal(await link.count(),1,'Footer includes '+name);
 assert.equal(await link.getAttribute('target'),'_blank','Footer '+name+' opens separately');
 assert.ok((await link.getAttribute('rel')).includes('noopener'),'Footer '+name+' keeps the opener isolated');
 assert.ok(await link.evaluate(e=>e.getBoundingClientRect().height>=36),'Footer '+name+' has a usable button height');
}
await footer.getByRole('link',{name:'Back to top'}).click();
await page.waitForFunction(()=>window.scrollY<110);
assert.equal(await page.locator('.folderFeature').first().evaluate(e=>getComputedStyle(e).position),'sticky');
assert.ok((await page.locator('body').evaluate(e=>getComputedStyle(e).backgroundImage)).includes('linear-gradient'),'Grid texture is present');
await page.mouse.move(400,220);
assert.equal(await page.locator('html').getAttribute('data-studio-cursor'),'');
await page.locator('.studioButton').first().hover();
assert.equal(await page.locator('.studioCursor').evaluate(e=>e.classList.contains('cursorActive')),true,'Cursor responds to interactive elements');
await page.locator('.homeAbout').scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
assert.equal(await page.locator('#about-intro').evaluate(e=>getComputedStyle(e).opacity),'1','Scroll reveal finishes');
for(const selector of ['.floatingAvatar','.mascotEyes','.roleSticker','.citySticker'])assert.notEqual(await page.locator(selector).first().evaluate(e=>getComputedStyle(e).animationName),'none','Animation runs: '+selector);
await page.goto(base+'/contact');
await page.getByLabel('What’s on your mind?').hover();
assert.equal(await page.locator('html').getAttribute('data-studio-cursor'),null,'Text fields retain the native cursor');
await page.goto(base+'/');await page.mouse.move(400,220);
await page.emulateMedia({reducedMotion:'reduce'});
assert.equal(await page.locator('html').getAttribute('data-studio-cursor'),null,'Reduced motion restores the native cursor');
assert.equal(await page.locator('[data-motion-pending]').count(),0,'Reduced motion reveals all content');
assert.equal(await page.locator('.folderFeature').first().evaluate(e=>getComputedStyle(e).position),'relative');
assert.equal(await page.locator('html').evaluate(e=>getComputedStyle(e).scrollBehavior),'auto','Reduced motion disables smooth scrolling');
await page.goto(base+'/');
for(const selector of ['.floatingAvatar','.mascotEyes','.roleSticker','.citySticker'])assert.equal(await page.locator(selector).first().evaluate(e=>getComputedStyle(e).animationName),'none','Reduced motion stops '+selector);
assert.equal(await page.locator('.contactBackdrop').evaluate(e=>getComputedStyle(e).animationName),'none','Reduced motion stops background movement');
await page.locator('.studioButton').first().hover();
assert.equal(await page.locator('.studioButton').first().evaluate(e=>getComputedStyle(e).transitionDuration),'0s','Reduced motion disables hover transitions');
const touchPage=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
await touchPage.goto(base+'/',{waitUntil:'networkidle'});await touchPage.mouse.move(120,220);
assert.equal(await touchPage.locator('html').getAttribute('data-studio-cursor'),null,'Touch devices retain their native pointer behavior');
assert.equal(await touchPage.locator('.studioCursor').evaluate(e=>getComputedStyle(e).display),'none','Custom cursor is hidden on touch devices');
assert.equal(await touchPage.locator('.homeWelcome').count(),0,'Mobile does not display a blocking welcome overlay');
const mobileProject = touchPage.locator('.studioHome .folderFeature').first();
assert.equal(await mobileProject.evaluate(el=>getComputedStyle(el).position),'relative','Mobile project cards do not stick over each other');
assert.equal(await mobileProject.locator('.folderTab').evaluate(el=>getComputedStyle(el).height),'50px','Mobile project tabs are compact');
assert.ok(await mobileProject.evaluate(el=>el.getBoundingClientRect().width <= innerWidth),'Mobile project card fits viewport');
await touchPage.goto(base+'/services',{waitUntil:'networkidle'});
assert.equal(await touchPage.locator('.servicesPage .servicePanelInner').first().evaluate(el=>getComputedStyle(el).width!=='auto'),true,'Service panels have bounded mobile width');
assert.equal(await touchPage.locator('.servicesPage .servicePanelCapabilities').first().evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length),1,'Service tags use one mobile column');
await touchPage.goto(base+'/',{waitUntil:'networkidle'});

await touchPage.locator('.contactIntro').scrollIntoViewIfNeeded();
assert.equal(await touchPage.locator('.contactIntro h2').evaluate(e=>getComputedStyle(e).whiteSpace),'normal','Mobile contact heading can wrap');
assert.equal(await touchPage.locator('.contactIntro .mascot').evaluate(e=>getComputedStyle(e).animationName),'none','Mobile contact animation is disabled');
await touchPage.close();
const staticPage=await browser.newPage({javaScriptEnabled:false,viewport:{width:1440,height:1000}});
await staticPage.goto(base+'/',{waitUntil:'networkidle'});
assert.equal(await staticPage.locator('[data-motion-pending]').count(),0,'No JavaScript leaves all motion content visible');
assert.equal(await staticPage.locator('#about-intro').evaluate(e=>getComputedStyle(e).opacity),'1','The introduction is readable without JavaScript');
await staticPage.close();
const greetingPage=await browser.newPage({viewport:{width:1440,height:1000}});
await greetingPage.goto(base+'/',{waitUntil:'domcontentloaded'});
assert.equal(await greetingPage.locator('.homeWelcome, .welcomeBubble').count(),0,'No blocking welcome intro is mounted');
assert.equal(await greetingPage.locator('#hero-name').count(),1,'Home hero is present immediately');
assert.equal(await greetingPage.locator('#hero-name').isVisible(),true,'Home hero can be viewed without waiting for a welcome screen');
await greetingPage.locator('#hero-name').hover();
assert.equal(await greetingPage.locator('.studioCursorBlend').evaluate(e=>getComputedStyle(e).mixBlendMode),'difference');
await greetingPage.waitForFunction(()=>getComputedStyle(document.querySelector('.studioCursorBlend')).opacity==='1');
// The avatar deliberately floats continuously, so Playwright must not wait for a stationary frame.
await greetingPage.locator('.avatarRight').hover({ force: true });
await greetingPage.waitForTimeout(450);
assert.ok(await greetingPage.locator('.avatarRight .avatarGreeting').evaluate(e=>e.getBoundingClientRect().width>100),'Avatar expands into the greeting');
await greetingPage.locator('.studioButton').first().hover();
await greetingPage.waitForTimeout(250);
assert.equal(await greetingPage.locator('.studioButton').first().evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(255, 255, 255)','Primary button becomes outlined on hover');
await greetingPage.close();
await writeFile(out+'/report.json',JSON.stringify({results,errors,redirects,contrast,interactions:'passed'},null,2));
await browser.close();
assert.equal(errors.length,0,'Runtime errors');
assert.equal(results.filter(r=>r.broken.length || r.scroll>r.width+2 || r.overflow.length).length,0,'New layout or asset failures');
assert.deepEqual(contrast.filter(sample=>sample.ratio+.02<sample.minimum),[],'Sampled control text meets WCAG AA contrast in normal and hover states');
console.log('PASS: '+results.length+' route/viewport checks; redirects, removed pages, navigation, keyboard, filters, contact validation, diagram fitting, permalink copying, footer controls, contrast, textures, cursor, and reduced motion.');
