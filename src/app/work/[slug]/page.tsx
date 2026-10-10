import { notFound } from "next/navigation";
import Image from "next/image";
import { getPosts } from "@/utils/utils";
import { pageMeta, ogImageFor } from "@/resources/seo";
import { formatDate } from "@/utils/formatDate";
import { CustomMDX } from "@/components/mdx";
import { TechList } from "@/components/Tech";
import { Projects } from "@/components/work/Projects";
import { Handles } from "@/components/Studio";
import { Contact } from "@/components/Contact";
import { jsonLd, caseStudyJsonLd } from "@/resources/schema";
import { projectArt } from "@/resources/project-art";
type Params = { params: Promise<{ slug: string }> };
export async function generateStaticParams(){return getPosts(["src","app","work","projects"]).map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Params){
 const {slug}=await params;const post=getPosts(["src","app","work","projects"]).find(p=>p.slug===slug);if(!post)return {};
 return pageMeta({title:post.metadata.seoTitle,description:post.metadata.seoDescription,path:"/work/"+slug,image:post.metadata.image||post.metadata.thumbnail||ogImageFor(post.metadata.title),type:"article",publishedTime:post.metadata.publishedAt,modifiedTime:post.metadata.updatedAt});
}
export default async function Project({params}:Params){
 const {slug}=await params;const post=getPosts(["src","app","work","projects"]).find(p=>p.slug===slug);if(!post)notFound();
 const {metadata:m}=post;const art=projectArt[slug];const cover=art?.image||m.thumbnail;const title=art?.title||m.title;
 return <div className="studioPage"><article className="casePage studioContainer">
 <script {...jsonLd(caseStudyJsonLd({title:m.title,description:m.seoDescription,path:"/work/"+slug,image:m.image||m.thumbnail||ogImageFor(m.title),datePublished:m.publishedAt,dateModified:m.updatedAt}))}/>
 <header className="caseHero"><div><span className="projectDate"><i/>{formatDate(m.publishedAt)}</span><h1 className="displayType">{title}</h1><p className="caseSummary">{m.summary}</p><div className="projectTags">{m.tags?.map(t=><span key={t}>{t}</span>)}</div><div className="caseHeroActions">{m.link&&<a className="quietLink" href={m.link} target="_blank" rel="noopener noreferrer">{m.link.includes("github.com")?"View source":"Visit site"} ↗</a>}{m.article&&<a className="quietLink" href={m.article} target="_blank" rel="noopener noreferrer">Read article ↗</a>}<a href="/work" className="quietLink">All projects ↗</a></div></div>
 <dl className="caseNotes"><div><dt>Role</dt><dd>{m.team[0]?.role||"Software engineer"}</dd></div><div><dt>Published</dt><dd>{new Intl.DateTimeFormat("en-US",{month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(m.publishedAt))}</dd></div><div><dt>Focus</dt><dd>{m.tags?.join(" / ")||"Engineering"}</dd></div><div><dt>Engineer</dt><dd>Saaim Abdullah</dd></div></dl></header>
 {cover&&<div className={"caseCover "+(!art?"diagramPicture":"")}><Image src={cover} alt={art?"":m.title+" system overview"} fill priority sizes="(max-width: 800px) 95vw, 90vw"/><Handles/></div>}
 <div className="caseLayout"><aside className="caseSidebar"><h2>Built with</h2><TechList items={m.stack} variant="chip" label="Project technologies"/><a href="/contact">Discuss a project ↗</a><a href="/work">← All case studies</a></aside><div><div className="caseStudyBody"><CustomMDX source={post.content}/></div>{m.images.map((src,i)=><Image className="caseDiagram" key={src} src={src} alt={m.title+" architecture diagram "+(i+1)} width={1280} height={860} sizes="(max-width: 800px) 95vw, 70vw"/>)}</div></div>
 <section className="caseMore"><h2 className="displayType">More to explore</h2><Projects exclude={[slug]} range={[1,2]}/></section>
 </article><Contact/></div>;
}
