import type { MetadataRoute } from "next";
import { home, person } from "@/resources/content";
import { sitePath } from "@/utils/sitePath";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${person.name}, Software Engineer`,
    short_name: person.name,
    description: home.description,
    start_url: sitePath("/"),
    scope: sitePath("/"),
    display: "browser",
    background_color: "#F4F3EF",
    theme_color: "#F4F3EF",
    icons: [
      { src: sitePath("/icons/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: sitePath("/icons/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
  };
}
