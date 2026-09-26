import type { RoutesConfig, StyleConfig } from "@/types/config.types";

// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL: string = "https://saaim.site";

const routes: RoutesConfig = {
  "/": true,
  "/experience": true,
  "/work": true,
};

// default customization applied to the HTML in the main layout.tsx
const style: StyleConfig = {
  theme: "light",
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

export { routes, baseURL, style };
