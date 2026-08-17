import { createElement, type ReactNode } from "react";
import { Column, Heading, Row, Text } from "@once-ui-system/core";
import { HiArrowUpRight } from "react-icons/hi2";
import { home } from "@/resources";
import { iconLibrary } from "@/resources/icons";
import { Reveal } from "./Reveal";

// Data structures and algorithms, shown rather than mentioned.
//
// This was one secondary button at the foot of /work and a clause in an About
// paragraph, which is nowhere. Same markup as the "How I work" cards: the
// section is new, the CSS is not.
export function Fundamentals({ icon }: { icon?: ReactNode }) {
  const f = home.fundamentals;
  if (!f?.display) return null;

  return (
    <Column fillWidth horizontal="center" className="section section--ruled">
      <Reveal>
        <div className="sectionHead">
          <span className="eyebrow">
            {icon}
            {f.label}
          </span>
          <Heading as="h2" variant="display-strong-s" align="center">
            {f.title}
          </Heading>
          <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            {f.intro}
          </Text>
        </div>
      </Reveal>

      <div className="cardGrid">
        {f.items.map((item, i) => (
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

      <Reveal delay={0.15}>
        <Row fillWidth horizontal="center" paddingTop="32">
          <a
            className="btn btn--secondary"
            href={f.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {f.linkLabel}
            <HiArrowUpRight aria-hidden="true" />
          </a>
        </Row>
      </Reveal>
    </Column>
  );
}
