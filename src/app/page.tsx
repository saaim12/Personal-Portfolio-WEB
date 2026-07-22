import {
  Avatar,
  Button,
  Column,
  IconButton,
  RevealFx,
  Row,
  Schema,
  Text,
  Meta,
} from "@once-ui-system/core";
import { home, about, person, social, baseURL } from "@/resources";
import { HeroHeadline, MagneticButton, LiquidGradientHero } from "@/components";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column fillWidth horizontal="center" paddingY="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero: liquid gradient is a fixed full-viewport layer (zIndex 0);
          content sits above it (zIndex 1). */}
      <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
        <LiquidGradientHero />
        <Column
          maxWidth="s"
          horizontal="center"
          align="center"
          gap="l"
          style={{ position: "relative", zIndex: 1, minHeight: "70vh", justifyContent: "center" }}
        >
          <RevealFx horizontal="center">
            <Avatar src={person.avatar} size="xl" />
          </RevealFx>

          <Row fillWidth horizontal="center">
            <HeroHeadline text={home.headline} />
          </Row>

          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>

          <RevealFx delay={0.4} horizontal="center">
            <MagneticButton>
              <Button
                id="about"
                data-border="rounded"
                href={about.path}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                {about.title}
              </Button>
            </MagneticButton>
          </RevealFx>

          <RevealFx delay={0.5} horizontal="center">
            <Row gap="8" horizontal="center">
              {social.map(
                (item) =>
                  item.link && (
                    <IconButton
                      key={item.name}
                      href={item.link}
                      icon={item.icon}
                      tooltip={item.name}
                      size="l"
                      variant="ghost"
                    />
                  ),
              )}
            </Row>
          </RevealFx>
        </Column>
      </div>
    </Column>
  );
}
