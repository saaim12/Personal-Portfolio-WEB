import { Meta } from "@once-ui-system/core";
import type { Metadata } from "next";

import { baseURL, person } from "@/resources";

// One place that turns a page's identity into <head>.
//
// Once UI's Meta.generate already emits metadataBase, title, description, the
// OpenGraph block and a summary_large_image Twitter card, so this extends it
// rather than reimplementing it. What it does not emit, and what is added
// here: og:site_name, og:locale, the OG image's width/height/alt, and an
// absolute canonical.
//
// Everything is absolute against baseURL. Nothing in the site may hardcode a
// domain — saaim.online 308s to saaim.site and the old *.vercel.app host must
// never appear in output at all.

/** Every OG image on the site is rendered by /api/og/generate at this size. */
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export const SITE_NAME = `${person.name} — Backend & Data Engineer`;

/**
 * Content-change date for the routes that have no frontmatter to read one
 * from. Bump it when the homepage or About copy is actually edited.
 *
 * Deliberately not `new Date()`: a lastModified that moves on every build is
 * a lastModified crawlers learn to ignore. Deliberately not the file mtime
 * either — git does not preserve mtimes, so on a Vercel build every file
 * reads as "modified at checkout", which is the same lie with extra steps.
 */
export const SITE_LAST_MODIFIED = "2026-08-01";

export const ogImageFor = (title: string) =>
  `/api/og/generate?title=${encodeURIComponent(title)}`;

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/work". Use "/" for the homepage. */
  path: string;
  /** Absolute or root-relative image URL. Defaults to the generated OG card. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function pageMeta({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  // Next renders the canonical without a trailing slash (trailingSlash is
  // false), so the root has to be a bare baseURL for the canonical tag and
  // the sitemap entry to match character for character.
  const canonical = `${baseURL}${path === "/" ? "" : path}`;
  const ogImage = image ?? ogImageFor(title);

  const base = Meta.generate({
    title,
    description,
    baseURL,
    path,
    type,
    image: ogImage,
    ...(publishedTime ? { publishedTime } : {}),
  });

  return {
    ...base,
    alternates: { canonical },
    openGraph: {
      ...base.openGraph,
      title,
      description,
      url: canonical,
      type,
      siteName: SITE_NAME,
      locale: "en_US",
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
      images: [
        {
          url: ogImage,
          width: OG_WIDTH,
          height: OG_HEIGHT,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
