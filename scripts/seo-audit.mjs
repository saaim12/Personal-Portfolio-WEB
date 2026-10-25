// SEO audit. Reads /sitemap.xml from a running server, fetches every URL it
// lists, and reports status, title, description length, canonical, OG/Twitter
// tags, the OG image's own status, and the JSON-LD types present.
//
// Usage:  node scripts/seo-audit.mjs [origin]
//   origin defaults to http://localhost:3000
//
// The sitemap lists production URLs, so each path is re-pointed at `origin`
// before fetching. Exits non-zero if anything fails a check, which makes it
// usable as a CI step.

import fs from "node:fs";

const origin = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

const CANONICAL_HOST = "https://saaim.site";
const TITLE_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 160;

const pick = (html, re) => html.match(re)?.[1]?.trim() ?? null;
const meta = (html, prop) =>
  pick(html, new RegExp(`<meta[^>]+(?:property|name)="${prop}"[^>]+content="([^"]*)"`, "i")) ??
  pick(html, new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:property|name)="${prop}"`, "i"));

const decode = (s) =>
  s?.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">") ?? s;

const problems = [];
const fail = (route, msg) => problems.push(`${route}: ${msg}`);

const sitemapRes = await fetch(`${origin}/sitemap.xml`);
if (!sitemapRes.ok) {
  console.error(`sitemap.xml returned ${sitemapRes.status}`);
  process.exit(1);
}
const sitemap = await sitemapRes.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const seenTitles = new Map();
const seenDescs = new Map();
const rows = [];
const incomingPages = new Map();

for (const url of urls) {
  if (!url.startsWith(CANONICAL_HOST)) fail(url, `not on ${CANONICAL_HOST}`);
  const path = url.slice(CANONICAL_HOST.length) || "/";

  const res = await fetch(origin + path);
  const html = res.ok ? await res.text() : "";
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)) {
    if (/\brel="[^"]*\bnofollow\b/.test(match[0])) continue;
    const target = new URL(decode(match[1]), url);
    if (target.origin !== CANONICAL_HOST || target.pathname === new URL(url).pathname) continue;
    const sources = incomingPages.get(target.pathname) || new Set();
    sources.add(path);
    incomingPages.set(target.pathname, sources);
  }
  if (html.includes("upwork.com/freelancers/saaim")) fail(path, "private Upwork URL exposed");
  if (html.includes("https://wa.me/")) fail(path, "WhatsApp redirect shortcut exposed");
  if (!res.ok) fail(path, `HTTP ${res.status}`);

  const title = decode(pick(html, /<title[^>]*>([^<]*)<\/title>/i));
  const description = decode(meta(html, "description"));
  const canonical = pick(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i);
  const ogImage = decode(meta(html, "og:image"));

  // Verify that local social previews and project covers can be fetched.
  let ogStatus = "—";
  if (ogImage) {
    const imgUrl = ogImage.startsWith("http") ? ogImage.replace(CANONICAL_HOST, origin) : origin + ogImage;
    try {
      const r = await fetch(imgUrl);
      ogStatus = String(r.status);
      if (!r.ok) fail(path, `og:image ${r.status} (${ogImage})`);
    } catch (e) {
      ogStatus = "ERR";
      fail(path, `og:image unreachable: ${e.message}`);
    }
  } else {
    fail(path, "no og:image");
  }

  const ldTypes = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)]
    .flatMap((m) => {
      try {
        const d = JSON.parse(m[1]);
        if (d["@type"] === "ProfilePage" && (!d.mainEntity?.name || d.mainEntity?.["@type"] !== "Person"))
          fail(path, "ProfilePage requires an explicit Person with a name");
        if (d["@type"] === "Article" && (!d.headline || !d.author?.name || (path.startsWith("/projects/") && (!d.image || !d.datePublished))))
          fail(path, "incomplete Article markup");
        return Array.isArray(d) ? d.map((x) => x["@type"]) : [d["@type"]];
      } catch {
        fail(path, "invalid JSON-LD");
        return ["INVALID"];
      }
    });

  const expectedTypes = path === "/" ? ["WebSite", "Person", "WebPage"]
    : path === "/professional-experience" ? ["WebSite", "Person", "ProfilePage", "BreadcrumbList"]
    : path === "/journal" ? ["WebSite", "CollectionPage", "BreadcrumbList"]
    : path.startsWith("/projects/") ? ["WebSite", "BreadcrumbList", "Article"]
    : ["WebSite", "WebPage", "BreadcrumbList"];
  for (const type of expectedTypes) if (!ldTypes.includes(type)) fail(path, `missing ${type} schema`);
  if (path.startsWith("/projects/") && !ldTypes.some(type => type === "CreativeWork" || type === "SoftwareSourceCode")) fail(path, "missing project schema");
  if (meta(html, "robots")?.includes("noindex")) fail(path, "production page is noindex");
  if (meta(html, "author") !== "Saaim Abdullah") fail(path, "missing author metadata");

  // Assertions
  if (!title) fail(path, "no <title>");
  else if (title.length > TITLE_MAX) fail(path, `title ${title.length} chars (> ${TITLE_MAX})`);
  if (!description) fail(path, "no description");
  else if (description.length < DESC_MIN || description.length > DESC_MAX)
    fail(path, `description ${description.length} chars (want ${DESC_MIN}-${DESC_MAX})`);
  if (canonical !== url) fail(path, `canonical "${canonical}" != sitemap "${url}"`);
  if (meta(html, "twitter:card") !== "summary_large_image") fail(path, "twitter:card not summary_large_image");
  if (!meta(html, "og:site_name")) fail(path, "no og:site_name");
  if (!meta(html, "og:url")) fail(path, "no og:url");
  if (!meta(html, "og:type")) fail(path, "no og:type");

  if (title && seenTitles.has(title)) fail(path, `duplicate title with ${seenTitles.get(title)}`);
  else if (title) seenTitles.set(title, path);
  if (description && seenDescs.has(description)) fail(path, `duplicate description with ${seenDescs.get(description)}`);
  else if (description) seenDescs.set(description, path);

  rows.push({
    route: path,
    status: res.status,
    title: title ?? "—",
    titleLen: title?.length ?? 0,
    descLen: description?.length ?? 0,
    canonical: canonical ?? "—",
    og: ogStatus,
    description,
    ogImage,
    jsonLd: ldTypes.join(", ") || "—",
  });
}

for (const slug of ["algorithms-in-python", "esp32-temperature-inference"]) {
  const target = `/projects/${slug}`;
  if ((incomingPages.get(target)?.size || 0) < 2) fail(target, "needs links from at least two distinct pages");
}
for (const file of fs.readdirSync("public/images/projects/diagrams")) {
  if (fs.statSync(`public/images/projects/diagrams/${file}`).size > 1_000_000)
    fail(file, "diagram exceeds 1 MB");
}

const w = (s, n) => String(s).padEnd(n).slice(0, n);
console.log(
  [
    w("ROUTE", 40),
    w("HTTP", 5),
    w("TITLE", 44),
    w("T", 4),
    w("D", 4),
    w("CANONICAL", 46),
    w("OG", 4),
    "JSON-LD",
  ].join(" "),
);
console.log("-".repeat(210));
for (const r of rows) {
  console.log(
    [
      w(r.route, 40),
      w(r.status, 5),
      w(r.title, 44),
      w(r.titleLen, 4),
      w(r.descLen, 4),
      w(r.canonical, 46),
      w(r.og, 4),
      r.jsonLd,
    ].join(" "),
  );
}

console.log(`\n${urls.length} URLs checked.`);
fs.mkdirSync(".audit", { recursive: true });
fs.writeFileSync(".audit/seo.json", JSON.stringify({ rows, problems }, null, 2));
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log(`  ✗ ${p}`);
  process.exit(1);
}
console.log("No problems found.");
