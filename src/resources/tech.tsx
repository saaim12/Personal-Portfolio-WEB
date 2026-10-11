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

export function resolveTech(key: string): TechEntry {
  return (TECH as Record<string, TechEntry>)[key] ?? { label: key, icon: HiOutlineCpuChip };
}
