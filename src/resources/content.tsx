import { About, Home, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Saaim",
  lastName: "Abdullah",
  name: `Saaim Abdullah`,
  role: "Backend and data engineer",
  avatar: "/images/avatar.jpg",
  email: "saaim.abdullah.work@gmail.com",
  location: "Asia/Karachi", // IANA time zone (used for the clock). Display city is set separately below.
  city: "Lahore, Pakistan",
  languages: ["English", "Urdu"], // optional: Leave the array empty if you don't want to display languages
  locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

// Used by the hero CTA and the WhatsApp social link.
const whatsapp = "https://wa.me/923249923289";

// TODO: replace with your real Cal.com (or Calendly) link, then this becomes
// the primary CTA everywhere. A bookable slot converts CTOs and enterprise
// recruiters at several times the rate of a WhatsApp or mailto link — neither
// of which an enterprise contact will use to reach a candidate.
const bookingLink = whatsapp;

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
  // Kept under ~60 chars so Google doesn't truncate it mid-phrase.
  title: `${person.name}, backend and data engineer`,
  // Kept inside 160 chars for the same reason.
  description: `I build backend and data systems: Django and DRF APIs, PostgreSQL schemas, Kafka and Spark pipelines, and the AWS infrastructure they run on.`,
  headline: "I build backend and data systems for product teams.",
  subline: (
    <>
      I own the Django and DRF API layer, the PostgreSQL schema, the Celery and
      Redis workers and the AWS estate behind Fitter Health, a preventive
      health platform running in production for a Spain-based team. Before
      that, two years of backend and event-driven ETL work at Expertflow, a
      Cisco UCCE solution partner.
    </>
  ),
  cta: {
    label: "Book a technical call",
    href: bookingLink,
  },
  // Every value here is checkable by the reader. Nothing goes in this bar
  // that cannot be traced to the live site, the CV, or a public repo. Four
  // more were drafted (test count, incident count, deploy time, monthly AWS
  // spend, time to first production release) and cut: they are all Fitter
  // Health numbers, the code is under NDA, and a number nobody can check is
  // worth less than the space it takes.
  proof: [
    { value: "Live", label: "in production at fitter.health" },
    { value: "1,000 to 3,000", label: "daily users served at Expertflow" },
    { value: "2.5 yrs", label: "shipping backend and data systems" },
    { value: "AWS SAA", label: "Solutions Architect Associate, in progress" },
  ],
  services: {
    display: true,
    // "Where I'm hired" reframes the list from capability to demand.
    title: "Where I'm hired",
    items: [
      {
        icon: "rocket",
        title: "Backend and API engineering",
        description:
          "Django, DRF and FastAPI services with versioned contracts, constraints enforced in the database rather than the serializer, background work on Celery, and tests that run in CI.",
      },
      {
        icon: "grid",
        title: "Data platforms",
        description:
          "Kafka into Spark Structured Streaming, landed as Parquet, modelled into a star schema and orchestrated with Airflow. Reporting stops disagreeing with itself because there is one definition.",
      },
      {
        icon: "arrowUpRight",
        title: "AWS infrastructure",
        description:
          "ECS, RDS, S3, Lambda, SNS and SQS behind a VPC and scoped IAM policies, deployed from CI. Queues get a dead-letter path before they get traffic.",
      },
      {
        icon: "figma",
        title: "Product engineering",
        description:
          "Booking flows, portals and admin tools built as products: authentication, roles, entitlements, payment state, and the data model holding them together.",
      },
      {
        icon: "book",
        title: "Retrieval and recommender systems",
        description:
          "RAG over your own corpus with retrieval scoped per tenant, and recommenders with the training and serving paths kept separate. Grounded answers rather than impressive ones.",
      },
      {
        icon: "globe",
        title: "Rescue and hardening",
        description:
          "You inherited a codebase nobody wants to deploy. I read it, get it under test, document what is load-bearing, and get it shipping again.",
      },
    ],
  },
  // Promoted out of the About page, where it was buried mid-paragraph. A signed
  // recommendation from a CEO is the rarest asset on this site.
  testimonial: {
    display: true,
    quote:
      "He frequently delivered ahead of scope and raised considerations we had not thought to ask about.",
    author: "Beth Iriarte",
    role: "Co-founder & CEO, Fitter Health",
    letter: "/Fitter-Recommendation-Letter.pdf",
  },
  process: {
    display: true,
    title: "How I work",
    subtitle: "Four steps, in this order, on every engagement.",
    steps: [
      {
        step: "01",
        title: "Find the constraint",
        description:
          "I ask what the system has to survive before I ask what it has to do. Load, compliance, budget and team size change the answer more than the feature list does.",
      },
      {
        step: "02",
        title: "Design the contract",
        description:
          "API shapes, data model and failure modes on paper first. Arguing about a schema for a day costs less than migrating one for a week.",
      },
      {
        step: "03",
        title: "Ship in production-ready slices",
        description:
          "Each slice lands with its migration, its tests and its deploy path. You see working software in week one, not month three.",
      },
      {
        step: "04",
        title: "Hand it over",
        description:
          "Reproducible infrastructure and a repo your next engineer can read without me on a call. If you bring me back after that, it should be because you want to.",
      },
    ],
  },
  faq: {
    display: true,
    title: "Questions I get asked",
    items: [
      {
        q: "Are you available full-time, contract, or both?",
        a: "Both. I take one long-term engagement alongside select project work. For full-time roles I'm open to remote positions with EU or US-East teams.",
      },
      {
        q: "You're in Pakistan. How does that work across timezones?",
        a: "I work EU hours by default and overlap US-East mornings. My last team was in Spain; async-first with a daily overlap window was never an issue.",
      },
      {
        q: "What size projects do you take?",
        a: "Typically four weeks and up. Below that I'm rarely the right call, and I'll tell you so rather than take the work.",
      },
      {
        q: "Can you take over an existing codebase?",
        a: "Yes, and it is some of my favourite work. The first deliverable is always a written assessment: what is solid, what is load-bearing and fragile, and what it costs to fix.",
      },
      {
        q: "Who owns the code and the infrastructure?",
        a: "You do, entirely. Repos, AWS account, and domains stay in your name from day one. I don't host client infrastructure on my own accounts.",
      },
      {
        q: "What don't you do?",
        a: "Mobile apps, brand design, and anything that needs a team of six. I will refer you rather than fake it.",
      },
    ],
  },
};

const about: About = {
  path: "/about",
  label: "About",
  // No name here — the metadata template in layout.tsx appends it, and
  // including it produced "About – Saaim Abdullah — Saaim Abdullah".
  // Never rendered on screen (the H1 is the name); this is the <title> and
  // the OG card, so it says what the page is rather than just "About".
  title: `About: backend and data engineer`,
  description: `I build backend and data systems: Django and DRF APIs, PostgreSQL, Kafka and Spark pipelines, and the AWS infrastructure behind them. Based in Lahore.`,
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
    // Real <p> elements, not <br /><br />. The About page renders this inside a
    // container that is display:flex, which turned every inline <strong> and
    // <a> into its own stacked row: "Fitter Health" and "Medium" were landing
    // on separate lines like headings. Block paragraphs fix it structurally.
    description: (
      <>
        <p>
          Software fails in production for boring reasons. A migration that
          cannot be rolled back. A notification fan-out with no durable buffer,
          so the retries land nowhere. A report that disagrees with the
          dashboard because two teams defined revenue differently. I build
          systems with those failures designed out.
        </p>
        <p>
          I started at <strong>Expertflow</strong>, a Cisco UCCE solution
          partner, on backend services behind a load balancer serving 1,000 to
          3,000 daily users. I shipped an event-driven ETL pipeline on Lambda
          and S3 that turned raw call data into analytics-ready datasets, and
          wrote the WebRTC SDK carrying real-time voice and video between
          clients and third-party platforms. Two years there taught me that
          most production pain is a queue or a schema, not a language.
        </p>
        <p>
          Since 2026 I have owned the platform at <strong>Fitter Health</strong>,
          a preventive health product for a Spain-based team. The Next.js
          frontend, the Django and DRF API layer, the PostgreSQL schema, the
          Celery and Redis workers, and the AWS estate: ECS, RDS, S3, SNS, SQS,
          Redshift, API Gateway, IAM and VPC. Not a contribution to someone
          else's architecture. The architecture.
        </p>
        <p>
          Alongside that I take data engineering engagements, and I build the
          systems I want to understand properly. A Kafka to Spark medallion
          pipeline landing in a star schema. A multi-tenant RAG engine on
          pgvector where retrieval is scoped by a tenant claim in the JWT. A
          recommender with the training and serving paths split apart. The code
          is public and the case studies here go through the decisions.
        </p>
        <p>
          <strong>How I think about problems.</strong> I start from the failure
          modes, because the interesting part of a design is what it does when
          something is already broken. A queue that drops messages silently is
          worse than one that refuses them loudly, so I want the buffer and the
          dead-letter path before I want the feature. I would rather argue about
          a schema for a day than migrate one for a week. When a requirement
          will cost more than it returns, I say so before it is built.
        </p>
        <p>
          I write up the systems I build on{" "}
          <a href="https://medium.com/@saymmalik08">Medium</a>, the code is on{" "}
          <a href="https://github.com/saaim12">GitHub</a>, and I take client
          work through{" "}
          <a href="https://www.upwork.com/freelancers/saaim">Upwork</a>.
        </p>
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Fitter Health",
        timeframe: "2026 – Present",
        // "Founding Engineer" is accurate — first and only engineer on the
        // product — and it is the title that stops a CTO or founder scrolling.
        // "Software Engineer" undersold this scope by a full level.
        role: "Founding Engineer, full-stack through cloud",
        location: "Remote, Spain-based team",
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
            Built the notification and file-handling architecture on Celery and
            Redis background processing, with automated tests, clean migrations,
            and database-level integrity constraints throughout.
          </>,
          <>
            Modelled the membership and entitlement layer: credit balances,
            coach and user session booking, and invoice status synchronised with
            Odoo across more than one payment rail, under clinical compliance
            rules and a large role-based access matrix.
          </>,
          <>
            Diagnosed silent notification loss in the inactivity re-engagement
            pipeline. SNS was fanning out directly to consumers with no durable
            buffer, so anything failing mid-delivery was gone. Putting SQS
            between SNS and the consumers made delivery retryable and gave the
            failures somewhere to land.
          </>,
        ],
        images: [],
      },
      {
        company: "Expertflow",
        timeframe: "2024 – 2026",
        role: "Software Engineer, Backend & Cloud",
        location: "Cisco UCCE solution partner, Lahore",
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
        // "In progress" with no date reads as abandoned; a scheduled exam date
        // reads as committed. TODO: put the real month in.
        // The IBM "Getting Started with Git and GitHub" course was removed —
        // at this level a Git intro on the CV is a negative signal, not a
        // neutral one. Nothing else here needs it to prove the same skill.
        // Issuer sits on its own muted line rather than after a "·". Same
        // information, carried by hierarchy instead of by a character.
        description: (
          <>
            <span className="certItem">
              <strong>AWS Certified Solutions Architect, Associate</strong>
              <span>Amazon Web Services, exam scheduled 2026</span>
            </span>
            <span className="certItem">
              <strong>AWS Cloud Technical Essentials</strong>
              <span>Amazon Web Services</span>
            </span>
            <span className="certItem">
              <strong>Introduction to Data Engineering</strong>
              <span>DeepLearning.AI</span>
            </span>
          </>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    // Prose + tags on purpose: the sentence is what a CTO reads, the chips are
    // what a keyword-scanning recruiter (and an ATS) needs. Prose alone was
    // costing the second audience; chips alone read like every other portfolio.
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
        tags: [
          { name: "Python" },
          { name: "TypeScript" },
          { name: "SQL" },
          { name: "JavaScript" },
          { name: "Java" },
        ],
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
        tags: [
          { name: "Django" },
          { name: "DRF" },
          { name: "FastAPI" },
          { name: "Flask" },
          { name: "Node.js" },
          { name: "WebRTC" },
          { name: "Celery" },
        ],
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
        tags: [
          { name: "Kafka" },
          { name: "PySpark" },
          { name: "Airflow" },
          { name: "Star schema" },
          { name: "Medallion" },
          { name: "Pandas" },
        ],
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
        tags: [
          { name: "AWS" },
          { name: "ECS" },
          { name: "Lambda" },
          { name: "RDS" },
          { name: "Redshift" },
          { name: "VPC / IAM" },
          { name: "Docker" },
          { name: "CI/CD" },
        ],
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
        tags: [
          { name: "PostgreSQL" },
          { name: "MySQL" },
          { name: "MongoDB" },
          { name: "DynamoDB" },
          { name: "Redis" },
        ],
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
        tags: [
          { name: "RAG" },
          { name: "Recommenders" },
          { name: "pgvector" },
          { name: "scikit-learn" },
          { name: "TensorFlow" },
        ],
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
        tags: [
          { name: "React" },
          { name: "Next.js" },
          { name: "Angular" },
          { name: "TypeScript" },
        ],
        images: [],
      },
      {
        // Added: testing is the single clearest senior-vs-mid signal in a
        // technical screen, and the Fitter Health bullets already prove it —
        // the skills section just never claimed it.
        title: "Testing & quality",
        description: (
          <>
            Automated test suites running in CI, database-level integrity
            constraints, clean reversible migrations, and structured logging with
            request tracing.
          </>
        ),
        tags: [
          { name: "pytest" },
          { name: "CI/CD" },
          { name: "GitHub Actions" },
          { name: "Migrations" },
        ],
        images: [],
      },
      {
        title: "Architecture",
        description: (
          <>
            REST contract design, event-driven systems, multi-tenant isolation,
            medallion and star-schema data modeling, and background job
            architecture.
          </>
        ),
        tags: [
          { name: "System design" },
          { name: "Event-driven" },
          { name: "Multi-tenancy" },
          { name: "REST contracts" },
        ],
        images: [],
      },
    ],
  },
};

// Certificates.
//
// Titles, issuers and dates were read out of the PDFs in /public/certificates,
// whose filenames are opaque Coursera IDs ("Coursera QVJNSFCJXF1Z.pdf"). The
// verify URLs matter more than the images do: a link a recruiter can check
// beats a screenshot they cannot.
type Certificate = {
  title: string;
  issuer: string;
  /** Platform the course was delivered through, when it differs from the issuer */
  via?: string;
  date: string;
  /** Path under /public */
  /** Local PDF. Only used as the link target when there is no `verify` URL. */
  file?: string;
  /** Issuer's public verification URL, where one exists */
  verify?: string;
};

const certificates: Certificate[] = [
  {
    title: "AWS Cloud Technical Essentials",
    issuer: "Amazon Web Services",
    via: "Coursera",
    date: "March 2026",
    verify: "https://coursera.org/verify/QVJNSFCJXF1Z",
  },
  {
    title: "Introduction to Data Engineering",
    issuer: "DeepLearning.AI & AWS",
    via: "Coursera",
    date: "February 2026",
    verify: "https://coursera.org/verify/ZX9RBL6N853V",
  },
  {
    title: "Claude Code 101",
    issuer: "Anthropic",
    date: "May 2026",
    file: "/certificates/claude_code_101.pdf",
  },
  {
    title: "Getting Started with Git and GitHub",
    issuer: "IBM",
    via: "Coursera",
    date: "February 2026",
    verify: "https://coursera.org/verify/TDGYZCBYXJ7S",
  },
];

const work: Work = {
  path: "/work",
  label: "Work",
  // The old title — "Selected work (shown with the permission of clients)" —
  // was rendered as the H1 and the browser tab: legal boilerplate in the
  // largest text on the page, and it implied the alternative was possible.
  // The permission note now sits as small print under the heading.
  title: `Systems I've built`,
  // Search-results copy, not page copy — kept inside 160 characters so it is
  // not truncated. The old 199-character version lost everything after "RAG".
  description: `Five case studies: a health-tech platform built from zero, a Kafka streaming pipeline, a multi-tenant RAG engine, a hybrid recommender, and edge ML on AWS.`,
  // Create new project pages by adding a new .mdx file to src/app/work/projects
  // All projects are listed on the home and /work routes
};

export { person, social, home, about, work, certificates };
