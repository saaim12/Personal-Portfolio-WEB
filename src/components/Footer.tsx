import { Column, Row, Text } from "@once-ui-system/core";
import { HiArrowUpRight } from "react-icons/hi2";
import { person, social } from "@/resources/content";
import type { TechKey } from "@/resources/tech";
import { TechList } from "./Tech";

// Every page used to terminate in a wall: no navigation, no second chance, no
// internal links for crawl depth. Separators here are layout (gaps and a rule),
// not "·" characters wedged between strings.
const COLOPHON: TechKey[] = ["nextjs", "vercel"];

const LINKS = [
  { label: "Work", href: "/work", external: false },
  { label: "Experience", href: "/experience", external: false },
  { label: "Projects", href: "/work", external: false },
  { label: "Resume", href: "/SaaimCV.pdf", external: true },
  { label: "Writing", href: "https://medium.com/@saymmalik08", external: true },
];

export function Footer() {
  return (
    <Column
      as="footer"
      className="siteFooter"
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
            <h2 className="footerHeadline">{person.role}</h2>
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
              <div className="footerBtnCol">
                {LINKS.map((l) => (
                  <a
                    key={l.label}
                    className="footerBtn"
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {l.label}
                    {l.external && <HiArrowUpRight aria-hidden="true" />}
                  </a>
                ))}
              </div>
            </Column>

            <Column gap="12">
              <Text variant="body-default-xs" onBackground="neutral-weak">
                Elsewhere
              </Text>
              <div className="footerBtnCol">
                {social.map((s) => (
                  <a
                    key={s.name}
                    className="footerBtn"
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.name === "Email" ? person.email : s.name}
                    <HiArrowUpRight aria-hidden="true" />
                  </a>
                ))}
              </div>
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
          {/* Was the string "Built with Next.js, deployed on Vercel". Same two
              technologies, now carrying their own marks. */}
          <Row gap="8" vertical="center" wrap>
            
            
          </Row>
        </Row>
        <div className="footerWordmark" aria-hidden="true">
          {person.firstName}
        </div>
      </Column>
    </Column>
  );
}
