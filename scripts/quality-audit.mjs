import fs from 'node:fs';
import { chromium } from 'playwright';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const tools = path.resolve(process.argv.find(arg=>arg.startsWith('--tools='))?.slice(8) || 'tmp/audit-tools');
const {default:AxeBuilder} = await import(pathToFileURL(path.join(tools,'node_modules/@axe-core/playwright/dist/index.mjs')).href);
const {default:lighthouse} = await import(pathToFileURL(path.join(tools,'node_modules/lighthouse/core/index.js')).href);

const phase = process.argv.find(arg=>arg.startsWith('--phase='))?.slice(8) || 'after';
if(!['before','after'].includes(phase))throw new Error('Use --phase=before or --phase=after');
const origin = process.argv[2] || 'http://localhost:3000';
fs.mkdirSync('.audit', { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
const projects = fs.readdirSync('src/app/projects/content').filter(f=>f.endsWith('.mdx')).map(f=>'/projects/'+f.slice(0,-4));
const results = [];
for (const width of [1440,390]) {
await page.setViewportSize({width,height:900});
for (const route of ['/', '/services', '/professional-experience', '/projects', '/journal', '/contact', ...projects]) {
  await page.goto(origin+route, { waitUntil:'networkidle' });
  const axe = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  const data = await page.evaluate(()=>({
    title:document.title,
    description:document.querySelector('meta[name="description"]')?.content,
    headings:[...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h=>({level:+h.tagName[1],text:h.textContent?.trim()})),
    links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.getAttribute('href'),text:a.textContent?.trim(),name:a.getAttribute('aria-label')})),
    schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)),
  }));
  results.push({route,width,...data,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  console.log(width,route, axe.violations.map(v=>v.id).join(',') || 'axe PASS');
}
}
fs.writeFileSync(`.audit/${phase}-routes.json`,JSON.stringify(results,null,2));
await browser.close();
const chrome = await chromium.launch({args:['--remote-debugging-port=45872']});
try {
  const scores=[];
  for(const [route,desktop] of [['/',false],['/services',false],['/',true]]) {
    const {lhr} = await lighthouse(origin+route,{port:45872,output:'json',logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo'],...(desktop?{formFactor:'desktop',screenEmulation:{mobile:false,width:1350,height:940,deviceScaleFactor:1,disabled:false},throttling:{rttMs:40,throughputKbps:10240,cpuSlowdownMultiplier:1,requestLatencyMs:0,downloadThroughputKbps:0,uploadThroughputKbps:0}}:{})});
    const label = (route==='/'?'home':'services')+'-'+(desktop?'desktop':'mobile');
    fs.writeFileSync(`.audit/${phase}-${label}-lighthouse.json`,JSON.stringify(lhr));
    const row={label,scores:Object.fromEntries(Object.entries(lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),metrics:Object.fromEntries(['largest-contentful-paint','cumulative-layout-shift','total-blocking-time','first-contentful-paint'].map(k=>[k,lhr.audits[k].displayValue])),issues:Object.entries(lhr.audits).filter(([,a])=>a.score!==null&&a.score<1).map(([id,a])=>({id,title:a.title,display:a.displayValue}))};
    scores.push(row); console.log(JSON.stringify(row));
  }
  fs.writeFileSync(`.audit/${phase}-scores.json`,JSON.stringify(scores,null,2));
} finally { await chrome.close(); }
if(results.some(row=>row.violations.length))process.exitCode=1;
