import type { IconType } from "react-icons";

import {
  HiArrowUpRight,
  HiOutlineLink,
  HiEnvelope,
  HiCalendarDays,
  HiOutlineCircleStack,
  HiOutlineDocument,
  HiOutlineExclamationTriangle,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineMagnifyingGlass,
  HiOutlineRocketLaunch,
  HiOutlineArrowsPointingOut,
  HiOutlineCodeBracket,
  HiOutlineShare,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";

import { PiGridFourDuotone, PiBookBookmarkDuotone } from "react-icons/pi";

import { FaGithub, FaLinkedin, FaWhatsapp, FaMedium, FaUpwork } from "react-icons/fa6";

/**
 * Icons this site actually references by name, and nothing else.
 *
 * This map is merged over Once UI's own defaults by `IconProvider`, so a name
 * used only inside a Once UI component (chevronRight, arrowRight, check …)
 * needs no entry here, it already resolves. Twenty-two entries for platforms
 * the site does not link to (Discord, X, Threads, Instagram, Facebook,
 * Pinterest, Reddit, Telegram, Supabase, Figma …) were removed for that
 * reason: nothing referenced them, and Once UI does not need them.
 *
 * Brand marks for *technologies* are not here. Those live in
 * `resources/tech.tsx`, keyed by canonical technology name.
 */
export const iconLibrary: Record<string, IconType> = {
  arrowUpRight: HiArrowUpRight,
  email: HiEnvelope,
  globe: HiOutlineGlobeAsiaAustralia,
  grid: PiGridFourDuotone,
  book: PiBookBookmarkDuotone,
  openLink: HiOutlineLink,
  calendar: HiCalendarDays,
  github: FaGithub,
  linkedin: FaLinkedin,
  medium: FaMedium,
  upwork: FaUpwork,
  document: HiOutlineDocument,
  rocket: HiOutlineRocketLaunch,
  whatsapp: FaWhatsapp,
  // Used by the "How I work" cards on the home page.
  warning: HiOutlineExclamationTriangle,
  database: HiOutlineCircleStack,
  search: HiOutlineMagnifyingGlass,
  scale: HiOutlineArrowsPointingOut,
  // Used by the "Algorithms in the open" cards on the home page.
  code: HiOutlineCodeBracket,
  graph: HiOutlineShare,
  stack: HiOutlineSquare3Stack3D,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
