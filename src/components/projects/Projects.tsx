import { SiteAnchor } from "@/components/SiteAnchor";
import Image from "@/components/SiteImage";
import { getProjects } from "@/utils/projects";
import { projectArt } from "@/resources/project-art";
import { Handles, Mark } from "@/components/Studio";
import { ProjectGallery } from "./ProjectGallery";
interface ProjectsProps { preview?: boolean; showcase?: boolean; range?: [number, number?]; exclude?: string[]; only?: string[]; }
const learningSlugs = ["esp32-temperature-inference", "autoencoder-edge-compression", "algorithms-in-python", "ml-data-foundations"];
export function Projects({ range, exclude = [], only, showcase = false, preview = false }: ProjectsProps) {
  const posts = getProjects().filter(p => !exclude.includes(p.slug) && (showcase || !learningSlugs.includes(p.slug))).sort((a,b) => b.metadata.publishedAt.localeCompare(a.metadata.publishedAt));
  const selected = only ? only.flatMap(slug => posts.filter(p => p.slug === slug)) : range ? posts.slice(range[0] - 1, range[1]) : posts;
  const cards = selected.map((post, index) => {
    const art = projectArt[post.slug];
    const title = art?.title || post.metadata.title;
    const image = post.metadata.thumbnail;
    const color = art?.color || ["blue", "black", "yellow", "pink"][index % 4];
    const href = "/projects/" + post.slug;
    const date = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(post.metadata.publishedAt));
    const learning = learningSlugs.includes(post.slug);
    if (showcase && learning) {
      const sourceLinks = [...post.content.matchAll(/\[([^\]]+)\]\((https:\/\/github\.com\/[^)]+)\)/g)].map(match => ({ label: match[1], href: match[2] }));
      const links = sourceLinks.length ? sourceLinks : [{ label: "View repository", href: post.metadata.link || "" }];
      return { slug: post.slug, category: "Learnings", card: <article className="learningEntry" key={post.slug}><h3>{post.metadata.title}</h3><p>{post.metadata.summary}</p><div className="learningLinks">{links.filter(link => link.href).map(link => <SiteAnchor key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</SiteAnchor>)}</div></article> };
    }
    const card = <article className={`folderProject ${preview ? "folderFeature" : "folderSmall"} folder-${color}`} key={post.slug}>
      {preview && index > 0 && <div className="retainedFolderLabels" aria-hidden="true">{Array.from({length:index},(_,previous)=><span key={previous}><Mark kind="steps"/>Project {String(previous+1).padStart(2,"0")}</span>)}</div>}
      <div className="folderTab"><Mark kind="steps" /><span>{preview ? `Project ${String(index+1).padStart(2,"0")}` : date}</span></div>
      <div className="folderContent">
        <div className="folderCopy"><span className="projectDate"><i />{date}</span><h3><SiteAnchor href={href}>{title}</SiteAnchor></h3><p>{post.metadata.cardSummary || post.metadata.summary}</p><SiteAnchor href={href} className="projectLink">View project <span aria-hidden="true">↗</span></SiteAnchor><div className="projectTags">{post.metadata.tags?.slice(0,2).map(tag => <span key={tag}>{tag}</span>)}</div></div>
        <SiteAnchor href={href} className="projectPicture diagramPicture" aria-label={`View ${title} project`}><Image src={image} alt={`System overview for ${title}`} {...(preview ? { width: 1672, height: 941 } : { fill: true })} sizes={preview ? "(max-width: 760px) 90vw, 45vw" : "(max-width: 760px) 90vw, 42vw"} /><Handles /></SiteAnchor>
      </div>
    </article>;
    const products = ["fitter-health-platform", "temporary-url-service"];
    return { slug: post.slug, category: products.includes(post.slug) ? "Product & web" : learning ? "Learnings" : "AI & data", card };
  });
  return showcase ? <ProjectGallery items={cards} /> : <div className={preview ? "featuredProjects" : "relatedProjects"}>{cards.map(item => item.card)}</div>;
}
