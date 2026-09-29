import { home } from "@/resources/content";

export function Testimonial() {
  const t = home.testimonial;
  if (!t.display) return null;
  return <aside className="founderQuote" aria-label="Client recommendation">
    <span className="introEyebrow">From the founder of Fitter Health</span>
    <blockquote>“{t.quote}”</blockquote>
    <p><strong>{t.author}</strong><br />{t.role}</p>
    {t.letter && <a className="extLink" href={t.letter} target="_blank" rel="noopener noreferrer">Read the signed recommendation ↗</a>}
  </aside>;
}
