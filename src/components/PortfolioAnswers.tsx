import Link from "next/link";

/** Concise, visible answers with links to the evidence behind each claim. */
export function PortfolioAnswers() {
  return <section className="portfolioAnswers studioContainer" aria-labelledby="portfolio-answers">
    <span className="engineeringEyebrow">A little more context</span>
    <h2 id="portfolio-answers">Questions before we work together</h2>
    <div className="portfolioAnswerGrid">
      <article><h3>What does Saaim Abdullah specialize in?</h3><p>I’m a software engineer in Lahore, Pakistan, focused on backend APIs, data pipelines, cloud applications, and AI retrieval systems. My work includes Django, PostgreSQL, Next.js, AWS, Kafka, Spark, and pgvector.</p><Link href="/expertise">Explore engineering expertise ↗</Link></article>
      <article><h3>Where can I see delivered engineering work?</h3><p>The Fitter Health case study covers ownership of a 106-table healthcare platform, 135 passing handover tests, AWS delivery, and notification recovery. Other case studies document RAG, data pipelines, and ML serving, including their limitations.</p><Link href="/projects/fitter-health-platform">Read the Fitter Health case study ↗</Link></article>
      <article><h3>Is Saaim available for remote roles or contracts?</h3><p>I’m based in Lahore and open to remote software engineering roles and contract work. Share the product, team, technical challenge, and delivery expectations so we can discuss the fit.</p><Link href="/contact">Discuss a role or project ↗</Link></article>
    </div>
  </section>;
}
