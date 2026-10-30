import type { Metadata } from "next";

import { baseURL } from "@/resources/once-ui.config";
import { person } from "@/resources/content";
import { isSearchIndexable } from "@/resources/indexing";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
export const SITE_NAME = `${person.name}, software engineer`;

export const SITE_LAST_MODIFIED = "2026-10-11";

export const ogImageFor = (_title: string) => "/images/social-preview.png";

type PageMetaInput = {
  title: string;
  description: string;

  path: string;

  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function pageMeta({
  title,
  description,
  path,
  image,
  imageWidth = OG_WIDTH,
  imageHeight = OG_HEIGHT,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const canonical = `${baseURL}${path === "/" ? "" : path}`;
  const relativeImage = image ?? ogImageFor(title);
  // Resolve against the site path too (GitHub project sites have a URL prefix).
  const ogImage = relativeImage.startsWith("/") ? `${baseURL}${relativeImage}` : relativeImage;

  return {
    title,
    description,
    metadataBase: new URL(baseURL),
    authors: [{ name: person.name, url: `${baseURL}/professional-experience` }],
    creator: person.name,
    robots: isSearchIndexable()
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
    alternates: { canonical },
    openGraph: {
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
          width: imageWidth,
          height: imageHeight,
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
