import { createElement } from "react";
import { Column, Heading, Text } from "@once-ui-system/core";
import { home } from "@/resources";
import { iconLibrary } from "@/resources/icons";
import { Reveal, TiltCard } from "@/components";

export function Services() {
  if (!home.services.display) return null;

  return (
    <Column fillWidth maxWidth="l" horizontal="center" gap="40" paddingY="80" paddingX="l">
      <Reveal>
        <Column horizontal="center" gap="8" align="center">
          <Heading variant="display-strong-s" align="center">
            {home.services.title}
          </Heading>
          <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            One engineer, the whole stack, design to database.
          </Text>
        </Column>
      </Reveal>

      <div className="serviceGrid">
        {home.services.items.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.08}>
            <TiltCard index={i}>
              <div className="tiltBody">
                {service.icon && (
                  <span className="tiltIcon">{createElement(iconLibrary[service.icon])}</span>
                )}
                <h3 className="tiltTitle">{service.title}</h3>
                <p className="tiltDesc">{service.description}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Column>
  );
}
