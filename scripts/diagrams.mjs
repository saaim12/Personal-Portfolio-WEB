// Architecture diagrams, drawn from each case study and rendered to PNG.
//
//   node scripts/diagrams.mjs
//
// The diagrams are the card thumbnails and are meant to be read at about
// 380px wide, so each one is at most six nodes with labels sized to survive
// that reduction. They are generated rather than drawn by hand so that when a
// case study changes, the picture of it is one edit away and reproducible.
//
// Fitter Health is deliberately absent: its deployment diagram is covered by
// the NDA and was removed from this repository on purpose. Its thumbnail is a
// screenshot of the live product, which is public.
//
// Palette and type are the site's own: pure black ground, glass panels with a
// 10%-white hairline, Space Grotesk for titles and Manrope for labels.

import { chromium } from "playwright";

const W = 1200;
const H = 675;
const OUT = "public/images/projects";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** A glass panel with a title and up to two muted sub-lines. */
const box = (x, y, w, h, title, subs = [], accent = false) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18"
        fill="${accent ? "rgba(255,255,255,0.07)" : "rgba(20,20,24,0.72)"}"
        stroke="${accent ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.18)"}"
        stroke-width="1.5"/>
  <text x="${x + w / 2}" y="${y + (subs.length ? 44 : h / 2 + 9)}" class="t">${esc(title)}</text>
  ${subs
    .map(
      (s, i) =>
        `<text x="${x + w / 2}" y="${y + 76 + i * 26}" class="s">${esc(s)}</text>`,
    )
    .join("")}
`;

/**
 * Straight connector with an arrowhead. A label on a horizontal run sits above
 * the line; on a vertical run it sits beside it, because "above" there means
 * on top of the box the arrow just left.
 */
const arrow = (x1, y1, x2, y2, label) => {
  const vertical = x1 === x2;
  const lx = vertical ? x1 + 14 : (x1 + x2) / 2;
  const ly = vertical ? (y1 + y2) / 2 + 5 : (y1 + y2) / 2 - 12;
  return `
  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="a" marker-end="url(#h)"/>
  ${label ? `<text x="${lx}" y="${ly}" class="${vertical ? "lv" : "l"}">${esc(label)}</text>` : ""}
`;
};

const frame = (eyebrow, body, footnote) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <marker id="h" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="rgba(255,255,255,0.5)"/>
    </marker>
    <radialGradient id="glow" cx="50%" cy="0%" r="85%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.07"/>
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#000000"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <text x="60" y="70" class="e">${esc(eyebrow)}</text>
  ${body}
  <text x="60" y="${H - 44}" class="f">${esc(footnote)}</text>
</svg>`;

// Three columns across 1200 with 60px gutters.
const C = [60, 450, 840];
const CW = 300;
const BH = 118;

const DIAGRAMS = {
  "multilingual-rag-engine": frame(
    "MULTILINGUAL, MULTI-TENANT RAG",
    `
    ${box(C[0], 150, CW, BH, "Client request", ["query + signed JWT"])}
    ${box(C[1], 150, CW, BH, "Django + DRF", ["tenant claim read from the", "token, never from the request"], true)}
    ${box(C[2], 150, CW, BH, "multilingual-e5-base", ["local embeddings", "768d · 18 languages"])}
    ${arrow(C[0] + CW, 209, C[1] - 14, 209)}
    ${arrow(C[1] + CW, 209, C[2] - 14, 209)}
    ${arrow(C[2] + CW / 2, 150 + BH, C[2] + CW / 2, 386)}
    ${box(C[2], 400, CW, BH, "PostgreSQL + pgvector", ["cosine search, filtered", "by the tenant claim"], true)}
    ${box(C[1], 400, CW, BH, "Gemini 2.5 Flash", ["answer constrained to", "the retrieved chunks"])}
    ${box(C[0], 400, CW, BH, "Grounded answer", ["precision@5 86% · p50 410 ms"])}
    ${arrow(C[2] - 14, 459, C[1] + CW, 459)}
    ${arrow(C[1] - 14, 459, C[0] + CW, 459)}
  `,
    "Cross-tenant retrieval is a security incident, not a bad answer, so the boundary is the verified token and not anything a client sends.",
  ),

  "movie-recommender-system": frame(
    "HYBRID RECOMMENDER, BUILT AS A SERVICE",
    `
    ${box(C[0], 150, CW, BH, "MovieLens sources", ["ratings · tags · links · metadata"])}
    ${box(C[1], 150, CW, BH, "build_catalog + train", ["content similarity, item", "co-occurrence, popularity prior"])}
    ${box(C[2], 150, CW, BH, "Airflow DAG", ["scheduled retraining"])}
    ${arrow(C[0] + CW, 209, C[1] - 14, 209)}
    ${arrow(C[2] - 14, 209, C[1] + CW, 209)}
    ${box(C[1], 314, CW, 76, "Versioned model artifact", [], true)}
    ${arrow(C[1] + CW / 2, 150 + BH, C[1] + CW / 2, 300)}
    ${arrow(C[1] + CW / 2, 390, C[1] + CW / 2, 436, "hot reload, no deploy")}
    ${box(C[0], 450, CW, BH, "Redis / in-memory", ["configurable TTL"])}
    ${box(C[1], 450, CW, BH, "FastAPI serving", ["API-key auth · 4 routes"])}
    ${box(C[2], 450, CW, BH, "Recommendations", ["p95 11 ms cached, 74 ms cold"])}
    ${arrow(C[1] - 14, 509, C[0] + CW, 509)}
    ${arrow(C[1] + CW, 509, C[2] - 14, 509)}
  `,
    "Training and serving are separated by the artifact, so a training failure cannot take serving down and a new model needs no deploy.",
  ),

  // This case study already ships two diagrams inside the article. Both are
  // white-on-white exports, which is fine at full size behind a figure frame
  // and wrong as a card thumbnail: a bright rectangle in a row of dark ones
  // reads as a broken image. This is the card's version, same pipeline.
  "realtime-ecommerce-etl-pipeline": frame(
    "REAL-TIME E-COMMERCE ETL PIPELINE",
    `
    ${box(C[0], 150, CW, BH, "Kafka topic", ["orders · KRaft mode,", "no ZooKeeper to operate"])}
    ${box(C[1], 150, CW, BH, "Structured Streaming", ["PySpark · 2,800 events/sec"])}
    ${box(C[2], 150, CW, BH, "Bronze", ["raw Parquet, immutable,", "on object storage"])}
    ${arrow(C[0] + CW, 209, C[1] - 14, 209)}
    ${arrow(C[1] + CW, 209, C[2] - 14, 209)}
    ${arrow(C[2] + CW / 2, 150 + BH, C[2] + CW / 2, 386)}
    ${box(C[2], 400, CW, BH, "Silver", ["validated, deduplicated"])}
    ${box(C[1], 400, CW, BH, "Gold", ["4-table star schema", "in PostgreSQL"], true)}
    ${box(C[0], 400, CW, BH, "Any BI tool", ["no join guide required"])}
    ${arrow(C[2] - 14, 459, C[1] + CW, 459)}
    ${arrow(C[1] - 14, 459, C[0] + CW, 459)}
  `,
    "Airflow owns only the hourly bronze → silver → gold chain. The streaming job runs as a service, because a scheduler built around tasks that finish cannot own one that never does.",
  ),

  "autoencoder-edge-compression": frame(
    "AUTOENCODER COMPRESSION FOR EDGE DEVICES",
    `
    <text x="${C[0]}" y="130" class="e2">ON THE DEVICE — ESP32 CLASS</text>
    <text x="${C[2]}" y="130" class="e2">SERVER SIDE — AWS</text>
    <line x1="${C[1] + CW + 45}" y1="100" x2="${C[1] + CW + 45}" y2="${H - 110}" class="d"/>
    ${box(C[0], 160, CW, BH, "Sensor window", ["128 raw values"])}
    ${box(C[1], 160, CW, BH, "Encoder half", ["TensorFlow Lite Micro", "int8 quantised · 86 KB flash"], true)}
    ${arrow(C[0] + CW, 219, C[1] - 14, 219)}
    ${arrow(C[1] + CW / 2, 160 + BH, C[1] + CW / 2, 356)}
    ${box(C[1], 370, CW, BH, "Latent vector", ["16 floats · 7.8:1 over the radio"])}
    ${arrow(C[1] + CW, 429, C[2] - 14, 429)}
    ${box(C[2], 370, CW, BH, "Flask decoder on EC2", ["S3 holds encoded payloads"])}
    ${box(C[2], 160, CW, BH, "Reconstructed signal", ["0.0038 MSE at that ratio"])}
    ${arrow(C[2] + CW / 2, 370, C[2] + CW / 2, 292)}
  `,
    "Bandwidth is the binding constraint, not compute, so the constrained side only ever runs the cheap half of the model.",
  ),
};

const html = (svg) => `<!doctype html><html><head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;background:#000}
  svg{display:block}
  .t{font-family:"Space Grotesk",sans-serif;font-size:25px;font-weight:700;fill:#fff;text-anchor:middle}
  .s{font-family:Manrope,sans-serif;font-size:17px;fill:#a6a6ae;text-anchor:middle}
  .e{font-family:Manrope,sans-serif;font-size:16px;font-weight:700;letter-spacing:.18em;fill:#c2c2c8}
  .e2{font-family:Manrope,sans-serif;font-size:14px;font-weight:700;letter-spacing:.16em;fill:#8a8a92}
  .f{font-family:Manrope,sans-serif;font-size:17px;fill:#8a8a92}
  .l{font-family:Manrope,sans-serif;font-size:14px;fill:#a6a6ae;text-anchor:middle}
  .lv{font-family:Manrope,sans-serif;font-size:14px;fill:#a6a6ae;text-anchor:start}
  .a{stroke:rgba(255,255,255,.42);stroke-width:1.75}
  .d{stroke:rgba(255,255,255,.22);stroke-width:1.5;stroke-dasharray:7 8}
</style></head><body>${svg}</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });

for (const [slug, svg] of Object.entries(DIAGRAMS)) {
  await page.setContent(html(svg), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${OUT}/${slug}-architecture.png` });
  console.log(`wrote ${OUT}/${slug}-architecture.png`);
}

await browser.close();
