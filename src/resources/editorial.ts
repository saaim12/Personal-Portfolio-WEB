// Change only when the guide content, evidence, or references are revised.
export const EDITORIAL_UPDATED_AT = "2026-10-30";

export type EditorialReference = { title: string; url: string; context: string };
export const noteReferences: Record<string, EditorialReference[]> = {
  "reliable-background-jobs-webhooks-idempotency": [
    { title: "Django: database transactions", url: "https://docs.djangoproject.com/en/5.2/topics/db/transactions/", context: "Transaction boundaries and running callbacks after a successful commit." },
    { title: "Apache Kafka: message delivery semantics", url: "https://kafka.apache.org/41/design/design/#semantics", context: "Delivery guarantees and the limits of coordinating consumer state with external systems." },
  ],
  "tenant-isolated-rag-with-pgvector": [
    { title: "PostgreSQL: row security policies", url: "https://www.postgresql.org/docs/18/ddl-rowsecurity.html", context: "Database-level row policies, default-deny behavior, and owner bypass considerations." },
    { title: "pgvector: filtering and vector indexes", url: "https://github.com/pgvector/pgvector#filtering", context: "How filters interact with exact and approximate vector search." },
  ],
  "kafka-spark-airflow-pipeline-design": [
    { title: "Apache Kafka: design and delivery semantics", url: "https://kafka.apache.org/41/design/design/#semantics", context: "Producer, consumer, and processing guarantees when planning replayable ingestion." },
    { title: "Apache Spark: Structured Streaming", url: "https://spark.apache.org/docs/latest/streaming/apis-on-dataframes-and-datasets.html", context: "Streaming sources, checkpoints, and recovery constraints." },
  ],
  "django-nextjs-aws-application-delivery": [
    { title: "Django: deployment checklist", url: "https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/", context: "Production settings, secret management, HTTPS, backups, and operational checks." },
    { title: "AWS: security and compliance overview", url: "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/security-and-compliance.html", context: "Security responsibilities when operating applications on AWS." },
  ],
};
