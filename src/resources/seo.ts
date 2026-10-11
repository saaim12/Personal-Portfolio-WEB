import { Meta } from "@once-ui-system/core";
import type { Metadata } from "next";

import { baseURL } from "@/resources/once-ui.config";
import { person } from "@/resources/content";

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
  const canonical = `${baseURL}${path === "/" ? "" : path}`;
  const relativeImage = image ?? ogImageFor(title);
  // Resolve against the site path too (GitHub project sites have a URL prefix).
  const ogImage = relativeImage.startsWith("/") ? `${baseURL}${relativeImage}` : relativeImage;

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
    metadataBase: new URL(baseURL),
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
