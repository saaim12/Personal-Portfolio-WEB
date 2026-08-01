import { Column, Heading } from "@once-ui-system/core";
import type { ReactNode } from "react";
import { home } from "@/resources";
import { Reveal } from "./Reveal";

// Objection-handling stage. Native <details>/<summary>: no JS, keyboard
// accessible without any ARIA wiring, and the answers stay in the DOM for
// crawlers. Paired with FAQPage JSON-LD in layout.tsx.
export function FAQ({ icon }: { icon?: ReactNode }) {
  const faq = home.faq;
  if (!faq?.display) return null;

  return (
    <Column fillWidth horizontal="center" className="section section--narrow section--ruled">
      <Reveal>
        <div className="sectionHead">
          <span className="eyebrow">{icon}FAQ</span>
          <Heading as="h2" variant="display-strong-s" align="center">
            {faq.title}
          </Heading>
        </div>
      </Reveal>

      <Reveal>
        <div className="faqList">
          {faq.items.map((item) => (
            <details key={item.q} className="faqItem">
              <summary className="faqQuestion">{item.q}</summary>
              <p className="faqAnswer">{item.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </Column>
  );
}
