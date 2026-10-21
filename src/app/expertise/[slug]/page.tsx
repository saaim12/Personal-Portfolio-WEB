import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/resources/seo";
import { specialties, getSpecialty } from "@/resources/specialties";
import { engineeringNotes } from "@/resources/engineering-notes";
import { jsonLd, breadcrumbJsonLd } from "@/resources/schema";
import { baseURL } from "@/resources/once-ui.config";
import { PageSchema } from "@/components/PageSchema";
import { Contact } from "@/components/Contact";
import "../editorial.css";
type Params={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return specialties.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:Params):Promise<Metadata>{const {slug}=await params;const item=getSpecialty(slug);return item?pageMeta({title:item.title,description:item.description,path:`/expertise/${slug}`}) : {title:"Not found",robots:{index:false,follow:false}};}
export default async function SpecialtyPage({params}:Params){const {slug}=await params;const item=getSpecialty(slug);if(!item)notFound();const path=`/expertise/${slug}`;const matchingNotes=engineeringNotes.filter(note=>note.relatedSpecialty===slug);return <div className="studioPage">
<PageSchema title={item.title} description={item.description} path={path}/>
<script {...jsonLd({"@context":"https://schema.org","@type":"Service","@id":`${baseURL}${path}#service`,name:item.title,description:item.description,serviceType:"Software engineering",provider:{"@type":"Person","@id":`${baseURL}/#person`},url:baseURL+path})}/>
<div className="studioContainer engineeringHub"><nav aria-label="Breadcrumb" className="engineeringBreadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/expertise">Expertise</Link><span aria-hidden="true">/</span><span aria-current="page">{item.title}</span></nav>
<header className="engineeringIntro"><span className="engineeringEyebrow">SOFTWARE ENGINEERING / {item.stack.slice(0,3).join(" + ")}</span><h1 className="engineeringTitle">{item.title}</h1><p className="engineeringLead">{item.summary}</p></header>
<div className="engineeringContent">
<section><h2>What problems does this solve?</h2><p>{item.problem}</p><h3>Good fit for</h3><ul>{item.audience.map(a=><li key={a}>{a}</li>)}</ul></section>
{item.approach.map((step,i)=><section key={step.heading}><h2>{i+1}. {step.heading}</h2><p>{step.detail}</p><h3>Engineering checks</h3><ul>{step.checks.map(check=><li key={check}>{check}</li>)}</ul></section>)}
<section><h2>Expected result and engineering trade-off</h2><p>{item.outcome}</p><p>{item.tradeoff}</p><div className="engineeringTagRow">{item.stack.map(t=><span key={t}>{t}</span>)}</div></section>
</div>
<aside className="engineeringAside"><h2>Related real project evidence</h2><ul>{item.relatedProjects.map(p=><li key={p.slug}><Link href={`/projects/${p.slug}`}>{p.label} ↗</Link> — {p.proof}</li>)}</ul></aside>
{matchingNotes.length>0&&<aside className="engineeringAside"><h2>Deep engineering note</h2>{matchingNotes.map(note=><p key={note.slug}><Link href={`/engineering-notes/${note.slug}`}>{note.title} ↗</Link></p>)}</aside>}
<div className="engineeringClosing"><h2>Have a backend, data, or product challenge?</h2><p>Review <Link href="/services">all service areas</Link>, see <Link href="/projects">published work</Link>, or <Link href="/contact">contact me about a role or project</Link>.</p></div>
</div><Contact/></div>;}
