import { baseURL } from "@/resources/once-ui.config";
import { home, person, social } from "@/resources/content";
import { SITE_NAME } from "./seo";

// JSON-LD graph nodes, one export per schema type.
//
// These lived in layout.tsx, which meant Person and FAQPage were emitted on
// every route, including each case study, which is not about a person and
// has no FAQ. Structured data should describe the page it is on. They are
// mounted per route now:
//
//   layout   -> WebSite        (describes the site, correct everywhere)
//   /        -> Person
//   /about   -> Person
//   /work/*  -> BlogPosting
//
// Person carries a stable @id so the homepage and About copies resolve to one
// node rather than two competing entities.

export const PERSON_ID = `${baseURL}/#person`;

/**
 * Helper for the <script type="application/ld+json"> props.
 *
 * A plain <script>, not Once UI's <Schema> component. <Schema> renders through
 * next/script, which injects the tag after hydration, so none of the WebPage
 * or BlogPosting markup was in the server HTML at all, only in the RSC
 * payload. Structured data has to be in the response a crawler is served.
 */
export const jsonLd = (data: unknown) => ({
  type: "application/ld+json" as const,
  dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
});

const authorNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: person.name,
  url: `${baseURL}/experience`,
};

/** WebPage node for the hand-written routes. */
export const webPageJsonLd = ({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${baseURL}${path === "/" ? "" : path}#webpage`,
  url: `${baseURL}${path === "/" ? "" : path}`,
  name: title,
  description,
  image: image.startsWith("http") ? image : `${baseURL}${image}`,
  isPartOf: { "@id": `${baseURL}/#website` },
  inLanguage: "en",
  about: { "@id": PERSON_ID },
});

/** BlogPosting node for a case study. */
export const caseStudyJsonLd = ({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${baseURL}${path}#article`,
  mainEntityOfPage: `${baseURL}${path}`,
  url: `${baseURL}${path}`,
  headline: title,
  description,
  image: image.startsWith("http") ? image : `${baseURL}${image}`,
  datePublished,
  dateModified,
  author: authorNode,
  publisher: authorNode,
  isPartOf: { "@id": `${baseURL}/#website` },
  inLanguage: "en",
});

export const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseURL}/#website`,
  url: baseURL,
  name: person.name,
  alternateName: SITE_NAME,
  description: home.description,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
};

// Helps Google associate the name "Saaim Abdullah" with the role and skills,
// and link the social profiles.
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: person.name,
  url: baseURL,
  image: `${baseURL}${person.avatar}`,
  jobTitle: "Software Engineer",
  description: home.description,
  email: person.email,
  // Parsed by sourcing tools, which is the only reason it is worth stating a
  // job-seeking status in markup rather than only in the copy.
  seeks: {
    "@type": "Demand",
    name: "Full-time backend, platform or data engineering role",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  sameAs: social.filter((s) => s.name !== "Email").map((s) => s.link),
  // No `worksFor`: the Fitter Health engagement ended in July 2026, and a
  // current-employer claim the reader can check and find finished is worse than
  // no claim at all.
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "COMSATS University Islamabad",
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Engineer",
    occupationLocation: { "@type": "Country", name: "Pakistan" },
    skills: "Django, AWS, Kubernetes, Apache Kafka, PySpark, PostgreSQL, Next.js",
  },
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
    "Serverless",
    "AWS Lambda",
    "Amazon ECS",
    "Amazon EKS",
    "Amazon RDS",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Microservices",
    "System Design",
    "Distributed Systems",
    "Event-Driven Architecture",
    "Data Structures and Algorithms",
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
