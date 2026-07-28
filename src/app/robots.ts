import { baseURL } from "@/resources";

export default function robots() {
  // Preview deploys and *.vercel.app must not be indexed as duplicates of saaim.site.
  if (process.env.VERCEL_ENV !== "production") {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
