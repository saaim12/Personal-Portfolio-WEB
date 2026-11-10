type TechEntry = { label: string };

const TECH = {
  python: { label: "Python" },
  javascript: { label: "JavaScript" },
  django: { label: "Django" },
  drf: { label: "Django REST Framework" },
  fastapi: { label: "FastAPI" },
  flask: { label: "Flask" },
  nodejs: { label: "Node.js" },
  celery: { label: "Celery" },
  jwt: { label: "JWT" },
  react: { label: "React" },
  nextjs: { label: "Next.js" },
  html: { label: "HTML" },
  kafka: { label: "Apache Kafka" },
  pyspark: { label: "PySpark" },
  airflow: { label: "Apache Airflow" },
  pandas: { label: "pandas" },
  parquet: { label: "Parquet" },
  objectstorage: { label: "Storage compatible with S3" },
  postgresql: { label: "PostgreSQL" },
  redis: { label: "Redis" },
  pgvector: { label: "pgvector" },
  aws: { label: "AWS" },
  ecs: { label: "Amazon ECS" },
  ec2: { label: "Amazon EC2" },
  rds: { label: "Amazon RDS" },
  s3: { label: "Amazon S3" },
  sqs: { label: "Amazon SQS" },
  iam: { label: "IAM" },
  sns: { label: "Amazon SNS" },
  vpc: { label: "VPC" },
  docker: { label: "Docker" },
  dockercompose: { label: "Docker Compose" },
  pytest: { label: "pytest" },
  tensorflow: { label: "TensorFlow" },
  tflitemicro: { label: "TensorFlow Lite Micro" },
  scikitlearn: { label: "scikit-learn" },
  gemini: { label: "Gemini 2.5 Flash" },
  e5: { label: "Multilingual E5" },
  restcontracts: { label: "REST contracts" },
  odoo: { label: "Odoo" },
  esp32: { label: "ESP32" },
} satisfies Record<string, TechEntry>;

export type TechKey = keyof typeof TECH;


export function resolveTech(key: string): TechEntry {
  return (TECH as Record<string, TechEntry>)[key] ?? { label: key };
}
