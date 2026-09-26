import { Column, Heading, Row, Text } from "@once-ui-system/core";
import type { ReactNode } from "react";
import { HiArrowRight } from "react-icons/hi2";
import { about } from "@/resources/content";
import { Reveal } from "./Reveal";
import { TechList } from "./Tech";

// The technical skills blocks, brought onto the home page.
//
// They were written for /about and read by almost nobody, because the traffic
// never leaves the home page. Same content object, so there is one copy of
// these four paragraphs and not two to keep in sync.
export function Stack({ icon }: { icon?: ReactNode }) {
  const t = about.technical;
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
            Grouped by what the work is for rather than by language. The
            sentence is the part that matters; the logos are there for whoever
            is scanning for a keyword.
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
