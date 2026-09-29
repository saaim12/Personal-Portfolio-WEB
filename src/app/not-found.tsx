import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";

// A 404 is a free personality moment with a captive, mildly frustrated
// visitor. The previous version was a dead end: no link, no route out.
export default function NotFound() {
  return (
    <Column as="section" fill center gap="16" maxWidth="s" paddingY="104" align="center">
      <Text variant="display-strong-xl" onBackground="neutral-weak">
        404
      </Text>
      <Heading variant="display-default-xs" align="center">
        Page not found
      </Heading>
      <Text onBackground="neutral-weak" align="center" wrap="balance">
        This page may have moved or the link may be incorrect. Explore my projects
        or return to the home page.
      </Text>
      <Row gap="12" wrap horizontal="center" paddingTop="12">
        <Button
          className="btnLift"
          href="/work"
          variant="primary"
          size="m"
          data-border="rounded"
          arrowIcon
        >
          See my work
        </Button>
        <Button href="/" variant="secondary" size="m" data-border="rounded">
          Back home
        </Button>
      </Row>
    </Column>
  );
}
