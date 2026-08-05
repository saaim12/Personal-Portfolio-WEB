import { createElement, type ReactNode } from "react";
import { Column, Heading, Text } from "@once-ui-system/core";
import { home } from "@/resources";
import { iconLibrary } from "@/resources/icons";
import { Reveal } from "./Reveal";

// Replaces the six-card Services grid that used to sit here.
//
// A services list is consultancy framing, and it was the clearest signal on the
// page that this site belonged to a freelancer rather than to a candidate.
// Working habits do the job that section was meant to do, which is separate
// this engineer from every other one with the same stack, and almost no
// portfolio attempts it.
export function Practice({ icon }: { icon?: ReactNode }) {
  const p = home.practice;
  if (!p.display) return null;

  return (
    // `as="h2"` matters: Once UI's Heading defaults to h1, so this section was
    // emitting a second h1 on the homepage alongside the hero headline.
    <Column fillWidth horizontal="center" className="section section--ruled">
      <Reveal>
        <div className="sectionHead">
          <span className="eyebrow">
            {icon}
            {p.label}
          </span>
          <Heading as="h2" variant="display-strong-s" align="center">
            {p.title}
          </Heading>
          <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            {p.intro}
          </Text>
        </div>
      </Reveal>

      <div className="cardGrid">
        {p.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <div className="card">
              {item.icon && (
                <span className="cardIcon" aria-hidden="true">
                  {createElement(iconLibrary[item.icon])}
                </span>
              )}
              <h3 className="cardTitle">{item.title}</h3>
              <p className="cardDesc">{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Column>
  );
}
