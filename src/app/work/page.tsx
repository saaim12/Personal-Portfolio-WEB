import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import { work, pageMeta, ogImageFor } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { Reveal } from "@/components";
import { jsonLd, webPageJsonLd } from "@/resources/schema";

export async function generateMetadata() {
  return pageMeta({
    // The layout template appends " | Saaim Abdullah", so this renders as
    // "Systems I've built | Saaim Abdullah". It was `work.label` ("Work"),
    // which wasted the most valuable 17 characters in a search result.
    title: work.title,
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
          Five systems, each written up as the problem, the architecture, the
          trade-offs I made, and what I would change. One is client work running
          in production; the other four I built to get to the bottom of
          something: streaming and warehouse modelling, tenant-isolated
          retrieval, cold-start recommendation, and inference on a
          microcontroller.
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
            I write up the architecture decisions, the parts that were hard, and
            what I would do differently. All on Medium.
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
            {/* The five systems above are the interesting work, but most loops
                still open with an algorithms round, and a recruiter screening
                for one looks for exactly this. Kept alongside the write-ups
                rather than promoted above them. */}
            <Button
              className="btnLift"
              href="https://github.com/saaim12/DSA-Python"
              prefixIcon="github"
              variant="secondary"
              size="m"
              data-border="rounded"
              arrowIcon
            >
              Algorithms in Python on GitHub
            </Button>
          </Row>
        </Column>
      </Reveal>
    </Column>
  );
}
