import { FontsConfig, RoutesConfig, StyleConfig } from "@/types";

// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL: string = "https://saaim.site";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
};

// Import and set font for each variant
import { Space_Grotesk, Manrope, Space_Mono } from "next/font/google";

// Display / headings, Space Grotesk, the three weights the layout renders.
const heading = Space_Grotesk({
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Body copy
const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// UI labels, same family, separate CSS variable (Once UI tokens read
// --font-label). Next dedupes the underlying font files.
const label = Manrope({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

// Mono, small labels, section markers, tech tags, code.
// Space Mono is not a variable font, so weights must be explicit.
const code = Space_Mono({
  variable: "--font-code",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const fonts: FontsConfig = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// default customization applied to the HTML in the main layout.tsx
const style: StyleConfig = {
  theme: "dark",
  neutral: "slate",
  // Once UI's `Schemes` type has no neutral option, so brand/accent have to
  // name a hue here. The design is monochrome, and custom.css repoints both
  // --function-brand-* and --function-accent-* at the gray ramp, which is
  // what actually renders. These two values are inert.
  brand: "indigo",
  accent: "indigo",
  solid: "contrast",
  solidStyle: "flat",
  // "conservative" over "playful": tighter radii read as engineering tooling
  // rather than as a consumer landing page.
  border: "conservative",
  surface: "translucent",
  transition: "micro",
  scaling: "100",
};

export { routes, baseURL, fonts, style };
