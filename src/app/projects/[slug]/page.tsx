import { SiteAnchor } from "@/components/SiteAnchor";
import { notFound } from "next/navigation";
import Image from "@/components/SiteImage";
import { getProjects } from "@/utils/projects";
import { pageMeta, ogImageFor } from "@/resources/seo";
import { formatDate } from "@/utils/formatDate";
import { CustomMDX } from "@/components/mdx";
import { TechList } from "@/components/Tech";
import { Projects } from "@/components/projects/Projects";
import { Handles } from "@/components/Studio";
import { Contact } from "@/components/Contact";
import { Providers } from "@/components/Providers";
import { jsonLd, caseStudyJsonLd, projectArticleJsonLd, breadcrumbJsonLd } from "@/resources/schema";
import { projectArt } from "@/resources/project-art";
import "../project-content.css";
type Params = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export async function generateStaticParams(){return getProjects().map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Params){
 const {slug}=await params;const post=getProjects().find(p=>p.slug===slug);if(!post)return {};
 return pageMeta({title:post.metadata.seoTitle,description:post.metadata.seoDescription,path:"/projects/"+slug,image:post.metadata.thumbnail?.endsWith(".png") ? post.metadata.thumbnail : ogImageFor(post.metadata.title),...(post.metadata.thumbnail?.endsWith(".png")?{imageWidth:1672,imageHeight:941}:{}),type:"article",publishedTime:post.metadata.publishedAt,modifiedTime:post.metadata.updatedAt});
}
export default async function Project({params}:Params){
 const {slug}=await params;const post=getProjects().find(p=>p.slug===slug);if(!post)notFound();
 const {metadata:m}=post;const art=projectArt[slug];const cover=m.thumbnail;const title=art?.title||m.title;
 return <div className="studioPage"><article className="casePage studioContainer">
 <script {...jsonLd(caseStudyJsonLd({title:m.title,description:m.seoDescription,path:"/projects/"+slug,image:m.image||m.thumbnail||ogImageFor(m.title),datePublished:m.publishedAt,dateModified:m.updatedAt,repository:m.link,technologies:m.stack}))}/>
 <script {...jsonLd(projectArticleJsonLd({title:m.title,description:m.seoDescription,path:"/projects/"+slug,image:m.image||m.thumbnail||ogImageFor(m.title),datePublished:m.publishedAt,dateModified:m.updatedAt}))}/>
 <script {...jsonLd(breadcrumbJsonLd([{name:"Home",path:"/"},{name:"Projects",path:"/projects"},{name:title,path:"/projects/"+slug}]))}/>
 <header className="caseHero"><div><span className="projectDate"><i/>{formatDate(m.publishedAt)}</span><h1 className="displayType">{title}</h1><p className="caseSummary">{m.summary}</p><div className="projectTags">{m.tags?.map(t=><span key={t}>{t}</span>)}</div><div className="caseHeroActions">{m.link&&<SiteAnchor className="quietLink" href={m.link} target="_blank" rel="noopener noreferrer">{m.link.includes("github.com")?"View source":"Visit site"} ↗</SiteAnchor>}{m.article&&<SiteAnchor className="quietLink" href={m.article} target="_blank" rel="noopener noreferrer">Read article ↗</SiteAnchor>}<SiteAnchor href="/projects" className="quietLink">All projects ↗</SiteAnchor></div></div>
 <dl className="caseNotes"><div><dt>Role</dt><dd>{m.role||"Software engineer"}</dd></div><div><dt>Published</dt><dd>{new Intl.DateTimeFormat("en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(m.publishedAt))}</dd></div><div><dt>Focus</dt><dd>{m.tags?.join(" / ")||"Engineering"}</dd></div><div><dt>Engineer</dt><dd>Saaim Abdullah</dd></div></dl></header>
 {cover&&<div className="caseCover diagramPicture"><Image src={cover} alt={m.title+" system overview"} fill priority sizes="(max-width: 800px) 95vw, 90vw"/><Handles/></div>}
 <div className="caseLayout"><aside className="caseSidebar"><h2>Built with</h2><TechList items={m.stack} label="Project technologies"/><SiteAnchor href="/contact">Discuss a project ↗</SiteAnchor><SiteAnchor href="/projects">← All projects</SiteAnchor></aside><div><div className="caseStudyBody"><Providers><CustomMDX source={post.content}/></Providers></div>{m.images.map((src,i)=><SiteAnchor key={src} href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${m.title} architecture diagram ${i+1} at full size`}><Image className="caseDiagram" src={src} alt={m.title+" architecture diagram "+(i+1)} width={1672} height={941} sizes="(max-width: 800px) 95vw, 70vw"/></SiteAnchor>)}</div></div>
 <section className="caseMore"><h2 className="displayType">More to explore</h2><Projects exclude={[slug]} range={[1,2]}/><h3>Engineering foundations</h3><Projects only={["algorithms-in-python", "esp32-temperature-inference"]} exclude={[slug]}/></section>
 </article><Contact/></div>;
}
