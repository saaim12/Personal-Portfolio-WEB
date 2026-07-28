import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap() {
  const works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  // Must match the per-page `alternates.canonical` character for character.
  // Next strips the root's trailing slash when rendering the canonical tag
  // (trailingSlash is false), so "/" maps to a bare baseURL here too.
  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...works];
}
