import {
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
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

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
  label: NextFontWithVariable;
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

/**
 * Top-level config types for once-ui.config.ts
 *
 * DisplayConfig, EffectsConfig and DataStyleConfig used to live here for the
 * template's location/time/theme toggles, its five-layer <Background>, and its
 * chart theme. None of the three had a consumer left.
 */
export type OnceUIConfig = {
  routes: RoutesConfig;
  baseURL: string;
  fonts: FontsConfig;
  style: StyleConfig;
};
