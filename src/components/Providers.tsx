"use client";

import { IconProvider, LayoutProvider, ThemeProvider, ToastProvider } from "@once-ui-system/core";
import { style } from "@/resources/once-ui.config";
import { iconLibrary } from "@/resources/icons";

// DataThemeProvider used to wrap this tree as well. The site renders no
// charts, so it was client bundle with nothing behind it.
//
// ToastProvider stays: the MDX components on the case-study pages call
// useToast (the copy-to-clipboard confirmations), and removing it fails the
// prerender of /work/[slug] rather than anything at runtime.
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
          <IconProvider icons={iconLibrary}>{children}</IconProvider>
        </ToastProvider>
      </ThemeProvider>
    </LayoutProvider>
  );
}
