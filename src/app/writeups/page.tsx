import { Column, Heading, Text } from "@once-ui-system/core";
import { baseURL, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import styles from "./writeups.module.scss";

const MEDIUM_FEED = "https://medium.com/feed/@saymmalik08";

export const revalidate = 3600; // refresh Medium articles hourly

type Article = {
  title: string;
  link: string;
  pubDate: string;
  image: string | null;
  tags: string[];
};

// Medium exposes a plain RSS feed. No XML lib needed — pull the fields out
// with regex. ponytail: regex parse, swap for an XML parser only if Medium
// ever ships malformed feeds.
function parseFeed(xml: string): Article[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items.map((item) => {
    const pick = (re: RegExp) => item.match(re)?.[1]?.trim() ?? "";
    // Medium wraps text fields in CDATA — match it explicitly.
    const cdata = (tag: string) =>
      pick(new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>`));

    const content = cdata("content:encoded");
    return {
      title: cdata("title"),
      link: pick(/<link>([\s\S]*?)<\/link>/),
      pubDate: pick(/<pubDate>([\s\S]*?)<\/pubDate>/),
      image: content.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? null,
      tags: [...item.matchAll(/<category>\s*<!\[CDATA\[([\s\S]*?)\]\]>/g)]
        .map((m) => m[1].trim())
        .slice(0, 3),
    };
  });
}

// Medium pubDate is RFC822; guard against an unparseable value throwing
// during server render.
function isoOrEmpty(rfc822: string): string {
  const d = new Date(rfc822);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString();
}

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(MEDIUM_FEED, { next: { revalidate } });
    if (!res.ok) return [];
    return parseFeed(await res.text());
  } catch {
    return [];
  }
}

export const metadata = {
  title: `Write-ups – ${person.name}`,
  description: `Articles by ${person.name} on Medium`,
  alternates: { canonical: `${baseURL}/writeups` },
};

export default async function WriteUps() {
  const articles = await getArticles();

  return (
    <Column maxWidth="m" gap="xl" paddingY="24">
      <Column gap="8">
        <Heading variant="display-strong-s">Write-ups</Heading>
        <Text onBackground="neutral-weak" variant="body-default-l">
          Articles I&apos;ve published on Medium.
        </Text>
      </Column>

      {articles.length === 0 ? (
        <Text onBackground="neutral-weak">
          No articles to show right now — check back soon, or read them on{" "}
          <a href="https://medium.com/@saymmalik08">Medium</a>.
        </Text>
      ) : (
        <div className={styles.grid}>
          {articles.map((a) => (
            <a key={a.link} className={styles.card} href={a.link} target="_blank" rel="noopener noreferrer">
              <div className={styles.inner}>
                {a.image && (
                  // Plain img: Medium hosts thumbnails on several CDNs, so skip
                  // next/image remote-host config.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className={styles.thumb} src={a.image} alt={a.title} loading="lazy" />
                )}
                <div className={styles.body}>
                  {isoOrEmpty(a.pubDate) && (
                    <span className={styles.date}>{formatDate(isoOrEmpty(a.pubDate), false)}</span>
                  )}
                  <p className={styles.heading}>{a.title}</p>
                  {a.tags.length > 0 && (
                    <div className={styles.tags}>
                      {a.tags.map((t) => (
                        <span key={t} className={styles.tag}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </Column>
  );
}
