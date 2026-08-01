import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import { work, pageMeta, ogImageFor } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { Reveal } from "@/components";
import { jsonLd, webPageJsonLd } from "@/resources/schema";

export async function generateMetadata() {
  return pageMeta({
    title: work.title,
    description: work.description,
    path: work.path,
  });
}

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
          Architecture, trade-offs, and results rather than a list of technologies.
        </Text>
        {/* Moved out of the H1, where it was legal boilerplate rendered in the
            largest text on the page. */}
        <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
          Client work published with permission.
        </Text>
      </Column>
      <Reveal>
        <Projects />
      </Reveal>

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
            what I'd do differently. All on Medium.
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
