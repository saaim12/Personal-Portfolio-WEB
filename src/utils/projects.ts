import { cache } from "react";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { TechKey } from "@/resources/tech";

type ProjectMetadata = {
  title: string;
  seoTitle: string;
  publishedAt: string;
  updatedAt: string;
  summary: string;
  cardSummary?: string;
  seoDescription: string;
  image?: string;
  images: string[];
  thumbnail: string;
  tags: string[];
  stack: TechKey[];
  role?: string;
  link?: string;
  article?: string;
};

/** Project content is local and cached across reads within a server render. */
export const getProjects = cache(() => {
  const directory = path.join(process.cwd(), "src", "app", "projects", "content");
  return fs.readdirSync(directory)
    .filter(file => file.endsWith(".mdx"))
    .map(file => {
      const { data, content } = matter(fs.readFileSync(path.join(directory, file), "utf8"));
      const metadata: ProjectMetadata = {
        title: data.title || "",
        seoTitle: data.seoTitle || data.title || "",
        publishedAt: data.publishedAt,
        updatedAt: data.updatedAt || data.publishedAt,
        summary: data.summary || "",
        cardSummary: data.cardSummary,
        seoDescription: data.seoDescription || data.summary || "",
        image: data.image || "",
        images: data.images || [],
        thumbnail: data.thumbnail || "",
        tags: data.tags || [],
        stack: data.stack || [],
        role: data.role,
        link: data.link || "",
        article: data.article || "",
      };
      return { slug: path.basename(file, ".mdx"), metadata, content };
    });
});
