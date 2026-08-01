import { Column, Heading, Text } from "@once-ui-system/core";
import type { ReactNode } from "react";
import { home } from "@/resources";
import { Reveal } from "./Reveal";

// Process stage. Answers a founder's real question, "what is working with you
// actually like?", which no amount of stack listing answers. Step 04 exists to
// disarm lock-in fear, the loudest unspoken objection to hiring a solo
// contractor.
export function Process({ icon }: { icon?: ReactNode }) {
  const p = home.process;
  if (!p?.display) return null;

  return (
    <Column fillWidth horizontal="center" className="section section--ruled">
      <Reveal>
        <div className="sectionHead">
          <span className="eyebrow">{icon}Process</span>
          <Heading as="h2" variant="display-strong-s" align="center">
            {p.title}
          </Heading>
          <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            {p.subtitle}
          </Text>
        </div>
      </Reveal>

      <ol className="processList">
        {p.steps.map((s, i) => (
          <Reveal key={s.step} as="li" delay={i * 0.06} className="processItem">
            <span className="processStep">{s.step}</span>
            <h3 className="processTitle">{s.title}</h3>
            <p className="processDesc">{s.description}</p>
          </Reveal>
        ))}
      </ol>
    </Column>
  );
}
