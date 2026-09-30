import styles from "./Articles.module.css";

const articles = [
  { category: "Distributed systems", title: "When a payment succeeds but the server crashes", description: "Payment recovery with idempotency, webhooks, an outbox, and compensating actions.", slug: "what-happens-when-stripe-charges-the-customer-but-your-server-crashes-cea86ebab065" },
  { category: "Data engineering", title: "Building an order data pipeline with Kafka, Spark, and Airflow", description: "Following order events from streaming ingestion through layered storage to a warehouse ready for reporting.", slug: "building-a-real-time-e-commerce-etl-pipeline-with-kafka-spark-and-airflow-2baa9090ab3e" },
  { category: "AI architecture", title: "Building multilingual RAG with customer data isolation", description: "The decisions behind tenant isolation, multilingual retrieval, and answers grounded in customer data.", slug: "building-a-multilingual-multi-tenant-rag-engine-in-django-c975aecf599a" },
  { category: "Engineering lessons", title: "Debugging a Django RAG backend on PostgreSQL and Windows", description: "A practical account of configuration, permissions, and pgvector problems encountered along the way.", slug: "i-built-a-rag-back-end-in-django-on-postgresql-18-windows-heres-every-way-it-broke-626cb8010fd2" },
];

export function Articles() {
  return <section id="writing" className={`section ${styles.section}`} aria-labelledby="writing-title">
    <div className="showcaseHeading"><span className="showcaseBadge">Notes from the build</span><h2 id="writing-title">Engineering articles</h2><p>Four articles on the systems, decisions, and debugging behind my work.</p></div>
    <div className={styles.grid}>{articles.map((article, index) => <article className={styles.card} key={article.slug}>
      <a className={styles.cardHit} href={`https://medium.com/@saymmalik08/${article.slug}`} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true" />
      <div className={styles.meta}><span>{article.category} · 0{index + 1}</span><a className="btn btn--secondary" href={`https://medium.com/@saymmalik08/${article.slug}`} target="_blank" rel="noopener noreferrer" aria-label={`Read on Medium about ${article.title}`} data-track={`article:${article.slug}`}>Read article <span aria-hidden="true">↗</span></a></div>
      <h3>{article.title}</h3><p>{article.description}</p>
    </article>)}</div>
    <div className="allProjectsAction"><a className="btn btn--primary" href="https://medium.com/@saymmalik08" target="_blank" rel="noopener noreferrer">Read more on Medium ↗</a></div>
  </section>;
}
