// Visual + layout audit harness.
//
// Screenshots every route at every breakpoint and reports any
// element that overflows the viewport horizontally. Two rounds of layout bugs
// reached the user because static reading of CSS cannot catch them; this can.
//
//   node scripts/audit.mjs [baseURL] [outDir]

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.argv[2] ?? "http://localhost:4400";
const OUT = process.argv[3] ?? "./.audit";

const VIEWPORTS = [
  { name: "mobile-360", width: 360, height: 780 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "ultrawide-2560", width: 2560, height: 1200 },
];

const ROUTES = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "work", path: "/work" },
  { name: "case", path: "/work/fitter-health-platform" },
  { name: "404", path: "/does-not-exist" },
];

// Runs in the page: finds anything wider than the viewport or sticking out.
const findOverflow = () => {
  const docW = document.documentElement.clientWidth;
  const bad = [];
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const style = getComputedStyle(el);
    if (style.position === "fixed") continue;
    // Parked off-screen on purpose (skip links, visually-hidden helpers).
    if (r.right < 0 || r.left > docW) continue;
    // Clipped by an ancestor, so it cannot create page-level scroll. Covers
    // deliberately oversized decorative layers inside overflow:hidden parents.
    let clipped = false;
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const ov = getComputedStyle(p);
      if (/hidden|clip|auto|scroll/.test(ov.overflowX) || ov.contain.includes("strict")) {
        clipped = true;
        break;
      }
    }
    if (clipped) continue;
    const overRight = Math.round(r.right - docW);
    const overLeft = Math.round(-r.left);
    if (overRight > 1 || overLeft > 1) {
      bad.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className?.baseVal ?? el.className ?? "").toString().slice(0, 60),
        overRight,
        overLeft,
        width: Math.round(r.width),
      });
    }
  }
  return {
    scrollW: document.documentElement.scrollWidth,
    clientW: docW,
    horizontalScroll: document.documentElement.scrollWidth > docW + 1,
    offenders: bad.slice(0, 12),
  };
};

const run = async () => {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  let problems = 0;

    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
      });
      const page = await ctx.newPage();
      const errors = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(String(e)));

      for (const route of ROUTES) {
        await page.goto(BASE + route.path, { waitUntil: "networkidle" });
        // Let scroll-reveals settle so screenshots aren't half-faded.
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(700);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(400);

        const res = await page.evaluate(findOverflow);
        const tag = `${vp.name}/${route.name}`;
        if (res.horizontalScroll || res.offenders.length) {
          problems++;
          console.log(`\nOVERFLOW  ${tag}`);
          console.log(`  scrollW=${res.scrollW} clientW=${res.clientW}`);
          for (const o of res.offenders) {
            console.log(
              `  <${o.tag} class="${o.cls}"> w=${o.width} overRight=${o.overRight} overLeft=${o.overLeft}`,
            );
          }
        }
        if (errors.length) {
          console.log(`\nCONSOLE   ${tag}\n  ${errors.slice(0, 3).join("\n  ")}`);
          errors.length = 0;
        }

        await page.screenshot({
          path: `${OUT}/${vp.name}-${route.name}.png`,
          fullPage: route.name === "home",
        });
      }
      await ctx.close();
    }

  await browser.close();
  console.log(problems === 0 ? "\nNo overflow detected at any breakpoint." : `\n${problems} overflow case(s).`);
};

run();
