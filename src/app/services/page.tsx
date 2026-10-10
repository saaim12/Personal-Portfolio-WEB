import { PageHeading, Mark, Action } from "@/components/Studio";
import { Contact } from "@/components/Contact";
import { pageMeta } from "@/resources/seo";
export async function generateMetadata(){return pageMeta({title:"Services",description:"Backend engineering, full stack product delivery, data systems, and cloud infrastructure by Saaim Abdullah.",path:"/services"});}
const services=[
 ["Backend systems","APIs and workflows for accounts, permissions, payments, bookings, and integrations. Built with explicit contracts, validation, error handling, and background processing.","yellow","pinwheel"],
 ["Full stack products","From requirements to working software: React and Next.js interfaces connected to dependable Django services, with deployment, documentation, and handover.","green","flower"],
 ["Data & AI","Batch and streaming pipelines, multilingual retrieval, and recommendation systems. Data preparation, API serving, customer isolation, and recovery paths are part of the build.","pink","target"],
 ["Cloud & delivery","Containerized applications on AWS with scoped access, automated delivery, and operational visibility. Infrastructure that supports the product and the people maintaining it.","blue","steps"]
];
export default function Services(){return <div className="studioPage"><div className="studioContainer"><PageHeading title="Services" note="let’s make it work"><p>Engineering support from the first architecture decision to deployment and handover.</p></PageHeading><div className="serviceList">{services.map(([title,text,color,icon],i)=><article key={title} className={"serviceCard "+color}><span className="serviceNumber">0{i+1}</span><Mark kind={icon}/><h2>{title}</h2><p>{text}</p></article>)}</div><div className="allWorkAction"><Action href="/work">See the work</Action><a className="quietLink" href="/experience">Experience & skills ↗</a></div></div><Contact/></div>;}
