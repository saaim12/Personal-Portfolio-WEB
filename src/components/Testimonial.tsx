import Image from "next/image";
import { home } from "@/resources/content";
import { getPosts } from "@/utils/utils";

export function Testimonial() {
  const t = home.testimonial;
  const project = getPosts(["src", "app", "work", "projects"]).find(p => p.slug === "fitter-health-platform");
  if (!project) return null;
  return (
    <div className="featuredDelivery">
      <div className="featuredProduct">
        {project.metadata.thumbnail && <a href="/work/fitter-health-platform" data-track="work_card:fitter-health-platform"><Image src={project.metadata.thumbnail} alt="Fitter Health: illustrated project cover" width={800} height={450} sizes="(max-width: 760px) 100vw, 600px" /></a>}
        <span className="introEyebrow">Client work · Shipped &amp; handed over</span>
        <h3>Fitter Health</h3>
        <p>{project.metadata.cardSummary}</p>
        <dl className="projectFacts"><div><dt>My contribution</dt><dd>{project.metadata.contribution}</dd></div><div><dt>Result</dt><dd>{project.metadata.result}</dd></div></dl>
        <div className="featuredLinks"><a className="btn btn--primary" href="/work/fitter-health-platform" data-track="work_card:fitter-health-platform">Read case study ↗</a>{project.metadata.link && <a className="extLink" href={project.metadata.link} target="_blank" rel="noopener noreferrer">Visit live product ↗</a>}</div>
      </div>
      {t.display && <aside className="founderQuote" aria-label="Client recommendation">
        <span className="introEyebrow">From the founder</span>
        <blockquote>“{t.quote}”</blockquote>
        <p><strong>{t.author}</strong><br />{t.role}</p>
        {t.letter && <a className="extLink" href={t.letter} target="_blank" rel="noopener noreferrer">Read the signed recommendation ↗</a>}
      </aside>}
    </div>
  );
}
