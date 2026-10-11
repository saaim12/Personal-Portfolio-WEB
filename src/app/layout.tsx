import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import { Column, Flex } from "@once-ui-system/core";
import { StudioMotion } from "@/components/StudioMotion";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { Footer } from "@/components/Footer";
import { fonts, handwriting } from "@/resources/fonts";
import { style } from "@/resources/once-ui.config";
import { home, person } from "@/resources/content";
import { pageMeta } from "@/resources/seo";
import { jsonLd, webSiteJsonLd } from "@/resources/schema";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  };
}

export default function RootLayout({
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
        handwriting.variable,
      ].join(" ")}
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
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
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
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

          <a href="#main" className="skipLink">
            Skip to content
          </a>
          <Header name={person.name} />
          <StudioMotion />
          <Flex
            id="main"
            as="main"
            zIndex={0}
            fillWidth
            horizontal="center"
            flex={1}
            style={{
              paddingLeft: 0,
              paddingRight: 0,
            }}
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
