import { PageHeading } from "@/components/Studio";
import { Projects } from "@/components/work/Projects";
import { Contact } from "@/components/Contact";
import { pageMeta } from "@/resources/seo";
export async function generateMetadata(){return pageMeta({title:"Playground",description:"Small applications, engineering experiments, and learning projects by Saaim Abdullah.",path:"/playground"});}
export default function Playground(){return <div className="studioPage"><div className="studioContainer"><PageHeading title="Playground" note="a little curiosity goes a long way"><p>Experiments in embedded inference, compression, algorithms, and building for the web.</p></PageHeading><Projects only={["autoencoder-edge-compression","esp32-temperature-inference","interactive-portfolio","algorithms-in-python","ml-data-foundations","temporary-url-service"]}/></div><Contact/></div>;}
