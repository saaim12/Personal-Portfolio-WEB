import Image from "next/image";
import { portraits, home } from "@/resources/content";
import { pageMeta } from "@/resources/seo";
import { Action, Handles, Mark } from "@/components/Studio";
import { Contact } from "@/components/Contact";
export async function generateMetadata(){return pageMeta({title:"About",description:"Meet Saaim Abdullah, a software engineer in Lahore. Explore his background, career, and work across backend services, cloud, and data systems.",path:"/about"});}
export default function About(){return <div className="studioPage"><div className="aboutLayout studioContainer">
  <nav className="aboutSide" aria-label="About sections"><a href="#bio"><Mark kind="flower"/>Bio</a><a href="#story"><Mark kind="steps"/>Story</a><a href="#career"><Mark kind="pinwheel"/>Work</a></nav>
  <div className="aboutMain"><h1 className="displayType">About</h1>
    <section id="bio" className="bioPanel"><span className="panelLabel">Main bio</span><Handles/>
      <h2>I’m Saaim, a software engineer in Lahore who gets excited <Mark kind="pinwheel" className="yellowInk"/> about making complicated things simple <Mark kind="spool" className="pinkInk"/>.</h2>
      <p>{home.subline}</p><p>I work across backend services, full stack applications, cloud infrastructure, and data systems. I care about clear contracts, useful documentation, and leaving a system that another engineer can confidently maintain.</p>
      <div className="bioBottom"><p className="stickyNote sand">Most recently, I delivered Fitter Health as the sole engineer. Before that, I built APIs and worked across cloud, data, and communication systems at Expertflow.</p><figure className="bioPortrait"><Image src={portraits.casual} width={1200} height={1600} alt="Saaim spending time with a dog"/><figcaption>that’s me!</figcaption></figure></div>
    </section>
    <section id="story" className="aboutSection"><h2 className="displayType">My story</h2><p>I studied Computer Engineering at COMSATS University Islamabad, Lahore Campus, from 2021 to 2025. My engineering work has taken me from backend APIs and WebRTC to cloud deployments, streaming data, and multilingual retrieval. I enjoy following a problem all the way from requirements to a working, documented system.</p><div className="aboutActions"><Action href="/SaaimCV.pdf" external>View resume</Action><a className="quietLink" href="/journal">Notes from the build ↗</a></div></section>
    <section id="career" className="aboutSection"><h2 className="displayType">The work</h2><div className="timeline"><a href="/work/fitter-health-platform"><time>May — July 2026</time><h3>Fitter Health</h3><p>Software Engineer · Contract</p><span aria-hidden="true">↗</span></a><a href="/experience"><time>June 2024 — February 2026</time><h3>Expertflow</h3><p>Software Engineer</p><span aria-hidden="true">↗</span></a></div><div className="aboutActions"><Action href="/experience">Full experience</Action><a className="quietLink" href="/Fitter-Recommendation-Letter.pdf" target="_blank" rel="noopener noreferrer">Client recommendation ↗</a></div></section>
  </div></div><Contact/></div>;}
