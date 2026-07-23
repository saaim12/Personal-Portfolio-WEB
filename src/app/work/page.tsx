import { Button, Column, Heading, Row, Text, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { Reveal } from "@/components";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
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
            I write about how I build these systems architecture decisions, the
            hard parts, and what I'd do differently on Medium.
          </Text>
          <Row gap="12" wrap horizontal="center">
            <Button
              className="eliteBtn"
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
