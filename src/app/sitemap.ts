import type { MetadataRoute } from "next";
import { getSiteCatalog } from "@/utils/siteCatalog";
import { isSearchIndexable } from "@/resources/indexing";

export const dynamic = "force-static";

/** Only canonical HTML pages belong here; helper files and aliases do not. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isSearchIndexable()) return [];
  return getSiteCatalog().map(page => ({
    url: page.url,
    lastModified: page.lastModified,
    ...(page.images.length ? { images: page.images } : {}),
  }));
}
