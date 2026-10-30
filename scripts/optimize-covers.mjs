import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Preserve the original PNG URLs for social previews and external links.
const directory = "public/images/projects/covers";
const report = [];
for (const file of (await fs.readdir(directory)).filter(file => file.endsWith(".png"))) {
  const source = path.join(directory, file);
  const target = source.replace(/\.png$/, ".webp");
  await sharp(source).webp({ quality: 88, effort: 6, smartSubsample: true }).toFile(target);
  const original = await fs.stat(source);
  const optimized = await fs.stat(target);
  report.push({ file, original: original.size, optimized: optimized.size });
}
const original = report.reduce((sum, item) => sum + item.original, 0);
const optimized = report.reduce((sum, item) => sum + item.optimized, 0);
await fs.mkdir(".audit", { recursive: true });
await fs.writeFile(".audit/cover-optimization.json", JSON.stringify({ report, original, optimized }, null, 2));
console.log(`${report.length} covers: ${original.toLocaleString()} → ${optimized.toLocaleString()} bytes (${(100 * (1 - optimized / original)).toFixed(1)}% smaller).`);
