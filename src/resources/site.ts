// Canonical site origin and enabled top-level routes.
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

export { routes, baseURL };
