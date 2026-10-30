import type { MetadataRoute } from "next";
import { baseURL } from "@/resources/once-ui.config";
import { isSearchIndexable } from "@/resources/indexing";
import { absoluteSiteUrl } from "@/utils/siteUrl";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // Search and answer crawlers inherit this rule. CSS, scripts and images stay crawlable.
    // Previews must remain crawlable so their explicit noindex metadata can be read.
    rules: [{ userAgent: "*", allow: "/" }],
    ...(isSearchIndexable() ? { sitemap: absoluteSiteUrl(baseURL, "/sitemap.xml") } : {}),
  };
}
