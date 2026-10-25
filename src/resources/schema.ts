import { baseURL } from "@/resources/once-ui.config";
import { home, person, social } from "@/resources/content";
import { SITE_NAME } from "./seo";

const PERSON_ID = `${baseURL}/#person`;

export const jsonLd = (data: unknown) => ({
  type: "application/ld+json" as const,
  dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
});

const authorNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: person.name,
  url: `${baseURL}/professional-experience`,
};

export const editorialArticleJsonLd = ({ title, description, path, image }: {
  title: string; description: string; path: string; image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${baseURL}${path}#article`,
  mainEntityOfPage: `${baseURL}${path}`,
  url: `${baseURL}${path}`,
  headline: title,
  description,
  author: authorNode,
  publisher: authorNode,
  ...(image ? { image: `${baseURL}${image}` } : {}),
  inLanguage: "en",
});

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
  repository,
  technologies,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified: string;
  repository?: string;
  technologies?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": repository?.startsWith("https://github.com/") ? "SoftwareSourceCode" : "CreativeWork",
  "@id": `${baseURL}${path}#project`,
  mainEntityOfPage: `${baseURL}${path}`,
  url: `${baseURL}${path}`,
  name: title,
  description,
  image: image.startsWith("http") ? image : `${baseURL}${image}`,
  datePublished,
  dateModified,
  author: authorNode,
  publisher: authorNode,
  ...(repository?.startsWith("https://github.com/") ? { codeRepository: repository } : {}),
  ...(technologies?.length ? { about: technologies } : {}),
  isPartOf: { "@id": `${baseURL}/#website` },
  inLanguage: "en",
});

// The write-up and the software it describes are separate creative works.
export const projectArticleJsonLd = (input: Parameters<typeof caseStudyJsonLd>[0]) => ({
  ...caseStudyJsonLd(input),
  "@type": "Article",
  "@id": `${baseURL}${input.path}#article`,
  headline: input.title,
  about: { "@id": `${baseURL}${input.path}#project` },
  codeRepository: undefined,
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

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${baseURL}${items.at(-1)?.path || ""}#breadcrumbs`,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${baseURL}${item.path === "/" ? "" : item.path}`,
  })),
});

export const profilePageJsonLd = {
  ...webPageJsonLd({
    title: "Professional Experience and Story",
    description: "Saaim Abdullah's software engineering experience, education, and story.",
    path: "/professional-experience",
    image: person.avatar,
  }),
  "@type": "ProfilePage",
  mainEntity: personJsonLd,
};


/**
 * Structured indexes describe the same projects and services visitors can
 * already read on the landing pages. No hidden or crawler-only content.
 */
export const projectIndexJsonLd = (
  projects: ReadonlyArray<{ slug: string; title: string; description: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${baseURL}/projects#project-list`,
  name: "Software engineering projects",
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      "@id": `${baseURL}/projects/${project.slug}#project`,
      url: `${baseURL}/projects/${project.slug}`,
      name: project.title,
      description: project.description,
    },
  })),
});

export const serviceIndexJsonLd = (
  services: ReadonlyArray<{ title: string; text: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${baseURL}/services#service-list`,
  name: "Engineering services",
  numberOfItems: services.length,
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      "@id": `${baseURL}/services#service-${index + 1}`,
      url: `${baseURL}/services#engineering-services-heading`,
      name: service.title,
      description: service.text,
      provider: { "@id": PERSON_ID },
    },
  })),
});
