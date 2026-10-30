/** Keep metadata, robots and sitemap decisions identical across deployments. */
export function isSearchIndexable() {
  return process.env.VERCEL_ENV !== "preview"
    && process.env.VERCEL_ENV !== "development"
    && process.env.NEXT_PUBLIC_SEARCH_INDEXING !== "false";
}
