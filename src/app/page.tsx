import { Column, Heading, Row, Text } from "@once-ui-system/core";
import {
  HiOutlineDocumentText,
  HiArrowRight,
  HiOutlineWrenchScrewdriver,
  HiOutlineSquares2X2,
  HiOutlineFlag,
  HiOutlineCommandLine,
} from "react-icons/hi2";
import { FaGithub } from "react-icons/fa6";
import { home, person, social, pageMeta, ogImageFor } from "@/resources";
import { jsonLd, personJsonLd, webPageJsonLd } from "@/resources/schema";
import { iconLibrary } from "@/resources/icons";
import {
  HeroHeadline,
  Practice,
  Contact,
  ProofBar,
  StatusLine,
  Testimonial,
  LookingFor,
  Certificates,
  Fundamentals,
  SkillsMarquee,
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
      {/* Person belongs to this page: it is the one that introduces him.
          FAQPage went with the FAQ section it was generated from. */}
      <script {...jsonLd(personJsonLd)} />

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

          {/* Two buttons, one clear primary. The primary points at the
              write-ups rather than at a contact channel: for this audience the
              conversion event is reading one case study properly, not sending
              a message. */}
          <Reveal delay={0.25}>
            <Row gap="12" wrap horizontal="center" vertical="center">
              <a className="btn btn--primary btn--lg" href="/work">
                Read the engineering write-ups
                <HiArrowRight aria-hidden="true" />
              </a>
              <a
                className="btn btn--secondary btn--lg"
                href="/SaaimCV.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HiOutlineDocumentText aria-hidden="true" />
                Resume (PDF)
              </a>
            </Row>
          </Reveal>

          {/* Two links a recruiter would otherwise have to hunt for: the signed
              reference, and the algorithms repo most loops screen for. Both
              above the fold, both secondary to the write-ups. */}
          <Reveal delay={0.32}>
            <Row gap="24" wrap horizontal="center" textVariant="body-default-s">
              <a
                className="extLink"
                href="/Fitter-Recommendation-Letter.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HiOutlineDocumentText aria-hidden="true" />
                Client recommendation (PDF)
              </a>
              <a
                className="extLink"
                href="https://github.com/saaim12/DSA-Python"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub aria-hidden="true" />
                Data structures &amp; algorithms in Python
              </a>
            </Row>
          </Reveal>

          <Reveal delay={0.38}>
            <Row gap="8" horizontal="center" wrap>
              {social.filter((item) => item.essential).map((item) => {
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

          {/* Availability, location, discipline and start date, before
              anything else on the page. A recruiter used to have to read three
              separate sections to answer these four questions. */}
          <StatusLine />
        </Column>
      </div>

      {/* Texture, not a claim: the stack at a glance, muted enough that the
          headline above it still wins. The real evidence is the proof bar
          under it and the write-ups below that. */}
      <SkillsMarquee />

      {/* ── 2. TRUST ── */}
      <ProofBar />

      {/* ── 3. AUTHORITY ── */}
      <Practice icon={<HiOutlineWrenchScrewdriver aria-hidden="true" />} />

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
              Systems I&rsquo;ve built
            </Heading>
            <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
              Not screenshots. Each one is a write-up: the constraint that
              actually bound, the architecture it forced, the trade-off I made
              with my eyes open, and the thing I would build differently now.
              Read one and you know how I think about a system.
            </Text>
          </div>
        </Reveal>

        {/* One from each of the three groups on /work, named rather than sliced
            by date: the preview should represent the range of work, and a date
            range would silently reshuffle it on the next case study. */}
        <Reveal delay={0.08}>
          <Projects
            only={[
              "fitter-health-platform",
              "multilingual-rag-engine",
              "realtime-ecommerce-etl-pipeline",
            ]}
          />
        </Reveal>

        <Reveal delay={0.12}>
          <Row fillWidth horizontal="center" paddingTop="32">
            <a className="btn btn--secondary" href="/work">
              All five write-ups
              <HiArrowRight aria-hidden="true" />
            </a>
          </Row>
        </Reveal>
      </Column>

      {/* ── 6. SOCIAL PROOF ── */}
      <Testimonial />

      {/* ── 7. FUNDAMENTALS ── */}
      <Fundamentals icon={<HiOutlineCommandLine aria-hidden="true" />} />

      {/* ── 8. CREDENTIALS ── */}
      <Certificates />

      {/* ── 9. FIT ── */}
      <LookingFor icon={<HiOutlineFlag aria-hidden="true" />} />

      {/* ── 10. ACTION ── */}
      <Contact />
    </Column>
  );
}
