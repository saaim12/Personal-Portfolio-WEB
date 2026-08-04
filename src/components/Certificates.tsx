import { Column, Heading, Text } from "@once-ui-system/core";
import { HiOutlineAcademicCap, HiArrowUpRight } from "react-icons/hi2";
import { certificates } from "@/resources";
import { Reveal } from "./Reveal";

// Certificates, as links and nothing else.
//
// This used to open each credential in a modal with an <object> PDF viewer.
// That meant a client component, a scroll lock, an Escape handler, and a
// document embed that most mobile browsers refuse to render inline anyway.
// A link to the issuer's verification page is stronger proof than a preview
// of a PDF, and it costs no JavaScript: this is a server component now.
//
// Each card points at the issuer's verify URL where one exists and at the
// stored PDF where it doesn't.
export function Certificates() {
  if (!certificates.length) return null;

  return (
    <Column fillWidth horizontal="center" className="section section--ruled">
      <Reveal>
        <div className="sectionHead">
          <span className="eyebrow">
            <HiOutlineAcademicCap aria-hidden="true" />
            Credentials
          </span>
          <Heading as="h2" variant="display-strong-s" align="center">
            Certifications
          </Heading>
          <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            Each one links to the issuer&rsquo;s verification page.
          </Text>
        </div>
      </Reveal>

      <div className="certGrid">
        {certificates.map((cert, i) => {
          const href = cert.verify ?? cert.file;
          const source = cert.verify ? (cert.via ?? cert.issuer) : "PDF";
          return (
            <Reveal key={cert.title} delay={i * 0.05}>
              <a
                className="certCard"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="certIssuer">{cert.issuer}</span>
                <h3 className="certTitle">{cert.title}</h3>
                <span className="certMeta">
                  <span>{cert.date}</span>
                  <span className="certView">
                    {cert.verify ? `Verify with ${source}` : "Open PDF"}
                    <HiArrowUpRight aria-hidden="true" />
                  </span>
                </span>
              </a>
            </Reveal>
          );
        })}
      </div>

      {/* Not a card: a card is a link, and an unearned certificate has nothing
          to link to. It sits here rather than in the proof bar because an
          in-progress cert only reads honestly with context around it. */}
      <Reveal delay={0.2}>
        <Text
          variant="body-default-s"
          onBackground="neutral-weak"
          align="center"
          paddingTop="24"
        >
          AWS Certified Solutions Architect &ndash; Associate: exam scheduled 2026.
        </Text>
      </Reveal>
    </Column>
  );
}
