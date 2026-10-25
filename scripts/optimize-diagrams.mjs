import fs from "node:fs/promises";
import sharp from "sharp";

const directory = "public/images/projects/diagrams";
let saved = 0;
for (const file of (await fs.readdir(directory)).filter(file => file.endsWith(".png"))) {
  const path = `${directory}/${file}`;
  const original = await fs.readFile(path);
  // Preserve resolution and PNG URLs; palette encoding suits these flat diagrams.
  const optimized = await sharp(original).png({ palette: true, colours: 256, dither: 0.5, compressionLevel: 9, effort: 10 }).toBuffer();
  if (optimized.length >= original.length) continue;
  await fs.mkdir("tmp/original-diagrams", { recursive: true });
  await fs.writeFile(`tmp/original-diagrams/${file}`, original, { flag: "wx" }).catch(error => {
    if (error.code !== "EEXIST") throw error;
  });
  await fs.writeFile(path, optimized);
  saved += original.length - optimized.length;
  console.log(`${file}: ${original.length} -> ${optimized.length} bytes`);
}
console.log(`Saved ${saved.toLocaleString()} bytes`);
