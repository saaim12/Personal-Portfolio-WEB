import type { Metadata } from "next";
import Link from "next/link";
import { EditorialContents } from "@/components/EditorialContents";
import { headingId } from "@/utils/headingId";
import { notFound } from "next/navigation";
import { pageMeta } from "@/resources/seo";
import { engineeringNotes,getEngineeringNote } from "@/resources/engineering-notes";
import { EDITORIAL_UPDATED_AT, noteReferences } from "@/resources/editorial";
import { EditorialByline } from "@/components/EditorialByline";
import { jsonLd, editorialArticleJsonLd } from "@/resources/schema";
import { baseURL } from "@/resources/once-ui.config";
import { PageSchema } from "@/components/PageSchema";
import { Contact } from "@/components/Contact";
import "../../expertise/editorial.css";
type Params={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return engineeringNotes.map(x=>({slug:x.slug}));}
export async function generateMetadata({params}:Params):Promise<Metadata>{const {slug}=await params;const note=getEngineeringNote(slug);return note?pageMeta({title:note.title,description:note.description,path:`/engineering-notes/${slug}`,type:"article",modifiedTime:EDITORIAL_UPDATED_AT}) : {title:"Not found",robots:{index:false,follow:false}};}
export default async function NotePage({params}:Params){const {slug}=await params;const note=getEngineeringNote(slug);if(!note)notFound();const path=`/engineering-notes/${slug}`;const references=noteReferences[slug]??[];return <div className="studioPage">
<PageSchema title={note.title} description={note.description} path={path}/>
<script {...jsonLd(editorialArticleJsonLd({title:note.title,description:note.description,path,dateModified:EDITORIAL_UPDATED_AT,abstract:note.answer,sections:note.sections.map(section=>section.heading),citations:[...note.proof.map(project=>`${baseURL}/projects/${project.slug}`),...references.map(reference=>reference.url)]}))}/>
<div className="studioContainer engineeringHub engineeringReading"><nav aria-label="Breadcrumb" className="engineeringBreadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/engineering-notes">Engineering notes</Link><span aria-hidden="true">/</span><span aria-current="page">{note.title}</span></nav>
<header className="engineeringIntro"><span className="engineeringEyebrow">{note.category.toUpperCase()} / ORIGINAL TECHNICAL NOTE</span><h1 className="engineeringTitle">{note.title}</h1><p className="engineeringLead">{note.description}</p><EditorialByline updatedAt={EDITORIAL_UPDATED_AT}/></header>
<section className="engineeringAnswer" id="overview" aria-labelledby="note-answer"><h2 id="note-answer">{note.question}</h2><p>{note.answer}</p></section>
<EditorialContents items={[{id:"overview",title:"The question"},...note.sections.map(section=>({id:headingId(section.heading),title:section.heading})),{id:"architecture-decision",title:"Architecture decision"},{id:"project-evidence",title:"Project evidence and limitations"}]} />
<div className="engineeringContent">
{note.sections.map(s=><section id={headingId(s.heading)} key={s.heading}><h2>{s.heading}</h2><p>{s.explanation}</p><h3>Implementation checklist</h3><ul>{s.checklist.map(check=><li key={check}>{check}</li>)}</ul></section>)}
<section id="architecture-decision"><h2>Architecture decision</h2><p>{note.decision}</p></section></div>
<aside id="project-evidence" className="engineeringAside"><h2>Project evidence and limitations</h2><p>These projects show the specific implementations behind this note; they are not claims of third-party certification or unmeasured production benchmarks.</p><ul>{note.proof.map(p=><li key={p.slug}><Link href={`/projects/${p.slug}`}>{p.label} ↗</Link></li>)}</ul></aside>
<section className="engineeringAside editorialReferences" aria-labelledby="references-heading"><h2 id="references-heading">Technical references</h2><p>Primary documentation for the design principles in this guide. Project evidence above describes the implementation.</p><ul>{references.map(reference=><li key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer">{reference.title}</a><p>{reference.context}</p></li>)}</ul></section>
<div className="engineeringClosing"><h2>Apply this to a real product</h2><p>Explore <Link href={`/expertise/${note.relatedSpecialty}`}>related engineering capabilities</Link>, <Link href="/engineering-notes">all technical notes</Link>, or <Link href="/contact">contact me about an engineering challenge</Link>.</p></div></div><Contact/></div>;}
