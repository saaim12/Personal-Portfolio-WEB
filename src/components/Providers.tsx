"use client";

import {
  BorderStyle,
  IconProvider,
  LayoutProvider,
  NeutralColor,
  ScalingSize,
  Schemes,
  SolidStyle,
  SolidType,
  SurfaceStyle,
  ThemeProvider,
  ToastProvider,
  TransitionStyle,
} from "@once-ui-system/core";
import { style } from "../resources";
import { iconLibrary } from "../resources/icons";

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
        brand={style.brand as Schemes}
        accent={style.accent as Schemes}
        neutral={style.neutral as NeutralColor}
        solid={style.solid as SolidType}
        solidStyle={style.solidStyle as SolidStyle}
        border={style.border as BorderStyle}
        surface={style.surface as SurfaceStyle}
        transition={style.transition as TransitionStyle}
        scaling={style.scaling as ScalingSize}
      >
        <ToastProvider>
          <IconProvider icons={iconLibrary}>{children}</IconProvider>
        </ToastProvider>
      </ThemeProvider>
    </LayoutProvider>
  );
}
