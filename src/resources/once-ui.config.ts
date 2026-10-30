import { normalizeSiteUrl } from "@/utils/siteUrl";

const baseURL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || "https://saaim.site");

const routes = {
  "/": true,
  "/professional-experience": true,
  "/projects": true,
  "/services": true,
  "/expertise": true,
  "/engineering-notes": true,
  "/journal": true,
  "/contact": true,
  "/sitemap": true,
};
const style = {
  neutral: "slate",
  brand: "indigo",
  accent: "indigo",
  solid: "contrast",
  solidStyle: "flat",
  border: "conservative",
  surface: "translucent",
  transition: "micro",
  scaling: "100",
} as const;

export { routes, baseURL, style };
