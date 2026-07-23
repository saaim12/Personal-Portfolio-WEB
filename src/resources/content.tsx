import { About, Home, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Saaim",
  lastName: "Abdullah",
  name: `Saaim Abdullah`,
  role: "Software engineer · Web, backend, data & AI",
  avatar: "/images/avatar.png",
  email: "saaim.abdullah.work@gmail.com",
  location: "Asia/Karachi", // IANA time zone (used for the clock). Display city is set separately below.
  city: "Lahore, Pakistan",
  languages: ["English", "Urdu"], // optional: Leave the array empty if you don't want to display languages
  locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

// Used by the hero CTA and the WhatsApp social link.
const whatsapp = "https://wa.me/923249923289";

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
    link: "https://www.linkedin.com/in/saaim-abdullah/",
    essential: true,
  },
  {
    name: "Upwork",
    icon: "upwork",
    link: "https://www.upwork.com/freelancers/saaim",
    essential: true,
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
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}: Software engineer for web, backend, data & AI`,
  description: `I design and ship complete software products: high-converting websites, web apps, backend systems, data platforms, and AI features.`,
  headline: "Software that turns visitors into customers.",
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Flagship build: Fitter Health</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          See my work
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      I'm Saaim Abdullah. I design and ship complete software products: premium
      websites, web apps, backend systems, data platforms, and AI features, all
      engineered to get you more calls, bookings, and sales.
    </>
  ),
  cta: {
    label: "Book a call on WhatsApp",
    href: whatsapp,
  },
  services: {
    display: true,
    title: "What I build",
    items: [
      {
        icon: "globe",
        title: "Websites & landing pages",
        description:
          "Premium, high-converting sites and campaign pages, designed to win trust in seconds and turn clicks into leads.",
      },
      {
        icon: "figma",
        title: "Web applications",
        description:
          "Full products, not just pages: dashboards, portals, booking systems, and internal tools built end to end.",
      },
      {
        icon: "rocket",
        title: "Backend systems & APIs",
        description:
          "REST APIs, integrations, authentication, and real-time features. Reliable server-side engineering that scales.",
      },
      {
        icon: "grid",
        title: "Data engineering",
        description:
          "ETL pipelines, warehouses, and analytics with Kafka, Spark, and Airflow. Your data cleaned, modeled, and ready to use.",
      },
      {
        icon: "book",
        title: "AI & ML features",
        description:
          "RAG chatbots, recommendation engines, and ML services integrated into your product. Grounded, practical AI.",
      },
      {
        icon: "arrowUpRight",
        title: "Cloud & DevOps",
        description:
          "AWS architecture, Docker, and CI/CD. Deployed, monitored, secure, and built to grow with your business.",
      },
    ],
  },
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} based in ${person.city ?? person.location}`,
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
        I'm Saaim Abdullah, a software engineer based in Lahore. I build complete
        software products for businesses: premium, fast, mobile-first websites and
        web apps designed around what your business actually needs to do, whether
        that's booking more calls, taking payments, or closing sales. No recycled
        templates and no cut corners.
        <br /> <br />
        Under the hood, that's real engineering. Over the past two years I've
        shipped production systems for companies across Europe and beyond: high-end
        frontends, REST APIs and backend services, event-driven ETL and data
        pipelines (Kafka, Spark, Airflow), AI features such as RAG chatbots and
        recommender systems, and full AWS cloud infrastructure (Lambda, EC2, ECS,
        S3, RDS, Redshift). When a project needs real logic, integrations,
        dashboards, or data behind it, I build the whole thing end to end, from the
        landing page to the database.
        <br /> <br />
        My flagship project is <strong>Fitter Health</strong> A preventive
        health-tech platform I built entirely from scratch and took all the way to
        production for a Spain-based team, owning the frontend, backend, cloud, and
        data layer. I also share how I build these systems on{" "}
        <a href="https://medium.com/@saymmalik08">Medium</a> and take on select
        client work through{" "}
        <a href="https://www.upwork.com/freelancers/saaim">Upwork</a>.
        <br /> <br />
        <span
          style={{
            display: "block",
            borderLeft: "3px solid var(--accent)",
            paddingLeft: "16px",
          }}
        >
          <Text as="span" onBackground="neutral-strong">
            <em>
              "He frequently delivered ahead of scope and raised considerations we
              had not thought to ask about."
            </em>
          </Text>
          <br />
          <Text as="span" variant="body-default-s" onBackground="neutral-weak">
            Beth Iriarte, Co-founder &amp; CEO of Fitter Health
          </Text>
        </span>
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Fitter Health · full platform, built end to end",
        timeframe: "2026 - Present",
        role: "Software Engineer (Full-stack / Backend / Data / Cloud) · Remote (Spain-based team)",
        achievements: [
          <>
            <strong>
              Designed and built the entire preventive health-tech platform from
              scratch
            </strong>
            : frontend (Next.js), backend (Django / DRF), database, cloud
            infrastructure, and data layer. Owned the product end to end, from
            first commit to production deployment.
          </>,
          <>
            Architected and shipped the full AWS infrastructure: ECS, RDS, S3, SNS,
            SQS, Redshift, API Gateway, IAM, and VPC, all secured, containerized,
            and production-ready.
          </>,
          <>
            Defined every API contract and backend workflow, engineering the system
            for reliability, maintainability, and data-driven features from day one.
          </>,
          <>
            Built the notification and file-handling architecture with Celery +
            Redis background processing, automated tests, clean migrations, and
            database-level integrity constraints, production-grade throughout.
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
            BS Computer Engineering (2021–2025). Coursework across data structures,
            databases, computer networks, operating systems, software engineering,
            computer architecture, and machine learning.
          </>
        ),
      },
      {
        name: "Certifications",
        description: (
          <>
            AWS Cloud Technical Essentials · Amazon Web Services (Coursera, 2026)
            <br />
            Introduction to Data Engineering · DeepLearning.AI (Coursera, 2026)
            <br />
            Getting Started with Git and GitHub · IBM (Coursera, 2026)
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
        description: (
          <>
            Python-first for backend, data, and ML work, with TypeScript and
            JavaScript across the frontend and strong SQL for data. Also comfortable
            in Java.
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Backend & APIs",
        description: (
          <>
            I design and ship reliable REST APIs and server-side systems in Django,
            Django REST Framework, FastAPI, Flask, and Node.js/Express, including
            real-time features with WebRTC.
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Data Engineering",
        description: (
          <>
            Batch and streaming pipelines with Apache Kafka, PySpark Structured
            Streaming, and Airflow, modeling analytics-ready warehouses using star
            schema and medallion architecture (Pandas and NumPy for processing).
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Cloud & DevOps",
        description: (
          <>
            Production AWS across Lambda, EC2, ECS, S3, RDS, Redshift, SQS/SNS, API
            Gateway, IAM, VPC, and ALB, containerized with Docker and shipped
            through CI/CD pipelines.
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Databases",
        description: (
          <>
            Relational and NoSQL: PostgreSQL and MySQL, MongoDB and DynamoDB, plus
            Redis for caching and Firebase for real-time data.
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "AI & ML",
        description: (
          <>
            Practical AI features: RAG systems, recommender engines, and
            multilingual embeddings built with scikit-learn and TensorFlow, down to
            TensorFlow Lite Micro for on-device inference.
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Frontend",
        description: (
          <>
            Modern, responsive, accessible interfaces in React, Next.js, and Angular
            with clean, maintainable HTML and CSS.
          </>
        ),
        tags: [],
        images: [],
      },
    ],
  },
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Selected work (shown with the permission of clients)`,
  description: `Websites, backend systems, data platforms, and AI features I've designed and shipped.`,
  // Create new project pages by adding a new .mdx file to src/app/work/projects
  // All projects are listed on the home and /work routes
};

export { person, social, home, about, work };
