import { SiteAnchor } from "@/components/SiteAnchor";
import Link from "next/link";
import { specialties } from "@/resources/specialties";
import { engineeringNotes } from "@/resources/engineering-notes";
import "@/app/expertise/editorial.css";
import Image from "@/components/SiteImage";
import { home, person, portraits, social } from "@/resources/content";
import { pageMeta, ogImageFor } from "@/resources/seo";
import { jsonLd, personJsonLd, webPageJsonLd } from "@/resources/schema";
import { Contact } from "@/components/Contact";
import { HeroDots } from "@/components/HeroDots";
import { BlurLetters } from "@/components/effects/BlurLetters";
import { ProfileButton } from "@/components/ProfileButton";
import { WorkCarousel } from "@/components/effects/WorkCarousel";
import { WordReveal } from "@/components/effects/WordReveal";
import { CountUp } from "@/components/effects/CountUp";
import { PortfolioAnswers } from "@/components/PortfolioAnswers";
import { Projects } from "@/components/projects/Projects";
import { Action, Label } from "@/components/Studio";
import { featuredSlugs } from "@/resources/project-art";
import { getProjects } from "@/utils/projects";
export async function generateMetadata() { return pageMeta({ title: home.title, description: home.description, path: home.path, image: home.image }); }
const [firstName, ...rest] = person.name.split(" ");
const featuredYears = getProjects().filter(p => featuredSlugs.includes(p.slug)).map(p => p.metadata.publishedAt.slice(0, 4)).sort();
const workYears = featuredYears[0] === featuredYears.at(-1) ? featuredYears[0] : `${featuredYears[0]}-${featuredYears.at(-1)}`;
export default function Home() {
  return <div className="studioHome">
    <script {...jsonLd(webPageJsonLd({ title: home.title, description: home.description, path: home.path, image: ogImageFor(home.title) }))} /><script {...jsonLd(personJsonLd)} />
    <section className="studioHero gridLines" aria-labelledby="hero-name">
      <HeroDots />
      <div className="heroNameGroup">
        <h1 id="hero-name" className="heroName"><span className="heroLine"><span><BlurLetters text={firstName} reveal={false} strength={6} /></span></span> <span className="heroLine"><span><BlurLetters text={rest.join(" ")} reveal={false} strength={6} /></span></span></h1>
        <p className="heroRole">Software engineer<br />Based in Lahore, Pakistan</p>
        <p className="heroAvailable">Available now for full-time remote roles and contracts</p>
        <p className="monoMeta">Previously at Fitter Health and Expertflow</p>
      </div>
      <div className="heroStatement"><h2>I build beautiful frontends, reliable backends, data pipelines &amp; AI features, in JavaScript and Python.</h2><div className="heroCtas"><Action href="/contact">Contact me</Action></div></div>
      <div className="heroFooter"><SiteAnchor href="#work" className="monoLink">[View selected work]</SiteAnchor><nav className="heroSocials" aria-label="Saaim's profiles">{social.map(item => <ProfileButton key={item.name} name={item.name} link={item.link} />)}</nav></div>
    </section>
    <section id="work" className="homeWork" aria-labelledby="featured-heading">
      <div className="workInner">
        <div className="workHeading"><Label>Selected work</Label><p className="monoMeta workRange">Projects_{workYears}</p><p className="monoMeta workHint">04 projects</p><h2 id="featured-heading" className="workTitle">Selected projects</h2><p className="monoMeta workLead">Client delivery, production debugging, and independent engineering projects.</p></div>
        <WorkCarousel><Projects only={featuredSlugs} preview /></WorkCarousel>
        <div className="allWorkAction"><Action href="/projects">All {getProjects().length} projects</Action><SiteAnchor href="/professional-experience" className="quietLink">Explore my experience</SiteAnchor></div>
      </div>
    </section>
    <section className="homeAbout studioContainer" aria-labelledby="about-intro">
      <Label>About</Label>
      <div className="aboutBody">
        <h2 id="about-intro"><WordReveal text="I’m Saaim, a software engineer in Lahore. I build services, interfaces, data pipelines and AI features, and own the deployment work behind them." /></h2>
        <div className="aboutColumns">
          <p>I work in both JavaScript and Python stacks, from the interface people see to the APIs, pipelines and cloud services behind it. I care that the frontend looks and feels right, and that everything under it can be depended on.</p>
          <div className="portraitPair">
            <figure><Image src={person.avatar} width={240} height={280} alt="Saaim Abdullah" /><figcaption>2026</figcaption></figure>
            <figure><Image src={portraits.smiling} width={240} height={280} alt="Saaim smiling in glasses" /><figcaption>After hours</figcaption></figure>
          </div>
        </div>
        <ul className="skillStickers" aria-label="Areas of work"><li>Frontend</li><li>Backend systems</li><li>Data engineering</li><li>Cloud &amp; AI</li></ul>
        <SiteAnchor href="/professional-experience" className="quietLink"><span aria-hidden="true">↳ </span>Professional Experience</SiteAnchor>
        <div className="hiringProof" aria-label="Engineering experience highlights">
          <p className="monoLabel">(Evidence from shipped work)</p>
          <div className="hiringProofGrid"><article><span>Lower admin-panel response time at Expertflow (130 ms to 30 ms) with Redis caching and index tuning</span><strong><CountUp value={77} suffix="%" /></strong></article><article><span>Passing tests at Fitter Health handover</span><strong><CountUp value={135} /></strong></article><article><span>Tables in the healthcare product PostgreSQL schema</span><strong><CountUp value={106} /></strong></article></div>
          <div className="hiringProofLinks"><SiteAnchor className="outlineButton" href="/projects/fitter-health-platform">Fitter Health case study</SiteAnchor><SiteAnchor className="outlineButton" href="/SaaimCV.pdf" target="_blank" rel="noopener noreferrer">View resume</SiteAnchor></div>
        </div>
      </div>
    </section>
    <section className="engineeringHub studioContainer" aria-labelledby="home-engineering-focus">
      <span className="engineeringEyebrow">(What I build / How I think)</span>
      <h2 id="home-engineering-focus" className="engineeringTitle">Engineering behind the work.</h2>
      <p className="engineeringLead">Architecture decisions, trade-offs, and implementation evidence from my projects: backend APIs, data pipelines, AI retrieval, cloud delivery and product systems.</p>
      <div className="engineeringCardGrid">{specialties.slice(0,4).map((item, index)=><Link className="engineeringCard" href={`/expertise/${item.slug}`} key={item.slug}><small>{String(index+1).padStart(2,"0")}_Engineering practice</small><h3>{item.title}</h3><p>{item.summary}</p><span className="engineeringArrow">See case-study evidence</span></Link>)}</div>
      <div className="engineeringClosing"><h3>Technical architecture notes</h3><p>{engineeringNotes.slice(0,2).map((note,index)=><span key={note.slug}>{index>0?" · ":""}<Link href={`/engineering-notes/${note.slug}`}>{note.title}</Link></span>)}</p><p><Link href="/expertise">View all specialties</Link> · <Link href="/engineering-notes">Read all notes</Link></p></div>
    </section>
    <PortfolioAnswers />
    <Contact animated />
  </div>;
}
