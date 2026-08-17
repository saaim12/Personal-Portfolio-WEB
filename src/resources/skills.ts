import type { TechKey } from "./tech";

/**
 * The skills marquee under the hero, in reading order.
 *
 * Edit this list, not the component. Order is deliberate: it runs languages →
 * backend → data → AI → cloud → delivery → frontend, so the row reads as the
 * shape of a system rather than as a pile of logos.
 *
 * `tech` keys into the TECH map in `resources/tech.tsx`, which owns every
 * icon and brand colour on this site. A technology that is not in that map
 * gets added there first; that is the one place a logo is ever declared.
 *
 * `label` is the marquee's own wording, because the map's labels are written
 * for chips on detail pages ("Amazon S3", "PySpark") and the marquee wants
 * them short enough to scan at speed ("S3", "Apache Spark").
 */
export type Skill = {
  /** Key into the TECH map: supplies the icon and the brand colour. */
  tech: TechKey;
  /** Text shown beside the icon. */
  label: string;
};

export const skills: Skill[] = [
  // Languages and core
  { tech: "python", label: "Python" },
  { tech: "typescript", label: "TypeScript" },
  { tech: "sql", label: "SQL" },

  // Backend
  { tech: "django", label: "Django" },
  { tech: "drf", label: "Django REST Framework" },
  { tech: "fastapi", label: "FastAPI" },
  { tech: "nodejs", label: "Node.js" },
  { tech: "celery", label: "Celery" },

  // Data
  { tech: "postgresql", label: "PostgreSQL" },
  { tech: "pgvector", label: "pgvector" },
  { tech: "redis", label: "Redis" },
  { tech: "mongodb", label: "MongoDB" },
  { tech: "kafka", label: "Apache Kafka" },
  { tech: "spark", label: "Apache Spark" },
  { tech: "airflow", label: "Apache Airflow" },

  // AI
  { tech: "rag", label: "RAG" },
  { tech: "claude", label: "Claude" },
  { tech: "openai", label: "OpenAI" },
  { tech: "pinecone", label: "Pinecone" },

  // Cloud
  { tech: "aws", label: "AWS" },
  { tech: "ecs", label: "ECS" },
  { tech: "eks", label: "EKS" },
  { tech: "lambda", label: "Lambda" },
  { tech: "s3", label: "S3" },
  { tech: "sns", label: "SNS" },
  { tech: "sqs", label: "SQS" },

  // Delivery
  { tech: "docker", label: "Docker" },
  { tech: "kubernetes", label: "Kubernetes" },
  { tech: "githubactions", label: "GitHub Actions" },
  { tech: "pytest", label: "pytest" },

  // Frontend
  { tech: "nextjs", label: "Next.js" },
  { tech: "react", label: "React" },
];
