import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import {
  AvatarGroup,
  Button,
  Column,
  Flex,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Avatar,
  Line,
} from "@once-ui-system/core";
import { work, pageMeta, ogImageFor } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX, TechList } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";
import { jsonLd, caseStudyJsonLd } from "@/resources/schema";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  // Per-slug, never inherited from /work. `seoDescription` rather than
  // `summary`: the summaries are page copy and run past 200 characters, which
  // Google truncates mid-sentence.
  return pageMeta({
    title: post.metadata.seoTitle,
    description: post.metadata.seoDescription,
    path: `${work.path}/${post.slug}`,
    // The card thumbnail before the generated title card: an architecture
    // diagram or a shot of the live product says more in a link preview than
    // the title rendered on a black rectangle, and the title is already in the
    // preview's own title line.
    image: post.metadata.image || post.metadata.thumbnail || ogImageFor(post.metadata.title),
    type: "article",
    publishedTime: post.metadata.publishedAt,
    modifiedTime: post.metadata.updatedAt,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <script
        {...jsonLd(
          caseStudyJsonLd({
            title: post.metadata.title,
            description: post.metadata.seoDescription,
            path: `${work.path}/${post.slug}`,
            image: post.metadata.image || post.metadata.thumbnail || ogImageFor(post.metadata.title),
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.updatedAt,
          }),
        )}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member, idx) => (
              <span key={idx}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {post.metadata.link && (
        <Row marginBottom="32" horizontal="center">
          <Button
            href={post.metadata.link}
            variant="secondary"
            size="s"
            prefixIcon={post.metadata.link.includes("github.com") ? "github" : "globe"}
            suffixIcon="arrowUpRight"
            label={post.metadata.link.includes("github.com") ? "View source" : "Visit site"}
          />
        </Row>
      )}
      {/* The stack, which used to be a comma-separated "**Stack:** …" line
          buried at the bottom of the body. It belongs above the fold: it is
          the first thing a technical reader looks for. */}
      {post.metadata.stack.length > 0 && (
        <Column maxWidth="s" gap="12" horizontal="center" marginBottom="32">
          <Text variant="body-default-xs" onBackground="neutral-weak">
            Built with
          </Text>
          <Row horizontal="center">
            <TechList
              items={post.metadata.stack}
              variant="chip"
              label="Technologies used on this project"
            />
          </Row>
        </Column>
      )}
      {/* Every image, not just `images[0]`. A second diagram added to the
          frontmatter used to be parsed and then silently never rendered. */}
      {post.metadata.images.map((src, i) => (
        <Media
          key={src}
          priority={i === 0}
          aspectRatio="16 / 9"
          radius="m"
          // Was alt="image", useless to a screen reader and to image search.
          alt={
            post.metadata.images.length > 1
              ? `${post.metadata.title}: architecture diagram ${i + 1} of ${post.metadata.images.length}`
              : `${post.metadata.title}: architecture diagram`
          }
          src={src}
        />
      ))}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
      </Column>

      {/* Every case study previously terminated with no route to contact. */}
      <Column
        fillWidth
        marginTop="40"
        padding="40"
        gap="16"
        radius="l"
        border="neutral-alpha-weak"
        background="surface"
        horizontal="center"
        align="center"
      >
        <Heading as="h2" variant="heading-strong-l" align="center">
          Want to dig into this one?
        </Heading>
        <Text onBackground="neutral-weak" align="center" wrap="balance">
          I&rsquo;m open to full-time backend, platform and data engineering
          roles, and happy to walk through any decision on this page in more
          detail than it deserves.
        </Text>
        <Button
          className="btnLift"
          href="/#contact"
          variant="primary"
          size="m"
          data-border="rounded"
          arrowIcon
        >
          Get in touch
        </Button>
      </Column>
      <ScrollToHash />
    </Column>
  );
}
