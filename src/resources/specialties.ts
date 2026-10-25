// Portfolio-specific capabilities grounded in published projects, not agency case studies.
export type Specialty={
  slug:string; title:string; description:string;summary:string; problem:string;
  audience:string[]; approach:{heading:string;detail:string;checks:string[]}[];
  stack:string[]; relatedProjects:{slug:string;label:string;proof:string}[];
  outcome:string; tradeoff:string;
};
export const specialties:Specialty[]=[
{
slug:"backend-api-engineering",title:"Backend API & Systems Engineering",
description:"Backend API engineering with Django, Node.js, PostgreSQL, authentication, background jobs, testing, and reliable service integrations.",
summary:"I design and implement application backends that treat data integrity, permissions and recovery as product requirements—not afterthoughts.",
problem:"A feature can seem simple in a UI yet require consistent state across accounts, databases and external systems. When an API times out, a worker retries, or a user loses permission, the system still needs a predictable answer. I start by mapping these cases rather than choosing a framework first.",
audience:["Teams building a new API-backed product","Organizations maintaining Django or Node.js services","Product engineers connecting user workflows to external providers"],
approach:[
{heading:"Discover the business transaction",detail:"I map the user action, validation, actors and state changes before writing endpoints. For bookings, memberships and notifications, the critical question is what must be true before the user sees success. I document who can access each record and which operations must remain atomic.",checks:["Define domain records and ownership","Write API contracts and errors","List duplicate and partial-failure scenarios"]},
{heading:"Choose data and application boundaries",detail:"PostgreSQL constraints and transactions usually handle the central business facts. Django/DRF or Node.js can expose the contract. I introduce asynchronous processing only where work needs retries or should not delay the request. This avoids speculative complexity around otherwise straightforward business operations.",checks:["Use server-side authorization and validation","Set transaction and idempotency boundaries","Separate durable work from user-facing latency"]},
{heading:"Test, deploy and make failure visible",detail:"Integration tests cover permissions, expired sessions and database rules. Operational monitoring should report worker failures and delayed jobs, not just HTTP health. Deployment planning includes migrations, secrets, rollback and a clear way for another engineer to diagnose a problem.",checks:["Test failure paths and duplicate delivery","Instrument errors and job status","Prepare a deploy and rollback checklist"]}
],
stack:["Python","Django REST Framework","Node.js","PostgreSQL","Redis","Celery","AWS"],
relatedProjects:[{slug:"fitter-health-platform",label:"Fitter Health — production platform",proof:"Django application delivery, membership workflows, notifications, AWS and handover."},{slug:"temporary-url-service",label:"Temporary URL service",proof:"Small Express API with explicit expiry and durability limitations."}],
outcome:"A maintainable backend with explicit authorization, reliable state transitions, clear integration contracts and documentation.",
tradeoff:"A modular application with sound data rules is usually more useful than multiple services created for their own sake."
},
{
slug:"data-engineering-pipelines",title:"Data Pipelines & ETL Engineering",
description:"Data pipeline design with Kafka, Spark, Airflow, Python, SQL, PostgreSQL, deduplication, observability, and batch or streaming ETL.",
summary:"I build data flows that people can reproduce, reconcile and trust—from raw events to documented analytical models.",
problem:"When analytics cannot explain where a number came from, building a faster dashboard will not solve the problem. A useful data platform begins with authoritative sources, business definitions, freshness expectations and a plan for replaying failed loads.",
audience:["Teams merging application events and operational reporting","Engineers choosing between scheduled ETL and streaming","Businesses replacing recurring spreadsheet reconciliation"],
approach:[
{heading:"Define sources, identifiers and consumer questions",detail:"I identify schema owners, event timestamps and the business keys used to join records. Before selecting tools, I write the checks that would reveal a duplicate, late event or broken source contract. I decide what freshness actually matters for downstream users.",checks:["Agree metric definitions","Track event and processing time","Write source schema and ownership notes"]},
{heading:"Separate ingest, transform and serve",detail:"Kafka and Spark can support event streams; Bronze storage preserves replayable inputs. Silver transformations validate and deduplicate; Gold models create stable dimensions and measures. When latency allows it, Airflow can orchestrate hourly or daily transformations separately from ingest.",checks:["Use checkpoints and idempotent writes","Design a recoverable backfill","Verify dimensions and fact-table keys"]},
{heading:"Operate for reliability and cost",detail:"I add freshness, row-count and quality signals that show whether reporting can be trusted. A large streaming stack is not automatically the right solution: data volume, team capacity and recovery complexity must justify it.",checks:["Reconcile warehouse totals to sources","Monitor failed and stale partitions","Document ownership and restore procedures"]}
],
stack:["Python","SQL","Apache Kafka","Spark / PySpark","Airflow","Parquet","PostgreSQL"],
relatedProjects:[{slug:"realtime-ecommerce-etl-pipeline",label:"Ecommerce ETL architecture",proof:"Kafka and Spark ingestion, Bronze/Silver/Gold transformations and a PostgreSQL sales model."},{slug:"fitter-health-platform",label:"Fitter Health analytics foundations",proof:"Reporting and analytics work alongside a transactional Django platform."}],
outcome:"Reliable, testable reporting data and ingestion workflows with explicit replay and ownership.",
tradeoff:"Batch processing is often the best choice until a real operational decision demands streaming latency."
},
{
slug:"rag-ai-engineering",title:"RAG & AI Backend Engineering",
description:"RAG and AI backend systems with Django, pgvector, multilingual embeddings, tenant-isolated retrieval, grounded answers, and API safeguards.",
summary:"I treat AI retrieval as a backend security and data-quality problem, with model choice only one part of the system.",
problem:"A chat interface can generate plausible answers while retrieving irrelevant context—or context belonging to another customer. A dependable retrieval system must distinguish ingestion, identity, embedding compatibility and answer verification.",
audience:["Teams exploring document question-answering","Products serving multiple customer workspaces","Developers connecting embeddings and LLMs to existing APIs"],
approach:[
{heading:"Map documents, permissions and retrieval goals",detail:"I begin with who owns each document, which queries should succeed and which should be declined. Chunking strategy and metadata decide what can be found. Authentication, authorization and retrieval filtering must agree on the same tenant scope.",checks:["Define ingestion and source attribution","Test unauthorized cross-tenant queries","Create questions with no supported answer"]},
{heading:"Design embedding and generation stages independently",detail:"An embedding pipeline can run locally while generation calls a separate provider. For multilingual retrieval, the encoder and search query prefixes must match the selected model. I version embedding dimensions and prevent accidental comparisons across incompatible models.",checks:["Document model and vector dimensions","Validate top-k retrieval against examples","Set thresholds and refusal behavior"]},
{heading:"Make the service measurable and maintainable",detail:"I isolate API keys and rate-limit usage, record useful evaluation signals and plan for provider outages or bad source data. I do not call a working prototype production hardened without load, authorization and incident testing.",checks:["Record retrieval quality cases","Test provider errors and quota limits","Plan index rebuilds after model changes"]}
],
stack:["Django","PostgreSQL","pgvector","E5 embeddings","Gemini","JWT","Python"],
relatedProjects:[{slug:"multilingual-rag-engine",label:"Multilingual multi-tenant RAG",proof:"JWT-scoped retrieval, local E5 embeddings, quotas and source-grounded generation."},{slug:"document-rag-backend",label:"Document Q&A API",proof:"Django document ingestion, pgvector, retrieval limits and no-context fallback."}],
outcome:"A retrieval application that can explain where an answer came from and which dataset it was permitted to use.",
tradeoff:"Retrieval correctness and authorization are more important than elaborate prompting or a larger language model."
},
{
slug:"aws-cloud-devops",title:"AWS Cloud & DevOps Engineering",
description:"AWS cloud engineering for Django and web backends, container deployment, IAM, CI/CD, observability, backups, and operational handover.",
summary:"I design deployment and cloud operations around availability goals, least privilege and the team that will maintain the system.",
problem:"Cloud complexity can grow much faster than a product's actual needs. Hosting needs to account for secrets, networking, databases, releases and recovery, without introducing services that nobody can operate safely.",
audience:["Teams shipping a containerized backend","Organizations moving from manual deployments to CI/CD","Product owners needing reliable AWS infrastructure and handover"],
approach:[
{heading:"Define workload and reliability requirements",detail:"I inventory application services, storage, data sensitivity, background queues and dependencies, then agree practical failure tolerance and cost limits. Choosing ECS, VMs or other managed services follows these requirements rather than a default architecture diagram.",checks:["Map critical dependencies","Set backup and recovery objectives","Estimate sustained and peak workload"]},
{heading:"Secure the deployment path",detail:"I separate credentials and environments, scope IAM roles and review network access to databases and services. Container build and release processes should be reproducible, with configuration owned outside source files and migrations planned explicitly.",checks:["Least-privilege IAM and secret handling","Staged migrations and rollback","Review VPC and database exposure"]},
{heading:"Test operating the system after launch",detail:"Health endpoints alone do not reveal failed notifications or stuck jobs. I use logs, metrics and alerts that relate to user outcomes, with a handover describing how to restore service. The goal is boring, observable reliability.",checks:["Monitor queue age and failed tasks","Verify a backup restore path","Document incidents and ownership"]}
],
stack:["AWS","ECS","RDS","S3","SQS / SNS","IAM","VPC","Docker","CI/CD"],
relatedProjects:[{slug:"fitter-health-platform",label:"Fitter Health cloud delivery",proof:"AWS deployment, data and notification operations with technical handover."},{slug:"autoencoder-edge-compression",label:"Edge-to-cloud ML prototype",proof:"ESP32-to-Flask reconstruction with AWS EC2 and artifact storage."}],
outcome:"A more predictable release process and an operationally understandable cloud environment.",
tradeoff:"Infrastructure should match the workload and support capacity; Kubernetes is not a requirement for every successful application."
},
{
slug:"full-stack-saas-products",title:"Full-Stack SaaS & Web Products",
description:"Full-stack SaaS and web app development with Next.js, React, Django, PostgreSQL, authentication, workflows, cloud deployment, and testing.",
summary:"I connect product interfaces with clear backend boundaries so users can finish the job they came to do.",
problem:"A dashboard is not a product unless actions reliably change state, errors are understandable and staff can support the workflow. I start with user journeys and model the business process behind each screen.",
audience:["Founders validating a first software product","Teams modernizing an existing internal portal","Organizations connecting web UI and Django services"],
approach:[
{heading:"Prove a complete user journey",detail:"Before expanding a UI, I model the steps from onboarding to a meaningful outcome. I identify which permissions, notifications and data relationships support that path. Design work covers keyboard access, validation, empty states and interrupted flows.",checks:["Prioritize one start-to-finish workflow","Write role and permission cases","Prototype key failure and loading states"]},
{heading:"Align frontend and backend contracts",detail:"React or Next.js handles presentation while backend APIs enforce business rules. I document response types, pagination, transaction limits and error shapes. A clean service boundary lets UI and backend change without hidden assumptions.",checks:["Define versioned API contracts","Validate permissions on the server","Test forms, state changes and retries"]},
{heading:"Launch with maintainability",detail:"I build automated checks, review schema migrations and ensure deployment ownership is documented. Usage and errors help decide what to improve next. Multi-tenancy or billing infrastructure is introduced only when the product actually requires it.",checks:["Automate smoke tests","Record release and recovery steps","Evaluate real usage before scaling"]}
],
stack:["React","Next.js","TypeScript","Django","PostgreSQL","AWS","Docker"],
relatedProjects:[{slug:"fitter-health-platform",label:"Fitter Health full-stack delivery",proof:"Frontend/back-end platform work, memberships, booking flows and AWS operations."},{slug:"temporary-url-service",label:"API product fundamentals",proof:"Small feature lifecycle and explicit API failure contracts."}],
outcome:"A coherent web application with useful UX, robust data boundaries and a clear operating plan.",
tradeoff:"User workflows and API correctness matter more than adopting a complex frontend or SaaS architecture prematurely."
},
{
slug:"distributed-systems-reliability",title:"Distributed Systems & Reliability",
description:"Distributed system design for reliable API workflows, idempotency, notifications, retries, durable queues, outbox patterns, and failure recovery.",
summary:"I look for the point where a successful request can still leave the business in the wrong state.",
problem:"External providers, databases and message queues rarely fail together or in a predictable order. A payment can succeed before an acknowledgment arrives; an alert can be lost between storage and dispatch. Reliability means designing for those gaps, not assuming a happy-path request.",
audience:["Teams integrating payment or notification providers","Engineers replacing fragile cron or synchronous workflows","Products where lost events create customer-facing errors"],
approach:[
{heading:"Map state and failure boundaries",detail:"I distinguish the transaction that creates the business fact from the asynchronous action that follows it. Idempotency records and stable event identifiers help retries converge on one outcome. Duplicate delivery is expected rather than treated as an exceptional bug.",checks:["Write state-machine transitions","Define operation identities and deduplication","Test database commit versus dispatch failure"]},
{heading:"Make external work recoverable",detail:"A durable outbox, queue or background job can bridge application transactions and provider calls. Retry schedules must distinguish transient failures from invalid input. Dead-letter records and reconciliation provide a path for investigation without silent data loss.",checks:["Bound retries and add backoff","Record permanent failures and operator actions","Verify webhook authenticity and event ordering"]},
{heading:"Prove the system can be operated",detail:"I specify meaningful alerts, repeatable fixtures and recovery runbooks. Strong guarantees are narrow: an idempotent handler improves duplicate safety but cannot magically make every multi-system update atomic.",checks:["Exercise provider timeout scenarios","Measure task age and unprocessed events","Document compensation and repair paths"]}
],
stack:["Django","PostgreSQL","Celery","Redis","SQS","SNS","Node.js","Kafka"],
relatedProjects:[{slug:"fitter-health-platform",label:"Notification recovery at Fitter Health",proof:"Delivery work that addressed silent notification loss and durable recovery."},{slug:"temporary-url-service",label:"Expiring URL service",proof:"A compact example of defining expiry and persistence limitations."}],
outcome:"Failure-aware workflows with clear recovery and fewer silent inconsistencies.",
tradeoff:"Retries without idempotency or reconciliation can amplify failures rather than repair them."
},
{
slug:"recommendation-ml-systems",title:"Recommendation & ML Serving Systems",
description:"Recommendation system engineering with Python, FastAPI, Airflow, reproducible model artifacts, ranking signals, caching, and API evaluation.",
summary:"I connect machine learning experiments to serving APIs that can be tested, monitored and versioned.",
problem:"A recommendation model can look convincing in a notebook but fail when it meets missing users, new items or an out-of-date serving cache. I define how candidates are scored, how training artifacts reach the API and what fallback appears when a result cannot be produced.",
audience:["Developers shipping an ML-powered product","Teams turning offline Python experiments into APIs","Products combining behavioral and content ranking signals"],
approach:[
{heading:"Make training and evaluation reproducible",detail:"Data splits, features and output artifacts need consistent identifiers. I record what the model learned from, how signals were weighted and which metrics can be calculated from available test data. A production claim requires representative traffic and feedback that a local experiment cannot provide.",checks:["Record dataset and feature version","Separate training from inference","Document evaluation metrics and known gaps"]},
{heading:"Design a stable recommendation API",detail:"A serving endpoint must validate requests, handle users with no history and report missing models cleanly. Versionable files and safe model reloads prevent a partially written artifact from becoming live. Cache strategy has to respect model changes and personalized inputs.",checks:["Define fallbacks and empty recommendation behavior","Use versioned model artifacts","Test API latency and cold-start paths"]},
{heading:"Monitor outcomes and operational cost",detail:"Offline ranking quality alone cannot prove usefulness. Serving logs, latency, error rates, data drift and eventual user outcomes matter. Expensive retraining and feature dependencies should follow observed product requirements, not arbitrary schedules.",checks:["Instrument failure and latency signals","Track model freshness","Plan controlled evaluation before major changes"]}
],
stack:["Python","FastAPI","pandas","scikit-learn","Airflow","Redis","Docker"],
relatedProjects:[{slug:"movie-recommender-system",label:"Hybrid MovieLens recommendation project",proof:"Content similarity, item co-occurrence and popularity combined with FastAPI serving."},{slug:"ml-data-foundations",label:"Machine learning foundations",proof:"Reproducible Python experiments, model serialization and evaluation choices."}],
outcome:"An inspectable ranking pipeline connected to an API, with explicit model versions and fallbacks.",
tradeoff:"A simple, well-evaluated ranker is often more useful than a complex model without reliable training data or serving observability."
},
];
export const getSpecialty=(slug:string)=>specialties.find(x=>x.slug===slug);
