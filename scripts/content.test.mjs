import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { headingId } from "../src/utils/headingId.ts";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

const directory = "src/app/projects/content";
const projects = fs.readdirSync(directory).filter(file => file.endsWith(".mdx"))
  .map(file => ({ slug: path.basename(file, ".mdx"), ...matter(fs.readFileSync(path.join(directory, file), "utf8")) }));

test("existing heading permalink forms stay stable", () => {
  for (const [text, expected] of [
    ["The brief", "the-brief"],
    ["Model-to-device architecture", "model-to-device-architecture"],
    ["Technical architecture: component responsibilities", "technical-architecture-component-responsibilities"],
    ["System boundaries and technology responsibilities", "system-boundaries-and-technology-responsibilities"],
    ["Data & AI", "data-and-ai"],
  ]) assert.equal(headingId(text), expected);
});

test("all projects retain their routes, content, and final diagrams", () => {
  assert.equal(projects.length, 10);
  for (const { slug, data, content } of projects) {
    for (const key of ["title", "summary", "seoDescription", "publishedAt"]) {
      assert.equal(typeof data[key], "string", slug + ": " + key);
      assert.ok(data[key].length, slug + ": " + key);
    }
    assert.ok(Number.isFinite(Date.parse(data.publishedAt)), slug);
    assert.ok(data.stack.length, slug);
    assert.ok(data.images.length >= 1, slug + " has architecture diagrams");
    assert.equal(new Set(data.images).size, data.images.length, slug + " has no duplicate diagram paths");
    for (const asset of [data.thumbnail, ...data.images]) {
      assert.ok(asset.startsWith("/images/projects/"), slug);
      assert.ok(fs.existsSync("public" + asset), slug + ": " + asset);
    }
    assert.ok(content.includes("## "), slug);
    assert.ok(!/<[A-Z][A-Za-z]*\b/.test(content), "MDX contains only Markdown: " + slug);
    const headings = [...content.matchAll(/^#{2,3} (.+)$/gm)].map(match => headingId(match[1]));
    assert.equal(new Set(headings).size, headings.length, slug + " has unique anchors");
    for (const match of content.matchAll(/\]\((\/[^)#]+)(?:#[^)]*)?\)/g)) {
      if (/\.[a-z]+$/i.test(match[1])) assert.ok(fs.existsSync("public" + match[1]), match[1]);
    }
  }
});

test("project Markdown compiles with subheadings and structured tables", async () => {
  for (const { slug, content } of projects) {
    const { content: rendered } = await compileMDX({ source: content, options: { mdxOptions: { remarkPlugins: [remarkGfm] } } });
    assert.ok(rendered, slug + " compiles");
    if (slug !== "algorithms-in-python") assert.ok(/^\| ---/m.test(content), slug + " retains its facts tables");
  }
});

test("project image paths retain supported final assets", () => {
  for (const { slug, content, data } of projects) {
    for (const asset of data.images) {
      const image = fs.readFileSync("public" + asset);
      if (asset.endsWith(".svg")) assert.ok(image.toString("utf8").includes("<svg"), asset);
      else {
        assert.equal(image.subarray(1, 4).toString(), "PNG", asset);
        assert.equal(image.readUInt32BE(16), 1672, asset);
        assert.equal(image.readUInt32BE(20), 941, asset);
      }
    }
  }
});
