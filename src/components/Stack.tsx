import { Column, Heading, Row, Text } from "@once-ui-system/core";
import type { ReactNode } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { technicalSkills } from "@/resources/content";
import { Reveal } from "./Reveal";
import { TechList } from "./Tech";

export function Stack({ icon }: { icon?: ReactNode }) {
  const t = technicalSkills;
  if (!t.display) return null;

  return (
    <Column id="stack" fillWidth horizontal="center" className="section section--ruled">
      <Reveal>
        <div className="sectionHead">
          <span className="eyebrow">
            {icon}
            Stack
          </span>
          <Heading as="h2" variant="display-strong-s" align="center">
            {t.title}
          </Heading>
          <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            The tools and engineering practices I use to build, deploy, and
            maintain products, backend services, and data platforms.
          </Text>
        </div>
      </Reveal>

      <div className="cardGrid cardGrid--2">
        {t.skills.map((skill, i) => (
          <Reveal key={skill.title} delay={i * 0.05}>
            <div className="skillGroup">
              <h3 className="cardTitle">{skill.title}</h3>
              <p className="cardDesc">{skill.description}</p>
              {skill.stack && skill.stack.length > 0 && (
                <TechList
                  items={skill.stack}
                  variant="chip"
                  label={`${skill.title}: technologies`}
                />
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {/* One link, pointing at the next specific thing. A stack list is a
          claim; the write-up is where it is cashed. */}
      <Reveal delay={0.15}>
        <Row fillWidth horizontal="center" paddingTop="32">
          <a
            className="extLink"
            href="/work/realtime-ecommerce-etl-pipeline"
            data-track="section_outro:etl_writeup"
          >
            I write up every build in full. Start with the Kafka to Spark
            pipeline.
            <HiArrowRight aria-hidden="true" />
          </a>
        </Row>
      </Reveal>
    </Column>
  );
}
