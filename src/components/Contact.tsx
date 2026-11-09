import { SiteAnchor } from "@/components/SiteAnchor";
import { bookingLink, person, social } from "@/resources/content";
import { BlurLetters } from "@/components/effects/BlurLetters";
export function Contact(_props: { animated?: boolean }) {
  const linkedIn = social.find(link => link.name === "LinkedIn")!.link;
  return <section id="contact" className="contactSection" aria-labelledby="contact-heading">
    <div className="contactInner">
      <p className="monoLabel">(Contact)</p>
      <div className="contactIntro"><p>I like working through complex problems with people who care about the details. Have a product to build, an engineering role, or an interesting challenge? Let’s start a conversation.</p><p className="contactNote">Open to full-time roles, contract work, and conversations about things worth building.</p></div>
      <h2 id="contact-heading" className="contactHeadline"><SiteAnchor href="/contact"><BlurLetters text="Let’s talk" /></SiteAnchor></h2>
      <div className="boardLinks"><SiteAnchor href={`mailto:${person.email}`}>Email ↗</SiteAnchor><SiteAnchor href={social.find(link => link.name === "WhatsApp")!.link} target="_blank" rel="noopener noreferrer">WhatsApp ↗</SiteAnchor><SiteAnchor href={linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn ↗</SiteAnchor><SiteAnchor href={social.find(link => link.name === "GitHub")!.link} target="_blank" rel="noopener noreferrer">GitHub ↗</SiteAnchor><SiteAnchor href={bookingLink} target="_blank" rel="noopener noreferrer">Book a call ↗</SiteAnchor></div>
    </div>
  </section>;
}
