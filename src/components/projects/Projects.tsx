import { SiteAnchor } from "@/components/SiteAnchor";
import Image from "@/components/SiteImage";
import { getProjects } from "@/utils/projects";
import { projectArt } from "@/resources/project-art";
import { ProjectGallery } from "./ProjectGallery";
interface ProjectsProps { preview?: boolean; showcase?: boolean; range?: [number, number?]; exclude?: string[]; only?: string[]; }
const learningSlugs = ["esp32-temperature-inference", "autoencoder-edge-compression", "algorithms-in-python", "ml-data-foundations"];
export function Projects({ range, exclude = [], only, showcase = false, preview = false }: ProjectsProps) {
  const Heading = showcase ? "h2" : "h3";
  const posts = getProjects().filter(p => !exclude.includes(p.slug) && (showcase || only?.includes(p.slug) || !learningSlugs.includes(p.slug))).sort((a,b) => b.metadata.publishedAt.localeCompare(a.metadata.publishedAt));
  const selected = only ? only.flatMap(slug => posts.filter(p => p.slug === slug)) : range ? posts.slice(range[0] - 1, range[1]) : posts;
  const cards = selected.map((post, index) => {
    const art = projectArt[post.slug];
    const title = art?.title || post.metadata.title;
    const image = post.metadata.thumbnail;
    const href = "/projects/" + post.slug;
    const date = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(post.metadata.publishedAt));
    const learning = learningSlugs.includes(post.slug);
    if (showcase && learning) {
      const sourceLinks = [...post.content.matchAll(/\[([^\]]+)\]\((https:\/\/github\.com\/[^)]+)\)/g)].map(match => ({ label: match[1], href: match[2] }));
      const links = sourceLinks.length ? sourceLinks : [{ label: "View repository", href: post.metadata.link || "" }];
      return { slug: post.slug, category: "Learnings", card: <article className="learningEntry" key={post.slug}><h3><SiteAnchor href={href}>{post.metadata.title}</SiteAnchor></h3><p>{post.metadata.summary}</p><div className="learningLinks">{links.filter(link => link.href).map(link => <SiteAnchor key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</SiteAnchor>)}</div></article> };
    }
    const number = String(index + 1).padStart(2, "0");
    const category = post.metadata.tags?.[0] || "Project";
    const card = <article className={`folderProject ${preview ? "folderFeature" : "folderSmall"}`} key={post.slug} data-title={title}>
      <SiteAnchor href={href} className="projectPicture diagramPicture" aria-label={`View ${title} project`} tabIndex={-1}><Image src={image} alt={`System overview for ${title}`} {...(preview ? { width: 1672, height: 941 } : { fill: true })} sizes={preview ? "(max-width: 760px) 90vw, 45vw" : "(max-width: 760px) 90vw, 42vw"} /></SiteAnchor>
      <div className="folderTab"><span>{number}_{category}</span><span className="projectDate">{date}</span></div>
      <div className="folderCopy"><Heading><SiteAnchor href={href}>{title}</SiteAnchor></Heading><p>{post.metadata.cardSummary || post.metadata.summary}</p><div className="projectTags">{post.metadata.tags?.slice(0,2).map(tag => <span key={tag}>{tag}</span>)}</div><SiteAnchor href={href} className="projectLink" tabIndex={-1} aria-hidden="true">View project</SiteAnchor></div>
    </article>;
    const products = ["fitter-health-platform", "temporary-url-service"];
    return { slug: post.slug, category: products.includes(post.slug) ? "Product & web" : learning ? "Learnings" : "AI & data", card };
  });
  return showcase ? <ProjectGallery items={cards} /> : <div className={preview ? "featuredProjects" : "relatedProjects"} {...(preview ? { tabIndex: 0, role: "region", "aria-label": "Selected projects. Use the left and right arrow keys to move between projects more" } : {})}>{cards.map(item => item.card)}</div>;
}
