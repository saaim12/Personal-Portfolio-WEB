import { SiteAnchor } from "@/components/SiteAnchor";
import Image from "@/components/SiteImage";
import "./personal-media.css";
import { roles } from "@/resources/experience";
import { portraits } from "@/resources/content";
import { pageMeta } from "@/resources/seo";
import { PageHeading, Action, Handles } from "@/components/Studio";
import { Contact } from "@/components/Contact";
import { ProfessionalSections } from "@/components/ProfessionalSections";
import { sitePath } from "@/utils/sitePath";
import { jsonLd, personJsonLd, profilePageJsonLd, breadcrumbJsonLd, editorialArticleJsonLd } from "@/resources/schema";

export async function generateMetadata() {
  return pageMeta({ title: "Professional Experience", description: "Explore Saaim Abdullah's engineering experience at Fitter Health and Expertflow: backend services, cloud deployments, data pipelines, and measured results.", path: "/professional-experience" });
}

const skills = [
  ["Languages", "Python, Java, JavaScript, TypeScript, SQL, C++, C#"],
  ["Backend & communication", "Django/DRF, FastAPI, Flask, Node.js, Express, REST APIs, gRPC, Protocol Buffers, WebRTC, Celery"],
  ["Frontend", "React, Next.js, Angular"],
  ["Data & machine learning", "PostgreSQL, Redis, MongoDB, MySQL, DynamoDB, Kafka, PySpark, Airflow, pgvector, TensorFlow, scikit-learn"],
  ["Cloud & delivery", "AWS, Docker, Kubernetes, CI/CD, Git, Linux"],
  ["Engineering tools", "Postman, Jira"],
];

export default function ProfessionalExperience() {
  return <div className="studioPage"><script {...jsonLd(personJsonLd)} /><script {...jsonLd(profilePageJsonLd)} /><script {...jsonLd(editorialArticleJsonLd({title:"My Story / My Bio",description:"Saaim Abdullah's account of his journey into software engineering, professional experience, and education.",path:"/professional-experience",image:portraits.playful}))} /><script {...jsonLd(breadcrumbJsonLd([{name:"Home",path:"/"},{name:"Professional Experience",path:"/professional-experience"}]))} /><div className="professionalLayout studioContainer"><ProfessionalSections /><div className="experiencePage">
    <PageHeading title="Professional Experience" note="the work and the story"><p>Backend engineering, cloud delivery, and data systems. Previously at Expertflow and Fitter Health, where I worked on production APIs, communication workflows, and healthcare software.</p><div className="experienceProof"><span><strong>77%</strong> faster admin responses</span><span><strong>135</strong> passing handover tests</span><span><strong>106</strong> PostgreSQL tables</span></div><SiteAnchor href="#career" className="outlineButton">Jump to work experience ↗</SiteAnchor></PageHeading>
    <section id="bio" className="experienceFrame bioFrame combinedStoryFrame" aria-labelledby="bio-heading"><span className="frameLabel">The person behind the work</span><Handles />
      <h2 id="bio-heading" className="displayType">My Story / My Bio</h2>
      <div className="bioOpening">
        <div><h3>A little about me</h3>
        <p>I’m Saaim, a software engineer based in Lahore, Pakistan, and currently pursuing a Master’s in Data Science. I build backend services, customer-facing products, cloud systems, and data pipelines. I’m curious by nature, I care about the people using what I build, and I’m happiest when a complicated problem finally becomes something simple and useful.</p></div>
        <figure className="editorialPhoto editorialPhotoRight"><Image src={portraits.smiling} width={1440} height={1440} sizes="(max-width: 720px) 90vw, 290px" alt="Saaim smiling in glasses" /><figcaption>Just me, enjoying a quiet moment.</figcaption></figure>
      </div>
            <div className="storyIntro mergedStoryIntro">
        <h3>How I got here</h3>
        <p>My journey into software engineering began in the second semester of university. What started as curiosity about how computers solve problems quickly turned into something much bigger. I spent my early days exploring programming fundamentals, data structures, algorithms, and the logic behind software. But I soon realized that understanding code wasn’t enough for me. <strong>I wanted to build things that actually mattered.</strong></p>
        <p>By my fourth semester, while most of my journey was still supposed to be about lectures and assignments, I had already stepped into the professional world as a developer. I immersed myself in web development, learning how to turn ideas into functional applications and how real software is designed, built, and maintained.</p>
        <p>The real turning point came in my sixth semester when I joined <strong>Expertflow, a Cisco technology partner</strong>. This was where my perspective on engineering fundamentally changed. I was no longer just writing code to make something work. I was building customer-facing applications, working with data-intensive systems, real-time communication, complex backend architectures, and databases where performance, security, and reliability mattered.</p>
        <p>I began to understand the difference between building an application and engineering a system that could survive in production.</p>
        <p>After gaining nearly two years of professional experience, my journey took me beyond Pakistan to <strong>Fitter Health, a Spain-based health-tech startup</strong>. There, I transformed backend infrastructure, redesigned data models, developed APIs, and built cloud-based systems that supported real healthcare workflows. It was an opportunity to take greater ownership of engineering decisions and understand how technology directly impacts a growing business.</p>
        <p>Along the way, my curiosity expanded beyond traditional software development into <strong>data engineering, distributed systems, artificial intelligence, and machine learning</strong>. That curiosity also led me to pursue a Master’s in Data Science at the National University of Computer and Emerging Sciences, connecting my software engineering experience with a deeper understanding of data and intelligent systems.</p>
        <p><strong>Today, I see myself as an engineer who enjoys understanding difficult problems, designing systems around them, and turning complex ideas into reliable, real-world products.</strong></p>
        <p>And the most exciting part? I’m still learning, still building, and still pushing toward problems I haven’t solved yet.</p>
      </div>

      <div className="personalStoryMoments">
        <figure className="editorialPhoto"><Image src={portraits.withDog} width={240} height={320} alt="Saaim outdoors with a dog" /><figcaption>A little fresh air and a loyal friend.</figcaption></figure>
        <div><h3>Life beyond the screen</h3><p>Outside work, I enjoy slowing down and spending time with my animals. They bring a lot of laughter, calm, and unexpected little moments into my days. They remind me that there is a whole world worth paying attention to away from a laptop.</p></div>
        <div><p>I like keeping these parts of my life here too. Engineering is something I love doing, but it isn’t the whole of who I am. Sometimes the best part of the day is simply being outside and hanging out with my pets.</p></div>
        <figure className="editorialPhoto"><Image src={portraits.withChicken} width={1200} height={1600} alt="Saaim with a chicken in the garden" /><figcaption>My feathered little companion.</figcaption></figure>
        <figure className="editorialPhoto"><Image src={portraits.withChickenSmiling} width={1200} height={1600} alt="Saaim smiling while holding a chicken" /><figcaption>These are the moments that make me smile.</figcaption></figure>
        <figure className="editorialPhoto personalVideo"><video autoPlay loop muted playsInline controls preload="metadata" poster={sitePath(portraits.duckVideoPoster)} aria-label="Saaim spending time with a duck"><source src={sitePath(portraits.withDuckVideo)} type="video/mp4" />Your browser does not support this video. <SiteAnchor href={portraits.withDuckVideo}>Watch the duck video</SiteAnchor>.</video><figcaption>Spending a little time with my duck.</figcaption></figure>
      </div>
    </section>
    <section id="career" className="experienceFrame careerFrame" aria-labelledby="career-heading"><span className="frameLabel">My work and experience</span><Handles /><h2 id="career-heading" className="displayType">My Work Experience</h2><p className="careerIntro">The roles, responsibilities, and results, with the full details right here.</p>
    {roles.map(role => <section className="roleCard" key={role.company} aria-label={role.company + " experience"}>
      <div className="roleHeader"><div><h3>{role.company}</h3><p>{role.title}</p></div><div className="stickyNote sand"><p>{role.dates}</p><p>{role.location}</p></div></div>
      <ul>{role.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul><p className="roleTech">{role.tech}</p>
      {role.link && <SiteAnchor className="outlineButton" href={role.link}>View project ↗</SiteAnchor>}
    </section>)}
    <div className="aboutActions"><Action href="/SaaimCV.pdf" external>Resume</Action><SiteAnchor className="outlineButton" href="/Fitter-Recommendation-Letter.pdf" target="_blank" rel="noopener noreferrer">Client recommendation ↗</SiteAnchor></div><span className="frameSticker">↖ My work</span></section>
    <section className="aboutSection"><h2 className="displayType">Selected projects</h2><div className="skillsGrid">
      <div className="skillGroup"><h3>Multilingual, Multi-Tenant RAG Engine</h3><p>Freelance: Django APIs with CSV, PDF, and DOCX ingestion, pgvector, multilingual embeddings, and Gemini. Authenticated tenant-scoped retrieval, quotas, and six prompt templates keep knowledge bases separate.</p><SiteAnchor className="quietLink" href="/projects/multilingual-rag-engine">View project ↗</SiteAnchor></div>
      <div className="skillGroup"><h3>Real-Time E-Commerce ETL Pipeline</h3><p>Freelance: Kafka and PySpark ingestion with checkpoints, date-partitioned Parquet, validation, and deduplication. Hourly Airflow transformations move Bronze, Silver, and Gold data into a four-table sales star schema.</p><SiteAnchor className="quietLink" href="/projects/realtime-ecommerce-etl-pipeline">View project ↗</SiteAnchor></div>
      <div className="skillGroup"><h3>Movie Recommender System</h3><p>MovieLens content similarity, co-occurrence, and popularity for cold starts. Separate training, evaluation, and serving with FastAPI recommendation, health, and model-reload APIs, API-key protection, Redis, Docker, and request tracing.</p><SiteAnchor className="quietLink" href="/projects/movie-recommender-system">View project ↗</SiteAnchor></div>
      <div className="skillGroup"><h3>Autoencoder for Edge Sensor Data</h3><p>A TensorFlow Lite Micro encoder on ESP32 compresses sensor readings into latent vectors for a Flask decoder on EC2 with S3 integration. Evaluated model size, inference speed, and reconstruction trade-offs.</p><SiteAnchor className="quietLink" href="/projects/autoencoder-edge-compression">View project ↗</SiteAnchor></div>
    </div><p className="additionalExperience">Additional work includes cloud intrusion detection and secure IoT communication, hackathon EC2 deployment and backend integration, a Bee Simulator Unity prototype, Python algorithms and complexity notes, and ETL and RAG technical articles.</p></section>
    <section className="aboutSection"><h2 className="displayType">The toolkit</h2><div className="skillsGrid">{skills.map(([title, body]) => <div className="skillGroup" key={title}><h3>{title}</h3><p>{body}</p></div>)}</div></section>
    <section className="aboutSection" aria-labelledby="education-heading"><h2 id="education-heading" className="displayType">Education</h2><div className="educationEntry"><p><strong>Master’s in Data Science</strong><br/>National University of Computer and Emerging Sciences<br/>2026–2028</p></div><div className="educationEntry"><p><strong>BS in Computer Engineering</strong><br/>COMSATS University Islamabad, Lahore Campus · 2021–2025</p><p>Coursework: Data Structures and Algorithms, Databases, Operating Systems, Networks, Software Engineering, Computer Architecture, and Machine Learning.</p></div></section>
    <section className="aboutSection"><h2 className="displayType">Always learning</h2><p>AWS Cloud Technical Essentials · Introduction to Data Engineering · Getting Started with Git and GitHub · Claude Code 101</p></section>
  </div></div><Contact /></div>;
}
