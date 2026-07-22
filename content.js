// ─────────────────────────────────────────────────────────────
// ALL editable copy lives here. Change text, projects, links,
// and tags in this one file — nothing else needs to be touched.
// ─────────────────────────────────────────────────────────────

export const nav = {
  wordmark: "saaim.",
  links: [
    { label: "work", href: "#work" },
    { label: "about", href: "#about" },
    { label: "contact", href: "#contact" },
  ],
};

export const hero = {
  // Each line is an array of words; every word animates independently.
  headlineLines: [
    ["Backend,"],
    ["data", "&", "cloud"],
    ["engineering."],
  ],
  subline:
    "Not a stack, a way of thinking. Systems that quietly carry real weight — pipelines that hold, APIs you can trust, data that lands where it should.",
  ctas: [
    { label: "view work →", href: "#work", kind: "anchor" },
    { label: "book a call →", href: "mailto:saaim.abdullah.work@gmail.com?subject=Let%27s%20talk", kind: "mailto" },
  ],
  techTags: ["Django · DRF", "AWS", "Kafka · Spark · Airflow", "PostgreSQL"],
  scrollHint: "scroll ↓",
};

export const work = {
  marker: "001",
  heading: "Selected work.",
  projects: [
    {
      name: "Real-time e-commerce ETL pipeline",
      description:
        "Medallion streaming: Kafka orders → Parquet bronze on S3-compatible storage via PySpark Structured Streaming → gold star schema in PostgreSQL, orchestrated by an Airflow DAG on Docker Compose.",
      tech: "Kafka · PySpark · Airflow · Postgres",
      href: "#",
      tint: "blue", // maps to floating-object palette
    },
    {
      name: "Multilingual, multi-tenant RAG engine",
      description:
        "Production RAG backend: tenant-isolated retrieval, local multilingual embeddings, grounded generation for a localization Q&A service.",
      tech: "Django · PostgreSQL 18 · Local embeddings",
      href: "#",
      tint: "pink",
    },
    {
      name: "Movie recommender system",
      description:
        "Hybrid recommender (content similarity + item co-occurrence + popularity bias for cold-start), modular ingestion/training/serving, FastAPI endpoints.",
      tech: "FastAPI · scikit-learn · Redis · Docker",
      href: "#",
      tint: "teal",
    },
    {
      name: "Autoencoder compression for edge devices",
      description:
        "Autoencoder compressing sensor data for edge comms; encoder for microcontroller inference, decoder via Flask API on AWS.",
      tech: "TensorFlow · TF Lite Micro · Flask · AWS",
      href: "#",
      tint: "steel",
    },
  ],
};

export const about = {
  marker: "002",
  heading: "Systems people never have to think about.",
  lead:
    "I'm a backend and data engineer with 2+ years turning tangled things — a flood of raw events, a fragile service, a pipeline held together with hope — into something calm, reliable, and genuinely useful. I understand a problem deeply, build the simplest thing that solves it well, then document it so the next person doesn't relearn it the hard way.",
  experience: [
    {
      date: "2026–present",
      role: "Fitter Health — Software Engineer (Backend / Data)",
      detail:
        "Backend systems and APIs for a preventive health-tech platform in Django + Next.js on AWS (ECS, RDS, S3, SNS, SQS, Redshift, API Gateway, IAM, VPC).",
    },
    {
      date: "2024–2026",
      role: "Expertflow (Cisco UCCE partner) — Software Engineer (Backend / Cloud)",
      detail:
        "Backend APIs serving 1,000–3,000 daily users on EC2 behind an ALB; event-driven ETL on AWS Lambda + S3.",
    },
  ],
  quote: {
    text:
      "He frequently delivered ahead of scope and raised architectural considerations we had not thought to ask about.",
    attribution: "Beth Iriarte, Co-founder & CEO, Fitter Health",
  },
  tagsIntro: "I work with:",
  tags: [
    "Python", "Django", "DRF", "FastAPI", "PostgreSQL", "Redis",
    "Celery", "Kafka", "PySpark", "Airflow", "AWS", "Docker",
  ],
};

export const contact = {
  marker: "003",
  heading: "Let's build something dependable.",
  ctas: [
    { label: "email me →", href: "mailto:saaim.abdullah.work@gmail.com", kind: "mailto" },
    { label: "book a call →", href: "mailto:saaim.abdullah.work@gmail.com?subject=Let%27s%20talk", kind: "mailto" },
  ],
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/saaim-abdullah" },
    { label: "GitHub", href: "https://github.com/saaim12" },
    { label: "Medium", href: "https://medium.com/@saaim.abdullah" },
  ],
  footer: "© 2026 — Saaim Abdullah · Backend, data & cloud engineer",
};

export const preloader = {
  wordmark: "saaim.",
};
