import type { TechnicalSkills, Home, Person, Social, Work } from "@/types/content.types";

const person: Person = {
  firstName: "Saaim",
  lastName: "Abdullah",
  name: "Saaim Abdullah",
  role: "Software engineer",
  avatar: "/images/avatar.jpg",
  email: "saaim.abdullah.work@gmail.com",
  location: "Asia/Karachi", // IANA time zone (used for the clock). Display city is set separately below.
  city: "Lahore, Pakistan",
  languages: ["English", "Urdu"], // optional: Leave the array empty if you don't want to display languages
  locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

const whatsapp = "https://wa.me/923249923289";

const bookingLink = "https://cal.com/saaim-abdullah-gm3ck6";

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/saaim12",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/saaim-abdullah/",
    essential: true,
  },
  {
    name: "Upwork",
    icon: "upwork",
    link: "https://www.upwork.com/freelancers/saaim",
    essential: false,
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    link: whatsapp,
    essential: true,
  },
  {
    name: "Medium",
    icon: "medium",
    link: "https://medium.com/@saymmalik08",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: `/api/og/generate?title=${encodeURIComponent(`${person.name} — Software Engineer`)}`,
  label: "Home",
  title: `${person.name} — Software Engineer`,
  description: "Saaim Abdullah is a software engineer in Lahore who turns complex software problems into dependable products, APIs, and data systems.",
  headline: "Software Engineer — Backend & Full Stack",
  subline: <>I own the path from requirements to production: API contracts, data models, backend workflows, cloud deployment, and handover. My work spans a health platform built from zero and backend services at Expertflow, with a focus on reliability, clear trade-offs, and maintainable delivery.</>,
  status: [
    "Open to software engineering roles and product development",
    "Based in Lahore, working European and US-East hours",
    "Backend, full-stack, cloud, and data engineering",
    "Reliable delivery from architecture to handover",
  ],
  proof: [
    { value: "Fitter Health", label: "a live health platform, built solo and handed over" },
    { value: "1,000 to 3,000", label: "daily users on backend services I owned at Expertflow" },
    { value: "130 ms to 30 ms", label: "admin API latency, on Redis caching and index tuning" },
    { value: "13 projects", label: "case studies across shipped work, prototypes and learning" },
  ],
  testimonial: {
    display: true,
    context: "The founder of the health platform I built and handed over:",
    quote:
      "He frequently delivered ahead of scope and raised considerations we had not thought to ask about.",
    author: "Beth Iriarte",
    role: "Co-founder & CEO, Fitter Health",
    letter: "/Fitter-Recommendation-Letter.pdf",
  },
};

const technicalSkills: TechnicalSkills = {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Architecture & distributed systems",
        description: "I design around failure modes, ownership boundaries, and operational constraints. My work includes durable messaging, tenant isolation, API contracts, container orchestration, and data models that support both transactional and analytical workloads.",
        stack: [
          "systemdesign",
          "eventdriven",
          "kubernetes",
          "multitenancy",
          "restcontracts",
        ],
      },
      {
        title: "Languages",
        description: "I use Python for backend services, data processing, and ML, and TypeScript for web applications. In SQL, I work with query plans, indexing, joins, and window functions to improve data access and reporting.",
        stack: ["python", "typescript", "sql", "javascript"],
      },
      {
        title: "Backend & APIs",
        description: "I build APIs and workflows for accounts, permissions, payments, bookings, and integrations. I use Django, DRF, FastAPI, Flask, and Express, with explicit validation, error handling, and background processing.",
        stack: ["django", "drf", "fastapi", "flask", "nodejs", "webrtc", "celery"],
      },
      {
        title: "Data Engineering",
        description: "I build batch and streaming pipelines with Kafka, PySpark, and Airflow. I structure raw, validated, and reporting data separately so pipelines can be inspected, replayed, and extended as requirements change.",
        stack: [
          "kafka",
          "pyspark",
          "airflow",
          "mwaa",
          "emr",
          "glue",
          "starschema",
          "medallion",
        ],
      },
      {
        title: "Cloud & DevOps",
        description: "I deploy and operate containerized applications on AWS, with scoped access, network boundaries, automated delivery, and recovery paths. My experience includes ECS, EKS, EC2, RDS, S3, queues, and scheduled workloads.",
        stack: [
          "aws",
          "ecs",
          "eks",
          "kubernetes",
          "lambda",
          "rds",
          "s3",
          "sqs",
          "vpc",
          "iam",
          "docker",
          "gitlab",
        ],
      },
      {
        title: "Databases",
        description: "I model business constraints in PostgreSQL and tune queries against observed access patterns. I use pgvector for retrieval, Redis for caching and task queues, and document stores where their data model fits the workload.",
        stack: ["postgresql", "pgvector", "mongodb", "dynamodb", "redis"],
      },
      {
        title: "AI & ML",
        description: "I build retrieval and recommendation workflows with explicit evaluation criteria and fallback behavior. My projects cover multilingual embeddings, tenant-scoped retrieval, hybrid recommendation, and embedded inference.",
        stack: ["rag", "recommenders", "pgvector", "scikitlearn", "tensorflow"],
      },
      {
        title: "Frontend",
        description: "I build React and Next.js interfaces and have worked with Angular teams at Expertflow. I connect the interface to backend contracts, with attention to accessibility, responsive layouts, and useful error states.",
        stack: ["react", "nextjs", "typescript", "angular"],
      },
      {
        title: "Testing & quality",
        description: "I use automated tests, migration checks, database constraints, and CI to make changes safer. Documentation, observability, and a clear handover are part of delivering a system another engineer can maintain.",
        stack: ["pytest", "cicd", "githubactions", "migrations"],
      },
    ],
  };

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Systems I've built`,
  description: "Explore Saaim Abdullah's software projects: shipped products, backend systems, data pipelines and experiments, with architecture and implementation notes.",
};

export { person, social, home, technicalSkills, work, bookingLink };
