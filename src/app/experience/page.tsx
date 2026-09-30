import { Column, Heading, Text } from "@once-ui-system/core";
import { pageMeta, ogImageFor } from "@/resources/seo";
import { jsonLd, webPageJsonLd } from "@/resources/schema";

export async function generateMetadata() {
  return pageMeta({
    title: "Experience",
    description:
      "Review Saaim Abdullah's software engineering experience across backend APIs, full stack products, cloud infrastructure, and data systems.",
    path: "/experience",
  });
}

const roles = [
  {
    company: "Fitter Health",
    title: "Software Engineer · Contract",
    dates: "May 2026 to July 2026",
    location: "Remote · Team based in Spain",
    bullets: [
      "Delivered a preventive health platform as the sole engineer, covering Django services, a Next.js frontend, PostgreSQL, AWS infrastructure, and a documented handover.",
      "Deployed containerized services on AWS ECS with RDS and S3, using IAM and VPC controls to scope access.",
      "Defined API contracts, built background workflows with Celery and Redis, and delivered 135 passing tests with documented services, migrations, and database integrity constraints.",
      "Modeled membership credits, session booking, commerce, and an admin CRM across 106 PostgreSQL tables. Integrated Odoo invoicing and synchronized payment status with platform records.",
      "Delivered ETL into a PostgreSQL warehouse with a star schema for ML features, product analytics, and aggregated partner reporting.",
      "Automated renewal reminders and member engagement email using EventBridge, Lambda, and SES, replacing manual follow up.",
      "Resolved silent notification loss by buffering SNS through SQS, with retries, a dead letter queue, and queue depth alarms.",
    ],
    tech: "Django · Next.js · PostgreSQL · Celery · Redis · AWS · Docker",
    link: "/work/fitter-health-platform",
  },
  {
    company: "Expertflow",
    title: "Software Engineer",
    dates: "June 2024 to February 2026",
    location: "Lahore · Cisco UCCE solution partner",
    bullets: [
      "Built and maintained REST APIs serving 1,000 to 3,000 daily users, deployed as Docker containers on AWS EC2 behind an Application Load Balancer with rate limiting, scoped IAM, and VPC isolation.",
      "Deployed the backend as a distributed system on AWS EKS with Horizontal Pod Autoscaler policies that scale replicas with request throughput.",
      "Reduced admin panel response time from 130 ms to 30 ms through Redis caching and database index tuning after profiling identified query cost.",
      "Designed and shipped event driven batch and streaming ETL pipelines using AWS Lambda, MWAA, EMR, PySpark, Glue, and S3, producing Parquet datasets for BI and ML workflows.",
      "Developed a WebRTC SDK for voice and video communication and the REST APIs connecting frontend clients, SDK modules, and external platforms.",
      "Implemented a chatbot workflow, SQL customer insight analytics, and time limited permission controls.",
      "Worked across Angular frontend, backend, and SDK teams to deliver features. The role began as an internship and converted to full time employment.",
    ],
    tech: "Python · Django · REST APIs · AWS · EKS · Redis · PySpark · WebRTC",
  },
];

export default function Experience() {
  return (
    <Column className="experiencePage" fillWidth paddingTop="48" paddingBottom="80" gap="48">
      <script
        {...jsonLd(
          webPageJsonLd({
            title: "Experience",
            description:
              "Review Saaim Abdullah's software engineering experience across backend APIs, full stack products, cloud infrastructure, and data systems.",
            path: "/experience",
            image: ogImageFor("Experience"),
          }),
        )}
      />
      <Column gap="12">
        <Text variant="label-strong-s" onBackground="brand-weak">
          CAREER
        </Text>
        <Heading as="h1" variant="display-strong-l">
          Experience
        </Heading>
        <Text variant="heading-default-m" onBackground="neutral-weak">
          Software engineering work across backend systems, full stack products, and data intensive
          applications.
        </Text>
      </Column>
      <Column as="section" gap="40">
        <Heading as="h2" variant="display-strong-s">
          Employment
        </Heading>
        {roles.map((role) => (
          <Column
            key={role.company}
            gap="12"
            paddingBottom="32"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div className="roleHeading">
              <div>
                <Heading as="h3" variant="heading-strong-l">
                  {role.company}
                </Heading>
                <Text onBackground="brand-weak">{role.title}</Text>
              </div>
              <div className="roleMeta">
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {role.dates}
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {role.location}
                </Text>
              </div>
            </div>
            <Column as="ul" gap="8" paddingTop="8">
              {role.bullets.map((bullet) => (
                <Text as="li" key={bullet} variant="body-default-m">
                  {bullet}
                </Text>
              ))}
            </Column>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {role.tech}
            </Text>
            {role.link && (
              <a className="extLink" href={role.link}>
                Read case study →
              </a>
            )}
          </Column>
        ))}
      </Column>
      <Column as="section" gap="16">
        <Heading as="h2" variant="display-strong-s">
          Education
        </Heading>
        <Text variant="body-default-m">
          <strong>Bachelor of Science in Computer Engineering</strong>
          <br />
          COMSATS University Islamabad, Lahore Campus · 2021 to 2025
        </Text>
      </Column>
      <Column as="section" gap="20">
        <Heading as="h2" variant="display-strong-s">
          Technical skills
        </Heading>
        <div className="cardGrid cardGrid--2">
          {[
            ["Backend", "Python, Django, REST APIs, Celery, SNS/SQS"],
            ["Frontend", "TypeScript, React, Next.js, Angular"],
            ["Data and databases", "PostgreSQL, Redis, MongoDB, pgvector, ETL"],
            ["Cloud and delivery", "AWS, Docker, Kubernetes, CI/CD, Git"],
          ].map(([name, value]) => (
            <div className="skillGroup" key={name}>
              <Heading as="h3" variant="heading-strong-m">
                {name}
              </Heading>
              <Text onBackground="neutral-weak">{value}</Text>
            </div>
          ))}
        </div>
      </Column>
      <Column as="section" gap="16">
        <Heading as="h2" variant="display-strong-s">
          Completed courses
        </Heading>
        <Text variant="body-default-m">
          AWS Cloud Technical Essentials · Introduction to Data Engineering · Getting Started with Git and GitHub · Claude Code 101
        </Text>
      </Column>
    </Column>
  );
}
