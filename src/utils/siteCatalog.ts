import { cache } from "react";
import { baseURL, routes } from "@/resources/once-ui.config";
import { sitePages } from "@/resources/site-navigation";
import { home, work } from "@/resources/content";
import { EDITORIAL_UPDATED_AT } from "@/resources/editorial";
import { specialties } from "@/resources/specialties";
import { engineeringNotes } from "@/resources/engineering-notes";
import { getProjects } from "@/utils/projects";
import { absoluteSiteUrl } from "@/utils/siteUrl";

export type CatalogSection = "Portfolio" | "Project evidence" | "Engineering expertise" | "Engineering notes";
export type CatalogPage = {
  path: string;
  url: string;
  title: string;
  description: string;
  lastModified: string;
  section: CatalogSection;
  images: string[];
};

// Dates represent content revisions, never the time a build happens to run.
const mainPageDetails: Record<string, { description: string; lastModified: string }> = {
  "/": { description: home.description, lastModified: "2026-10-30" },
  "/professional-experience": { description: "Employment history at Expertflow and Fitter Health, education, delivery evidence, and the engineer's story.", lastModified: "2026-10-11" },
  "/projects": { description: work.description, lastModified: "2026-10-30" },
  "/services": { description: "Backend APIs, full-stack products, data and AI systems, cloud delivery, and engineering handover.", lastModified: "2026-10-30" },
  "/expertise": { description: "Engineering approaches, trade-offs, and project evidence across seven software specialties.", lastModified: EDITORIAL_UPDATED_AT },
  "/engineering-notes": { description: "Original architecture guides with direct answers, implementation checks, and primary technical references.", lastModified: EDITORIAL_UPDATED_AT },
  "/journal": { description: "Published engineering articles on Medium, with summaries and chapter lists.", lastModified: "2026-10-30" },
  "/contact": { description: "Discuss a remote engineering role, contract, product, or technical challenge with Saaim Abdullah.", lastModified: "2026-10-11" },
  "/sitemap": { description: "A complete, grouped directory of the public portfolio pages.", lastModified: "2026-10-30" },
};

/** One list for human navigation, search crawlers, and the AI reading directory. */
export const getSiteCatalog = cache((): CatalogPage[] => {
  const enabled = (path: string) => routes[path as keyof typeof routes] === true;
  const page = (entry: Omit<CatalogPage, "url" | "images"> & { images?: string[] }): CatalogPage => {
    if (!Number.isFinite(Date.parse(entry.lastModified))) throw new Error(`Invalid content date for ${entry.path}`);
    return {
      ...entry,
      url: absoluteSiteUrl(baseURL, entry.path),
      images: [...new Set(entry.images ?? [])].filter(Boolean).map(image => absoluteSiteUrl(baseURL, image)),
    };
  };
  const catalog = sitePages.filter(item => enabled(item.path)).map(item => {
    const details = mainPageDetails[item.path];
    if (!details) throw new Error(`Add discovery details for ${item.path}`);
    return page({ ...item, ...details, section: "Portfolio" });
  });
  if (enabled("/projects")) catalog.push(...getProjects().slice().sort((a, b) => a.metadata.title.localeCompare(b.metadata.title, "en")).map(project => page({
    path: `/projects/${project.slug}`, title: project.metadata.title,
    description: project.metadata.cardSummary || project.metadata.summary,
    lastModified: project.metadata.updatedAt, section: "Project evidence",
    images: [project.metadata.thumbnail, ...project.metadata.images],
  })));
  if (enabled("/expertise")) catalog.push(...specialties.map(item => page({
    path: `/expertise/${item.slug}`, title: item.title, description: item.summary,
    lastModified: EDITORIAL_UPDATED_AT, section: "Engineering expertise",
  })));
  if (enabled("/engineering-notes")) catalog.push(...engineeringNotes.map(note => page({
    path: `/engineering-notes/${note.slug}`, title: note.title,
    description: `${note.question} ${note.answer}`,
    lastModified: EDITORIAL_UPDATED_AT, section: "Engineering notes",
  })));
  // Content indexes also change when their listed summaries or guides are revised.
  for (const index of catalog.filter(item => ["/projects", "/expertise", "/engineering-notes"].includes(item.path))) {
    const dates = catalog.filter(item => item.path.startsWith(index.path + "/")).map(item => item.lastModified);
    index.lastModified = [index.lastModified, ...dates].sort((a, b) => Date.parse(a) - Date.parse(b)).at(-1)!;
  }
  if (new Set(catalog.map(item => item.url)).size !== catalog.length) throw new Error("Duplicate canonical URL in the site catalog");
  return catalog;
});
