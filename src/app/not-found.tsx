import { Action } from "@/components/Studio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This portfolio page could not be found. Return home to explore Saaim Abdullah's work.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};
export default function NotFound(){return <section className="notFound"><p className="handwritten">a little off the grid</p><h1 className="displayType">404</h1><p>This page doesn’t exist. Let’s get you back to the good stuff.</p><Action href="/">Back home</Action></section>;}
