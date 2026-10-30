import { jsonLd, webPageJsonLd, breadcrumbJsonLd } from "@/resources/schema";
import { ogImageFor } from "@/resources/seo";
import { sitePages } from "@/resources/site-navigation";
import { baseURL } from "@/resources/once-ui.config";

type IndexItem = { path: string; title: string; description?: string };
const collections = new Set(["/expertise", "/engineering-notes", "/projects", "/sitemap"]);

export function PageSchema({ title, description, path, collection = collections.has(path), items }: {
  title: string; description: string; path: string; collection?: boolean; items?: IndexItem[];
}) {
  const parentPath = `/${path.split("/").filter(Boolean)[0]}`;
  const parent = path !== parentPath ? sitePages.find(page => page.path === parentPath) : undefined;
  const breadcrumbs = [{ name: "Home", path: "/" }, ...(parent ? [{ name: parent.title, path: parent.path }] : []), { name: title, path }];
  return <>
    <script {...jsonLd({
      ...webPageJsonLd({ title, description, path, image: ogImageFor(title) }),
      "@type": collection ? "CollectionPage" : "WebPage",
      ...(items ? { mainEntity: {
        "@type": "ItemList", "@id": `${baseURL}${path}#items`, numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem", position: index + 1,
          item: { "@type": "WebPage", "@id": `${baseURL}${item.path === "/" ? "" : item.path}#webpage`, url: `${baseURL}${item.path === "/" ? "" : item.path}`, name: item.title, ...(item.description ? { description: item.description } : {}) },
        })),
      } } : {}),
    })} />
    <script {...jsonLd(breadcrumbJsonLd(breadcrumbs))} />
  </>;
}
