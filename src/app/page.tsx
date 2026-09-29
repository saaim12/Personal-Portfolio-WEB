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
      <section className="editorialHero recruiterHero" aria-label="Introduction">
        <p className="heroAvailability"><span className="availableDot" aria-hidden="true" />Open to software engineering roles &amp; product work</p>
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
          <div className="heroIdentity"><strong>{person.name}</strong><span>Backend &amp; Full-Stack Engineer</span><small>{person.city} · EU &amp; US-East hours</small></div>
          <PortraitTransition src={person.avatar} alt={person.name} />
          <div className="heroAudienceActions">
            <a className="btn btn--primary" href="/SaaimCV.pdf" target="_blank" rel="noopener noreferrer" data-track="hero_link:resume">View résumé <HiOutlineDocumentText aria-hidden="true" /></a>
            <a className="btn btn--secondary" href={`mailto:${person.email}?subject=Let%E2%80%99s%20discuss%20a%20product`} data-track="hero_cta:discuss_product">Discuss a product <HiArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>
      <ProofBar />
      <section className="heroIntro section" aria-labelledby="intro-title">
        <Reveal>
          <h2 id="intro-title">
            Hey!
          </h2>
        </Reveal>
        <div className="introColumns">
          <div className="introIdentity">
            <span className="introEyebrow">{person.name}</span>
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
            <div className="introActions introPrimaryActions">
              <a
                className="btn btn--primary"
                href="/experience"
                data-track="hero_cta:view_experience"
              >
                View experience <HiArrowRight aria-hidden="true" />
              </a>
              <a className="btn btn--secondary" href="/work" data-track="hero_cta:see_projects">
                See Projects <HiArrowUpRight aria-hidden="true" />
              </a>
              <a className="btn btn--secondary" href="https://medium.com/@saymmalik08" target="_blank" rel="noopener noreferrer" data-track="hero_cta:medium">
                Read My Articles <HiArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <div className="introDocuments">
              <a
                className="introDocument"
                href="/SaaimCV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero_link:resume"
              >
                <HiOutlineDocumentText aria-hidden="true" />
                <span><strong>View Resume</strong><small>Experience &amp; skills · PDF</small></span>
                <HiArrowUpRight aria-hidden="true" />
              </a>
              <a
                className="introDocument"
                href="/Fitter-Recommendation-Letter.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero_link:recommendation"
              >
                <HiOutlineDocumentText aria-hidden="true" />
                <span><strong>Client Recommendation</strong><small>A note from the founder · PDF</small></span>
                <HiArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <div className="introConnect">
              <span className="introEyebrow">Find me online</span>
              <div className="introActions introSocials">
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
      <section id="work" className="projectShowcase section" aria-labelledby="projects-title">
        <div className="showcaseHeading"><span className="showcaseBadge">↗ Ideas into working software</span><h2 id="projects-title">Projects with a story.</h2><p>The problem, the build, and the decisions along the way.</p></div>
        <Projects showcase only={["fitter-health-platform", "bookstore-platform", "multilingual-rag-engine", "temporary-url-service", "realtime-ecommerce-etl-pipeline", "document-rag-backend", "movie-recommender-system", "esp32-temperature-inference", "web-sentiment-pipeline", "autoencoder-edge-compression", "interactive-portfolio", "algorithms-in-python", "ml-data-foundations"]} />
        <div className="allProjectsAction"><a className="btn btn--primary" href="/work">Explore every project ↗</a><a className="btn btn--secondary" href="https://medium.com/@saymmalik08" target="_blank" rel="noopener noreferrer">Read My Articles ↗</a></div>
        <Testimonial />
      </section>

      {/* ── 5. STACK ─────────────────────────────────────────────────────
          Was on /about, where the traffic never went. */}
      <Stack icon={<HiOutlineRectangleStack aria-hidden="true" />} />

      {/* Final action */}
      <Contact />
    </Column>
  );
}
