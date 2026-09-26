import { cache } from "react";
import fs from "node:fs";
import path from "node:path";
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
  /**
   * Card thumbnail, 16:9. Optional: a case study without one gets a
   * typographic tile at the same aspect ratio, so the grid never ragged.
   */
  thumbnail?: string;
  /**
   * One line naming the part of this build that was actually hard. The card
   * used to show only the summary, which reads as scope rather than as
   * difficulty, and scope is the half a reviewer already assumes.
   */
  hardPart?: string;
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
    thumbnail: data.thumbnail || "",
    hardPart: data.hardPart || "",
    tags: data.tags || [],
    stack: data.stack || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

const getMDXData = cache((dir: string) => {
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
});

export function getPosts(customPath: string[]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
