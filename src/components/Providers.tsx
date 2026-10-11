"use client";

import { LayoutProvider, ThemeProvider, ToastProvider } from "@once-ui-system/core";
import { style } from "@/resources/once-ui.config";

// MDX heading permalinks use ToastProvider for clipboard feedback.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <ThemeProvider
        brand={style.brand}
        accent={style.accent}
        neutral={style.neutral}
        solid={style.solid}
        solidStyle={style.solidStyle}
        border={style.border}
        surface={style.surface}
        transition={style.transition}
        scaling={style.scaling}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </ThemeProvider>
    </LayoutProvider>
  );
}
