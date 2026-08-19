import { Column, Heading, Row, Text } from "@once-ui-system/core";
import { HiOutlineEnvelope, HiOutlineCalendarDays } from "react-icons/hi2";
import { bookingLink, person, social } from "@/resources";
import { iconLibrary } from "@/resources/icons";
import { Reveal } from "./Reveal";

// Direct-contact CTAs only. No form, no email backend.
//
// WhatsApp used to be the primary button here and in the hero. It is in the
// icon row now and nowhere else: a recruiter will not open WhatsApp to message
// an unknown international number, and a messaging app as the front door reads
// freelance regardless of what the copy around it says.
const SECONDARY = ["GitHub", "LinkedIn", "Medium", "WhatsApp"];

export function Contact() {
  const byName = (name: string) => social.find((s) => s.name === name);

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
            Get in touch
          </Heading>
          <Text
            onBackground="neutral-weak"
            variant="heading-default-m"
            align="center"
            wrap="balance"
          >
            Open to full-time roles and to interesting problems generally. Email
            is the fastest way to reach me and I reply within a day.
          </Text>
        </Column>
      </Reveal>

      <Reveal delay={0.08}>
        <Row gap="12" wrap horizontal="center">
          {/* The address is the label, not "Email me". A recruiter who wants to
              paste it into their own client should not have to hover a button
              to find out what it is. */}
          <a
            className="btn btn--primary btn--lg"
            href={`mailto:${person.email}`}
            data-track="contact:email"
          >
            <HiOutlineEnvelope aria-hidden="true" />
            {person.email}
          </a>
          {/* Kept, demoted. Some recruiters would rather book a slot than open
              a thread, and it costs one secondary button to serve them. */}
          <a
            className="btn btn--secondary btn--lg"
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            data-track="contact:book_a_call"
          >
            <HiOutlineCalendarDays aria-hidden="true" />
            Book a call
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
          European and US teams hiring from Pakistan. */}
      <Reveal delay={0.16}>
        <div className="availability">
          <span className="availabilityItem">
            <span className="availableDot" aria-hidden="true" />
            Open to full-time roles
          </span>
          <span className="availabilityItem">Replies within 24 hours</span>
          <span className="availabilityItem">EU and US-East hours</span>
        </div>
      </Reveal>
    </Column>
  );
}
