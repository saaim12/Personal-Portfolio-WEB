import { FaEnvelope, FaGithub, FaLinkedinIn, FaMedium, FaWhatsapp } from "react-icons/fa6";
import { SiteAnchor } from "@/components/SiteAnchor";

const icons = { GitHub: FaGithub, LinkedIn: FaLinkedinIn, WhatsApp: FaWhatsapp, Medium: FaMedium, Email: FaEnvelope };

/** Profile link as a glow button in the profile's own colour. Used wherever a profile is linked. */
export function ProfileButton({ name, link, label }: { name: string; link: string; label?: string }) {
  const Icon = icons[name as keyof typeof icons];
  const external = link.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" };
  return <SiteAnchor className="profileButton" data-profile={name.toLowerCase()} href={link} {...external}>{Icon && <Icon aria-hidden="true" focusable="false" />}<span>{label || name}</span></SiteAnchor>;
}
