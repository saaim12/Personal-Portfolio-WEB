import { SiteAnchor } from "@/components/SiteAnchor";
import { PageSchema } from "@/components/PageSchema";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/CopyEmail";
import { ProfileButton } from "@/components/ProfileButton";
import { person, social } from "@/resources/content";
import { pageMeta } from "@/resources/seo";
export async function generateMetadata(){return pageMeta({title:"Contact a Software Engineer in Lahore",description:"Contact Saaim Abdullah about software engineering roles, product development, or collaboration. Send a project note or email directly.",path:"/contact"});}
export default function ContactPage(){return <div className="studioPage"><PageSchema title="Contact" description="Contact Saaim Abdullah about software engineering roles, product development, or collaboration." path="/contact" /><section className="contactPage studioContainer"><p className="handwritten">leave me a note</p><div className="contactTitle"><h1 className="displayType">Contact</h1></div><div className="contactPrimary"><SiteAnchor className="contactEmail" href={"mailto:"+person.email+"?subject="+encodeURIComponent("Software engineering opportunity")}>Email Saaim</SiteAnchor><span className="contactAddress"><code>{person.email}</code><CopyEmail email={person.email}/></span><ProfileButton name="LinkedIn" link={social.find(item=>item.name==="LinkedIn")!.link} label="Message on LinkedIn"/></div><ContactForm/><div className="contactDirect">{["Email","WhatsApp","LinkedIn","GitHub"].map(name=><ProfileButton key={name} name={name} link={social.find(item=>item.name===name)!.link}/>)}</div></section></div>;}
