import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/resources/seo";
import { engineeringNotes,getEngineeringNote } from "@/resources/engineering-notes";
import { jsonLd } from "@/resources/schema";
import { baseURL } from "@/resources/once-ui.config";
import { PageSchema } from "@/components/PageSchema";
import { Contact } from "@/components/Contact";
import "../../expertise/editorial.css";
type Params={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return engineeringNotes.map(x=>({slug:x.slug}));}
export async function generateMetadata({params}:Params):Promise<Metadata>{const {slug}=await params;const note=getEngineeringNote(slug);return note?pageMeta({title:note.title,description:note.description,path:`/engineering-notes/${slug}`,type:"article"}) : {title:"Not found",robots:{index:false,follow:false}};}
export default async function NotePage({params}:Params){const {slug}=await params;const note=getEngineeringNote(slug);if(!note)notFound();const path=`/engineering-notes/${slug}`;return <div className="studioPage">
<PageSchema title={note.title} description={note.description} path={path}/>
<script {...jsonLd({"@context":"https://schema.org","@type":"Article","@id":`${baseURL}${path}#article`,mainEntityOfPage:baseURL+path,headline:note.title,description:note.description,articleSection:note.sections.map(s=>s.heading),author:{"@type":"Person","@id":`${baseURL}/#person`},publisher:{"@type":"Person","@id":`${baseURL}/#person`},inLanguage:"en"})}/>
<div className="studioContainer engineeringHub"><nav aria-label="Breadcrumb" className="engineeringBreadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/engineering-notes">Engineering notes</Link><span aria-hidden="true">/</span><span aria-current="page">{note.title}</span></nav>
<header className="engineeringIntro"><span className="engineeringEyebrow">{note.category.toUpperCase()} / ORIGINAL TECHNICAL NOTE</span><h1 className="engineeringTitle">{note.title}</h1><p className="engineeringLead">{note.description}</p></header>
<div className="engineeringContent"><section><h2>{note.question}</h2><p>{note.answer}</p></section>
{note.sections.map(s=><section key={s.heading}><h2>{s.heading}</h2><p>{s.explanation}</p><h3>Implementation checklist</h3><ul>{s.checklist.map(check=><li key={check}>{check}</li>)}</ul></section>)}
<section><h2>Architecture decision</h2><p>{note.decision}</p></section></div>
<aside className="engineeringAside"><h2>Project evidence and limitations</h2><p>These projects show the specific implementations behind this note; they are not claims of third-party certification or unmeasured production benchmarks.</p><ul>{note.proof.map(p=><li key={p.slug}><Link href={`/projects/${p.slug}`}>{p.label} ↗</Link></li>)}</ul></aside>
<div className="engineeringClosing"><h2>Apply this to a real product</h2><p>Explore <Link href={`/expertise/${note.relatedSpecialty}`}>related engineering capabilities</Link>, <Link href="/engineering-notes">all technical notes</Link>, or <Link href="/contact">contact me about an engineering challenge</Link>.</p></div></div><Contact/></div>;}
