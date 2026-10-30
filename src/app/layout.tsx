import { SiteAnchor } from "@/components/SiteAnchor";
import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import { StudioMotion } from "@/components/StudioMotion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { fonts, handwriting } from "@/resources/fonts";
import { baseURL, style } from "@/resources/once-ui.config";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang={person.locale ?? "en"}
      className={[
        fonts.heading.variable,
        fonts.body.variable,
        fonts.code.variable,
        handwriting.variable,
        "display-flex position-relative min-width-0 fill-width",
      ].join(" ")}
    >
      <head>
        <link rel="describedby" type="text/plain" href={`${baseURL}/llms.txt`} />
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
        <body
          className="display-flex position-relative p-0 m-0 page-background flex-column align-center min-width-0 fill-width"
          style={{ minHeight: "100vh" }}
        >

          <SiteAnchor href="#main" className="skipLink">
            Skip to content
          </SiteAnchor>
          <Header name={person.name} />
          <StudioMotion />
          <main
            id="main"
            className="display-flex position-relative flex-1 justify-center min-width-0 fill-width"
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              zIndex: 0,
            }}
          >
            <div className="display-flex position-relative justify-center min-width-0 fill-width" style={{ minHeight: "var(--static-space-0)" }}>
              {children}
            </div>
          </main>
          <Footer />
          <ClarityAnalytics />
          <AhrefsAnalytics />
          {process.env.VERCEL_ENV === "production" &&
            process.env.NEXT_PUBLIC_STATIC_EXPORT !== "true" && <VercelMonitoring />}
        </body>
    </html>
  );
}
