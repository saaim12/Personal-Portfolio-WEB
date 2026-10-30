import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const origin = process.argv[2] || "http://localhost:3000";
const browser = await chromium.launch();
const results = [];
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const session = await page.context().newCDPSession(page);
  await session.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await session.send("Network.enable");
  await session.send("Network.emulateNetworkConditions", {
    offline: false, latency: 150, downloadThroughput: 1_600_000 / 8, uploadThroughput: 750_000 / 8,
  });
  await page.addInitScript(() => {
    window.__performanceAudit = { lcp: null, cls: 0, longTasks: 0, blockingTime: 0 };
    new PerformanceObserver(list => {
      const entry = list.getEntries().at(-1);
      window.__performanceAudit.lcp = { time: entry.startTime, element: entry.element?.tagName, className: typeof entry.element?.className === "string" ? entry.element.className : "" };
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__performanceAudit.cls += entry.value;
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        window.__performanceAudit.longTasks++;
        window.__performanceAudit.blockingTime += Math.max(0, entry.duration - 50);
      }
    }).observe({ type: "longtask", buffered: true });
  });
  for (const route of ["/", "/expertise", "/engineering-notes/tenant-isolated-rag-with-pgvector", "/projects/fitter-health-platform"]) {
    await session.send("Network.clearBrowserCache");
    const response = await page.goto(origin + route, { waitUntil: "networkidle", timeout: 120000 });
    assert.equal(response.status(), 200, route);
    await page.evaluate(async () => { await document.fonts.ready; await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))); });
    const data = await page.evaluate(() => ({
      ...window.__performanceAudit,
      navigation: performance.getEntriesByType("navigation").map(entry => ({ ttfb: entry.responseStart, domReady: entry.domContentLoadedEventEnd, load: entry.loadEventEnd }))[0],
      imageBytes: performance.getEntriesByType("resource").filter(entry => entry.initiatorType === "img").reduce((sum, entry) => sum + entry.transferSize, 0),
    }));
    assert.ok(data.lcp?.time > 0, route + " records a largest contentful paint");
    results.push({ route, ...data });
    console.log(`${route}: LCP ${Math.round(data.lcp.time)} ms; CLS ${data.cls.toFixed(3)}; observed blocking ${Math.round(data.blockingTime)} ms`);
  }
  await mkdir(".audit", { recursive: true });
  await writeFile(".audit/performance.json", JSON.stringify({
    environment: "Local Chromium mobile lab, 390×844, 4× CPU slowdown, 150 ms latency, 1.6 Mbps download. Single runs; not Lighthouse, field Core Web Vitals, or an INP measurement.",
    results,
  }, null, 2));
} finally {
  await browser.close();
}
