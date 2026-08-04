import { About, Home, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Saaim",
  lastName: "Abdullah",
  name: `Saaim Abdullah`,
  // Deliberately the widest accurate label. "Backend and data engineer" named
  // two of the four layers he actually ships and read as a specialist hire to
  // founders who need the whole product built.
  role: "Software engineer",
  avatar: "/images/avatar.jpg",
  email: "saaim.abdullah.work@gmail.com",
  location: "Asia/Karachi", // IANA time zone (used for the clock). Display city is set separately below.
  city: "Lahore, Pakistan",
  languages: ["English", "Urdu"], // optional: Leave the array empty if you don't want to display languages
  locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

// Used by the hero CTA and the WhatsApp social link.
const whatsapp = "https://wa.me/923249923289";

// A bookable slot converts CTOs and enterprise recruiters at several times the
// rate of a WhatsApp or mailto link — neither of which an enterprise contact
// will use to reach a candidate. It sits alongside WhatsApp rather than
// replacing it: the two audiences do not overlap.
const bookingLink = "https://cal.com/saaim-abdullah-gm3ck6";

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
  // The homepage is the one route the title template does not suffix, so this
  // carries the name itself.
  title: `${person.name}, software engineer. Web platforms, backends, data and AI.`,
  // Kept inside 160 chars so Google doesn't truncate it mid-phrase.
  description: `I build software products end to end for small teams: web platforms, backend APIs, AI features, data pipelines, and the AWS behind them. Freelance and full-time.`,
  // Names the outcome (a finished product) and the range (front to back)
  // rather than the inputs. Two audiences read this line: a founder who wants
  // a product and a CTO who wants to know how deep it goes.
 headline:
  "I turn ideas into working software, the whole thing, on my own.",
subline: (
  <>
     I&rsquo;m Saaim, a software engineer. Most people who hire me have already
    had a project stall, or inherited something half finished that nobody can
    touch. Over the last two years I&rsquo;ve built complete products for
    companies in Europe and the US, including the full platform behind a Spanish
    health startup, systems used by thousands of people daily, and AI features
    that do real work instead of demos. I hand things over clean and documented,
    so you are never locked in to me.
  </>
),
  // One CTA definition drives the hero, the navbar and the mobile menu. It
  // points at the calendar, not WhatsApp: a booked slot is the outcome all
  // three of those buttons are actually asking for. WhatsApp is still offered
  // in the contact block and in the hero's social row.
  cta: {
    label: "Book a call",
    href: bookingLink,
  },
  // Outcomes, not credentials. Every value here is checkable by the reader —
  // the live site, the CV, the signed letter, or the public Upwork profile.
  // "AWS SAA, in progress" was cut: an unearned certificate is a weak signal
  // in a bar of four, and it still appears under Certifications where the
  // context makes it fine.
  proof: [
    { value: "Built and shipped", label: "a full health platform for a Spain-based team, solo" },
    { value: "1,000 to 3,000", label: "daily users on backend systems I built at Expertflow" },
    { value: "2.5 years", label: "shipping production software, not prototypes" },
    { value: "100% job success", label: "5 stars on every Upwork contract so far" },
  ],
  services: {
    display: true,
    title: "What I build",
    // Description only, on purpose. These cards say what gets built; naming a
    // stack on each one turned a generalist section into six specialisms.
    // Technologies live on the case studies and in the skills section.
    items: [
      {
        icon: "rocket",
        title: "Full product builds",
        description:
          "You describe the product. I build all of it: the interface people use, the logic behind it, the payments, the accounts, the admin panel, and the servers it runs on. You get something live, not a prototype.",
      },
      {
        icon: "grid",
        title: "Backend and APIs",
        description:
          "The part of your product nobody sees and everybody depends on. Accounts, permissions, payments, bookings, notifications, integrations with tools you already use. Built so it holds up when your traffic goes up.",
      },
      {
        icon: "book",
        title: "AI features that actually ground themselves",
        description:
          "A chatbot that answers from your documents instead of making things up. A recommender that suggests the right thing to the right customer. Built so you can check where every answer came from.",
      },
      {
        icon: "arrowUpRight",
        title: "Data pipelines and reporting",
        description:
          "When your numbers come from five different tools and none of them agree. I get everything into one place, on a schedule, with one definition of what a sale or a user actually means.",
      },
      {
        icon: "globe",
        title: "Cloud setup on AWS",
        description:
          "Your product needs somewhere to live that won't fall over, won't leak data, and won't surprise you on the bill. I set it up, lock it down, and deploy automatically from your repo.",
      },
      {
        icon: "document",
        title: "Taking over an existing codebase",
        description:
          "Someone built it, they're gone, and now nobody wants to touch it. I read it, write down what's actually holding it together, get it under tests, and get you shipping again.",
      },
    ],
  },
  // Promoted out of the About page, where it was buried mid-paragraph. A signed
  // recommendation from a CEO is the rarest asset on this site.
  testimonial: {
    display: true,
    // Without this line the quote is an anonymous compliment. With it, it is
    // the person who paid for the largest thing on the site.
    context: "The founder I built the Fitter Health platform for:",
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
          "Before I ask what it should do, I ask what it has to survive. Your budget, your deadline, your compliance rules, and who maintains it after me change the design more than the feature list does.",
      },
      {
        step: "02",
        title: "Agree on the shape",
        description:
          "The data model, the screens, and what happens when things fail, all on paper before I write code. A day arguing about the structure is cheaper than a week migrating it later.",
      },
      {
        step: "03",
        title: "Ship in working slices",
        description:
          "Every slice arrives finished: tested, deployed, usable. You see working software in week one, not month three.",
      },
      {
        step: "04",
        title: "Hand it over",
        description:
          "Infrastructure you can rebuild without me and a repo your next engineer can read. If you bring me back, it should be because you want to.",
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
        // Was phrased as "You're in Pakistan. How does that work?", which
        // raised the objection in the client's voice before answering it.
        q: "How does working across timezones go?",
        a: "I work European hours by default and overlap US-East mornings. My last team was in Spain and we ran async-first with one daily overlap window. It was never the thing that slowed us down.",
      },
      {
        q: "What does a project cost?",
        a: "Most builds land between $5,000 and $25,000 depending on scope, and I quote fixed price once we've agreed what we're building. Smaller pieces of work I bill hourly. I'll give you a real number after one call, not a proposal three days later.",
      },
      {
        q: "What size projects do you take?",
        a: "Typically four weeks and up. Below that I'm rarely the right call, and I'll tell you so rather than take the work.",
      },
      {
        q: "What happens after I message you?",
        a: "I reply within a day. We do one call where you describe the problem and I ask questions. Then I send back what I think it takes, what it costs, and whether I'm honestly the right person. If I'm not, I'll say so.",
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
  // the OG card. The layout template appends " | Saaim Abdullah".
  title: `About`,
  description: `Software engineer in Lahore working EU and US-East hours. Full-stack products, backend systems, data pipelines, and AWS infrastructure.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: bookingLink,
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
          I&rsquo;m Saaim Abdullah, a software engineer in Lahore, working
          European and US-East hours.
        </p>
        <p>
          I build complete software products for businesses, and I build the
          unglamorous parts underneath them. Over the past two years that&rsquo;s
          meant production systems for teams in Europe and beyond: full web
          platforms, backend APIs and services, event-driven data pipelines, AI
          features like RAG chatbots and recommenders, and the AWS
          infrastructure holding it all up.
        </p>
        <p>
          Most of my work has one thing in common. I&rsquo;m the only engineer
          on it. I&rsquo;ve found that suits a specific kind of client: a small
          team with a real product idea and nobody in-house to build it, or an
          existing team that needs one person to own a whole layer and not need
          managing.
        </p>
        <p>
          The clearest example is <strong>Fitter Health</strong>, a preventive
          health platform I built from scratch for a Spain-based team and took
          all the way to production, owning the frontend, backend, cloud, and
          data layer.
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
          I write up how I build these systems on{" "}
          <a href="https://medium.com/@saymmalik08">Medium</a>, the code is on{" "}
          <a href="https://github.com/saaim12">GitHub</a>, and I take on select
          client work through{" "}
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
        // Past tense, and no "Present": the engagement ended. A present-tense
        // claim a client can check and find finished reads as a stretch, and
        // past tense next to a signed recommendation letter reads stronger.
        timeframe: "2026",
        // "Founding Engineer" is accurate — first and only engineer on the
        // product — and it is the title that stops a CTO or founder scrolling.
        // "Software Engineer" undersold this scope by a full level.
        role: "Founding Engineer, full-stack through cloud",
        location: "Remote, Spain-based team",
        achievements: [
          // Lead bullet is the outcome in plain language; the stack follows.
          // Every bullet under it is mechanism, which is correct once this one
          // has done the plain-language job.
          <>
            <strong>
              Took a validated health-tech concept from zero to a live product
              used by patients and providers, as the only engineer
            </strong>
            . Designed and built the frontend, backend, database, cloud
            infrastructure, and data layer end to end.
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
            <strong>
              Built and ran the backend serving 1,000 to 3,000 daily users
            </strong>
            , deployed on AWS as Docker containers behind a load balancer with
            rate limiting, IAM, VPC and S3.
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
    //
    // Each description leads with what the skill is for, in a sentence, and
    // names the technology second. Leading with the tool made these read like
    // a stack list with a person somewhere behind it.
    skills: [
      {
        title: "Languages",
        description: (
          <>
            I write backend, data and ML work in Python, and everything the user
            touches in TypeScript, so one person can carry a feature from the
            screen to the query. Strong SQL for data work, and comfortable in
            Java.
          </>
        ),
        stack: ["python", "typescript", "sql", "javascript", "java"],
        images: [],
      },
      {
        title: "Backend & APIs",
        description: (
          <>
            I build the part of a product nobody sees and everybody depends on:
            accounts, permissions, payments, bookings and integrations, designed
            to hold up as traffic grows. Django, DRF, FastAPI, Flask and
            Node.js/Express, including real-time features over WebRTC.
          </>
        ),
        stack: ["django", "drf", "fastapi", "flask", "nodejs", "webrtc", "celery"],
        images: [],
      },
      {
        title: "Data Engineering",
        description: (
          <>
            I build both batch and streaming pipelines, and model the warehouse
            they land in, so reporting stops disagreeing with itself. Kafka,
            PySpark Structured Streaming and Airflow, modelled as a star schema
            over a medallion architecture, with Pandas and NumPy for processing.
          </>
        ),
        stack: ["kafka", "pyspark", "airflow", "starschema", "medallion", "pandas"],
        images: [],
      },
      {
        title: "Cloud & DevOps",
        description: (
          <>
            I set up somewhere for a product to live that won&rsquo;t fall over,
            won&rsquo;t leak data, and deploys itself from the repo. Production
            AWS across Lambda, EC2, ECS, S3, RDS, Redshift, SQS/SNS, API
            Gateway, IAM, VPC and ALB, containerised with Docker and shipped
            through CI/CD.
          </>
        ),
        stack: ["aws", "ecs", "lambda", "rds", "redshift", "vpc", "iam", "docker", "cicd"],
        images: [],
      },
      {
        title: "Databases",
        description: (
          <>
            I put the rules in the database rather than the form, so bad data
            cannot get in through a path nobody remembered. PostgreSQL and MySQL,
            MongoDB and DynamoDB, with Redis for caching and Firebase for
            real-time data.
          </>
        ),
        stack: ["postgresql", "mysql", "mongodb", "dynamodb", "redis"],
        images: [],
      },
      {
        title: "AI & ML",
        description: (
          <>
            I build AI features you can check: a chatbot that answers from your
            own documents and shows where the answer came from, and recommenders
            that handle a brand-new user by design. RAG, multilingual embeddings
            and recommender engines with scikit-learn and TensorFlow, down to
            TensorFlow Lite Micro for on-device inference.
          </>
        ),
        stack: ["rag", "recommenders", "pgvector", "scikitlearn", "tensorflow"],
        images: [],
      },
      {
        title: "Frontend",
        description: (
          <>
            I build the screens people actually use, so the product ships as one
            thing rather than a backend waiting on someone else. React, Next.js
            and Angular, with clean, accessible, responsive HTML and CSS.
          </>
        ),
        stack: ["react", "nextjs", "angular", "typescript"],
        images: [],
      },
      {
        // Added: testing is the single clearest senior-vs-mid signal in a
        // technical screen, and the Fitter Health bullets already prove it —
        // the skills section just never claimed it.
        title: "Testing & quality",
        description: (
          <>
            I make it hard to break the thing quietly, which is what lets a
            product keep shipping after I hand it over. Automated test suites
            running in CI, database-level integrity constraints, clean reversible
            migrations, and structured logging with request tracing.
          </>
        ),
        stack: ["pytest", "cicd", "githubactions", "migrations"],
        images: [],
      },
      {
        title: "Architecture",
        description: (
          <>
            I decide what a system has to survive before I decide what it does,
            because that is what the design actually has to answer to. REST
            contract design, event-driven systems, multi-tenant isolation,
            medallion and star-schema data modelling, and background job
            architecture.
          </>
        ),
        stack: ["systemdesign", "eventdriven", "multitenancy", "restcontracts"],
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
  // Rendered as the page H1. The <title> uses `label` instead, so the browser
  // tab reads "Work | Saaim Abdullah" rather than repeating the headline.
  title: `Things I've built`,
  // Search-results copy, not page copy — kept inside 160 characters so it is
  // not truncated.
  description: `Client projects and engineering projects across full stack, backend and AI, and data engineering, each with a write-up on the architecture and trade-offs.`,
  // Create new project pages by adding a new .mdx file to src/app/work/projects
  // All projects are listed on the home and /work routes
};

export { person, social, home, about, work, certificates };
