import { chromium } from 'playwright';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base = process.argv[2] || 'http://localhost:4400';
const out = process.argv[3] || '.audit/browser';
await mkdir(out, {recursive:true});
const slugs = (await readdir('src/app/projects/content')).filter(f=>f.endsWith('.mdx')).map(f=>f.slice(0,-4));
const specialtyRoutes = ['/expertise/backend-api-engineering','/expertise/data-engineering-pipelines','/expertise/rag-ai-engineering','/expertise/aws-cloud-devops','/expertise/full-stack-saas-products','/expertise/distributed-systems-reliability','/expertise/recommendation-ml-systems'];
const noteRoutes = ['/engineering-notes/reliable-background-jobs-webhooks-idempotency','/engineering-notes/tenant-isolated-rag-with-pgvector','/engineering-notes/kafka-spark-airflow-pipeline-design','/engineering-notes/django-nextjs-aws-application-delivery'];
const routes = ['/', '/professional-experience', '/projects', '/services', '/journal', '/contact','/expertise','/engineering-notes','/sitemap',...specialtyRoutes,...noteRoutes,...slugs.map(slug=>'/projects/'+slug)];
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
  if(route.startsWith('/expertise') || route.startsWith('/engineering-notes') || route === '/sitemap') {
   const editorial = await page.locator('.engineeringHub').evaluate(container => {
    const bounds = container.getBoundingClientRect();
    const heading = container.querySelector('h1').getBoundingClientRect();
    const targets = [...container.querySelectorAll('.engineeringContents a')].map(a => document.getElementById(decodeURIComponent(a.hash.slice(1))));
    return {left:bounds.left,right:bounds.right,headingLeft:heading.left,headingRight:heading.right,validTargets:targets.every(Boolean)};
   });
   assert.ok(editorial.left >= 15 && editorial.right <= width - 15, 'Editorial page keeps its gutters: '+route+' at '+width);
   assert.ok(editorial.headingLeft >= editorial.left - 1 && editorial.headingRight <= editorial.right + 1, 'Editorial heading fits its container: '+route);
   assert.ok(editorial.validTargets, 'Every editorial section link has a destination: '+route);
  }
  if(route === '/' && width >= 1001) {
   const columns = await page.locator('.homeAbout,.engineeringHub,.portfolioAnswers').evaluateAll(elements=>elements.map(el=>({left:el.getBoundingClientRect().left,width:el.getBoundingClientRect().width})));
   assert.ok(columns.every(col=>Math.abs(col.left-columns[0].left)<1 && Math.abs(col.width-columns[0].width)<1), 'Home sections share their gutters at '+width);
  }
  if(route.startsWith('/projects/')) {
   assert.equal(await page.locator('.caseCover img').evaluate(e=>getComputedStyle(e).objectFit),'contain','Project cover fits without cropping: '+route);
   for(const diagram of await page.locator('.caseDiagram').evaluateAll(images=>images.map(img=>({href:img.closest('a')?.getAttribute('href'),target:img.closest('a')?.getAttribute('target'),label:img.closest('a')?.getAttribute('aria-label'),ratio:img.clientWidth/img.clientHeight,naturalRatio:img.naturalWidth/img.naturalHeight})))){
    assert.ok(diagram.href?.startsWith('/images/'),'Architecture has a full-size local image: '+route);
    assert.equal(diagram.target,'_blank','Architecture opens separately: '+route);
    assert.ok(diagram.label?.includes('full size'),'Architecture has an accessible link name: '+route);
    assert.ok(Math.abs(diagram.ratio/diagram.naturalRatio-1)<.02,'Architecture keeps its proportions: '+route);
   }
  }
  if(['/', '/professional-experience', '/projects', '/contact','/projects/fitter-health-platform','/expertise','/expertise/backend-api-engineering','/engineering-notes','/sitemap'].includes(route))await page.screenshot({path:out+'/'+(route==='/'?'home':route.slice(1).replaceAll('/','-'))+'-'+width+'.png'});
 }
 console.log('Checked '+routes.length+' routes at '+width+'px');
}
const sitemapResponse = await page.request.get(base+'/sitemap.xml');
assert.equal(sitemapResponse.status(),200,'XML sitemap is available');
const sitemapXml = await sitemapResponse.text();
const sitemapPaths = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>new URL(match[1]).pathname);
assert.deepEqual(sitemapPaths.slice().sort(), routes.slice().sort(), 'XML sitemap covers every public route exactly once');
await page.goto(base+'/sitemap');
const htmlSitemapPaths = await page.locator('.siteMapGroup a').evaluateAll(links=>links.map(link=>new URL(link.href).pathname));
assert.deepEqual(htmlSitemapPaths.slice().sort(), sitemapPaths.slice().sort(), 'HTML and XML sitemap coverage agrees');
const robotsText = await (await page.request.get(base+'/robots.txt')).text();
assert.ok(robotsText.includes('Sitemap: '+new URL('/sitemap.xml', [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)][0][1]).href), 'Robots advertises the canonical sitemap');
await page.setViewportSize({width:390,height:844});
await page.goto(base+'/expertise/backend-api-engineering');
await page.getByRole('navigation',{name:'On this page'}).getByRole('link',{name:'Project evidence',exact:true}).click();
await page.waitForFunction(()=>{
 const top=document.getElementById('project-evidence')?.getBoundingClientRect().top;
 return top >= 88 && top <= 120;
});
assert.equal(new URL(page.url()).hash,'#project-evidence','Editorial section links scroll below the fixed header without doubling its offset');
await page.goto(base+'/');
await page.getByRole('button',{name:'Menu',exact:true}).click();
assert.equal(await page.getByRole('button',{name:'Close',exact:true}).getAttribute('aria-expanded'),'true');
const navigation=page.getByRole('navigation',{name:'Main navigation'});
assert.equal(await page.locator('a:focus').getAttribute('href'),await navigation.getByRole('link').first().getAttribute('href'),'Opening the mobile menu focuses its first link');
for(const [name,href]of [['Professional Experience','/professional-experience'],['Projects','/projects'],['Services','/services']])assert.equal(await navigation.getByRole('link',{name,exact:true}).getAttribute('href'),href);
assert.equal(await navigation.getByRole('link',{name:/Journal|My Blog/}).getAttribute('href'),'/journal');
for(const [name,href]of [[/Resume/,'/SaaimCV.pdf'],[/Email/,'/contact']]){
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
assert.equal(await page.locator('.contactPrimary a[href^="mailto:"]').count(),1,'Direct email link sits above the form');
assert.equal(await page.locator('form.contactForm').getAttribute('method'),'post','Without JavaScript the form posts, so contact data never enters the URL');
await page.getByRole('button',{name:'Send message',exact:true}).click();
assert.equal(await page.getByLabel('Your message').evaluate(e=>e.checkValidity()),false,'Empty message is rejected');
await page.getByLabel('Your message').fill('I would like to discuss a software engineering role.');
await page.getByLabel('Your name').fill('Test visitor');
await page.getByLabel('Your email').fill('invalid-email');
assert.equal(await page.getByLabel('Your email').evaluate(e=>e.checkValidity()),false,'Invalid email is rejected');
await page.getByLabel('Your email').fill('visitor@example.com');
let contactPayload;
await page.route('**/api/contact',route=>{contactPayload=JSON.parse(route.request().postData()||'{}');route.fulfill({status:200,contentType:'application/json',body:'{"ok":true}'});});
await page.getByRole('button',{name:'Send message',exact:true}).click();
await page.getByText('Message submitted.').waitFor();
assert.equal(contactPayload.email,'visitor@example.com','Form posts to the contact API');
await page.unroute('**/api/contact');
for(const asset of new Set([...internalLinks, '/SaaimCV.pdf','/Fitter-Recommendation-Letter.pdf','/sitemap.xml','/robots.txt']))assert.equal((await page.request.get(base+asset)).status(),200,asset);
for(const [from,to]of [['/about','/professional-experience'],['/experience','/professional-experience'],['/work','/projects'],['/work/fitter-health-platform','/projects/fitter-health-platform'],['/case-study','/projects'],['/case-studies','/projects'],['/case-study/fitter-health-platform','/projects/fitter-health-platform'],['/case-studies/fitter-health-platform','/projects/fitter-health-platform']]){
 const response=await page.request.get(base+from,{maxRedirects:0});
 assert.ok([301,308].includes(response.status()),'Permanent redirect: '+from);
 assert.equal(new URL(response.headers().location,base).pathname,to,'Redirect destination: '+from);
 redirects.push({from,to,status:response.status()});
}
await page.goto(base+'/projects/fitter-health-platform');
await page.locator('.caseHeadingCopy').first().click();
assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),base+'/projects/fitter-health-platform#a-health-tech-product-is-not-just-a-set-of-endpoints');
assert.equal(await page.getByRole('status').textContent(),'Link copied to clipboard.','Copying a heading has accessible feedback');
await page.locator('.caseHeadingCopy').first().focus();
await page.keyboard.press('Enter');
assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),base+'/projects/fitter-health-platform#a-health-tech-product-is-not-just-a-set-of-endpoints','Heading links support keyboard copying');
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
 ['/', ['.navLinks > a:visible','.navActions > a:not(.navAvatar):visible','.studioButton > span:last-child','.footerNav a','.contactActions a']],
 ['/projects',['.galleryFilters button','.galleryFilters button span']],
 ['/contact',['.formActions button','.contactDirect a','.contactPrimary .contactEmail']],
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
 assert.ok(await link.evaluate(e=>e.getBoundingClientRect().height>=24),'Footer '+name+' meets the 24px target size');
}
await footer.getByRole('link',{name:'Back to top'}).click();
await page.waitForFunction(()=>window.scrollY<110);
// Monochrome system: flat, square, no custom cursor or decorative motion.
assert.equal(await page.locator('body').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(244, 243, 239)','Page uses the mist background');
assert.equal(await page.locator('body').evaluate(e=>getComputedStyle(e).backgroundImage),'none','No background texture');
const bodyFont=await page.locator('body').evaluate(e=>getComputedStyle(e).fontFamily);
assert.equal(await page.locator('#hero-name').evaluate(e=>getComputedStyle(e).fontFamily.split(',')[0]),bodyFont.split(',')[0],'Headlines use the body face (Switzer)');
assert.ok(await page.evaluate(()=>[...document.fonts].some(f=>f.status==='loaded'&&f.weight==='400')),'Switzer is loaded');
assert.notEqual(await page.locator('.monoLabel').first().evaluate(e=>getComputedStyle(e).fontFamily.split(',')[0]),bodyFont.split(',')[0],'Labels use the mono face (Geist Mono)');
assert.equal(await page.locator('.studioButton').first().evaluate(e=>getComputedStyle(e).borderTopLeftRadius),'0px','Corners are square');
assert.equal(await page.locator('.homeWork').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(17, 17, 17)','Selected work uses the inverse surface');
assert.equal(await page.locator('.folderFeature').first().evaluate(e=>getComputedStyle(e).position),'relative','Project cards do not stick');
assert.equal(await page.locator('.studioCursor, .studioCursorBlend, .floatingAvatar, .mascot').count(),0,'No custom cursor or decorative figures');
await page.mouse.move(400,220);
assert.equal(await page.locator('html').getAttribute('data-studio-cursor'),null,'The native pointer is kept');
assert.equal(await page.locator('#about-intro').evaluate(e=>getComputedStyle(e).opacity),'1','About text is visible without waiting for motion');
await page.emulateMedia({reducedMotion:'reduce'});
await page.goto(base+'/');
assert.equal(await page.locator('[data-motion-pending]').count(),0,'Reduced motion reveals all content');
assert.equal(await page.locator('html').evaluate(e=>getComputedStyle(e).scrollBehavior),'auto','Reduced motion disables smooth scrolling');
await page.emulateMedia({reducedMotion:'no-preference'});
const touchPage=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
await touchPage.goto(base+'/',{waitUntil:'networkidle'});
assert.equal(await touchPage.locator('.homeWelcome').count(),0,'Mobile does not display a blocking welcome overlay');
const mobileProject = touchPage.locator('.studioHome .folderFeature').first();
assert.equal(await mobileProject.evaluate(el=>getComputedStyle(el).position),'relative','Mobile project cards do not stick over each other');
assert.ok(await mobileProject.evaluate(el=>el.getBoundingClientRect().width <= innerWidth),'Mobile project card fits viewport');
await touchPage.getByRole('button',{name:'Menu'}).click();
assert.ok(await touchPage.locator('#main-navigation').isVisible(),'Mobile menu opens');
await touchPage.keyboard.press('Escape');
assert.equal(await touchPage.locator('#main-navigation').isVisible(),false,'Mobile menu closes with Escape');
await touchPage.goto(base+'/services',{waitUntil:'networkidle'});
assert.equal(await touchPage.locator('.servicesPage .servicePanelInner').first().evaluate(el=>getComputedStyle(el).width!=='auto'),true,'Service panels have bounded mobile width');
await touchPage.goto(base+'/',{waitUntil:'networkidle'});
await touchPage.locator('.contactSection').scrollIntoViewIfNeeded();
assert.equal(await touchPage.locator('.contactHeadline').evaluate(e=>getComputedStyle(e).whiteSpace),'normal','Mobile contact heading can wrap');
await touchPage.close();
const staticPage=await browser.newPage({javaScriptEnabled:false,viewport:{width:1440,height:1000}});
await staticPage.goto(base+'/',{waitUntil:'networkidle'});
assert.equal(await staticPage.locator('[data-motion-pending]').count(),0,'No JavaScript leaves all content visible');
assert.equal(await staticPage.locator('#about-intro').evaluate(e=>getComputedStyle(e).opacity),'1','The introduction is readable without JavaScript');
await staticPage.goto(base+'/projects/fitter-health-platform',{waitUntil:'networkidle'});
assert.ok(await staticPage.locator('.caseStudyBody p').count()>10,'Case-study text is rendered without JavaScript');
assert.ok(await staticPage.locator('.caseStudyBody table').count()>0,'Case-study tables are rendered without JavaScript');
await staticPage.close();
const greetingPage=await browser.newPage({viewport:{width:1440,height:1000}});
await greetingPage.goto(base+'/',{waitUntil:'domcontentloaded'});
assert.equal(await greetingPage.locator('.homeWelcome, .welcomeBubble').count(),0,'No blocking welcome intro is mounted');
assert.equal(await greetingPage.locator('#hero-name').isVisible(),true,'Home hero is visible immediately');
await greetingPage.close();
await writeFile(out+'/report.json',JSON.stringify({results,errors,redirects,contrast,interactions:'passed'},null,2));
await browser.close();
assert.equal(errors.length,0,'Runtime errors');
assert.equal(results.filter(r=>r.broken.length || r.scroll>r.width+2 || r.overflow.length).length,0,'New layout or asset failures');
assert.deepEqual(contrast.filter(sample=>sample.ratio+.02<sample.minimum),[],'Sampled control text meets WCAG AA contrast in normal and hover states');
console.log('PASS: '+results.length+' route/viewport checks; redirects, removed pages, navigation, keyboard, filters, contact validation and delivery states, diagram fitting, permalink copying, footer controls, contrast, monochrome system, mobile menu, and reduced motion.');
