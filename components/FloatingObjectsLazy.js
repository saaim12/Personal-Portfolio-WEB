"use client";

import dynamic from "next/dynamic";

// Lazy, client-only. The engine is heavy and purely decorative, so it never
// needs SSR and shouldn't block first paint.
export default dynamic(() => import("./FloatingObjects"), { ssr: false });
