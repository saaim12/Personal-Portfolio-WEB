import Image from "next/image";
import { home, person, portraits } from "@/resources/content";
import { pageMeta, ogImageFor } from "@/resources/seo";
import { jsonLd, personJsonLd, webPageJsonLd } from "@/resources/schema";
import { Contact } from "@/components/Contact";
import { Projects } from "@/components/work/Projects";
import { Action, Handles, Mark } from "@/components/Studio";
import { StudioClock } from "@/components/StudioClock";
import { featuredSlugs } from "@/resources/project-art";
import { getProjects } from "@/utils/projects";
import { Track } from "@/components/Track";
export async function generateMetadata() { return pageMeta({ title: home.title, description: home.description, path: home.path, image: home.image }); }
export default function Home() {
  return <div className="studioHome">
    <script {...jsonLd(webPageJsonLd({ title: home.title, description: home.description, path: home.path, image: ogImageFor(home.title) }))} /><script {...jsonLd(personJsonLd)} /><Track />
    <section className="studioHero" aria-labelledby="hero-name">
      <StudioClock />
      <div className="heroNameGroup">
        <p className="nameCaption handwritten">my name is<span className="scribble" aria-hidden="true" /></p>
        <div className="heroNotes"><span className="stickyNote mint">Recently at Fitter Health</span><span className="stickyNote sand">Previously at Expertflow</span></div>
        <div className="nameSelection"><h1 id="hero-name" className="displayType">{person.firstName}</h1><Handles /></div>
        <p className="heroAvailable"><i />Available for thoughtful projects</p>
      </div>
      <span className="floatingAvatar avatarLeft" aria-hidden="true"><Image src={person.avatar} width={40} height={40} alt="" /></span>
      <span className="floatingAvatar avatarRight" aria-hidden="true"><Image src={portraits.playful} width={40} height={40} alt="" /></span>
      <div className="heroStatement"><h2>I build <Mark kind="target" className="greenInk" /> dependable<br />digital products <Mark kind="flower" className="pinkInk" />.</h2><Action href="/contact">Contact me</Action></div>
      <span className="cursorSticker roleSticker">Software engineer<span aria-hidden="true">➤</span></span><span className="cursorSticker citySticker"><span aria-hidden="true">➤</span>Lahore, PK</span>
    </section>
    <section className="homeAbout" aria-labelledby="about-intro">
      <span className="aboutScribble handwritten">about me!</span>
      <div className="selectionLabel">what’s up<Handles /></div>
      <h2 id="about-intro">I’m Saaim <Image src={person.avatar} width={58} height={58} alt="" /> a software engineer in Lahore who gets excited <Mark kind="pinwheel" className="yellowInk" /> about making complicated things simple <Mark kind="spool" className="pinkInk" />.</h2>
      <div className="portraitPair">
      <figure className="polaroid polaroidLeft"><Image src={person.avatar} width={240} height={280} alt="Saaim Abdullah" /><figcaption>2026</figcaption></figure>
      <figure className="polaroid polaroidRight"><Image src={portraits.playful} width={240} height={280} alt="Saaim wearing neon glasses" /><figcaption>after hours</figcaption></figure>
      </div>
      <div className="skillStickers"><span className="yellow">Backend systems</span><span className="yellow stickerIcon"><Mark kind="pinwheel" /></span><span className="green">Full stack</span><span className="green stickerIcon"><Mark kind="flower" /></span><span className="pink">Data engineering</span><span className="pink stickerIcon"><Mark kind="target" /></span><span className="blue">Cloud &amp; AI</span><span className="blue stickerIcon"><Mark kind="steps" /></span></div>
      <a href="/about" className="quietLink">A little more about me ↗</a>
    </section>
    <section id="work" className="homeWork studioContainer" aria-labelledby="featured-heading">
      <div className="workHeading"><span className="handwritten">explore my work!<span className="scribble" aria-hidden="true" /></span><h2 id="featured-heading" className="displayType">Featured<br />works</h2><p className="stickyNote sand">Real problems, thoughtful decisions,<br />and software that gets things done.</p></div>
      <Projects only={featuredSlugs} preview />
      <div className="allWorkAction"><Action href="/work">All {getProjects().length} projects</Action><a href="/experience" className="quietLink">Explore my experience ↗</a></div>
    </section>
    <Contact />
  </div>;
}
