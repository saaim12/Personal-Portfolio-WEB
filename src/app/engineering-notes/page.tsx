import Link from "next/link";
import { pageMeta } from "@/resources/seo";
import { PageSchema } from "@/components/PageSchema";
import { PageHeading } from "@/components/Studio";
import { engineeringNotes } from "@/resources/engineering-notes";
import { Contact } from "@/components/Contact";
import "../expertise/editorial.css";
const description="Read original engineering notes by Saaim Abdullah on webhooks, multi-tenant RAG, Kafka/Spark/Airflow pipelines, and Django/Next.js cloud delivery.";
export async function generateMetadata(){return pageMeta({title:"Engineering Notes & Architecture",description,path:"/engineering-notes"});}
export default function EngineeringNotes(){return <div className="studioPage"><PageSchema title="Engineering Notes & Architecture" description={description} path="/engineering-notes" items={engineeringNotes.map(item=>({path:`/engineering-notes/${item.slug}`,title:item.title,description:item.description}))}/><div className="studioContainer engineeringHub"><div className="engineeringIntro"><PageHeading title="Engineering notes" note="decisions / trade-offs / failure modes"><p>Original technical notes about building and operating real applications. Each guide distinguishes implemented evidence from patterns worth evaluating on a specific production system.</p></PageHeading></div>
<section className="engineeringCardGrid" aria-label="Architecture guides">{engineeringNotes.map(note=><Link prefetch={false} className="engineeringCard" href={`/engineering-notes/${note.slug}`} key={note.slug}><small>{note.category}</small><h2>{note.title}</h2><p>{note.description}</p><span className="engineeringArrow">Read the guide ↗</span></Link>)}</section>
<div className="engineeringClosing"><h2>Follow the code and the context</h2><p>Open <Link href="/projects">project case studies</Link>, browse <Link href="/expertise">engineering specialties</Link>, or visit my <Link href="/journal">external published articles</Link>.</p></div></div><Contact/></div>;}
