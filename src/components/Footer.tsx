import { Column, Row, Text } from "@once-ui-system/core";
import { HiArrowUpRight } from "react-icons/hi2";
import { person, social } from "@/resources";

// Every page used to terminate in a wall: no navigation, no second chance, no
// internal links for crawl depth. Separators here are layout (gaps and a rule),
// not "·" characters wedged between strings.
const LINKS = [
  { label: "Work", href: "/work", external: false },
  { label: "About", href: "/about", external: false },
  { label: "Resume", href: "/SaaimCV.pdf", external: true },
  { label: "Writing", href: "https://medium.com/@saymmalik08", external: true },
];

export function Footer() {
  return (
    <Column
      as="footer"
      fillWidth
      horizontal="center"
      paddingY="48"
      style={{
        borderTop: "1px solid var(--border)",
        paddingLeft: "clamp(16px, 5vw, 48px)",
        paddingRight: "clamp(16px, 5vw, 48px)",
      }}
    >
      <Column fillWidth gap="32" style={{ maxWidth: "1120px" }}>
        <Row fillWidth horizontal="between" wrap gap="32">
          <Column gap="8" style={{ maxWidth: "340px" }}>
            <Text variant="label-strong-m">{person.name}</Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {person.role}
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {person.city ?? person.location}. Working EU and US-East hours.
            </Text>
          </Column>

          <Row gap="40" wrap>
            <Column gap="12">
              <Text variant="body-default-xs" onBackground="neutral-weak">
                Site
              </Text>
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  className="extLink"
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {l.label}
                  {l.external && <HiArrowUpRight aria-hidden="true" />}
                </a>
              ))}
            </Column>

            <Column gap="12">
              <Text variant="body-default-xs" onBackground="neutral-weak">
                Elsewhere
              </Text>
              {social.map((s) => (
                <a
                  key={s.name}
                  className="extLink"
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.name === "Email" ? person.email : s.name}
                  <HiArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </Column>
          </Row>
        </Row>

        <Row
          fillWidth
          horizontal="between"
          wrap
          gap="12"
          paddingTop="24"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <Text variant="body-default-xs" onBackground="neutral-weak">
            © {new Date().getFullYear()} {person.name}
          </Text>
          <Text variant="body-default-xs" onBackground="neutral-weak">
            Built with Next.js, deployed on Vercel
          </Text>
        </Row>
      </Column>
    </Column>
  );
}
