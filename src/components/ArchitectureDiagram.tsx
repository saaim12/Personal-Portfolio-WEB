import styles from "./ArchitectureDiagram.module.css";
import Image from "next/image";

type Node = { id: string; x: number; y: number; title: string; detail: string; store?: boolean };
type Edge = { from: string; to: string; label: string };
type Diagram = { boundary: string; nodes: Node[]; edges: Edge[]; note: string };
const node = (id: string, x: number, y: number, title: string, detail: string, store = false): Node => ({ id, x, y, title, detail, store });
const edge = (from: string, to: string, label: string): Edge => ({ from, to, label });
const diagrams: Record<string, Diagram> = {
  "bookstore-platform": {
    boundary: "REQUEST / STORAGE BOUNDARY",
    nodes: [node("ui", 45, 100, "React storefront", "Router + cart context"), node("api", 300, 100, "Express API", "Routes / controllers"), node("db", 555, 100, "MongoDB", "Books + users", true), node("cart", 45, 310, "Checkout screen", "Book IDs + quantities"), node("order", 300, 310, "Order controller", "Look up prices / total"), node("orders", 555, 310, "Orders collection", "Price snapshots", true)],
    edges: [edge("ui", "api", "HTTP requests"), edge("api", "db", "Mongoose query"), edge("cart", "order", "POST order"), edge("order", "orders", "Save order"), edge("db", "orders", "Book references")],
    note: "The order controller reads current book prices from MongoDB before saving line-item snapshots. Authentication is unfinished; payment selection is data, not a payment integration.",
  },
  "temporary-url-service": {
    boundary: "ONE NODE.JS PROCESS / VOLATILE STORAGE",
    nodes: [node("post", 45, 100, "Create request", "POST /api/url"), node("id", 300, 100, "URL controller", "Generate Nano ID"), node("map", 555, 100, "JavaScript Map", "ID → destination", true), node("get", 45, 310, "Open short link", "GET /:hash"), node("lookup", 300, 310, "Lookup handler", "Resolve / 404"), node("timer", 555, 310, "Expiry timer", "Delete mapping")],
    edges: [edge("post", "id", "Original URL"), edge("id", "map", "Store alias"), edge("get", "lookup", "Short ID"), edge("lookup", "map", "Read mapping"), edge("map", "timer", "Timed deletion")],
    note: "A successful lookup redirects the browser to the original destination. Entries and timers live in one process; restarting it loses the links.",
  },
  "document-rag-backend": {
    boundary: "INGESTION ABOVE / QUESTION ANSWERING BELOW",
    nodes: [node("csv", 45, 100, "CSV Q&A pairs", "Ingestion service"), node("embed", 300, 100, "Gemini embeddings", "768-dimensional vectors"), node("db", 555, 100, "PostgreSQL", "pgvector + source data", true), node("question", 45, 310, "Question endpoint", "Query + category"), node("retrieve", 300, 310, "Retrieval service", "Cosine similarity"), node("answer", 555, 310, "RAG service", "Gemini / fallback")],
    edges: [edge("csv", "embed", "Batch text"), edge("embed", "db", "Store vectors"), edge("question", "retrieve", "Embed query"), edge("retrieve", "db", "Vector search"), edge("retrieve", "answer", "Relevant context")],
    note: "Retrieval applies category and similarity filters. With no relevant context, the service returns a fallback instead of asking the model for an unsupported answer.",
  },
  "web-sentiment-pipeline": {
    boundary: "SEQUENTIAL PYTHON COLLECTION JOB",
    nodes: [node("topics", 45, 100, "Topic configuration", "Entities + keywords"), node("collect", 300, 100, "Source collectors", "Web / news / RSS"), node("dedup", 555, 100, "Visited URL set", "Exact-URL dedup", true), node("json", 45, 310, "dataset.json", "Collected records", true), node("vader", 300, 310, "VADER", "Sentiment labels"), node("extract", 555, 310, "Article extraction", "newspaper / HTML")],
    edges: [edge("topics", "collect", "Search terms"), edge("collect", "dedup", "Candidate URLs"), edge("dedup", "extract", "Unseen URLs"), edge("extract", "vader", "Extracted text"), edge("vader", "json", "Append records")],
    note: "The pipeline attempts article extraction, then falls back to HTML paragraphs. Some sources provide headings only. Progress and deduplication are process-local.",
  },
  "esp32-temperature-inference": {
    boundary: "OFFLINE TRAINING ABOVE / DEVICE TO SERVER BELOW",
    nodes: [node("train", 45, 100, "Training script", "Synthetic temperatures"), node("encoder", 300, 100, "Encoder export", "TFLite / C header"), node("decoder", 555, 100, "Decoder export", "Keras + fitted scaler"), node("sensor", 45, 310, "DHT11 sensor", "Temperature sample"), node("esp", 300, 310, "ESP32 inference", "Normalize / encode"), node("flask", 555, 310, "Flask /decode", "Reconstruct / log")],
    edges: [edge("train", "encoder", "Convert encoder"), edge("encoder", "esp", "Flash model"), edge("decoder", "flask", "Load artifacts"), edge("sensor", "esp", "Scalar input"), edge("esp", "flask", "HTTP: 2 values")],
    note: "Training also saves the decoder and scaler for Flask. This experiment maps one scalar to two latent values; it demonstrates split inference, not payload compression.",
  },
  "algorithms-in-python": {
    boundary: "REPRESENTATIVE IMPLEMENTATION / DIJKSTRA",
    nodes: [node("graph", 45, 100, "Weighted graph", "Adjacency lists"), node("heap", 300, 100, "Min-heap", "Next shortest distance"), node("check", 555, 100, "Stale-entry check", "Skip outdated entries"), node("result", 45, 310, "Distance map", "Shortest known paths", true), node("update", 300, 310, "Relax edges", "Improve + push to heap"), node("neighbors", 555, 310, "Neighbor traversal", "Distance + edge weight")],
    edges: [edge("graph", "heap", "Start node"), edge("heap", "check", "Pop minimum"), edge("check", "neighbors", "Current entry"), edge("neighbors", "update", "Candidate distance"), edge("update", "heap", "Push improvement"), edge("update", "result", "Record best")],
    note: "This is an algorithm flow, not a deployed service. The repository also contains topic-based Python exercises, with a separate Java DSA repository.",
  },
  "ml-data-foundations": {
    boundary: "OFFLINE REGRESSION EXPERIMENT",
    nodes: [node("csv", 45, 100, "Advertising CSV", "TV / radio / newspaper"), node("split", 300, 100, "Train / test split", "20% train / 80% test"), node("fit", 555, 100, "Linear regression", "Fit training samples"), node("metrics", 45, 310, "Evaluation", "MSE / R² / scatter"), node("predict", 300, 310, "Prediction", "Held-out features"), node("model", 555, 310, "Joblib artifact", "Save / reload model", true)],
    edges: [edge("csv", "split", "Features + sales"), edge("split", "fit", "Training data"), edge("fit", "model", "Serialize"), edge("model", "predict", "Load estimator"), edge("predict", "metrics", "Predicted sales")],
    note: "Evaluation compares predictions with held-out sales values. This diagram follows the inspected regression exercise; the repository contains other learning notebooks as well.",
  },
  "interactive-portfolio": {
    boundary: "BUILD TIME ABOVE / BROWSER BELOW",
    nodes: [node("source", 45, 100, "Next.js project", "App Router + metadata"), node("build", 300, 100, "Static export", "Build HTML / JS / CSS"), node("host", 555, 100, "Static hosting", "Assets + optional basePath"), node("hooks", 45, 310, "Interaction hooks", "Scroll / rain / audio"), node("client", 300, 310, "Portfolio client", "Menu + section state"), node("browser", 555, 310, "Browser", "Load / hydrate")],
    edges: [edge("source", "build", "Build project"), edge("build", "host", "Export files"), edge("host", "browser", "Serve assets"), edge("browser", "client", "Hydrate UI"), edge("client", "hooks", "Attach effects")],
    note: "The inspected project uses static export and browser-side interaction hooks. It does not require a persistent Next.js server for its exported pages.",
  },
};

type DiagramProps = { slug: string } | { src: string; alt: string; caption?: string; label?: string; width?: number; height?: number };

export function ArchitectureDiagram(props: DiagramProps) {
  if ("src" in props) return <figure className={styles.figure}>
    {props.label && <figcaption>{props.label}</figcaption>}
    <a href={props.src} target="_blank" rel="noopener noreferrer" aria-label="Open full-size architecture diagram"><Image src={props.src} alt={props.alt} width={props.width ?? 1200} height={props.height ?? 675} sizes="(max-width: 700px) 90vw, 720px" style={{ width: "100%", height: "auto" }} /></a>
    {props.caption && <figcaption>{props.caption} <a href={props.src} target="_blank" rel="noopener noreferrer">Open full-size diagram ↗</a></figcaption>}
  </figure>;
  const { slug } = props;
  const data = diagrams[slug];
  if (!data) return null;
  const marker = `arrow-${slug}`;
  return <figure className={styles.figure}>
    <div className={styles.scroll} tabIndex={0} role="region" aria-label="Scrollable architecture diagram">
      <svg className={styles.diagram} viewBox="0 0 800 450" role="img" aria-labelledby={`title-${slug} desc-${slug}`}>
        <title id={`title-${slug}`}>Component and data flow diagram</title>
        <desc id={`desc-${slug}`}>{data.edges.map(e => `${data.nodes.find(n => n.id === e.from)?.title} to ${data.nodes.find(n => n.id === e.to)?.title}: ${e.label}.`).join(" ")}</desc>
        <defs><marker id={marker} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8Z" fill="#5b6c77" /></marker></defs>
        <rect x="20" y="25" width="760" height="400" rx="10" fill="none" stroke="#c8d0d3" strokeDasharray="6 5" />
        <text x="40" y="53" fontSize="11" letterSpacing="1.4" fill="#5b6c77">{data.boundary}</text>
        {data.edges.map((e, i) => {
          const a = data.nodes.find(n => n.id === e.from)!; const b = data.nodes.find(n => n.id === e.to)!;
          const sameRow = a.y === b.y; const forward = b.x > a.x;
          const x1 = sameRow ? a.x + (forward ? 200 : 0) : a.x + 100;
          const x2 = sameRow ? b.x + (forward ? 0 : 200) : b.x + 100;
          const y1 = sameRow ? a.y + 43 : a.y + (b.y > a.y ? 86 : 0);
          const y2 = sameRow ? b.y + 43 : b.y + (b.y > a.y ? 0 : 86);
          const midY = (y1 + y2) / 2;
          return <g key={i}><path d={sameRow ? `M${x1} ${y1}H${x2}` : `M${x1} ${y1}V${midY}H${x2}V${y2}`} fill="none" stroke="#5b6c77" strokeWidth="1.5" markerEnd={`url(#${marker})`} /><text x={(x1 + x2) / 2} y={sameRow ? y1 - 53 : midY - 8} textAnchor="middle" fontSize="10" fill="#465764" paintOrder="stroke" stroke="#fbfaf7" strokeWidth="5" strokeLinejoin="round">{e.label}</text></g>;
        })}
        {data.nodes.map(n => <g key={n.id}><rect x={n.x} y={n.y} width="200" height="86" rx={n.store ? 18 : 5} fill={n.store ? "#e9eff1" : "#fff"} stroke="#69818c" strokeWidth="1.4" />{n.store && <path d={`M${n.x} ${n.y + 16}Q${n.x + 100} ${n.y + 37} ${n.x + 200} ${n.y + 16}`} fill="none" stroke="#69818c" />}<text x={n.x + 100} y={n.y + 44} textAnchor="middle" fontSize="14" fontWeight="600" fill="#243742">{n.title}</text><text x={n.x + 100} y={n.y + 65} textAnchor="middle" fontSize="11" fill="#5d6d75">{n.detail}</text></g>)}
      </svg>
    </div>
    <figcaption><span className={styles.hint}>Swipe horizontally to inspect the diagram.</span>{data.note}</figcaption>
  </figure>;
}
