import { baseURL } from "@/resources/once-ui.config";
import { home, person, social } from "@/resources/content";
import { SITE_NAME } from "./seo";

const PERSON_ID = `${baseURL}/#person`;

export const jsonLd = (data: unknown) => ({
  type: "application/ld+json" as const,
  dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
});

const authorNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: person.name,
  url: `${baseURL}/professional-experience`,
};

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
  seeks: {
    "@type": "Demand",
    name: "Full time backend, platform or data engineering role",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  sameAs: social.filter((s) => s.name !== "Email").map((s) => s.link),
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
    "Event driven architecture",
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
    "Retrieval augmented generation",
    "Recommender Systems",
    "pgvector",
    "Redis",
    "Celery",
  ],
};
