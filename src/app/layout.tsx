import { SiteAnchor } from "@/components/SiteAnchor";
import "@/resources/custom.css";
import "@/resources/mono.css";

import { StudioMotion } from "@/components/StudioMotion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { fonts } from "@/resources/fonts";
import { baseURL } from "@/resources/site";
import { home, person } from "@/resources/content";
import { pageMeta } from "@/resources/seo";
import { jsonLd, webSiteJsonLd } from "@/resources/schema";

import { VercelMonitoring } from "@/components/VercelMonitoring";
import { ClarityAnalytics } from "@/components/ClarityAnalytics";
import { AhrefsAnalytics } from "@/components/AhrefsAnalytics";

export async function generateMetadata() {
  return {
    ...pageMeta({
      title: home.title,
      description: home.description,
      path: home.path,
      image: home.image,
    }),
    title: {
      default: home.title,
      template: `%s | ${person.name}`,
    },
    verification: {
      ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
      ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={person.locale ?? "en"} className={`${fonts.body.variable} ${fonts.code.variable}`}>
      <head>
        <link rel="describedby" type="text/plain" href={`${baseURL}/llms.txt`} />
        <script {...jsonLd(webSiteJsonLd)} />
      </head>
      <body>
        <SiteAnchor href="#main" className="skipLink">Skip to content</SiteAnchor>
        <Header name={person.name} />
        <StudioMotion />
        <main id="main">{children}</main>
        <Footer />
        <ClarityAnalytics />
        <AhrefsAnalytics />
        {process.env.VERCEL_ENV === "production" && process.env.NEXT_PUBLIC_STATIC_EXPORT !== "true" && <VercelMonitoring />}
      </body>
    </html>
  );
}
