import type { MetadataRoute } from "next";

import { baseURL } from "@/resources/once-ui.config";
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Keep Vercel preview and development deployments out of search indexes.
  if (process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
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
