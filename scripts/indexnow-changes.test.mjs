import test from 'node:test';
import assert from 'node:assert/strict';
import { urlsForChanges } from './indexnow-changes.mjs';
const origin = 'https://saaim.site';
const urls = [origin + '/', origin + '/projects/example', origin + '/contact'];
test('shared schema, dynamic templates and diagram changes notify published pages', () => {
  for (const file of ['src/resources/schema.ts', 'src/app/projects/[slug]/page.tsx', 'public/images/projects/diagrams/example.png']) {
    assert.deepEqual(urlsForChanges([file], urls, origin), urls);
  }
});
test('static pages and project content select real routes; tooling changes do not submit', () => {
  assert.deepEqual(urlsForChanges(['src/app/contact/page.tsx'], urls, origin), [origin + '/contact']);
  assert.deepEqual(urlsForChanges(['src/app/projects/content/example.mdx'], urls, origin), [origin + '/projects/example', origin + '/']);
  assert.deepEqual(urlsForChanges(['scripts/test.mjs', 'README.md'], urls, origin), []);
});
