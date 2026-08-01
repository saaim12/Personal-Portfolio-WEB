import { createElement, type ReactNode } from "react";
import { Column, Heading, Text } from "@once-ui-system/core";
import { home } from "@/resources";
import { iconLibrary } from "@/resources/icons";
import { Reveal } from "./Reveal";

export function Services({ icon }: { icon?: ReactNode }) {
  if (!home.services.display) return null;

  return (
    // `as="h2"` matters: Once UI's Heading defaults to h1, so this section was
    // emitting a second h1 on the homepage alongside the hero headline.
    <Column fillWidth horizontal="center" className="section section--ruled">
      <Reveal>
        <div className="sectionHead">
          <span className="eyebrow">{icon}Services</span>
          <Heading as="h2" variant="display-strong-s" align="center">
            {home.services.title}
          </Heading>
          <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            One engineer, the whole stack, design to database.
          </Text>
        </div>
      </Reveal>

      <div className="cardGrid">
        {home.services.items.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.05}>
            <div className="card">
              {service.icon && (
                <span className="cardIcon" aria-hidden="true">
                  {createElement(iconLibrary[service.icon])}
                </span>
              )}
              <h3 className="cardTitle">{service.title}</h3>
              <p className="cardDesc">{service.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Column>
  );
}
