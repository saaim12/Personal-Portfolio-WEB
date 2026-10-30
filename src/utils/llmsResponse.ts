import { getSiteCatalog } from "@/utils/siteCatalog";
import { renderLlmsIndex } from "@/utils/llms";
import { baseURL } from "@/resources/once-ui.config";
import { home, person, social } from "@/resources/content";

/** Both spellings serve one generated document, including on static hosts. */
export function llmsResponse() {
  return new Response(renderLlmsIndex(getSiteCatalog(), {
    name: person.name,
    description: home.description,
    canonicalBase: baseURL,
    profiles: social.filter(profile => ["GitHub", "LinkedIn", "Medium"].includes(profile.name)),
  }), { headers: {
    "Content-Type": "text/plain; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex, follow",
    Link: `<${baseURL}/llms.txt>; rel="canonical"`,
  } });
}
