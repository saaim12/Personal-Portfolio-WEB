import Link from "next/link";
import { faqJsonLd, jsonLd } from "@/resources/schema";

/** Concise, visible answers with links to the evidence behind each claim. Marked up as FAQPage from the same data. */
const answers = [
  { question: "What does Saaim Abdullah specialize in?", answer: "I’m a software engineer in Lahore, Pakistan, focused on backend APIs, data pipelines, cloud applications, and AI retrieval systems. My work includes Django, PostgreSQL, Next.js, AWS, Kafka, Spark, and pgvector.", href: "/expertise", link: "Explore engineering expertise" },
  { question: "Where can I see delivered engineering work?", answer: "The Fitter Health case study covers ownership of a 106-table healthcare platform, 135 passing handover tests, AWS delivery, and notification recovery. Other case studies document RAG, data pipelines, and ML serving, including their limitations.", href: "/projects/fitter-health-platform", link: "Read the Fitter Health case study" },
  { question: "Is Saaim available for remote roles or contracts?", answer: "I’m based in Lahore and open to remote software engineering roles and contract work. Share the product, team, technical challenge, and delivery expectations so we can discuss the fit.", href: "/contact", link: "Discuss a role or project" },
];

export function PortfolioAnswers() {
  return <section className="portfolioAnswers studioContainer" aria-labelledby="portfolio-answers">
    <script {...jsonLd(faqJsonLd("/", answers.map(({ question, answer }) => [question, answer])))} />
    <span className="engineeringEyebrow">(A little more context)</span>
    <h2 id="portfolio-answers">Questions before we work together</h2>
    <div className="portfolioAnswerGrid">{answers.map(item => <article key={item.question}><h3>{item.question}</h3><p>{item.answer}</p><Link href={item.href}>{item.link}</Link></article>)}</div>
  </section>;
}
