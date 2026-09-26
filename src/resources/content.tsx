import type { About, Home, Person, Social, Work } from "@/types/content.types";

const person: Person = {
  firstName: "Saaim",
  lastName: "Abdullah",
  name: "Saaim Abdullah",
  // One label, used by the footer, the About page and the Person schema, so
  // the site never states the role two different ways on two different routes.
  role: "Software engineer",
  avatar: "/images/avatar.jpg",
  email: "saaim.abdullah.work@gmail.com",
  location: "Asia/Karachi", // IANA time zone (used for the clock). Display city is set separately below.
  city: "Lahore, Pakistan",
  languages: ["English", "Urdu"], // optional: Leave the array empty if you don't want to display languages
  locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

// Kept as a social link only. WhatsApp was the primary contact button on every
// surface, which is wrong for this audience: a recruiter will not open WhatsApp
// to an unknown international number, and a messaging app as the front door
// reads freelance.
const whatsapp = "https://wa.me/923249923289";

// Demoted from the hero and the navbar to a secondary button in the contact
// block. Email is what a recruiter reaches for first; a booking link asks a
// stranger to commit to a slot before they have decided anything.
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
  // Not essential, so it renders in the footer and nowhere else. A marketplace
  // profile next to GitHub in the hero tells a recruiter they are looking at a
  // contractor's site, and it is the one link here that argues against the
  // rest of the page. Still listed, because hiding it would be worse than
  // demoting it.
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
  image: "/images/og/home.jpg",
  label: "Home",
  // The homepage is the one route the title template does not suffix, so this
  // carries the name itself. Kept inside 60 characters: the previous version
  // ran to 74 and Google was cutting it after "Distributed", which is the one
  // word in it doing any work.
  title: `${person.name} — Software Engineer`,
  // Kept inside 160 chars so Google doesn't truncate it mid-phrase.
  description: "Saaim Abdullah is a software engineer in Lahore who turns complex software problems into dependable products, APIs, and data systems.",
  // Plain language, on purpose. The previous version opened with "distributed
  // systems" and a subline about schemas, queues and replicas, which is the
  // right vocabulary for the case studies and the wrong one for the first
  // fifteen seconds: most people reading this are recruiters, and a headline
  // they have to decode is a headline they skip. The technical claims are
  // still on the page, they just start below the fold, where someone who wants
  // them is looking for them.
  headline: "Software Engineer — Backend & Full Stack",
  subline: <>I take software from idea to reliable delivery: backend systems, full-stack products, APIs, data pipelines, cloud infrastructure, and the integrations that connect them. With Python, TypeScript, PostgreSQL, and AWS, I help teams solve difficult engineering problems and ship with confidence.</>,
  // One CTA definition drives the hero, the navbar and the mobile menu. Email,
  // not a booking link: it is the channel a recruiter reaches for first, and it
  // costs the reader nothing to use.
  cta: {
    label: "Email me",
    href: `mailto:${person.email}`,
  },
  // Four facts a recruiter otherwise has to hunt for, above everything else on
  // the page. Separate strings, not one joined line: the layout puts the rules
  // between them so no separator character is wedged into the copy.
  //
  // Deliberately silent on visa sponsorship. Stating "no sponsorship required"
  // when it is not true is the kind of thing that unravels at offer stage, and
  // stating that sponsorship IS required filters him out of remote roles where
  // the question never arises. "Remote or relocation" is accurate for both and
  // invites the question at the point where it actually matters.
  //
  // Saaim: if you hold a visa or citizenship that removes the question for a
  // specific market, add it here. That is the one version of this line that
  // wins something rather than merely avoiding a problem.
  status: [
    "Open to software engineering roles and serious product work",
    "Based in Lahore, working European and US-East hours",
    "Backend, full-stack, cloud, and data engineering",
    "Reliable delivery from architecture to handover",
  ],
  // Scope and scale, not credentials. Every value is checkable against the live
  // site, the CV, the signed letter or the repos. "100% job success on Upwork"
  // was cut: it is a marketplace metric, and to a hiring manager it reads as
  // evidence of freelancing rather than of engineering.
  // Four tiles, because four fit on one row at the content width and five
  // wrapped to 3 + 2. The years tile was the one to drop: it was the weakest
  // of the five, and it was also the one carrying a number ("2.5 years") that
  // the dates on the linked CV contradicted.
  proof: [
    { value: "End to end", label: "from product architecture and APIs to deployment and handover" },
    { value: "1,000 to 3,000", label: "daily users on backend services I owned at Expertflow" },
    { value: "130 ms to 30 ms", label: "admin API latency, on Redis caching and index tuning" },
    { value: "5 systems", label: "with written architecture breakdowns, not just repos" },
  ],
  practice: {
    display: true,
    label: "Engineering practice",
    title: "How I work",
    intro:
      "Six habits that survived contact with production, each one bought with a specific failure.",
    items: [
      {
        icon: "warning",
        title: "Design the failure path first",
        description:
          "Before I build a feature I write down how it breaks. The notification pipeline on Fitter Health taught me that expensively: fan-out with no durable buffer drops messages silently, and because nothing errors, nothing alerts. Now a queue gets its dead-letter path before it gets traffic.",
      },
      {
        icon: "database",
        title: "Constraints in the database, not the form",
        description:
          "Application-level validation is a convenience, not a guarantee. If an invariant actually matters it belongs in a constraint or a transaction, because sooner or later someone writes a management command that never touches your serializer.",
      },
      {
        icon: "rocket",
        title: "Small deployable slices",
        description:
          "Every change ships tested and deployed rather than accumulating on a branch. Working alone, this is the only thing standing between you and a three-week integration you cannot debug.",
      },
      {
        icon: "document",
        title: "Handover as a deliverable",
        description:
          "Fitter Health was handed over documented, with infrastructure the client can rebuild without me. “Can someone else run this” is part of done, not paperwork afterwards.",
      },
      {
        icon: "search",
        title: "Read the system before changing it",
        description:
          "Inherited code gets a written assessment first: what is solid, what is fragile and load-bearing, and what each change costs. Guessing is how you break the thing that was quietly holding everything together.",
      },
      {
        icon: "scale",
        title: "Measure before you scale",
        description:
          "Scaling is a measurement problem before it is an architecture problem. An admin endpoint at Expertflow went from 130 ms to 30 ms on a Redis cache and two indexes, which no number of extra replicas would have bought. Once the cheap wins are gone, then you split the services across pods and let the autoscaler follow the traffic.",
      },
    ],
  },
  // Promoted out of the About page, where it was buried mid-paragraph. A signed
  // recommendation from a CEO is the rarest asset on this site.
  testimonial: {
    display: true,
    // Without this line the quote is an anonymous compliment. With it, it is
    // the person who paid for the largest thing on the site. A signed written
    // reference is rare for an engineer at this stage, so it stays prominent.
    context: "The founder of the health platform I built and handed over:",
    quote:
      "He frequently delivered ahead of scope and raised considerations we had not thought to ask about.",
    author: "Beth Iriarte",
    role: "Co-founder & CEO, Fitter Health",
    letter: "/Fitter-Recommendation-Letter.pdf",
  },
  // Data structures and algorithms, in the open.
  //
  // This used to be one secondary button at the bottom of /work and a clause in
  // an About paragraph, which is nowhere. Almost every loop opens with an
  // algorithms round, and a recruiter screening for one has no way to tell a
  // candidate who practises from one who doesn't unless the work is visible.
  // The repo is real and public, so it costs nothing to show what is in it.
  fundamentals: {
    display: true,
    label: "Fundamentals",
    title: "Algorithms in the open",
    intro:
      "Most interview loops open with an algorithms round. Mine is public, and has been for a long time.",
    link: "https://github.com/saaim12/DSA-Python",
    linkLabel: "DSA-Python on GitHub",
    items: [
      {
        icon: "stack",
        title: "Structures, implemented not imported",
        description:
          "Arrays, linked lists, stacks and queues, binary trees, tries and graphs, each written from scratch. Knowing what a dict costs you, and when a heap beats a sort, is the same instinct that decides whether a query needs an index or a rewrite.",
      },
      {
        icon: "graph",
        title: "Algorithms with the reasoning attached",
        description:
          "Binary search and its off-by-one traps, merge sort, BFS and DFS, Dijkstra and Bellman-Ford, minimum spanning trees, cycle detection, topological sort, sliding window and Kadane, and dynamic programming built up from the recurrence rather than memorised.",
      },
      {
        icon: "code",
        title: "Written to be read",
        description:
          "Clean Python, more than one approach where the trade-off is interesting, complexity analysis on each, and test cases. The daily problems and the syntax notes live in the same repo, because the point is the reasoning, not the streak.",
      },
    ],
  },
  looking: {
    display: true,
    label: "Working together",
    title: "A dependable engineering partner",
    body: (
      <>
        <p>
          Bring me a product problem, an overloaded backend, a data workflow,
          or a system that needs to become easier to operate. I can help shape
          the architecture, build the core software, connect the services,
          improve performance, and leave the team with something documented
          and maintainable.
        </p>
        <p>
          My strongest work is in Python and TypeScript across Django, REST
          APIs, PostgreSQL, AWS, queues, ETL, and modern web applications. I am
          comfortable taking responsibility for the details that make software
          trustworthy: clear contracts, useful tests, safe migrations, failure
          recovery, observability, and a clean handover.
        </p>
        <p>
          I work well with founders, product teams, designers, and senior
          engineers. I communicate clearly, learn quickly, and stay accountable
          from the first technical decision through production support. Open to
          remote software engineering roles with EU or US-East teams.
        </p>
      </>
    ),
  },
};

const about: About = {
  path: "/about",
  label: "About",
  // No name here. The metadata template in layout.tsx appends it, and
  // including it produced "About, Saaim Abdullah | Saaim Abdullah".
  // Never rendered on screen (the H1 is the name); this is the <title> and
  // the OG card. The layout template appends " | Saaim Abdullah".
  title: "About",
  description: "Software engineer in Lahore, working EU and US-East hours. Distributed backends and data platforms in Django, PostgreSQL, AWS, Kubernetes, Kafka and Spark.",
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  // Off. A "Schedule a call" pill at the top of a candidate's About page reads
  // as a consultant's booking funnel. The link still exists, in the contact
  // block on the home page, where someone who wants it will look for it.
  calendar: {
    display: false,
    link: bookingLink,
  },
  intro: {
    display: true,
    title: "Introduction",
    // Real <p> elements, not <br /><br />. The About page renders this inside a
    // container that is display:flex, which turned every inline <strong> and
    // <a> into its own stacked row: "Fitter Health" and "Medium" were landing
    // on separate lines like headings. Block paragraphs fix it structurally.
    // The previous version opened by describing what kind of client suits him,
    // which is the wrong first impression for a hiring audience: it answers a
    // question a recruiter is not asking and answers it in a buyer's language.
    // Upwork was dropped from the prose for the same reason. It is still in the
    // icon row above, where it is a link rather than a claim about the work.
    description: (
      <>
        <p>
          I&rsquo;m Saaim Abdullah, a software engineer based in Lahore, working
          European and US-East hours. I build distributed backends: services
          that hold up under traffic, pipelines that can be replayed, and data
          models that do not have to be apologised for a year later.
        </p>
        <p>
          Two years of that so far. At <strong>Expertflow</strong>, a Cisco UCCE
          solution partner, I owned backend services for 1,000 to 3,000 daily
          users, deployed them across pods on AWS EKS with autoscaling driven by
          request throughput, and built event-driven ETL on Lambda, MWAA,
          PySpark and EMR. At <strong>Fitter Health</strong> I was the entire
          engineering function: a preventive health platform for a Spain-based
          team, taken from an empty repo to live production, with the Next.js
          frontend, the Django and DRF backend, a 106-table PostgreSQL schema,
          the AWS estate and the Odoo integration all mine, then documented and
          handed over.
        </p>
        <p>
          Those two jobs taught opposite lessons and I needed both. In a team
          you learn that the contract between services is the real product. On
          your own you learn that nobody catches your bad data model, nobody
          notices the queue quietly dropping messages, and nobody documents the
          system if you don&rsquo;t.
        </p>
        <p>
          So I start from the failure modes, because the interesting part of a
          design is what it does when something is already broken. A queue that
          drops messages silently is worse than one that refuses them loudly, so
          the durable buffer and the dead-letter path come before the feature. A
          constraint in the database beats a check in the serializer, because
          the serializer is not on the path a management command takes. And I
          would rather argue about a schema for a day than migrate one for a
          week.
        </p>
        <p>
          I&rsquo;m now looking for a full-time role where I own a system rather
          than a ticket queue. I write up how I build things on{" "}
          <a href="https://medium.com/@saymmalik08">Medium</a>, the code is on{" "}
          <a href="https://github.com/saaim12">GitHub</a>, and my data
          structures and algorithms work is public in{" "}
          <a href="https://github.com/saaim12/DSA-Python">DSA-Python</a>:
          graphs, dynamic programming, tries and the rest, written out with
          complexity analysis rather than pasted from a solutions page.
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
        // "Founding Engineer" was accurate, first and only engineer on the
        // product, and it was also a title a reviewer would test against an
        // engagement of a few months. This one claims less and cannot be
        // argued with, and the bullets underneath carry the scope anyway. A
        // title that survives the follow-up question is worth more than a
        // title that stops the scroll.
        role: "Software Engineer, full-stack and cloud",
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
            infrastructure, and data layer end to end, then documented and
            handed the system over.
          </>,
          // Redshift and API Gateway were removed here and from the Cloud and
          // DevOps skills block. The published architecture diagram shows
          // neither, and a stack list that contradicts the site's own diagram
          // is the first thing a technical reviewer notices. Omitting a service
          // he did use costs nothing; claiming one the diagram contradicts
          // costs the whole page. If they were genuinely in the build, the fix
          // is to put them on the diagram, then add them back here.
          "Shipped the full AWS estate: ECS, RDS, S3, SNS, SQS, IAM and VPC, containerised, least privilege, and production-ready across two availability zones.",
          "Defined every API contract and backend workflow, designing for reliability, maintainability, and data-driven features from day one.",
          "Built the notification and file-handling architecture on Celery and Redis, and handed over a documented API surface backed by 135 passing tests, reversible migrations, and database-level integrity constraints throughout.",
          "Modelled the membership and entitlement layer across a 106-table PostgreSQL schema: credit balances, coach and user session booking, an e-commerce store, an admin CRM, and invoice status synchronised with Odoo across more than one payment rail, under clinical compliance rules and a large role-based access matrix.",
          "Designed and shipped the ETL pipeline into a star-schema PostgreSQL warehouse serving three consumers at once: feature workflows for the data science team, product analytics on best-selling items, and aggregated reporting for external partners. One modelled layer, so the three never disagree about what a number means.",
          "Automated the member lifecycle email on EventBridge-scheduled Lambda and SES: renewal reminders that replaced a manual call-and-chase process, and inactivity re-engagement that runs without anyone triggering it.",
          "Diagnosed silent notification loss in the inactivity re-engagement pipeline. SNS was fanning out directly to consumers with no durable buffer, so anything failing mid-delivery was gone with no error raised. Putting SQS between SNS and the consumers made delivery retryable and gave the failures somewhere to land.",
        ],
        images: [],
      },
      {
        company: "Expertflow",
        timeframe: "2024 to 2026",
        role: "Software Engineer, Backend and Cloud",
        location: "Cisco UCCE solution partner, Lahore",
        // Rewritten against the CV, which carried several things this section
        // did not: the EKS deployment and its autoscaling policy, the Redis and
        // indexing work behind the latency number, and the full data-engineering
        // stack (MWAA, EMR, PySpark, Glue) rather than "Lambda and S3". The
        // site was quietly claiming less than the CV it links to.
        achievements: [
          <>
            <strong>
              Owned backend REST APIs serving 1,000 to 3,000 daily users
            </strong>
            , deployed as Docker containers on AWS EC2 behind an Application
            Load Balancer, with rate limiting, scoped IAM and VPC isolation.
          </>,
          <>
            <strong>
              Re-deployed the backend as a distributed system on AWS EKS
            </strong>
            , splitting services across pods with Horizontal Pod Autoscaler
            policies that scale replicas on request throughput, so traffic
            spikes cost capacity instead of availability.
          </>,
          "Cut admin panel response time from 130 ms to 30 ms with Redis caching and database index tuning, after profiling showed the queries rather than the application were the cost.",
          "Designed and shipped event-driven batch and streaming ETL pipelines on AWS Lambda, MWAA (managed Airflow), EMR, PySpark, Glue and S3, automating ingestion, standardisation and cataloguing of raw inputs into analytics-ready Parquet for BI reporting and ML feature workflows.",
          "Developed a real-time voice and video communication SDK on WebRTC, and the REST APIs binding frontend clients, SDK modules and third-party platforms together.",
          "Implemented a chatbot workflow that cut first-response time on inbound queries, delivered SQL-based analytics for customer insight reporting, and hardened platform access with time-bound permission controls.",
          "Worked across the Angular frontend, backend and SDK teams to ship features end to end, which is where I learned that the contract between two services is the thing worth arguing about.",
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
            BS Computer Engineering, 2021 to 2025. Coursework across data structures,
            databases, computer networks, operating systems, software engineering,
            computer architecture, and machine learning.
          </>
        ),
      },
      {
        name: "Certifications",
        // "In progress" with no date reads as abandoned; a scheduled exam date
        // reads as committed. Narrow this to a month once the exam is booked.
        // The IBM "Getting Started with Git and GitHub" course was removed.
        // At this level a Git intro on the CV is a negative signal, not a
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
        // First, not last. This is the most senior-sounding block on the page
        // and it used to sit at the bottom, where a thirty-second scan never
        // reached it.
        title: "Architecture & distributed systems",
        description: (
          <>
            I decide what a system has to survive before I decide what it does,
            because that is what the design actually has to answer to. Services
            split across pods and scaled on throughput, fan-out buffered through
            durable queues with dead-letter paths, event-driven workflows, REST
            contract design, multi-tenant isolation, and medallion and
            star-schema data modelling.
          </>
        ),
        stack: [
          "systemdesign",
          "eventdriven",
          "kubernetes",
          "multitenancy",
          "restcontracts",
        ],
        images: [],
      },
      {
        title: "Languages",
        description: (
          <>
            I write backend, data and ML work in Python, and everything the user
            touches in TypeScript, so one person can carry a feature from the
            screen to the query. Strong SQL: window functions, query plans, and
            the indexes that decide whether either one finishes.
          </>
        ),
        // Java was removed. Nothing on this site, in the work history or in the
        // repos ships it, which made it the one line here a screener could
        // probe and get a thin answer to. One unconvincing answer makes a
        // reviewer discount the eight solid blocks around it.
        stack: ["python", "typescript", "sql", "javascript"],
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
            they land in, so reporting stops disagreeing with itself. Kafka into
            PySpark Structured Streaming, orchestrated with Airflow and MWAA,
            processed on EMR and catalogued with Glue, landing as a star schema
            over a medallion architecture that can be replayed when a definition
            changes.
          </>
        ),
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
        images: [],
      },
      {
        title: "Cloud & DevOps",
        description: (
          <>
            I set up somewhere for a product to live that won&rsquo;t fall over,
            won&rsquo;t leak data, and deploys itself from the repo. Production
            AWS across Lambda, EC2, ECS, EKS, S3, RDS, SQS and SNS, IAM, VPC and
            ALB, containerised with Docker, orchestrated on Kubernetes with
            autoscaling policies, and shipped through GitLab and GitHub CI.
          </>
        ),
        // Redshift and API Gateway removed to match the published Fitter Health
        // architecture diagram, which shows neither. Same TODO as the work
        // experience bullet: confirm, then fix either the copy or the diagram.
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
        images: [],
      },
      {
        title: "Databases",
        description: (
          <>
            I put the rules in the database rather than the form, so bad data
            cannot get in through a path nobody remembered. PostgreSQL as the
            default, including pgvector for retrieval, MongoDB and DynamoDB
            where the access pattern earns it, and Redis for caching and as a
            Celery broker.
          </>
        ),
        // MySQL and Firebase were dropped: neither appears in the CV, in the
        // work history or in any repo linked from this site, and an
        // unsupported line here is the one a screener probes.
        stack: ["postgresql", "pgvector", "mongodb", "dynamodb", "redis"],
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
            thing rather than a backend waiting on someone else. React and
            Next.js, Angular alongside the frontend team at Expertflow, with
            clean, accessible, responsive HTML and CSS.
          </>
        ),
        // Angular is back, now that the Expertflow entry says where it was
        // used. It came off this list when nothing on the site accounted for
        // it; a claim with a job attached to it is a different thing from a
        // chip in a list.
        stack: ["react", "nextjs", "typescript", "angular"],
        images: [],
      },
      {
        // Added: testing is the single clearest senior-vs-mid signal in a
        // technical screen, and the Fitter Health bullets already prove it.
        // The skills section just never claimed it.
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
  // IBM's "Getting Started with Git and GitHub" was removed, for the same
  // reason the About page's certification list already excluded it: at this
  // level a Git intro reads as a negative signal next to two AWS credentials,
  // and the site was listing it in one place while arguing against it in
  // another. Restore both together if it goes back:
  // { title: "Getting Started with Git and GitHub", issuer: "IBM",
  //   via: "Coursera", date: "February 2026",
  //   verify: "https://coursera.org/verify/TDGYZCBYXJ7S" },
];

const work: Work = {
  path: "/work",
  label: "Work",
  // Rendered as the page H1, and also used as the <title>, which the layout
  // template suffixes to "Systems I've built | Saaim Abdullah".
  title: `Systems I've built`,
  // Search-results copy, not page copy. Kept inside 160 characters so it is
  // not truncated.
  description: "Five systems with written architecture breakdowns: the constraint that bound, the design it forced, the trade-offs, and what I would build differently now.",
  // Create new project pages by adding a new .mdx file to src/app/work/projects
  // All projects are listed on the home and /work routes
};

export { person, social, home, about, work, certificates, bookingLink };
