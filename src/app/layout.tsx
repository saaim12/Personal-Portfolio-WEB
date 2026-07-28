import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";

import {
  Background,
  Column,
  Flex,
  Meta,
  opacity,
  RevealFx,
  SpacingToken,
} from "@once-ui-system/core";
import { Header, Providers } from "@/components";
import { baseURL, effects, fonts, style, dataStyle, home, person, social } from "@/resources";

// Person structured data (JSON-LD). Helps Google associate the name
// "Saaim Abdullah" with the role and skills, and link the social profiles.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  url: baseURL,
  image: `${baseURL}${person.avatar}`,
  jobTitle: "Software Engineer (Backend, Data & Cloud)",
  description: home.description,
  email: person.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  sameAs: social.filter((s) => s.name !== "Email").map((s) => s.link),
  knowsAbout: [
    "Backend Engineering",
    "Data Engineering",
    "REST API Design",
    "Django",
    "Django REST Framework",
    "FastAPI",
    "PostgreSQL",
    "AWS Cloud",
    "AWS Solutions Architecture",
    "Infrastructure as Code",
    "Serverless",
    "AWS Lambda",
    "Amazon ECS",
    "Amazon RDS",
    "Amazon Redshift",
    "Docker",
    "CI/CD",
    "Microservices",
    "System Design",
    "Distributed Systems",
    "Apache Kafka",
    "Apache Spark",
    "Apache Airflow",
    "ETL Pipelines",
    "Data Warehousing",
    "Next.js",
    "React",
    "TypeScript",
    "Machine Learning",
    "Retrieval-Augmented Generation",
    "Recommender Systems",
    "pgvector",
    "Redis",
    "Celery",
  ],
};

// Keyword list for the meta keywords tag (SEO). Broad but honest to the stack.
const seoKeywords = [
  "Saaim Abdullah",
  "backend engineer",
  "data engineer",
  "AWS cloud engineer",
  "Django developer",
  "Django REST Framework",
  "FastAPI",
  "PostgreSQL",
  "ETL pipeline engineer",
  "Apache Kafka",
  "Apache Spark",
  "Apache Airflow",
  "data warehousing",
  "AWS Lambda",
  "AWS ECS",
  "AWS RDS",
  "AWS Redshift",
  "serverless",
  "Docker",
  "CI/CD",
  "microservices",
  "system design",
  "REST API",
  "Next.js developer",
  "React",
  "TypeScript",
  "full-stack developer",
  "AI engineer",
  "RAG",
  "recommender systems",
  "machine learning",
  "remote software engineer",
  "freelance backend developer",
  "Lahore",
  "Pakistan",
];
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export async function generateMetadata() {
  const meta = Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
  return { ...meta, keywords: seoKeywords };
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
                    "viz-style": dataStyle.variant,
                  })};
                  
                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Default to DARK (ignore system pref so it never loads white),
                  // but honor an explicit user choice saved by the theme toggle.
                  var saved = null;
                  try { saved = localStorage.getItem('data-theme'); } catch (e) {}
                  var theme = saved === 'light' ? 'light' : 'dark';
                  // Persist the default too. Once UI's ThemeProvider treats a
                  // missing key as "system" and overwrites data-theme from
                  // prefers-color-scheme, which would flip the site to light
                  // on a light-mode OS and fight the toggle afterwards.
                  if (saved !== 'light' && saved !== 'dark') {
                    try { localStorage.setItem('data-theme', theme); } catch (e) {}
                  }
                  root.setAttribute('data-theme', theme);
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
          <RevealFx fill position="absolute">
            <Background
              mask={{
                x: effects.mask.x,
                y: effects.mask.y,
                radius: effects.mask.radius,
                cursor: effects.mask.cursor,
              }}
              gradient={{
                display: effects.gradient.display,
                opacity: effects.gradient.opacity as opacity,
                x: effects.gradient.x,
                y: effects.gradient.y,
                width: effects.gradient.width,
                height: effects.gradient.height,
                tilt: effects.gradient.tilt,
                colorStart: effects.gradient.colorStart,
                colorEnd: effects.gradient.colorEnd,
              }}
              dots={{
                display: effects.dots.display,
                opacity: effects.dots.opacity as opacity,
                size: effects.dots.size as SpacingToken,
                color: effects.dots.color,
              }}
              grid={{
                display: effects.grid.display,
                opacity: effects.grid.opacity as opacity,
                color: effects.grid.color,
                width: effects.grid.width,
                height: effects.grid.height,
              }}
              lines={{
                display: effects.lines.display,
                opacity: effects.lines.opacity as opacity,
                size: effects.lines.size as SpacingToken,
                thickness: effects.lines.thickness,
                angle: effects.lines.angle,
                color: effects.lines.color,
              }}
            />
          </RevealFx>
          <Flex fillWidth minHeight="16" s={{ hide: true }} />
          <Header />
          <Flex
            zIndex={0}
            fillWidth
            paddingY="l"
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
          <Analytics />
          <SpeedInsights />
        </Column>
      </Providers>
    </Flex>
  );
}
