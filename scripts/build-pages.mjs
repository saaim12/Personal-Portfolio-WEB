import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const repository = process.env.GITHUB_REPOSITORY || 'saaim12/Personal-Portfolio-WEB';
const [owner, name] = repository.split('/');
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (name.toLowerCase() === `${owner.toLowerCase()}.github.io` ? '' : `/${name}`);
const siteURL = (process.env.NEXT_PUBLIC_SITE_URL || `https://${owner}.github.io${basePath}`).replace(/\/$/, '');
const result = spawnSync(process.execPath, [path.resolve('node_modules/next/dist/bin/next'), 'build'], {
  stdio: 'inherit',
  env: { ...process.env, NEXT_PUBLIC_STATIC_EXPORT: 'true', NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: siteURL },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status || 1);

// Next's segment export uses Windows path separators, but browsers request dot-separated names.
// Linux CI already produces the correct filenames. Normalize only the malformed segment folders.
const exportRoot = fs.realpathSync('out');
function normalizeSegments(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const segmentRoot = path.join(directory, entry.name);
    if (!entry.name.startsWith('__next.')) { normalizeSegments(segmentRoot); continue; }
    function flatten(current) {
      for (const file of fs.readdirSync(current, { withFileTypes: true })) {
        const source = path.join(current, file.name);
        if (file.isDirectory()) flatten(source);
        else {
          const suffix = path.relative(segmentRoot, source).split(path.sep).join('.');
          fs.copyFileSync(source, path.join(directory, `${entry.name}.${suffix}`));
        }
      }
    }
    flatten(segmentRoot);
    if (!fs.realpathSync(segmentRoot).startsWith(exportRoot + path.sep)) throw new Error('Segment cleanup must stay inside out/');
    fs.rmSync(segmentRoot, { recursive: true });
  }
}
normalizeSegments(exportRoot);

fs.writeFileSync('out/.nojekyll', '');
// Static hosts cannot run Next.js redirects. Preserve known legacy URLs with small redirect pages.
const aliases = { about: 'professional-experience', experience: 'professional-experience', work: 'projects', 'case-study': 'projects', 'case-studies': 'projects' };
const slugs = fs.readdirSync('src/app/projects/content').filter(file => file.endsWith('.mdx')).map(file => file.slice(0, -4));
for (const prefix of ['work', 'case-study', 'case-studies']) for (const slug of slugs) aliases[`${prefix}/${slug}`] = `projects/${slug}`;
for (const [from, to] of Object.entries(aliases)) {
  const directory = path.join('out', from);
  const destination = `${basePath}/${to}/`;
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${destination}"><link rel="canonical" href="${siteURL}/${to}"><title>Page moved</title></head><body><a href="${destination}">Continue to the current page</a><script>location.replace(${JSON.stringify(destination)}+location.search+location.hash)</script></body></html>`);
}
console.log(`GitHub Pages export ready in out/ for ${siteURL}`);
