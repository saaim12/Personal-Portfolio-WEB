import { Column, Heading, Row, Text } from "@once-ui-system/core";
import { HiOutlineEnvelope, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { person, social } from "@/resources";
import { iconLibrary } from "@/resources/icons";
import { Reveal } from "./Reveal";

// Direct-contact CTAs only. No form, no email backend.
const SECONDARY = ["Upwork", "LinkedIn", "GitHub", "Medium"];

export function Contact() {
  const byName = (name: string) => social.find((s) => s.name === name);
  const whatsapp = byName("WhatsApp");

  return (
    <Column
      fillWidth
      horizontal="center"
      align="center"
      gap="32"
      id="contact"
      className="section section--ruled"
    >
      <Reveal>
        <Column gap="12" horizontal="center" align="center" style={{ maxWidth: "620px", marginInline: "auto" }}>
          <Heading as="h2" variant="display-strong-m" align="center">
            Tell me what you&rsquo;re building
          </Heading>
          {/* "I'll tell you honestly whether I'm the right engineer for it" is
              a disqualifying statement, and disqualifying statements are the
              strongest trust move available in consulting copy: they signal
              enough work to turn some down, and remove the fear of a pitch. */}
          <Text
            onBackground="neutral-weak"
            variant="heading-default-m"
            align="center"
            wrap="balance"
          >
            Backend, data platforms, AWS, or a full product from scratch. Send me
            the problem and I&rsquo;ll tell you honestly whether I&rsquo;m the
            right engineer for it, usually within a day.
          </Text>
        </Column>
      </Reveal>

      <Reveal delay={0.08}>
        <Row gap="12" wrap horizontal="center">
          {whatsapp && (
            <a
              className="btn btn--primary btn--lg"
              href={whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <HiOutlineChatBubbleLeftRight aria-hidden="true" />
              Chat on WhatsApp
            </a>
          )}
          <a className="btn btn--secondary btn--lg" href={`mailto:${person.email}`}>
            <HiOutlineEnvelope aria-hidden="true" />
            {person.email}
          </a>
        </Row>
      </Reveal>

      <Reveal delay={0.12}>
        <Row gap="8" wrap horizontal="center">
          {SECONDARY.map((name) => {
            const s = byName(name);
            if (!s) return null;
            const Icon = iconLibrary[s.icon];
            return (
              <a
                key={name}
                className={`heroSocial socialBtn-${name.toLowerCase()}`}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                title={name}
              >
                <Icon aria-hidden="true" />
              </a>
            );
          })}
        </Row>
      </Reveal>

      {/* Three separate facts laid out with spacing and rules, not joined by
          "·" inside one string. Working hours are a top-three objection for
          European and US clients hiring from Pakistan. */}
      <Reveal delay={0.16}>
        <div className="availability">
          <span className="availabilityItem">
            <span className="availableDot" aria-hidden="true" />
            Taking 1 to 2 new projects
          </span>
          <span className="availabilityItem">Replies within 24 hours</span>
          <span className="availabilityItem">EU and US-East hours</span>
        </div>
      </Reveal>
    </Column>
  );
}
