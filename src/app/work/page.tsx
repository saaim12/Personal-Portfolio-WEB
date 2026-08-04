import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import { work, pageMeta, ogImageFor } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { Reveal } from "@/components";
import { jsonLd, webPageJsonLd } from "@/resources/schema";

export async function generateMetadata() {
  return pageMeta({
    // `label`, not `title`: the layout template appends " | Saaim Abdullah",
    // and `work.title` is the on-page H1.
    title: work.label,
    description: work.description,
    path: work.path,
  });
}

// Three kinds of work, named. A flat list of five made a reader guess what
// they were looking at; the headings do that job before any card is read.
const GROUPS = [
  { title: "Full stack", slugs: ["fitter-health-platform"] },
  {
    title: "Backend and AI",
    slugs: ["multilingual-rag-engine", "movie-recommender-system"],
  },
  {
    title: "Data engineering",
    slugs: ["realtime-ecommerce-etl-pipeline", "autoencoder-edge-compression"],
  },
];

export default function Work() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <script
        {...jsonLd(
          webPageJsonLd({
            title: work.title,
            description: work.description,
            path: work.path,
            image: ogImageFor(work.title),
          }),
        )}
      />
      <Column fillWidth horizontal="center" align="center" gap="8" marginBottom="40">
        <Heading variant="display-strong-m" align="center">
          {work.title}
        </Heading>
        <Text
          onBackground="neutral-weak"
          variant="heading-default-m"
          align="center"
          wrap="balance"
        >
          Client projects and engineering projects, each with a write-up on how
          it was built and what I&rsquo;d do differently.
        </Text>
        {/* "Shown with the permission of clients" was removed: four of the five
            are personal projects, and a reader who works that out stops
            trusting the claim on the fifth. Which is which is stated on the
            cards instead. */}
      </Column>

      {GROUPS.map((group, i) => (
        <Reveal key={group.title} delay={i * 0.06}>
          <Column fillWidth gap="20" marginBottom="48">
            <Heading as="h2" variant="heading-strong-l">
              {group.title}
            </Heading>
            <Projects only={group.slugs} />
          </Column>
        </Reveal>
      ))}

      <Reveal delay={0.1}>
        <Column
          fillWidth
          marginTop="xl"
          padding="40"
          gap="16"
          radius="l"
          border="neutral-alpha-weak"
          background="surface"
          horizontal="center"
          align="center"
        >
          <Heading as="h2" variant="heading-strong-l" align="center">
            Engineering write-ups
          </Heading>
          <Text
            onBackground="neutral-weak"
            variant="body-default-l"
            align="center"
            wrap="balance"
          >
            I write about how I build these systems on Medium: the architecture
            decisions, the hard parts, and what I&rsquo;d do differently.
          </Text>
          <Row gap="12" wrap horizontal="center">
            <Button
              className="btnLift"
              href="https://medium.com/@saymmalik08"
              prefixIcon="medium"
              variant="secondary"
              size="m"
              data-border="rounded"
              arrowIcon
            >
              Read my articles on Medium
            </Button>
          </Row>
        </Column>
      </Reveal>
    </Column>
  );
}
