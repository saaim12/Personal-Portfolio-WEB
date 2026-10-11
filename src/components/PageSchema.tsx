import { jsonLd, webPageJsonLd, breadcrumbJsonLd } from "@/resources/schema";
import { ogImageFor } from "@/resources/seo";

export function PageSchema({ title, description, path }: { title: string; description: string; path: string }) {
  return <>
    <script {...jsonLd(webPageJsonLd({ title, description, path, image: ogImageFor(title) }))} />
    <script {...jsonLd(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: title, path }]))} />
  </>;
}
