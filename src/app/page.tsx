import { SiteAnchor } from "@/components/SiteAnchor";
import Image from "@/components/SiteImage";
import { home, person, portraits, social } from "@/resources/content";
import { pageMeta, ogImageFor } from "@/resources/seo";
import { jsonLd, personJsonLd, webPageJsonLd } from "@/resources/schema";
import { Contact } from "@/components/Contact";
import { Projects } from "@/components/projects/Projects";
import { Action, Handles, Mark, RevealText } from "@/components/Studio";
import { StudioClock } from "@/components/StudioClock";
import { featuredSlugs } from "@/resources/project-art";
import { getProjects } from "@/utils/projects";
import { HomeWelcome } from "@/components/HomeWelcome";
function ScrollWords({ text }: { text: string }) {
  return text.split(/(\s+)/).map((word, index) => /\s/.test(word) ? word : <span className="homeRevealWord" key={index}>{word}</span>);
}
export async function generateMetadata() { return pageMeta({ title: home.title, description: home.description, path: home.path, image: home.image }); }
export default function Home() {
  return <div className="studioHome">
    <HomeWelcome />
    <script {...jsonLd(webPageJsonLd({ title: home.title, description: home.description, path: home.path, image: ogImageFor(home.title) }))} /><script {...jsonLd(personJsonLd)} />
    <section className="studioHero" aria-labelledby="hero-name">
      <StudioClock />
      <div className="heroNameGroup">
        <p className="nameCaption handwritten">my name is<span className="scribble" aria-hidden="true" /></p>
        <div className="heroNotes"><span className="stickyNote mint">Recently at Fitter Health</span><span className="stickyNote sand">Previously at Expertflow</span></div>
        <div className="nameSelection"><h1 id="hero-name" className="displayType"><RevealText text={person.firstName} /></h1><Handles /></div>
        <p className="heroAvailable"><i />Available for thoughtful projects</p>
      </div>
      <SiteAnchor href="/professional-experience" className="floatingAvatar avatarLeft" aria-label="Meet Saaim"><Image src={person.avatar} width={40} height={40} alt="" /><span className="avatarGreeting" aria-hidden="true">Good to see you!</span></SiteAnchor>
      <SiteAnchor href="/professional-experience" className="floatingAvatar avatarRight" aria-label="Saaim's story"><Image src={portraits.playful} width={40} height={40} alt="" /><span className="avatarGreeting" aria-hidden="true">Hello my friends</span></SiteAnchor>
      <div className="heroStatement"><h2>I build <Mark kind="target" className="greenInk" /> dependable<br />digital products <Mark kind="flower" className="pinkInk" />.</h2><div className="heroCtas"><Action href="/contact">Contact me</Action><nav className="heroSocials" aria-label="Saaim's profiles">{social.map(item=><SiteAnchor key={item.name} href={item.link} {...(!item.link.startsWith("mailto:")?{target:"_blank",rel:"noopener noreferrer"}:{})}>{item.name}<span aria-hidden="true">↗</span></SiteAnchor>)}</nav></div></div>
      <span className="cursorSticker roleSticker">Software engineer<span aria-hidden="true">➤</span></span><span className="cursorSticker citySticker"><span aria-hidden="true">➤</span>Lahore, PK</span>
    </section>
    <section className="homeAbout" aria-labelledby="about-intro">
      <span className="aboutScribble handwritten">the engineer</span>
      <div className="selectionLabel">what’s up<Handles /></div>
      <h2 id="about-intro"><ScrollWords text="I’m Saaim" /> <Image src={person.avatar} width={58} height={58} alt="" /> <ScrollWords text="a software engineer in Lahore who gets excited" /> <Mark kind="pinwheel" className="yellowInk" /> <ScrollWords text="about making complicated things simple" /> <Mark kind="spool" className="pinkInk" />.</h2>
      <div className="portraitPair">
      <figure className="polaroid polaroidLeft"><Image src={person.avatar} width={240} height={280} alt="Saaim Abdullah" /><figcaption>2026</figcaption></figure>
      <figure className="polaroid polaroidRight"><Image src={portraits.playful} width={240} height={280} alt="Saaim wearing neon glasses" /><figcaption>after hours</figcaption></figure>
      </div>
      <div className="skillStickers"><span className="yellow">Backend systems</span><span className="yellow stickerIcon"><Mark kind="pinwheel" /></span><span className="green">Full stack</span><span className="green stickerIcon"><Mark kind="flower" /></span><span className="pink">Data engineering</span><span className="pink stickerIcon"><Mark kind="target" /></span><span className="blue">Cloud &amp; AI</span><span className="blue stickerIcon"><Mark kind="steps" /></span></div>
      <SiteAnchor href="/professional-experience" className="quietLink">Professional Experience and Story ↗</SiteAnchor>
    </section>
    <section id="work" className="homeWork studioContainer" aria-labelledby="featured-heading">
      <div className="workHeading"><span className="handwritten">explore my work!<span className="scribble" aria-hidden="true" /></span><h2 id="featured-heading" className="displayType"><RevealText text="Featured" /><br /><RevealText text="works" /></h2><p className="stickyNote sand">Real problems, thoughtful decisions,<br />and software that gets things done.</p></div>
      <Projects only={featuredSlugs} preview />
      <div className="allWorkAction"><Action href="/projects">All {getProjects().length} projects</Action><SiteAnchor href="/professional-experience" className="quietLink">Explore my experience ↗</SiteAnchor></div>
    </section>
    <Contact animated />
  </div>;
}
