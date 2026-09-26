import type { FontsConfig } from "@/types/config.types";

// Import and set font for each variant
import { Archivo, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";

// Archivo matches the reference display typography; next/font self-hosts it.
const heading = Archivo({
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

// Body copy
const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// Mono, small labels, section markers, tech tags, code.
// Space Mono is not a variable font, so weights must be explicit.
const code = IBM_Plex_Mono({
  variable: "--font-code",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const fonts: FontsConfig = {
  heading: heading,
  body: body,
  code: code,
};

