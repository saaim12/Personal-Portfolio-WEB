import { SiteAnchor } from "@/components/SiteAnchor";
import type { CSSProperties } from "react";
import Image from "@/components/SiteImage";
import { Handles, RevealText, Mark, Action } from "@/components/Studio";
import { person } from "@/resources/content";
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
  ["Backend", "APIs", "Django", "PostgreSQL", "Redis", "Background jobs"], ["Product", "Next.js", "React", "TypeScript", "Accessible UI", "Design systems"],
  ["Data & AI", "RAG", "Embeddings", "Pipelines", "Recommendations", "Model serving"], ["Delivery", "AWS", "Docker", "CI/CD", "Monitoring", "Documentation"],
] as const;
const faqs = [
  ["What kinds of products do you build?", "Customer-facing web products, internal platforms, backend services, data systems, and AI-assisted workflows."],
  ["What does the working process look like?", "We establish the problem and constraints, agree on a focused scope, then work in visible increments with clear review points."],
  ["Can you work with an existing codebase?", "Yes. I start by understanding its contracts, deployment path, risks, and tests before proposing targeted changes."],
  ["What happens after delivery?", "The handover includes documentation, operational notes, and the context another engineer needs to maintain the system confidently."],
] as const;

export default function Services(){return <div className="studioPage servicesPage">
  <div className="studioContainer servicesHero"><div className="servicesHeroContent"><p className="servicesAvailability"><Image src={person.avatar} width={34} height={34} alt=""/>Available for thoughtful projects</p><h1 className="displayType"><RevealText text="What"/><span className="servicesSelection"><Mark kind="spool"/><RevealText text="I do"/><Mark kind="pinwheel"/><Handles/></span></h1><p className="servicesHeroSummary">Engineering support from the first architecture decision to deployment and handover.</p><Action href="/contact">Contact me</Action></div></div>
  <section className="serviceChapters" aria-label="Engineering services">{services.map(([title,text,color,,capabilities],index)=><article key={title} className={`servicePanel ${color}`}><ChapterBoundary/><div className="servicePanelInner studioContainer"><span className="serviceNumber">(0{index+1})</span><div className="chapterArtworkLayer" aria-hidden="true"><ChapterArtwork chapter={index}/></div><h2 className="displayType">{[title.substring(0,title.lastIndexOf(" ")),title.substring(title.lastIndexOf(" ")+1)].map((line,lineIndex)=><span className="chapterTitleLine" key={lineIndex}><RevealText text={line}/></span>)}</h2><p>{text}</p><div className="servicePanelCapabilities">{capabilities.map(item=><span key={item}>{item}</span>)}</div></div></article>)}<ChapterBoundary last/></section>
  <section className="serviceProcess" aria-labelledby="process-heading"><div className="processSticky"><div className="serviceSectionHeading"><span className="handwritten">from idea to handover</span><h2 id="process-heading" className="displayType">How I<br/>work</h2></div><div className="processRail">{process.map(([title,text,color],index)=><article className={`processCard ${color}`} key={title}><span className="processIndex"><StepPointer/>0{index+1}</span><ProcessArtwork step={index}/><h3>{title}</h3><p>{text}</p><span className="processArrow"><ProcessArrow/></span></article>)}</div></div></section>
  <section className="capabilitiesSection studioContainer" aria-labelledby="capabilities-heading"><div className="serviceSectionHeading"><h2 id="capabilities-heading" className="displayType">Core<br/>capabilities</h2></div><div className="capabilityCloud">{capabilityGroups.map((group,groupIndex)=><div className={`capabilityGroup capabilityTone${groupIndex+1}`} key={group[0]}><h3>{group[0]}</h3>{group.slice(1).map((item,itemIndex)=><span className="capabilityChip" style={{"--chip-index":itemIndex} as CSSProperties} key={item}>{item}</span>)}</div>)}</div></section>
  <section className="serviceFaqSection studioContainer" aria-labelledby="faq-heading"><div className="serviceSectionHeading"><h2 id="faq-heading" className="displayType">FAQ</h2></div><div className="serviceFaqGrid">{faqs.map(([question,answer],index)=><article className="serviceFaq" key={question}><div className="faqLabel">Question</div><div className="faqQuestion"><span className={`faqUser faqTone${index}`} aria-hidden="true"><svg viewBox="0 0 48 48"><circle cx="24" cy="17" r="8"/><path d="M8 43v-6a16 16 0 0 1 32 0v6Z"/></svg></span><div><span className="faqUsername">User</span><h3>{question}</h3><span className="faqReaction">✦ 1</span></div></div><div className="faqAnswer"><Image src={person.avatar} width={48} height={48} alt="Saaim Abdullah"/><p>{answer}</p></div></article>)}</div></section>
  <div className="allWorkAction servicesAction"><Action href="/projects">See the work</Action><SiteAnchor className="quietLink" href="/professional-experience">Experience &amp; skills ↗</SiteAnchor></div><Contact animated/>
</div>;}
