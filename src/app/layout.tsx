import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";


import { Column, Flex } from "@once-ui-system/core";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { Footer } from "@/components/Footer";
import { ScreenCrawler } from "@/components/ScreenCrawler";
import { fonts } from "@/resources/fonts";
import { style } from "@/resources/once-ui.config";
import { home, person } from "@/resources/content";
import { pageMeta } from "@/resources/seo";
import { jsonLd, webSiteJsonLd } from "@/resources/schema";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export async function generateMetadata() {
  return {
    // Carries metadataBase, so every route's relative OG image resolves
    // against https://saaim.site rather than against the deploy host.
    ...pageMeta({
      title: home.title,
      description: home.description,
      path: home.path,
      image: home.image,
    }),
    // Every page previously fell back to the home title, so /work's browser tab
    // read "Selected work (shown with the permission of clients)".
    title: {
      default: home.title,
      template: `%s | ${person.name}`,
    },
    // The `keywords` meta tag was removed: Google has ignored it since 2009 and
    // 35 stuffed terms is a spam signal to the crawlers that still read it.
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang={person.locale ?? "en"}
      fillWidth
      className={[
        fonts.heading.variable,
        fonts.body.variable,
        fonts.code.variable,
      ].join(" ")}
    >
      <head>
        <script
          id="theme-init"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Static theme initialization uses trusted local config.
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;

                  // Set defaults from config
                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    "solid-style": style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                  })};
                  
                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Match the editorial palette before hydration, including returning visitors.
                  try { localStorage.setItem('data-theme', 'light'); } catch (e) {}
                  root.setAttribute('data-theme', 'light');
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
        {/* Site-wide. Person and FAQPage used to sit here too and so were
            emitted on every route; they now render from the pages they
            actually describe. */}
        <script {...jsonLd(webSiteJsonLd)} />
      </head>
      <Providers>
        <Column
          as="body"
          background="page"
          fillWidth
          style={{ minHeight: "100vh" }}
          margin="0"
          padding="0"
          horizontal="center"
        >
          {/* First tab stop on every page, lets keyboard and screen-reader
              users skip the nav instead of tabbing through it each time. */}
          <a href="#main" className="skipLink">
            Skip to content
          </a>
          <Header name={person.name} contact={home.cta} />
          <Flex
            id="main"
            as="main"
            zIndex={0}
            fillWidth
            horizontal="center"
            flex={1}
            // Fluid gutters: 16px on phones → 48px on desktop. Content still
            // caps at each page's maxWidth, so nothing exceeds the viewport.
            style={{
              paddingLeft: "clamp(16px, 5vw, 48px)",
              paddingRight: "clamp(16px, 5vw, 48px)",
            }}
          >
            <Flex horizontal="center" fillWidth minHeight="0">
              {children}
            </Flex>
          </Flex>
          <Footer />
          <ScreenCrawler />
          <Analytics />
          <SpeedInsights />
        </Column>
      </Providers>
    </Flex>
  );
}
