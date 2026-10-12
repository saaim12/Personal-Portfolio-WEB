import { SiteAnchor } from "@/components/SiteAnchor";
import type { CSSProperties } from "react";
import Image from "@/components/SiteImage";
import { Handles, RevealText, Mark, Action } from "@/components/Studio";
import { person } from "@/resources/content";
import { PageSchema } from "@/components/PageSchema";
import { Contact } from "@/components/Contact";
import { pageMeta } from "@/resources/seo";
import { ChapterArtwork, ChapterBoundary, ProcessArtwork, ProcessArrow, StepPointer } from "./ServiceArtwork";
import "./services.css";

export async function generateMetadata(){return pageMeta({title:"Services",description:"Software engineering by Saaim Abdullah: backend APIs, full stack products, data and AI systems, and cloud delivery from architecture to handover.",path:"/services"});}

const services = [
  ["Backend systems", "APIs and workflows for accounts, permissions, payments, bookings, and integrations. Built with explicit contracts, validation, error handling, and background processing.", "yellow", "pinwheel", ["API design", "System architecture", "Integrations", "Background processing"]],
  ["Full stack products", "From requirements to working software: React and Next.js interfaces connected to dependable Django services, with deployment, documentation, and handover.", "green", "flower", ["React & Next.js", "Django", "Product engineering", "Accessible interfaces"]],
  ["Data & AI", "Batch and streaming pipelines, multilingual retrieval, and recommendation systems. Data preparation, API serving, customer isolation, and recovery paths are part of the build.", "pink", "target", ["RAG systems", "Data pipelines", "Recommendation", "Model serving"]],
  ["Cloud & delivery", "Containerized applications on AWS with scoped access, automated delivery, and operational visibility. Infrastructure that supports the product and the people maintaining it.", "blue", "steps", ["AWS", "Containers", "CI/CD", "Observability"]],
] as const;
const process = [
  ["Discover", "Map the problem, users, constraints, and the evidence needed to make a useful decision.", "blue", "target"],
  ["Define", "Turn uncertainty into a clear scope, architecture, delivery plan, and measurable outcome.", "yellow", "pinwheel"],
  ["Design", "Shape flows, contracts, interfaces, and failure paths before expensive implementation choices settle.", "pink", "steps"],
  ["Deliver", "Build, test, deploy, document, and hand over a system that another engineer can maintain.", "green", "flower"],
] as const;
const capabilityGroups = [
  ["Backend", "Django", "Node.js", "Spring Boot", "REST APIs", "Data Modelling"], ["Product", "Next.js", "React", "TypeScript", "Accessible UI", "Design systems"],
  ["Data & AI", "RAG", "Embeddings", "Pipelines", "Recommendations", "Model serving"], ["Delivery", "AWS", "Docker", "CI/CD", "Monitoring", "Documentation"],
] as const;
const technicalSkills = [
  { title: "Languages & fundamentals", skills: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "C++", "C#", "Data Structures & Algorithms", "System Design"] },
  { title: "Backend & distributed systems", skills: ["Spring Boot", "Node.js", "Express.js", "Django", "Django REST Framework", "FastAPI", "Flask", "Celery", "REST API Design", "gRPC", "Protocol Buffers", "WebRTC", "Microservices", "Event-Driven Architecture", "Authentication & Authorization", "Background Processing"] },
  { title: "Frontend & product development", skills: ["React", "Next.js", "Angular", "HTML5", "CSS3", "Responsive Design", "SDK Development", "API Integration", "Accessible UI"] },
  { title: "Databases & data modelling", skills: ["Data Modelling", "ER Diagrams", "Relational Schema Design", "Star Schema", "Dimensional Modelling", "PostgreSQL", "MySQL", "Microsoft SQL Server", "MongoDB", "DynamoDB", "Redis", "Database Indexing", "Query Optimization"] },
  { title: "Data engineering", skills: ["ETL / ELT", "Batch & Streaming Pipelines", "Apache Kafka", "Apache Spark", "PySpark", "Airflow", "AWS Glue", "Amazon EMR", "Parquet", "Medallion Architecture", "Bronze / Silver / Gold", "Data Quality", "Deduplication", "Warehouse Design"] },
  { title: "AI & machine learning", skills: ["Retrieval-Augmented Generation", "pgvector", "Multilingual Embeddings", "Tenant-Isolated Retrieval", "LLM Integration", "Recommendation Systems", "TensorFlow", "TensorFlow Lite Micro", "scikit-learn", "Model Serving", "Feature Pipelines"] },
  { title: "Cloud, DevOps & reliability", skills: ["AWS EC2", "AWS ECS", "AWS EKS", "AWS Lambda", "AWS RDS", "Amazon S3", "Amazon SES", "Amazon SNS", "Amazon SQS", "EventBridge", "IAM", "VPC", "ALB", "Docker", "Kubernetes", "CI/CD", "Git", "GitLab", "Linux", "Monitoring", "Retry & Dead-Letter Queues", "Testing & Documentation"] },
  { title: "Tools & integrations", skills: ["Postman", "Jira", "Firebase", "Odoo Integration", "Third-Party APIs", "GitHub", "Technical Writing"] },
] as const;
const faqs = [
  ["How do you design reliable backend systems?", "I start with domain rules, API contracts, database constraints, and failure paths. At Fitter Health, I addressed silent notification loss, documented the services, and handed over a platform with 135 passing tests. Tests and recovery paths support the delivery; they are not a claim of zero production failures."],
  ["How do you keep customer data separate in a RAG system?", "In my multilingual RAG project, tenant identity comes from verified JWT authentication. Documents and chunks belong to a tenant, and pgvector retrieval is filtered by that identity before context reaches Gemini. Quotas limit usage separately from authorization; a caller-supplied tenant ID is not trusted."],
  ["How do you structure and recover a data pipeline?", "My e-commerce pipeline separates Kafka/Spark ingestion from hourly Airflow transformations. Bronze Parquet preserves replayable source events, silver validates and deduplicates records, and gold loads a four-table PostgreSQL star schema. Checkpoints track stream progress; repeatable warehouse writes and business keys address duplicate delivery."],
  ["What happens after delivery?", "The handover covers architecture, deployment, configuration, tests, and operational failure paths. Fitter Health includes a signed recommendation available with the case study. For learning projects, I distinguish implemented behavior from proposed benchmarks and hardening work so the next engineer can evaluate the evidence."],
] as const;

export default function Services(){return <div className="studioPage servicesPage"><PageSchema title="Services" description="Backend APIs, full stack products, data and AI systems, and cloud delivery by Saaim Abdullah." path="/services" />
  <div className="studioContainer servicesHero"><div className="servicesHeroContent"><p className="servicesAvailability"><Image src={person.avatar} width={34} height={34} alt=""/>Available for thoughtful projects</p><h1 className="displayType"><RevealText text="What"/><span className="servicesSelection"><Mark kind="spool"/><RevealText text="I do"/><Mark kind="pinwheel"/><Handles/></span></h1><p className="servicesHeroSummary">Engineering support from the first architecture decision to deployment and handover.</p><Action href="/contact">Contact me</Action></div></div>
  <section className="serviceChapters" aria-label="Engineering services">{services.map(([title,text,color,,capabilities],index)=><article key={title} className={`servicePanel ${color}`}><ChapterBoundary/><div className="servicePanelInner studioContainer"><span className="serviceNumber">(0{index+1})</span><div className="chapterArtworkLayer" aria-hidden="true"><ChapterArtwork chapter={index}/></div><h2 className="displayType">{[title.substring(0,title.lastIndexOf(" ")),title.substring(title.lastIndexOf(" ")+1)].map((line,lineIndex)=><span className="chapterTitleLine" key={lineIndex}><RevealText text={line}/></span>)}</h2><p>{text}</p><div className="servicePanelCapabilities">{capabilities.map(item=><span key={item}>{item}</span>)}</div></div></article>)}<ChapterBoundary last/></section>
  <section className="serviceProcess" aria-labelledby="process-heading"><div className="processSticky"><div className="serviceSectionHeading"><span className="handwritten">from idea to handover</span><h2 id="process-heading" className="displayType">How I<br/>work</h2></div><div className="processRail">{process.map(([title,text,color],index)=><article className={`processCard ${color}`} key={title}><span className="processIndex"><StepPointer/>0{index+1}</span><ProcessArtwork step={index}/><h3>{title}</h3><p>{text}</p><span className="processArrow"><ProcessArrow/></span></article>)}</div></div></section>
  <section className="capabilitiesSection studioContainer" aria-labelledby="capabilities-heading"><div className="serviceSectionHeading"><h2 id="capabilities-heading" className="displayType">Core<br/>capabilities</h2></div><div className="capabilityCloud">{capabilityGroups.map((group,groupIndex)=><div className={`capabilityGroup capabilityTone${groupIndex+1}`} key={group[0]}><h3>{group[0]}</h3>{group.slice(1).map((item,itemIndex)=><span className="capabilityChip" style={{"--chip-index":itemIndex} as CSSProperties} key={item}>{item}</span>)}</div>)}</div></section>
  <section className="technicalSkillsSection studioContainer" aria-labelledby="technical-skills-heading">
    <div className="serviceSectionHeading"><span className="handwritten">technologies and practices</span><h2 id="technical-skills-heading" className="displayType">Technical skills</h2></div>
    <p className="technicalSkillsIntro">The technologies and engineering practices I work with, study, and use across backend, frontend, data, AI, and cloud projects.</p>
    <div className="technicalSkillsGrid">{technicalSkills.map(group => <article className="technicalSkillGroup" key={group.title}><h3>{group.title}</h3><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
  </section>
  <section className="serviceFaqSection studioContainer" aria-labelledby="faq-heading"><div className="serviceSectionHeading"><h2 id="faq-heading" className="displayType">FAQ</h2></div><div className="serviceFaqGrid">{faqs.map(([question,answer],index)=><article className="serviceFaq" key={question}><div className="faqLabel">Question</div><div className="faqQuestion"><span className={`faqUser faqTone${index}`} aria-hidden="true"><svg viewBox="0 0 48 48"><circle cx="24" cy="17" r="8"/><path d="M8 43v-6a16 16 0 0 1 32 0v6Z"/></svg></span><div><span className="faqUsername">User</span><h3>{question}</h3><span className="faqReaction">✦ 1</span></div></div><div className="faqAnswer"><Image src={person.avatar} width={48} height={48} alt="Saaim Abdullah"/><p>{answer}</p></div></article>)}</div></section>
  <div className="allWorkAction servicesAction"><Action href="/projects">See the work</Action><SiteAnchor className="quietLink" href="/professional-experience">Experience &amp; skills ↗</SiteAnchor></div><Contact animated/>
</div>;}
