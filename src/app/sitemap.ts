import type { MetadataRoute } from "next";

import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig, SITE_LAST_MODIFIED } from "@/resources";

type RouteMeta = {
  lastModified: string;
  changeFrequency: "monthly" | "yearly";
  priority: number;
};

// Enumerates every route that actually exists: the three static pages plus one
// entry per case study under /work.
//
// Two things this has to get exactly right, or it works against the site:
//
//   - URLs must match each page's `alternates.canonical` character for
//     character. No trailing slash anywhere, root included: Next normalises
//     canonicals against `trailingSlash: false`, so the root renders as a bare
//     "https://saaim.site" whatever pageMeta passes it, and this has to match.
//     A mismatch has Search Console report the sitemap URL as "alternate page
//     with proper canonical tag" and drop it.
//   - lastModified must be a real content date. `new Date()`, which this used
//     for the static routes, moves on every deploy and teaches crawlers the
//     field is noise. Case studies carry `updatedAt` in their frontmatter,
//     /work inherits the newest of them, and the two hand-written pages use
//     SITE_LAST_MODIFIED.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts(["src", "app", "work", "projects"]);

  const works = posts.map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.updatedAt,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const newestPost =
    posts
      .map((p) => p.metadata.updatedAt)
      .sort()
      .at(-1) ?? SITE_LAST_MODIFIED;

  // Priority is only a relative hint within one site, so it is spent on the
  // site's actual shape: landing page, then the section index, then the
  // individual case studies.
  const meta: Record<string, RouteMeta> = {
    "/": { lastModified: SITE_LAST_MODIFIED, changeFrequency: "monthly", priority: 1 },
    "/work": { lastModified: newestPost, changeFrequency: "monthly", priority: 0.9 },
    "/about": { lastModified: SITE_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
  };

  const pages = Object.keys(routesConfig)
    .filter((route) => routesConfig[route as keyof typeof routesConfig])
    .map((route) => ({
      url: `${baseURL}${route === "/" ? "" : route}`,
      ...(meta[route] ?? {
        lastModified: SITE_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      }),
    }));

  return [...pages, ...works];
}
