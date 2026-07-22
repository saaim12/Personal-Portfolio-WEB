"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Cursor is pointer-only and non-essential — lazy, client-only.
const Cursor = dynamic(() => import("@/components/Cursor"), { ssr: false });

export default function Page() {
  // Hero words wait for the preloader to hand over.
  const [started, setStarted] = useState(false);

  return (
    <SmoothScroll>
      <Preloader onComplete={() => setStarted(true)} />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero start={started} />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
