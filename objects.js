// ─────────────────────────────────────────────────────────────
// Floating-object configuration — ONE place to tune colour / count /
// position / size / depth per section.
//   shape: "sphere" | "cube" | "pill" | "ring"
//   color: "steel" | "blue" | "pink" | "teal" | "pearl"
//   x, y : position in % from the field's top-left
//   size : px (pill uses it as a base, then scales)
//   depth: 0..1 — higher = moves more with scroll/pointer (closer)
//   dur, delay: ambient drift timing (s)
// Touch devices automatically render only the first 3 of each list, static.
// ─────────────────────────────────────────────────────────────

export const heroObjects = [
  { shape: "sphere", color: "blue",  x: 8,  y: 22, size: 150, depth: 0.85, dur: 8,  delay: 0 },
  { shape: "ring",   color: "pink",  x: 82, y: 16, size: 140, depth: 0.7,  dur: 11, delay: 0.6 },
  { shape: "cube",   color: "teal",  x: 74, y: 62, size: 96,  depth: 0.55, dur: 9,  delay: 1.2 },
  { shape: "sphere", color: "pearl", x: 16, y: 72, size: 78,  depth: 0.4,  dur: 10, delay: 0.3 },
  { shape: "pill",   color: "steel", x: 60, y: 30, size: 70,  depth: 0.3,  dur: 12, delay: 0.9 },
  { shape: "sphere", color: "pink",  x: 90, y: 80, size: 60,  depth: 0.5,  dur: 7,  delay: 1.5 },
];

export const aboutObjects = [
  { shape: "ring",   color: "teal",  x: 86, y: 12, size: 120, depth: 0.6, dur: 12, delay: 0.2 },
  { shape: "sphere", color: "steel", x: 78, y: 74, size: 84,  depth: 0.4, dur: 10, delay: 0.8 },
  { shape: "cube",   color: "blue",  x: 90, y: 44, size: 64,  depth: 0.3, dur: 11, delay: 1.4 },
];

export const contactObjects = [
  { shape: "sphere", color: "pearl", x: 12, y: 24, size: 110, depth: 0.5, dur: 11, delay: 0 },
  { shape: "ring",   color: "blue",  x: 84, y: 66, size: 128, depth: 0.4, dur: 13, delay: 0.7 },
  { shape: "pill",   color: "pink",  x: 70, y: 20, size: 68,  depth: 0.3, dur: 12, delay: 1.1 },
  { shape: "sphere", color: "teal",  x: 22, y: 78, size: 66,  depth: 0.45, dur: 10, delay: 0.4 },
];
