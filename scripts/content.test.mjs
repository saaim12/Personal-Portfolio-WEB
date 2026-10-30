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


test("portfolio specialties and engineering notes use unique routes and real projects", async () => {
  const { specialties } = await import("../src/resources/specialties.ts");
  const { engineeringNotes } = await import("../src/resources/engineering-notes.ts");
  assert.equal(specialties.length, 7);
  assert.equal(engineeringNotes.length, 4);
  const keys = [...specialties.map(s=>"expertise/"+s.slug),...engineeringNotes.map(n=>"engineering-notes/"+n.slug)];
  assert.equal(new Set(keys).size, 11);
  const known = new Set(projects.map(p=>p.slug));
  for (const s of specialties) {
    assert.ok(s.title.length+(" | Saaim Abdullah").length<=60, s.slug+" title is concise");
    assert.ok(s.description.length>=120 && s.description.length<=160,s.slug+" meaningful description");
    assert.ok(s.approach.length>=3,s.slug+" implementation steps");
    assert.ok(s.relatedProjects.length>=1,s.slug+" project evidence");
    for (const project of s.relatedProjects) assert.ok(known.has(project.slug),s.slug+" invalid project "+project.slug);
  }
  for (const note of engineeringNotes) {
    assert.ok(note.title.length+(" | Saaim Abdullah").length<=60,note.slug+" title is concise");
    assert.ok(note.description.length>=120 && note.description.length<=160,note.slug+" meaningful description");
    assert.ok(note.sections.length>=5,note.slug+" detailed technical sections");
    assert.ok(specialties.some(s=>s.slug===note.relatedSpecialty),note.slug+" internal specialty link");
    for (const project of note.proof) assert.ok(known.has(project.slug),note.slug+" invalid project "+project.slug);
  }
});

test("preview and mirror indexing settings cannot be overridden by a production flag", async () => {
  const { isSearchIndexable } = await import("../src/resources/indexing.ts");
  const previous = { environment: process.env.VERCEL_ENV, indexing: process.env.NEXT_PUBLIC_SEARCH_INDEXING };
  try {
    for (const [environment, indexing, expected] of [
      [undefined, undefined, true], ["production", undefined, true],
      ["preview", "true", false], ["development", "true", false],
      ["production", "false", false], [undefined, "false", false],
    ]) {
      if (environment === undefined) delete process.env.VERCEL_ENV; else process.env.VERCEL_ENV = environment;
      if (indexing === undefined) delete process.env.NEXT_PUBLIC_SEARCH_INDEXING; else process.env.NEXT_PUBLIC_SEARCH_INDEXING = indexing;
      assert.equal(isSearchIndexable(), expected, `${environment}/${indexing}`);
    }
  } finally {
    if (previous.environment === undefined) delete process.env.VERCEL_ENV; else process.env.VERCEL_ENV = previous.environment;
    if (previous.indexing === undefined) delete process.env.NEXT_PUBLIC_SEARCH_INDEXING; else process.env.NEXT_PUBLIC_SEARCH_INDEXING = previous.indexing;
  }
});

test("optimized covers preserve dimensions and reduce static download weight", async () => {
  const { default: sharp } = await import("sharp");
  for (const { data, slug } of projects.filter(project => project.data.thumbnail.endsWith(".png"))) {
    const original = "public" + data.thumbnail;
    const optimized = original.replace(/\.png$/, ".webp");
    const before = await sharp(original).metadata();
    const after = await sharp(optimized).metadata();
    assert.equal(after.width, before.width, slug);
    assert.equal(after.height, before.height, slug);
    assert.equal(after.format, "webp", slug);
    assert.ok(fs.statSync(optimized).size < fs.statSync(original).size * .3, slug + " saves at least 70% per cover");
  }
});
