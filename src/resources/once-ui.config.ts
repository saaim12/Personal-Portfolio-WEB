import {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  RoutesConfig,
  StyleConfig,
} from "@/types";

// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL: string = "https://saaim.site";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: false, // dark-only site — no light theme
};

// Import and set font for each variant
import { Space_Grotesk, Inter, Space_Mono } from "next/font/google";

// Display / headings
const heading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

// Body copy
const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// UI labels
const label = Inter({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

// Mono — small labels, section markers, tech tags, code.
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
  theme: "dark", // dark-only site
  neutral: "gray", // near-black #0A0A0A dark / off-white #F9F9F9 light — matches the requested bg/surface/text/muted/border
  brand: "cyan", // cyan accent — links, active nav, highlights (both themes)
  accent: "cyan", // cyan accent — links, active nav, highlights (both themes)
  solid: "contrast", // color | contrast
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative | sharp
  surface: "translucent", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const dataStyle: DataStyleConfig = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

const effects: EffectsConfig = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "accent-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: true,
    opacity: 40,
    size: "2",
    color: "brand-background-strong",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

export { display, routes, baseURL, fonts, style, effects, dataStyle };
