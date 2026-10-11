import localFont from "next/font/local";
const heading = localFont({ src: "../../public/fonts/flux.woff2", variable: "--font-heading", weight: "1000", display: "swap" });
const body = localFont({ src: [
  { path: "../../public/fonts/inter-display.woff2", weight: "400 600", style: "normal" },
  { path: "../../public/fonts/inter-display-bold.woff2", weight: "700 900", style: "normal" },
], variable: "--font-body", display: "swap" });
const code = localFont({ src: "../../public/fonts/dm-mono.woff2", variable: "--font-code", weight: "400 700", display: "swap" });
export const handwriting = localFont({ src: "../../public/fonts/handwriting.woff2", variable: "--font-hand", weight: "400", display: "swap" });
export const fonts = { heading, body, code };
