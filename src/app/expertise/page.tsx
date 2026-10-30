import Link from "next/link";
import { pageMeta } from "@/resources/seo";
import { PageSchema } from "@/components/PageSchema";
import { specialties } from "@/resources/specialties";
import { PageHeading } from "@/components/Studio";
import { Contact } from "@/components/Contact";
import "./editorial.css";
const description="Explore Saaim Abdullah's backend, data, AI, cloud, SaaS, and distributed systems engineering capabilities, supported by public project case studies.";
export async function generateMetadata(){return pageMeta({title:"Software Engineering Expertise",description,path:"/expertise"});}
export default function ExpertiseIndex(){return <div className="studioPage"><PageSchema title="Software Engineering Expertise" description={description} path="/expertise" items={specialties.map(item=>({path:`/expertise/${item.slug}`,title:item.title,description:item.summary}))}/><div className="studioContainer engineeringHub">
<div className="engineeringIntro"><PageHeading title="Engineering expertise" note="architecture / implementation / handover"><p>Explore how I approach backend systems, AI retrieval, data pipelines, cloud delivery and full-stack products. Every topic links to actual work and explains trade-offs, tests, and failure modes.</p></PageHeading></div>
<section className="engineeringCardGrid" aria-label="Engineering specializations">{specialties.map(s=><Link prefetch={false} className="engineeringCard" key={s.slug} href={`/expertise/${s.slug}`}><small>ENGINEERING FOCUS</small><h2>{s.title}</h2><p>{s.summary}</p><span className="engineeringArrow">Approach and case studies ↗</span></Link>)}</section>
<div className="engineeringClosing"><h2>Prefer an implementation deep dive?</h2><p>Read the <Link href="/engineering-notes">technical decision notes</Link>, review the <Link href="/projects">project case studies</Link>, or <Link href="/contact">discuss an engineering role or project</Link>.</p></div>
</div><Contact/></div>;}
