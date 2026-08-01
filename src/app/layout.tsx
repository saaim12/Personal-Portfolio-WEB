import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";

import { Column, Flex } from "@once-ui-system/core";
import { Header, Providers, Footer, AuroraField } from "@/components";
import { baseURL, fonts, style, home, person, pageMeta } from "@/resources";
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
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <script
          id="theme-init"
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
                  
                  // There is no light theme. The stored value is written
                  // anyway because Once UI's ThemeProvider treats a missing
                  // key as "system" and would overwrite data-theme from
                  // prefers-color-scheme on a light-mode OS.
                  try { localStorage.setItem('data-theme', 'dark'); } catch (e) {}
                  root.setAttribute('data-theme', 'dark');
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
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
          {/* The template's <Background> layer used to sit here, wrapped in a
              RevealFx. Every one of its five effects was configured
              `display: false`, so it rendered nothing while still shipping
              both client components. AuroraField is the backdrop now. */}
          <AuroraField />
          {/* First tab stop on every page — lets keyboard and screen-reader
              users skip the nav instead of tabbing through it each time. */}
          <a href="#main" className="skipLink">
            Skip to content
          </a>
          <Header />
          <Flex
            id="main"
            as="main"
            zIndex={0}
            fillWidth
            horizontal="center"
            flex={1}
            // Fluid gutters: 16px on phones → 48px on desktop. Content still
            // caps at each page's maxWidth, so nothing exceeds the viewport.
            style={{ paddingLeft: "clamp(16px, 5vw, 48px)", paddingRight: "clamp(16px, 5vw, 48px)" }}
          >
            <Flex horizontal="center" fillWidth minHeight="0">
              {children}
            </Flex>
          </Flex>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </Column>
      </Providers>
    </Flex>
  );
}
