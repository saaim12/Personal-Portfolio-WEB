import Image from "next/image";
import { getPosts } from "@/utils/utils";
import { projectArt } from "@/resources/project-art";
import { Handles, Mark } from "@/components/Studio";
import { ProjectGallery } from "./ProjectGallery";
interface ProjectsProps { preview?: boolean; showcase?: boolean; range?: [number, number?]; exclude?: string[]; only?: string[]; }
export function Projects({ range, exclude = [], only, showcase = false, preview = false }: ProjectsProps) {
  const posts = getPosts(["src", "app", "work", "projects"]).filter(p => !exclude.includes(p.slug)).sort((a,b) => b.metadata.publishedAt.localeCompare(a.metadata.publishedAt));
  const selected = only ? only.flatMap(slug => posts.filter(p => p.slug === slug)) : range ? posts.slice(range[0] - 1, range[1]) : posts;
  const cards = selected.map((post, index) => {
    const art = projectArt[post.slug];
    const title = art?.title || post.metadata.title;
    const image = art?.image || post.metadata.thumbnail || "/images/projects/covers/interactive-portfolio.svg";
    const color = art?.color || ["blue", "black", "yellow", "pink"][index % 4];
    const href = "/work/" + post.slug;
    const date = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(post.metadata.publishedAt));
    const card = <article className={`folderProject ${preview ? "folderFeature" : "folderSmall"} folder-${color}`} key={post.slug}>
      <div className="folderTab"><Mark kind="steps" /><span>{preview ? `Project ${String(index+1).padStart(2,"0")}` : date}</span></div>
      <div className="folderContent">
        <div className="folderCopy"><span className="projectDate"><i />{date}</span><h3><a href={href}>{title}</a></h3><p>{post.metadata.cardSummary || post.metadata.summary}</p><a href={href} className="projectLink">View project <span aria-hidden="true">↗</span></a><div className="projectTags">{post.metadata.tags?.slice(0,2).map(tag => <span key={tag}>{tag}</span>)}</div></div>
        <a href={href} className={`projectPicture ${!art ? "diagramPicture" : ""}`} aria-label={`View ${title} case study`}><Image src={image} alt={art ? "" : `Architecture overview for ${title}`} fill sizes={preview ? "(max-width: 760px) 90vw, 45vw" : "(max-width: 760px) 90vw, 42vw"} /><span className="imageLabel" aria-hidden="true">▧ {art ? "IMAGE.JPG" : "SYSTEM.SVG"}</span><Handles /></a>
      </div>
    </article>;
    const products = ["fitter-health-platform", "bookstore-platform", "temporary-url-service", "interactive-portfolio"];
    const experiments = ["esp32-temperature-inference", "autoencoder-edge-compression", "algorithms-in-python", "ml-data-foundations"];
    return { slug: post.slug, category: products.includes(post.slug) ? "Product & web" : experiments.includes(post.slug) ? "Experiments" : "AI & data", card };
  });
  return showcase ? <ProjectGallery items={cards} /> : <div className={preview ? "featuredProjects" : "relatedProjects"}>{cards.map(item => item.card)}</div>;
}
