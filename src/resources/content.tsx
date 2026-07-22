import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Saaim",
  lastName: "Abdullah",
  name: `Saaim Abdullah`,
  role: "Backend, data & cloud engineer",
  avatar: "/images/avatar.png",
  email: "saaim.abdullah.work@gmail.com",
  location: "Asia/Karachi", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Urdu"], // optional: Leave the array empty if you don't want to display languages
  locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Occasional notes on backend, data engineering, and the cloud.</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/saaim12",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/saaim-abdullah",
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
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: "Backend, data & cloud engineering.",
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Real-time ETL</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/real-time-ecommerce-etl",
  },
  subline: (
    <>
      Systems that quietly carry real weight — pipelines that hold, APIs you can
      trust, data that lands where it should.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm a backend and data engineer with 2+ years turning tangled things — a
        flood of raw events, a fragile service, a pipeline held together with hope
        — into something calm, reliable, and genuinely useful. I understand a
        problem deeply, build the simplest thing that solves it well, then document
        it so the next person doesn't relearn it the hard way.
        <br /> <br />
        I build backend systems and data pipelines that stay coherent, fast, and
        dependable as they grow. My work spans production REST APIs, event-driven
        ETL, and AWS-backed services — the kind of infrastructure people never have
        to think about, because it simply works. I care as much about documenting
        the messy parts as shipping the wins, so the systems I build outlast me on a
        team.
        <br /> <br />
        <Text onBackground="neutral-strong">
          <em>
            "He frequently delivered ahead of scope and raised architectural
            considerations we had not thought to ask about."
          </em>{" "}
          — Beth Iriarte, Co-founder &amp; CEO, Fitter Health
        </Text>
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Fitter Health",
        timeframe: "2026 - Present",
        role: "Software Engineer (Backend / Data) · Remote (Spain-based team)",
        achievements: [
          <>
            Built backend systems and API services for a preventive health-tech
            platform in Django and Next.js, focused on scalable, maintainable
            product modules.
          </>,
          <>
            Developed cloud-backed services on AWS: ECS, RDS, S3, SNS, SQS,
            Redshift, API Gateway, IAM, VPC.
          </>,
          <>
            Defined API contracts and backend workflows to improve reliability,
            maintainability, and readiness for data-driven features.
          </>,
          <>
            Containerized with Docker; used Celery + Redis for background
            processing; built the notification and file-handling architecture with
            a production emphasis (automated tests, clean migrations, database-level
            integrity constraints).
          </>,
        ],
        images: [],
      },
      {
        company: "Expertflow (Cisco UCCE solution partner)",
        timeframe: "2024 - 2026",
        role: "Software Engineer (Backend / Cloud) · Lahore, Pakistan",
        achievements: [
          <>
            Built backend APIs serving 1,000–3,000 daily users on AWS-backed
            services, deployed as Docker containers on EC2 with IAM, VPC, and S3;
            delivery behind an Application Load Balancer with rate-limiting and
            traffic controls.
          </>,
          <>
            Designed and shipped an event-driven ETL pipeline with AWS Lambda and
            S3, automating ingestion and delivering analytics-ready datasets for
            reporting and ML workflows.
          </>,
          <>
            Built transformation pipelines to standardize raw inputs, improving data
            quality across systems.
          </>,
          <>
            Developed a real-time voice/video communication SDK (WebRTC) and REST
            APIs integrating frontend clients, SDK modules, and third-party
            platforms.
          </>,
          <>
            Implemented a chatbot workflow to improve first-response time; delivered
            SQL-based analytics for customer insights.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "COMSATS University Islamabad, Lahore Campus",
        description: (
          <>
            BS Computer Engineering · 2021–2025. Relevant coursework: Data
            Structures, Database Management, Computer Networks, Operating Systems,
            Software Engineering, Computer Architecture, Machine Learning.
          </>
        ),
      },
      {
        name: "Certifications",
        description: (
          <>
            AWS Cloud Technical Essentials — Amazon Web Services (Coursera), Mar
            2026 · Introduction to Data Engineering — DeepLearning.AI (Coursera),
            Feb 2026 · Getting Started with Git and GitHub — IBM (Coursera), Feb
            2026.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Languages",
        description: <>Python, JavaScript, TypeScript, SQL, Java</>,
        tags: [],
        images: [],
      },
      {
        title: "Backend & APIs",
        description: (
          <>
            Django, Django REST Framework, FastAPI, Flask, Node.js, Express.js, REST
            APIs, WebRTC, API design
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Data Engineering",
        description: (
          <>
            ETL pipelines, Apache Kafka, PySpark (Structured Streaming), Apache
            Airflow, Pandas, NumPy, data warehousing, star schema, medallion
            architecture
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Cloud / DevOps",
        description: (
          <>
            AWS (Lambda, EC2, ECS, S3, RDS, Redshift, SQS, SNS, API Gateway, IAM,
            VPC, ALB), Docker, Docker Compose, Git, CI/CD
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Databases",
        description: <>PostgreSQL, MySQL, MongoDB, DynamoDB, Redis, Firebase</>,
        tags: [],
        images: [],
      },
      {
        title: "ML / AI",
        description: (
          <>
            scikit-learn, TensorFlow, TensorFlow Lite Micro, RAG, recommender
            systems, multilingual embeddings
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Frontend",
        description: <>React, Next.js, Angular, HTML/CSS</>,
        tags: [],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [], // add your own photos to re-enable the gallery
};

export { person, social, newsletter, home, about, blog, work, gallery };
