import type {
  BorderStyle,
  NeutralColor,
  ScalingSize,
  Schemes,
  SolidStyle,
  SolidType,
  SurfaceStyle,
  Theme,
  TransitionStyle,
} from "@once-ui-system/core";
import type { NextFontWithVariable } from "next/dist/compiled/@next/font";

/**
 * Route configuration for enabled/disabled routes.
 */
export type RoutesConfig = Record<`/${string}`, boolean>;

/**
 * Font configuration for each variant.
 */
export type FontsConfig = {
  heading: NextFontWithVariable;
  body: NextFontWithVariable;
  code: NextFontWithVariable;
};

/**
 * Style customization for main layout.
 */
export type StyleConfig = {
  theme: Theme;
  neutral: NeutralColor;
  brand: Schemes;
  accent: Schemes;
  solid: SolidType;
  solidStyle: SolidStyle;
  border: BorderStyle;
  surface: SurfaceStyle;
  transition: TransitionStyle;
  scaling: ScalingSize;
};

/* once-ui.config.ts exports `routes`, `baseURL`, `fonts` and `style` as four
   separate values, each already typed above, so the OnceUIConfig wrapper that
   used to sit here had no consumer. DisplayConfig, EffectsConfig and
   DataStyleConfig went the same way earlier, they typed the template's
   location/time/theme toggles, its five-layer <Background> and its chart
   theme, none of which the site still has. */
