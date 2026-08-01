import type { MetadataRoute } from "next";

import { baseURL } from "@/resources";

export default function robots(): MetadataRoute.Robots {
  // Preview deploys and the old *.vercel.app host must not be indexed as
  // duplicates of saaim.site.
  if (process.env.VERCEL_ENV !== "production") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /api is the OG image renderer, /_next is the build output. Both are
        // referenced from tags crawlers fetch regardless of robots; this only
        // keeps them from being indexed as pages of their own.
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
    host: baseURL,
  };
}
