import type { MetadataRoute } from "next";

import { getProjects } from "@/utils/projects";
import { specialties } from "@/resources/specialties";
import { engineeringNotes } from "@/resources/engineering-notes";
import { baseURL, routes as routesConfig } from "@/resources/once-ui.config";
import { SITE_LAST_MODIFIED } from "@/resources/seo";
export const dynamic = "force-static";

type RouteMeta = {
  lastModified: string;
  changeFrequency: "monthly" | "yearly";
  priority: number;
};
export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development" || process.env.NEXT_PUBLIC_SEARCH_INDEXING === "false") return [];
  const posts = getProjects();

  const works = posts.map((post) => ({
    url: `${baseURL}/projects/${post.slug}`,
    lastModified: post.metadata.updatedAt,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const newestPost =
    posts
      .map((p) => p.metadata.updatedAt)
      .sort()
      .at(-1) ?? SITE_LAST_MODIFIED;
  const meta: Record<string, RouteMeta> = {
    "/": { lastModified: "2026-10-21", changeFrequency: "monthly", priority: 1 },
    "/services": { lastModified: "2026-10-21", changeFrequency: "monthly", priority: 0.85 },
    "/journal": { lastModified: "2026-10-21", changeFrequency: "monthly", priority: 0.7 },
    "/projects": { lastModified: newestPost, changeFrequency: "monthly", priority: 0.9 },
    "/expertise": { lastModified: "2026-10-21", changeFrequency: "monthly", priority: 0.9 },
    "/engineering-notes": { lastModified: "2026-10-21", changeFrequency: "monthly", priority: 0.85 },
    "/professional-experience": { lastModified: SITE_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
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

  const expertisePages=specialties.map(item=>({
    url:`${baseURL}/expertise/${item.slug}`,
    lastModified:"2026-10-21",
    changeFrequency:"monthly" as const,
    priority:0.8,
  }));
  const notes=engineeringNotes.map(item=>({
    url:`${baseURL}/engineering-notes/${item.slug}`,
    lastModified:"2026-10-21",
    changeFrequency:"monthly" as const,
    priority:0.75,
  }));
  return [...pages, ...works, ...expertisePages, ...notes];
}
