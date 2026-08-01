import { Column, Heading, Row, Text } from "@once-ui-system/core";
import {
  HiOutlineDocumentText,
  HiArrowRight,
  HiOutlineCalendarDays,
  HiOutlineSparkles,
  HiOutlineSquares2X2,
  HiOutlineMap,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";
import { home, person, social, pageMeta, ogImageFor } from "@/resources";
import { jsonLd, personJsonLd, faqJsonLd, webPageJsonLd } from "@/resources/schema";
import { iconLibrary } from "@/resources/icons";
import {
  HeroHeadline,
  Services,
  Contact,
  ProofBar,
  Testimonial,
  Process,
  FAQ,
  Certificates,
  Reveal,
} from "@/components";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return pageMeta({
    title: home.title,
    description: home.description,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column fillWidth horizontal="center">
      <script
        {...jsonLd(
          webPageJsonLd({
            title: home.title,
            description: home.description,
            path: home.path,
            image: ogImageFor(home.title),
          }),
        )}
      />
      {/* Person and FAQPage belong to this page: it introduces the person and
          it is the only route that renders the FAQ. */}
      <script {...jsonLd(personJsonLd)} />
      <script {...jsonLd(faqJsonLd)} />

      {/* ── 1. ATTENTION ────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Column
          horizontal="center"
          align="center"
          gap="24"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "720px",
            minHeight: "min(78vh, 720px)",
            justifyContent: "center",
            paddingTop: "40px",
          }}
        >
          <Row fillWidth horizontal="center">
            <HeroHeadline text={home.headline} />
          </Row>

          <Reveal delay={0.15}>
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-l"
              align="center"
            >
              {home.subline}
            </Text>
          </Reveal>

          {/* Two buttons, one clear primary. This was four equal-weight red
              buttons plus six social icons: ten peer targets with no
              hierarchy, and the reliable outcome of ten equal choices is
              none of them. */}
          <Reveal delay={0.25}>
            <Row gap="12" wrap horizontal="center" vertical="center">
              <a className="btn btn--primary btn--lg" href="/work">
                See how I build
                <HiArrowRight aria-hidden="true" />
              </a>
              <a className="btn btn--secondary btn--lg" href={home.cta.href}>
                <HiOutlineCalendarDays aria-hidden="true" />
                {home.cta.label}
              </a>
            </Row>
          </Reveal>

          {/* Resume demoted to a text link on purpose: a recruiter scanning
              for it finds a labelled link faster than they parse four
              shouting buttons, and everyone else stops being asked to
              download a CV. The icon keeps it reading as clickable. */}
          <Reveal delay={0.32}>
            <Row gap="24" wrap horizontal="center" textVariant="body-default-s">
              <a className="extLink" href="/SaaimCV.pdf" target="_blank" rel="noopener noreferrer">
                <HiOutlineDocumentText aria-hidden="true" />
                Resume (PDF)
              </a>
              <a
                className="extLink"
                href="/Fitter-Recommendation-Letter.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HiOutlineDocumentText aria-hidden="true" />
                Client recommendation (PDF)
              </a>
            </Row>
          </Reveal>

          <Reveal delay={0.38}>
            <Row gap="8" horizontal="center" wrap>
              {social.map((item) => {
                const Icon = iconLibrary[item.icon];
                return (
                  item.link && (
                    <a
                      key={item.name}
                      className={`heroSocial socialBtn-${item.name.toLowerCase()}`}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      title={item.name}
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  )
                );
              })}
            </Row>
          </Reveal>
        </Column>
      </div>

      {/* ── 2. TRUST ── */}
      <ProofBar />

      {/* ── 3. AUTHORITY ── */}
      <Services icon={<HiOutlineSparkles aria-hidden="true" />} />

      {/* ── 4 + 5. PROOF / TECHNICAL DEPTH ───────────────────────────────
          The single highest-impact change on the site: proof used to live one
          nav click away, so most visitors reached the contact block without
          ever seeing anything built. */}
      <Column fillWidth horizontal="center" className="section section--ruled">
        <Reveal>
          <div className="sectionHead">
            <span className="eyebrow">
              <HiOutlineSquares2X2 aria-hidden="true" />
              Work
            </span>
            <Heading as="h2" variant="display-strong-s" align="center">
              Selected work
            </Heading>
            <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
              Architecture, trade-offs, and what I&rsquo;d do differently.
            </Text>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Projects range={[1, 3]} />
        </Reveal>

        <Reveal delay={0.12}>
          <Row fillWidth horizontal="center" paddingTop="32">
            <a className="btn btn--secondary" href="/work">
              All five case studies
              <HiArrowRight aria-hidden="true" />
            </a>
          </Row>
        </Reveal>
      </Column>

      {/* ── 6. SOCIAL PROOF ── */}
      <Testimonial />

      {/* ── 7. PROCESS ── */}
      <Process icon={<HiOutlineMap aria-hidden="true" />} />

      {/* ── 8. CREDENTIALS ── */}
      <Certificates />

      {/* ── 9. OBJECTION HANDLING ── */}
      <FAQ icon={<HiOutlineQuestionMarkCircle aria-hidden="true" />} />

      {/* ── 10. ACTION ── */}
      <Contact />
    </Column>
  );
}
