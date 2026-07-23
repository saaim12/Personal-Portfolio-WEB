import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import { Reveal } from "./Reveal";

// Contact section — direct-contact CTAs only (no form / no email backend).
const PRIMARY = ["WhatsApp", "Email"];
const SECONDARY = ["Upwork", "LinkedIn", "GitHub", "Medium"];

export function Contact() {
  const byName = (name: string) => social.find((s) => s.name === name);

  return (
    <Column
      fillWidth
      horizontal="center"
      align="center"
      paddingY="104"
      paddingX="l"
      gap="24"
      id="contact"
    >
      <Reveal>
        <Column maxWidth="s" fillWidth gap="12" horizontal="center" align="center">
          <Heading as="h2" variant="display-strong-m" align="center">
            Let's build your product
          </Heading>
          <Text
            onBackground="neutral-weak"
            variant="heading-default-m"
            align="center"
            wrap="balance"
          >
            Websites, web apps, backend, data, or AI — tell me what you need and
            I'll get back to you within a day.
          </Text>
        </Column>
      </Reveal>

      <Reveal delay={0.1}>
        <Row gap="12" wrap horizontal="center">
          {PRIMARY.map((name, i) => {
            const s = byName(name);
            if (!s) return null;
            return (
              <Button
                key={name}
                className="eliteBtn"
                href={s.link}
                prefixIcon={s.icon}
                variant={i === 0 ? "primary" : "secondary"}
                size="l"
                data-border="rounded"
              >
                {name === "Email" ? person.email : "Chat on WhatsApp"}
              </Button>
            );
          })}
        </Row>
      </Reveal>

      <Reveal delay={0.15}>
        <Row gap="8" wrap horizontal="center">
          {SECONDARY.map((name) => {
            const s = byName(name);
            if (!s) return null;
            return (
              <Button
                key={name}
                className={`socialBtn socialBtn-${name.toLowerCase()}`}
                href={s.link}
                prefixIcon={s.icon}
                variant="tertiary"
                size="m"
                data-border="rounded"
              >
                {name}
              </Button>
            );
          })}
        </Row>
      </Reveal>
    </Column>
  );
}
