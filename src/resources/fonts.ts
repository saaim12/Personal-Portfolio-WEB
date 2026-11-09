import localFont from "next/font/local";
// Monochrome system: Switzer (Fontshare, ITF Free Font License) for type, Geist Mono (OFL) for labels.
// Headings reuse the body face; mono.css maps --font-heading and --font-hand to it.
const body = localFont({ src: [
  { path: "../../public/fonts/switzer-400.woff2", weight: "400", style: "normal" },
  { path: "../../public/fonts/switzer-500.woff2", weight: "500", style: "normal" },
], variable: "--font-body", display: "swap", fallback: ["Helvetica Neue", "Arial", "sans-serif"] });
const code = localFont({ src: "../../public/fonts/geist-mono.woff2", variable: "--font-code", weight: "100 900", display: "swap", fallback: ["ui-monospace", "monospace"] });
export const fonts = { body, code };
