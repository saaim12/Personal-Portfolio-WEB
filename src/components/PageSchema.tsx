import { jsonLd, webPageJsonLd, breadcrumbJsonLd } from "@/resources/schema";
import { ogImageFor } from "@/resources/seo";

export function PageSchema({ title, description, path, collection = path === "/engineering-notes" }: { title: string; description: string; path: string; collection?: boolean }) {
  return <>
    <script {...jsonLd({ ...webPageJsonLd({ title, description, path, image: ogImageFor(title) }), "@type": collection ? "CollectionPage" : "WebPage" })} />
    <script {...jsonLd(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: title, path }]))} />
  </>;
}
