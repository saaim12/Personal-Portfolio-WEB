import type { IconType } from "react-icons";
import {
  HiOutlineArrowsRightLeft,
  HiOutlineBuildingOffice2,
  HiOutlineCircleStack,
  HiOutlineCpuChip,
  HiOutlineSparkles,
  HiOutlineSquares2X2,
  HiOutlineTableCells,
} from "react-icons/hi2";
import {
  SiAmazondynamodb,
  SiAmazonec2,
  SiAmazonecs,
  SiAmazoneks,
  SiAmazoniam,
  SiAmazonrds,
  SiAmazons3,
  SiAmazonsqs,
  SiAmazonwebservices,
  SiAngular,
  SiApacheairflow,
  SiApachekafka,
  SiApacheparquet,
  SiApachespark,
  SiAwslambda,
  SiCelery,
  SiClaude,
  SiDjango,
  SiDocker,
  SiEspressif,
  SiFastapi,
  SiFlask,
  SiGithubactions,
  SiGitlab,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOdoo,
  SiOpenai,
  SiPandas,
  SiPostgresql,
  SiPytest,
  SiPython,
  SiReact,
  SiRedis,
  SiScikitlearn,
  SiTensorflow,
  SiTypescript,
  SiVercel,
  SiWebrtc,
} from "react-icons/si";

/**
 * One map, one entry per technology. Adding a technology anywhere on the site
 * means adding a row here and nothing else.
 *
 * `color` is the official Simple Icons brand hex. It is not used directly:
 * `techColors()` below checks it against both grounds and swaps in
 * `currentColor` for whichever theme it would vanish against. Leave `color`
 * undefined for anything with no brand identity (a concept, not a product), * those render in the surrounding text colour on purpose.
 *
 * Export names were verified against react-icons 5.5.0. Several plausible
 * guesses do not exist in that version, there is no `SiAmazonaws`,
 * `SiAmazonsns`, `SiAmazonvpc` or `SiAwsiam`, so check before adding.
 */
export type TechKey = keyof typeof TECH;

type TechEntry = {
  label: string;
  icon: IconType;
  /** Official brand hex. Omit for concepts, which have no brand. */
  color?: string;
  /**
   * Set when `icon` is a generic stand-in rather than this technology's own
   * mark, so the site can report what has no real logo.
   */
  generic?: true;
};

export const TECH = {
  // ── Languages ──────────────────────────────────────────────────────────
  python: { label: "Python", icon: SiPython, color: "#3776AB" },
  typescript: { label: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  javascript: { label: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  sql: { label: "SQL", icon: HiOutlineTableCells, generic: true },

  // ── Backend ────────────────────────────────────────────────────────────
  django: { label: "Django", icon: SiDjango, color: "#092E20" },
  drf: { label: "Django REST Framework", icon: SiDjango, color: "#092E20" },
  fastapi: { label: "FastAPI", icon: SiFastapi, color: "#009688" },
  flask: { label: "Flask", icon: SiFlask, color: "#000000" },
  nodejs: { label: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  celery: { label: "Celery", icon: SiCelery, color: "#37814A" },
  webrtc: { label: "WebRTC", icon: SiWebrtc, color: "#333333" },
  jwt: { label: "JWT", icon: SiJsonwebtokens, color: "#000000" },

  // ── Frontend ───────────────────────────────────────────────────────────
  react: { label: "React", icon: SiReact, color: "#61DAFB" },
  nextjs: { label: "Next.js", icon: SiNextdotjs, color: "#000000" },
  angular: { label: "Angular", icon: SiAngular, color: "#DD0031" },
  html: { label: "HTML", icon: SiHtml5, color: "#E34F26" },

  // ── Data ───────────────────────────────────────────────────────────────
  kafka: { label: "Apache Kafka", icon: SiApachekafka, color: "#231F20" },
  pyspark: { label: "PySpark", icon: SiApachespark, color: "#E25A1C" },
  spark: { label: "Apache Spark", icon: SiApachespark, color: "#E25A1C" },
  airflow: { label: "Apache Airflow", icon: SiApacheairflow, color: "#017CEE" },
  pandas: { label: "pandas", icon: SiPandas, color: "#150458" },
  // Simple Icons ships no Glue, EMR or MWAA mark. The AWS logo is a truer
  // stand-in than a generic cube, so these are not flagged `generic`.
  glue: { label: "AWS Glue", icon: SiAmazonwebservices, color: "#FF9900" },
  emr: { label: "Amazon EMR", icon: SiAmazonwebservices, color: "#FF9900" },
  mwaa: { label: "MWAA (managed Airflow)", icon: SiApacheairflow, color: "#017CEE" },
  parquet: { label: "Parquet", icon: SiApacheparquet, color: "#50ABF1" },
  starschema: { label: "Star schema", icon: HiOutlineTableCells, generic: true },
  medallion: { label: "Medallion", icon: HiOutlineSquares2X2, generic: true },
  objectstorage: {
    label: "S3-compatible storage",
    icon: HiOutlineCircleStack,
    generic: true,
  },

  // ── Databases ──────────────────────────────────────────────────────────
  postgresql: { label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  mongodb: { label: "MongoDB", icon: SiMongodb, color: "#47A248" },
  dynamodb: { label: "DynamoDB", icon: SiAmazondynamodb, color: "#4053D6" },
  redis: { label: "Redis", icon: SiRedis, color: "#FF4438" },
  pgvector: { label: "pgvector", icon: SiPostgresql, color: "#4169E1" },

  // ── AWS ────────────────────────────────────────────────────────────────
  aws: { label: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
  ecs: { label: "Amazon ECS", icon: SiAmazonecs, color: "#FF9900" },
  eks: { label: "Amazon EKS", icon: SiAmazoneks, color: "#FF9900" },
  ec2: { label: "Amazon EC2", icon: SiAmazonec2, color: "#FF9900" },
  lambda: { label: "AWS Lambda", icon: SiAwslambda, color: "#FF9900" },
  rds: { label: "Amazon RDS", icon: SiAmazonrds, color: "#527FFF" },
  s3: { label: "Amazon S3", icon: SiAmazons3, color: "#569A31" },
  sqs: { label: "Amazon SQS", icon: SiAmazonsqs, color: "#FF4F8B" },
  iam: { label: "IAM", icon: SiAmazoniam, color: "#DD344C" },
  // Simple Icons ships no SNS or VPC mark. The AWS logo is a truer stand-in
  // than a generic cube, so these are not flagged `generic`.
  sns: { label: "Amazon SNS", icon: SiAmazonwebservices, color: "#FF9900" },
  vpc: { label: "VPC", icon: SiAmazonwebservices, color: "#FF9900" },
  vercel: { label: "Vercel", icon: SiVercel, color: "#000000" },

  // ── DevOps and quality ─────────────────────────────────────────────────
  docker: { label: "Docker", icon: SiDocker, color: "#2496ED" },
  dockercompose: { label: "Docker Compose", icon: SiDocker, color: "#2496ED" },
  kubernetes: { label: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  githubactions: { label: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
  gitlab: { label: "GitLab CI", icon: SiGitlab, color: "#FC6D26" },
  pytest: { label: "pytest", icon: SiPytest, color: "#0A9EDC" },
  cicd: { label: "CI/CD", icon: HiOutlineArrowsRightLeft, generic: true },
  migrations: { label: "Migrations", icon: HiOutlineCircleStack, generic: true },

  // ── AI and ML ──────────────────────────────────────────────────────────
  tensorflow: { label: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  tflitemicro: { label: "TensorFlow Lite Micro", icon: SiTensorflow, color: "#FF6F00" },
  scikitlearn: { label: "scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
  gemini: { label: "Gemini 2.5 Flash", icon: SiGooglegemini, color: "#8E75B2" },
  rag: { label: "RAG", icon: HiOutlineSparkles, generic: true },
  claude: { label: "Claude", icon: SiClaude, color: "#D97757" },
  openai: { label: "OpenAI", icon: SiOpenai, color: "#412991" },
  // Simple Icons ships no Pinecone mark in react-icons 5.5.0, and unlike SNS
  // or VPC there is no parent brand whose logo would be a truer stand-in, so
  // this one takes the generic datastore glyph and is flagged as such.
  pinecone: { label: "Pinecone", icon: HiOutlineCircleStack, generic: true },
  recommenders: { label: "Recommenders", icon: HiOutlineSparkles, generic: true },
  embeddings: { label: "Multilingual embeddings", icon: HiOutlineSparkles, generic: true },
  e5: { label: "multilingual-e5-base", icon: HiOutlineSparkles, generic: true },

  // ── Architecture ───────────────────────────────────────────────────────
  systemdesign: { label: "System design", icon: HiOutlineSquares2X2, generic: true },
  eventdriven: { label: "Event-driven", icon: HiOutlineArrowsRightLeft, generic: true },
  multitenancy: { label: "Multi-tenancy", icon: HiOutlineBuildingOffice2, generic: true },
  restcontracts: { label: "REST contracts", icon: HiOutlineArrowsRightLeft, generic: true },

  // ── Other products ─────────────────────────────────────────────────────
  odoo: { label: "Odoo", icon: SiOdoo, color: "#714B67" },
  esp32: { label: "ESP32", icon: SiEspressif, color: "#E7352C" },
} satisfies Record<string, TechEntry>;

/* ── Contrast ────────────────────────────────────────────────────────────
   A brand hex is only usable on a ground it is actually visible against.
   Django's #092E20 and Next.js's #000000 are invisible on this site's pure
   black; #F7DF1E (JavaScript) would be invisible on white. So each icon gets
   two resolved colours and CSS picks one per theme, rather than one colour
   that is wrong half the time. */

const DARK_GROUND = 0x000000;
const LIGHT_GROUND = 0xffffff;

/** WCAG relative luminance of a 0xRRGGBB integer. */
function luminance(rgb: number): number {
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const r = channel((rgb >> 16) & 0xff);
  const g = channel((rgb >> 8) & 0xff);
  const b = channel(rgb & 0xff);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: number, b: number): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * The two CSS custom properties an icon needs. Anything under 3:1 against a
 * ground, WCAG's threshold for non-text content, falls back to
 * `currentColor` for that theme only, so it inherits the surrounding text and
 * stays legible instead of disappearing.
 */
export function techColors(color?: string): { dark: string; light: string } {
  if (!color) return { dark: "currentColor", light: "currentColor" };
  const rgb = Number.parseInt(color.replace("#", ""), 16);
  return {
    dark: contrast(rgb, DARK_GROUND) >= 3 ? color : "currentColor",
    light: contrast(rgb, LIGHT_GROUND) >= 3 ? color : "currentColor",
  };
}

/**
 * Look up a key. An unknown key is never dropped: it renders as its own raw
 * string behind a generic icon, so a typo shows up on the page as a wrong
 * label rather than as a silently missing technology.
 */
export function resolveTech(key: string): TechEntry {
  return (
    (TECH as Record<string, TechEntry>)[key] ?? {
      label: key,
      icon: HiOutlineCpuChip,
      generic: true as const,
    }
  );
}
