import { SiteAnchor } from "@/components/SiteAnchor";
import Image from "@/components/SiteImage";
import { bookingLink, person, portraits, social } from "@/resources/content";
import { Parallax } from "@/components/effects/Parallax";
export function Contact(_props: { animated?: boolean }) {
  const linkedIn = social.find(link => link.name === "LinkedIn")!.link;
  return <section id="contact" className="contactSection" aria-labelledby="contact-heading">
    <div className="contactInner">
      <p className="monoLabel">(Contact)</p>
      <div className="contactIntro"><p>I like working through complex problems with people who care about the details. Have a product to build, an engineering role, or an interesting challenge? Let’s start a conversation.</p><p className="contactNote">Open to full-time roles, contract work, and conversations about things worth building.</p></div>
      <Parallax className="contactImage"><Image src={portraits.casual} width={900} height={560} alt="Saaim relaxing with a dog" sizes="(max-width: 809px) 90vw, 46vw" /></Parallax>
      <h2 id="contact-heading" className="contactHeadline"><SiteAnchor href="/contact">Let’s talk</SiteAnchor></h2>
      <div className="boardLinks"><SiteAnchor href={`mailto:${person.email}`}>Email ↗</SiteAnchor><SiteAnchor href={social.find(link => link.name === "WhatsApp")!.link} target="_blank" rel="noopener noreferrer">WhatsApp ↗</SiteAnchor><SiteAnchor href={linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn ↗</SiteAnchor><SiteAnchor href={social.find(link => link.name === "GitHub")!.link} target="_blank" rel="noopener noreferrer">GitHub ↗</SiteAnchor><SiteAnchor href={bookingLink} target="_blank" rel="noopener noreferrer">Book a call ↗</SiteAnchor></div>
    </div>
  </section>;
}
