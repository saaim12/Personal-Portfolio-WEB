import { Column, Row, Text } from "@once-ui-system/core";
import { HiArrowUpRight } from "react-icons/hi2";
import { home } from "@/resources/content";
import { Reveal } from "./Reveal";

// Social-proof stage. This quote used to sit mid-paragraph on the About page,
// where nobody read it, behind an unlabelled button called "Recommendation".
// Naming the letter is what turns it from a mystery download into proof.
export function Testimonial() {
  const t = home.testimonial;
  if (!t?.display) return null;

  return (
    <Column fillWidth horizontal="center" className="section section--tight section--ruled">
      <Reveal>
        <Column
          horizontal="center"
          align="center"
          gap="20"
          className="quoteCard"
          style={{ maxWidth: "720px", marginInline: "auto" }}
        >
          {t.context && (
            <Text variant="body-default-s" onBackground="neutral-weak" align="center">
              {t.context}
            </Text>
          )}
          <blockquote className="pullQuote">&ldquo;{t.quote}&rdquo;</blockquote>
          <Column gap="2" horizontal="center" align="center">
            <Text variant="label-strong-m">{t.author}</Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {t.role}
            </Text>
          </Column>
          {t.letter && (
            <Row>
              <a className="extLink" href={t.letter} target="_blank" rel="noopener noreferrer">
                Read the signed recommendation letter
                <HiArrowUpRight aria-hidden="true" />
              </a>
            </Row>
          )}
        </Column>
      </Reveal>
    </Column>
  );
}
