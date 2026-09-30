import Image from "next/image";
import { TechList } from "./Tech";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  treatment?: "standard" | "feature" | "compact";
  href: string;
  title: string;
  description: string;
  result?: string;
  source?: string;
  article?: string;
  tags?: string[];
  stack?: string[];
  thumbnail?: string;
  hardPart?: string;
  track?: string;
};

export function ProjectCard({ href, title, description, result, source, article, tags = [], stack = [], thumbnail, hardPart, track, treatment = "standard" }: ProjectCardProps) {
  return <article className={`${styles.card} ${styles[treatment] ?? ""}`}>
    <a className={styles.cardHit} href={href} tabIndex={-1} aria-hidden="true" data-track={track} />
    {(source || article) && <div className={styles.topLinks}>
      {source && <a className="btn btn--secondary" href={source} target="_blank" rel="noopener noreferrer" aria-label={`${source.includes("github.com") ? "View code" : "Visit site"} for ${title}`}>{source.includes("github.com") ? "View code" : "Visit site"} <span aria-hidden="true">↗</span></a>}
      {article && <a className="btn btn--secondary" href={article} target="_blank" rel="noopener noreferrer" aria-label={`Read article about ${title}`}>Read article <span aria-hidden="true">↗</span></a>}
    </div>}
    <a className={styles.visual} href={href} aria-label={`Explore ${title}`} data-track={track}>
      <Image src={thumbnail || "/images/projects/covers/interactive-portfolio.svg"} alt={`Illustrated cover for ${title}`} fill sizes="(max-width: 760px) 90vw, (max-width: 1200px) 45vw, 540px" />
      <span className={styles.coverAction}>Explore project ↗</span>
    </a>
    <div className={styles.body}>
    <div className={styles.tags}>{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.description}>{description}</p>
    <dl className={styles.facts}>
      {result ? <div><dt>Result and scope</dt><dd>{result}</dd></div> : hardPart && <div><dt>The hard part</dt><dd>{hardPart}</dd></div>}
    </dl>
    <div className={styles.stack}><TechList items={stack.slice(0, 3)} variant="chip" label={`Key technologies for ${title}`} /></div>
    <div className={styles.actions}>
      <a className="btn btn--primary" href={href} data-track={track} aria-label={`Read case study about ${title}`}>Read case study <span aria-hidden="true">↗</span></a>
    </div>
    </div>
  </article>;
}
