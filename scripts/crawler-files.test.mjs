import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { absoluteSiteUrl, normalizeSiteUrl } from "../src/utils/siteUrl.ts";
import { renderLlmsIndex } from "../src/utils/llms.ts";
import { sitePages } from "../src/resources/site-navigation.ts";

test("canonical URLs retain deployment prefixes and reject ambiguous inputs", () => {
  const base = normalizeSiteUrl(" https://Example.com/portfolio/// ");
  assert.equal(base, "https://example.com/portfolio");
  assert.equal(absoluteSiteUrl(base), base);
  assert.equal(absoluteSiteUrl(base, "/projects/example"), base + "/projects/example");
  assert.equal(absoluteSiteUrl(base, "/images/a b.png"), base + "/images/a%20b.png");
  for (const input of ["javascript:alert(1)", "ftp://example.com", "https://user:secret@example.com", "https://example.com/?", "https://example.com/#", "https://example.com/?preview=true"]) {
    assert.throws(() => normalizeSiteUrl(input), undefined, input);
  }
  for (const input of ["//elsewhere.test", "relative", "/../private", "/%2e%2e/private", "/x\\y", "/%2fprivate", "/page?draft=true", "/page#section"]) {
    assert.throws(() => absoluteSiteUrl(base, input), undefined, input);
  }
});

test("the LLM directory is concise Markdown with optional source links", () => {
  const pages = [
    { section: "Portfolio", title: "Home", url: "https://example.com/portfolio", description: "Public overview." },
    { section: "Project evidence", title: "Work [sample]", url: "https://example.com/portfolio/projects/sample", description: "Implemented evidence.\nDocumented limits." },
  ];
  const text = renderLlmsIndex(pages, { name: "Example\nEngineer", description: "A public portfolio.", canonicalBase: "https://example.com/portfolio", profiles: [] });
  assert.ok(text.startsWith("# Example Engineer\n\n> A public portfolio.\n"));
  assert.equal([...text.matchAll(/^# /gm)].length, 1);
  assert.ok(text.includes("[Work \\[sample\\]](https://example.com/portfolio/projects/sample)"));
  assert.ok(text.includes("Implemented evidence. Documented limits."));
  assert.ok(!text.includes("## Engineering notes"), "Empty sections are omitted");
  assert.ok(text.includes("## Optional\n"));
  assert.ok(text.includes("https://example.com/portfolio/sitemap.xml"));
  assert.ok(text.endsWith("\n"));
});

test("every static HTML route has a registered main-page label", () => {
  const discovered = fs.readdirSync("src/app", { recursive: true }).filter(file => /(^|[\\/])page\.tsx$/.test(file) && !file.includes("["))
    .map(file => "/" + file.replaceAll("\\", "/").replace(/(^|\/)page\.tsx$/, ""));
  assert.deepEqual(discovered.sort(), sitePages.map(page => page.path).sort());
});
