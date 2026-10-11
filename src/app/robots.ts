import type { MetadataRoute } from "next";

import { baseURL } from "@/resources/once-ui.config";
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Keep Vercel preview and development deployments out of search indexes.
  if (process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development" || process.env.NEXT_PUBLIC_SEARCH_INDEXING === "false") {
    // Crawlers must be able to read the explicit noindex metadata on previews.
    return { rules: [{ userAgent: "*", allow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
    host: baseURL,
  };
}
