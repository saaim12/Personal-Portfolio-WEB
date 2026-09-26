import Image from "next/image";
import { Column, Heading, Row, Text } from "@once-ui-system/core";
import {
  HiOutlineDocumentText,
  HiArrowRight,
  HiArrowUpRight,
  HiOutlineSquares2X2,
  HiOutlineRectangleStack,
} from "react-icons/hi2";
import { home, person, social } from "@/resources/content";
import { pageMeta, ogImageFor } from "@/resources/seo";
import { jsonLd, personJsonLd, webPageJsonLd } from "@/resources/schema";
import { iconLibrary } from "@/resources/icons";
import { HeroHeadline } from "@/components/HeroHeadline";
import { Contact } from "@/components/Contact";
import { ProofBar } from "@/components/ProofBar";
import { StatusLine } from "@/components/StatusLine";
import { Testimonial } from "@/components/Testimonial";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { Reveal } from "@/components/Reveal";
import { ScrollCue } from "@/components/ScrollCue";
import { Track } from "@/components/Track";
import { Stack } from "@/components/Stack";
import { PortraitTransition } from "@/components/PortraitTransition";
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

      <Track />
      <section className="editorialHero" aria-label="Introduction">
        <div className="heroType">
          <span className="heroSpark" aria-hidden="true">
            &#10022;
          </span>
          <HeroHeadline text={person.role} />
          <svg className="heroBolt" aria-hidden="true" viewBox="0 0 70 100" width="80" height="110">
            <path d="M44 2 5 54l25 4-7 40 43-56-27-3Z" fill="currentColor" />
          </svg>
        </div>
        <div className="heroBaseline">
          <span className="heroYear">&copy;{new Date().getFullYear()}</span>
          <PortraitTransition src={person.avatar} alt={person.name} />
          <span className="heroLocation">/{person.city}</span>
        </div>
      </section>
      <section className="heroIntro section" aria-labelledby="intro-title">
        <Reveal>
          <h2 id="intro-title">
            Hey!
          </h2>
        </Reveal>
        <div className="introColumns">
          <div className="introIdentity">
            <h3>{home.headline}</h3>
            <StatusLine />
          </div>
          <div id="portrait-destination" className="portraitDestination">
            <Image
              src={person.avatar}
              alt=""
              aria-hidden="true"
              width={420}
              height={520}
              sizes="(max-width: 760px) 82vw, 420px"
            />
          </div>
          <div className="introDetails">
            <p>{home.subline}</p>
            <div className="introActions">
              <a
                className="btn btn--primary"
                href="/experience"
                data-track="hero_cta:view_experience"
              >
                View experience <HiArrowRight aria-hidden="true" />
              </a>
              <a className="extLink" href="/work" data-track="hero_cta:see_projects">
                See Projects <HiArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <div className="introActions">
              <a
                className="extLink"
                href="/SaaimCV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero_link:resume"
              >
                <HiOutlineDocumentText aria-hidden="true" /> View Resume
              </a>
              <a
                className="extLink"
                href="/Fitter-Recommendation-Letter.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero_link:recommendation"
              >
                Client Recommendation <HiArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <div className="introActions">
              {social
                .filter((item) => item.essential)
                .map((item) => {
                  const Icon = iconLibrary[item.icon];
                  return (
                    <a
                      key={item.name}
                      className="heroSocial"
                      data-platform={item.icon}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                    >
                      <Icon aria-hidden="true" />
                      <span>{item.name}</span>
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
        <ScrollCue />
      </section>

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
                Practical engineering across product development, backend systems, cloud
                infrastructure, and data. Explore the work to see how I approach complex
                requirements and turn them into software people can depend on.
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
                The notification pipeline on Fitter Health dropped messages silently. Here is what I
                changed.
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

      {/* Final action */}
      <Contact />
    </Column>
  );
}
