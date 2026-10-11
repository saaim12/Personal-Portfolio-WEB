import type { IconType } from "react-icons";
import { HiOutlineArrowsRightLeft, HiOutlineCircleStack, HiOutlineCpuChip, HiOutlineSparkles } from "react-icons/hi2";
import { SiAmazonec2, SiAmazonecs, SiAmazoniam, SiAmazonrds, SiAmazons3, SiAmazonsqs, SiAmazonwebservices, SiApacheairflow, SiApachekafka, SiApacheparquet, SiApachespark, SiCelery, SiDjango, SiDocker, SiEspressif, SiFastapi, SiFlask, SiGooglegemini, SiHtml5, SiJavascript, SiJsonwebtokens, SiNextdotjs, SiNodedotjs, SiOdoo, SiPandas, SiPostgresql, SiPytest, SiPython, SiReact, SiRedis, SiScikitlearn, SiTensorflow } from "react-icons/si";

type TechEntry = { label: string; icon: IconType };

const TECH = {
  python: { label: "Python", icon: SiPython },
  javascript: { label: "JavaScript", icon: SiJavascript },
  django: { label: "Django", icon: SiDjango },
  drf: { label: "Django REST Framework", icon: SiDjango },
  fastapi: { label: "FastAPI", icon: SiFastapi },
  flask: { label: "Flask", icon: SiFlask },
  nodejs: { label: "Node.js", icon: SiNodedotjs },
  celery: { label: "Celery", icon: SiCelery },
  jwt: { label: "JWT", icon: SiJsonwebtokens },
  react: { label: "React", icon: SiReact },
  nextjs: { label: "Next.js", icon: SiNextdotjs },
  html: { label: "HTML", icon: SiHtml5 },
  kafka: { label: "Apache Kafka", icon: SiApachekafka },
  pyspark: { label: "PySpark", icon: SiApachespark },
  airflow: { label: "Apache Airflow", icon: SiApacheairflow },
  pandas: { label: "pandas", icon: SiPandas },
  parquet: { label: "Parquet", icon: SiApacheparquet },
  objectstorage: { label: "Storage compatible with S3", icon: HiOutlineCircleStack },
  postgresql: { label: "PostgreSQL", icon: SiPostgresql },
  redis: { label: "Redis", icon: SiRedis },
  pgvector: { label: "pgvector", icon: SiPostgresql },
  aws: { label: "AWS", icon: SiAmazonwebservices },
  ecs: { label: "Amazon ECS", icon: SiAmazonecs },
  ec2: { label: "Amazon EC2", icon: SiAmazonec2 },
  rds: { label: "Amazon RDS", icon: SiAmazonrds },
  s3: { label: "Amazon S3", icon: SiAmazons3 },
  sqs: { label: "Amazon SQS", icon: SiAmazonsqs },
  iam: { label: "IAM", icon: SiAmazoniam },
  sns: { label: "Amazon SNS", icon: SiAmazonwebservices },
  vpc: { label: "VPC", icon: SiAmazonwebservices },
  docker: { label: "Docker", icon: SiDocker },
  dockercompose: { label: "Docker Compose", icon: SiDocker },
  pytest: { label: "pytest", icon: SiPytest },
  tensorflow: { label: "TensorFlow", icon: SiTensorflow },
  tflitemicro: { label: "TensorFlow Lite Micro", icon: SiTensorflow },
  scikitlearn: { label: "Scikit Learn", icon: SiScikitlearn },
  gemini: { label: "Gemini 2.5 Flash", icon: SiGooglegemini },
  e5: { label: "Multilingual E5", icon: HiOutlineSparkles },
  restcontracts: { label: "REST contracts", icon: HiOutlineArrowsRightLeft },
  odoo: { label: "Odoo", icon: SiOdoo },
  esp32: { label: "ESP32", icon: SiEspressif },
} satisfies Record<string, TechEntry>;

export type TechKey = keyof typeof TECH;

// Brand colors from the Simple Icons catalog used by react-icons/si.
const TECH_COLORS = {
  python: "#3776AB", javascript: "#F7DF1E", django: "#092E20", drf: "#092E20",
  fastapi: "#009688", flask: "#000000", nodejs: "#5FA04E", celery: "#37814A",
  jwt: "#000000", react: "#61DAFB", nextjs: "#000000", html: "#E34F26",
  kafka: "#231F20", pyspark: "#E25A1C", airflow: "#017CEE", pandas: "#150458",
  parquet: "#50ABF1", objectstorage: "#569A31", postgresql: "#4169E1", redis: "#FF4438",
  pgvector: "#4169E1", aws: "#232F3E", ecs: "#FF9900", ec2: "#FF9900",
  rds: "#527FFF", s3: "#569A31", sqs: "#FF4F8B", iam: "#DD344C",
  sns: "#FF4F8B", vpc: "#8C4FFF", docker: "#2496ED", dockercompose: "#2496ED",
  pytest: "#0A9EDC", tensorflow: "#FF6F00", tflitemicro: "#FF6F00", scikitlearn: "#F7931E",
  gemini: "#8E75B2", e5: "#8E75B2", restcontracts: "#009688", odoo: "#714B67", esp32: "#E7352C",
} satisfies Record<TechKey, string>;

export function resolveTech(key: string): TechEntry & { color: string } {
  const entry = (TECH as Record<string, TechEntry>)[key] ?? { label: key, icon: HiOutlineCpuChip };
  return { ...entry, color: (TECH_COLORS as Record<string, string>)[key] ?? "#64748B" };
}
