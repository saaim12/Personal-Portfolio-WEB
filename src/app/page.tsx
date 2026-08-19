import { Column, Heading, Row, Text } from "@once-ui-system/core";
import {
  HiOutlineDocumentText,
  HiArrowRight,
  HiArrowUpRight,
  HiOutlineWrenchScrewdriver,
  HiOutlineSquares2X2,
  HiOutlineFlag,
  HiOutlineCommandLine,
  HiOutlineRectangleStack,
} from "react-icons/hi2";
import { home, social, pageMeta, ogImageFor } from "@/resources";
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
  ScrollCue,
  Track,
  Stack,
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

// The home page carries the whole story.
//
// Analytics said what analytics usually says about a portfolio: visitors land
// here and navigate nowhere. So nothing that matters sits behind a click any
// more. /work, /about and each case study still exist, but as depth for the
// few who want it, not as the only place the substance lives. Every section
// below is full content, and every section ends with exactly one link pointing
// at the next specific thing rather than a menu of five.
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

      {/* One delegated click listener and one scroll listener for the page.
          Everything it measures stays server-rendered. The section index is
          not here: it lives in the header pill, so the page has one nav. */}
      <Track />

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
          gap="16"
          className="hero"
          style={{ position: "relative", zIndex: 1, maxWidth: "720px" }}
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

          {/* The primary button no longer leaves the page. It used to open
              /work, and the second button opened a PDF in a viewer, which is
              where the visit ended. Both destinations are still here, one as
              an in-page scroll and one as a small link. */}
          <Reveal delay={0.25}>
            <Row gap="12" wrap horizontal="center" vertical="center">
              <a
                className="btn btn--primary btn--lg"
                href="#work"
                data-track="hero_cta:see_the_work"
              >
                See the work
                <HiArrowRight aria-hidden="true" />
              </a>
              <a
                className="btn btn--secondary btn--lg"
                href="/work"
                data-track="hero_cta:read_the_write_ups"
              >
                Read the write-ups
              </a>
            </Row>
          </Reveal>

          {/* Both PDFs, demoted to text and both opening in a new tab. A
              recruiter who wants the CV still finds it in two seconds; a
              recruiter who wanted the site no longer loses it to a PDF
              viewer. */}
          <Reveal delay={0.32}>
            <Row gap="24" wrap horizontal="center" textVariant="body-default-s">
              <a
                className="extLink"
                href="/SaaimCV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero_link:resume"
              >
                <HiOutlineDocumentText aria-hidden="true" />
                Resume (PDF)
              </a>
              <a
                className="extLink"
                href="/Fitter-Recommendation-Letter.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero_link:recommendation"
              >
                <HiOutlineDocumentText aria-hidden="true" />
                Client recommendation (PDF)
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

          <ScrollCue />
        </Column>
      </div>

      {/* Texture, not a claim: the stack at a glance, muted enough that the
          headline above it still wins. The real evidence is the proof bar
          under it and the write-ups below that. */}
      <SkillsMarquee />

      {/* ── 2 + 3. TRUST AND PROOF ───────────────────────────────────────
          The anchor opens on the numbers and runs into the cards, because
          those four tiles are what the cards are evidence for. It also puts
          the top of #work inside the first screen on a 1440x900 desktop,
          which is the entire point of capping the hero.

          Cards, not a list of titles: the whole card is the click target,
          because people click blocks and do not hunt for links. */}
      <Column id="work" fillWidth horizontal="center">
      <ProofBar />
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
            <a
              className="extLink"
              href="/work/fitter-health-platform"
              data-track="section_outro:fitter_incident"
            >
              The notification pipeline on Fitter Health dropped messages
              silently. Here is what I changed.
              <HiArrowRight aria-hidden="true" />
            </a>
          </Row>
        </Reveal>
      </Column>
      </Column>

      {/* ── 4. SOCIAL PROOF ── */}
      <Testimonial />

      {/* ── 5. STACK ─────────────────────────────────────────────────────
          Was on /about, where the traffic never went. */}
      <Stack icon={<HiOutlineRectangleStack aria-hidden="true" />} />

      {/* ── 6. APPROACH ── */}
      <Column id="approach" fillWidth horizontal="center" className="sectionGroup">
        <Practice icon={<HiOutlineWrenchScrewdriver aria-hidden="true" />} />
        <Reveal className="sectionOutro">
          <Row fillWidth horizontal="center">
            <a
              className="extLink"
              href="https://medium.com/@saymmalik08"
              target="_blank"
              rel="noopener noreferrer"
              data-track="section_outro:medium"
            >
              Longer-form notes on what I&rsquo;m building, on Medium
              <HiArrowUpRight aria-hidden="true" />
            </a>
          </Row>
        </Reveal>
      </Column>

      {/* ── 7. WRITING & FUNDAMENTALS ── */}
      <Column id="writing" fillWidth horizontal="center" className="sectionGroup">
        <Fundamentals icon={<HiOutlineCommandLine aria-hidden="true" />} />
        <Certificates />
        <Reveal className="sectionOutro">
          <Row fillWidth horizontal="center">
            <a className="extLink" href="#contact" data-track="section_outro:contact">
              If any of this looks like a problem you currently have, email me.
              <HiArrowRight aria-hidden="true" />
            </a>
          </Row>
        </Reveal>
      </Column>

      {/* ── 8. FIT ── */}
      <LookingFor icon={<HiOutlineFlag aria-hidden="true" />} />

      {/* ── 9. ACTION ── */}
      <Contact />
    </Column>
  );
}
