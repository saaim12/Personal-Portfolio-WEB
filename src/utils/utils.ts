import fs from "fs";
import path from "path";
import type { TechKey } from "@/resources/tech";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  /**
   * <title> override, for case studies whose H1 does not fit in 60 characters
   * once " | Saaim Abdullah" is appended. Falls back to `title`.
   */
  seoTitle: string;
  publishedAt: string;
  /** Content-change date, for sitemap lastModified and schema dateModified. */
  updatedAt: string;
  summary: string;
  /**
   * Search-results description, 140 to 160 characters. `summary` is page copy and
   * runs past 200, which Google truncates mid-sentence.
   */
  seoDescription: string;
  image?: string;
  images: string[];
  /** Category labels shown as text on the card, e.g. "Client work". */
  tags?: string[];
  /**
   * Canonical technology keys from `resources/tech.tsx`. Replaced the
   * `**Stack:** Django, PostgreSQL, …` prose line that used to sit at the
   * bottom of each case study body.
   */
  stack: TechKey[];
  team: Team[];
  link?: string;
};

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    seoTitle: data.seoTitle || data.title || "",
    publishedAt: data.publishedAt,
    // Falls back to the publish date rather than to the file mtime: git does
    // not preserve mtimes, so on a CI checkout every file reads as modified
    // at build time.
    updatedAt: data.updatedAt || data.publishedAt,
    summary: data.summary || "",
    seoDescription: data.seoDescription || data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tags: data.tags || [],
    stack: data.stack || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
