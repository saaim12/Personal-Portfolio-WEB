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

for (const url of urls) {
  if (!url.startsWith(CANONICAL_HOST)) fail(url, `not on ${CANONICAL_HOST}`);
  const path = url.slice(CANONICAL_HOST.length) || "/";

  const res = await fetch(origin + path);
  const html = res.ok ? await res.text() : "";
  if (!res.ok) fail(path, `HTTP ${res.status}`);

  const title = decode(pick(html, /<title[^>]*>([^<]*)<\/title>/i));
  const description = decode(meta(html, "description"));
  const canonical = pick(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i);
  const ogImage = decode(meta(html, "og:image"));

  // OG image reachability. The generated cards are a dynamic route, so this
  // is the only way to know the URL in the tag actually resolves.
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
        return Array.isArray(d) ? d.map((x) => x["@type"]) : [d["@type"]];
      } catch {
        fail(path, "invalid JSON-LD");
        return ["INVALID"];
      }
    });

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
    jsonLd: ldTypes.join(", ") || "—",
  });
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
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log(`  ✗ ${p}`);
  process.exit(1);
}
console.log("No problems found.");
