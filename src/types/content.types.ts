import { IconName } from "@/resources/icons";
import type { TechKey } from "@/resources/tech";
import { zones } from "tzdata";

/**
 * IANA time zone string (e.g., 'Asia/Calcutta', 'Europe/Vienna').
 * See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export type IANATimeZone = Extract<keyof typeof zones, string>; // Narrow to string keys for React usage

/**
 * Represents a person featured in the portfolio.
 */
export type Person = {
  /** First name of the person */
  firstName: string;
  /** Last name of the person */
  lastName: string;
  /** The name you want to display, allows variations like nicknames */
  name: string;
  /** Role or job title */
  role: string;
  /** Path to avatar image */
  avatar: string;
  /** Email address */
  email: string;
  /** IANA time zone location (used for the live clock) */
  location: IANATimeZone;
  /** Human-friendly city shown in the UI, e.g. 'Lahore, Pakistan' */
  city?: string;
  /** Languages spoken */
  languages?: string[];
  /**
   * BCP 47 language tag for the HTML lang attribute (e.g., 'en', 'ja', 'zh-TW').
   * Defaults to 'en' if not set.
   * See: https://www.iana.org/assignments/language-subtag-registry
   */
  locale?: string;
};

/**
 * Social link configuration.
 */
export type Social = Array<{
  /** Name of the social platform */
  name: string;
  /** Icon for the social platform
   * The icons are a part of "src/resources/icons.ts" file.
   * If you need a different icon, import it there and reference it everywhere else
   */
  icon: IconName;
  /**
   * The link to the social platform
   *
   * The link is not validated by code, make sure it's correct
   */
  link: string;
  /** Whether this social link is essential and should be displayed on the about page */
  essential?: boolean;
}>;

/**
 * Base interface for page configuration with common properties.
 */
export interface BasePageConfig {
  /** Path to the page
   *
   * The path should be relative to the public directory
   */
  path: `/${string}` | string;
  /** Label for navigation or display */
  label: string;
  /** Title of the page */
  title: string;
  /** Description for SEO and metadata */
  description: string;
  /** OG Image should be put inside `public/images` folder */
  image?: `/images/${string}` | string;
}

/**
 * Home page configuration.
 */
export interface Home extends BasePageConfig {
  /** The image to be displayed in metadata
   *
   * The image needs to be put inside `/public/images/` directory
   */
  image: `/images/${string}` | string;
  /** The headline of the home page (plain string so it can be split into words) */
  headline: string;
  /** The sub text which appears below the headline */
  subline: React.ReactNode;
  /** Booking CTA shared by the hero, the navbar and the mobile menu */
  cta: {
    label: string;
    /** External link (cal.com / wa.me / mailto) or internal path */
    href: string;
  };
  /** Proof bar shown directly under the hero (trust stage of the page flow) */
  proof: Array<{
    /** The number or short phrase, rendered large */
    value: string;
    /** What the number refers to */
    label: string;
  }>;
  /** Services block shown on the home page */
  services: {
    display: boolean;
    title: string;
    items: Array<{
      icon?: IconName;
      title: string;
      /** Plain-language line: what this is, for a non-technical reader */
      description: React.ReactNode;
    }>;
  };
  /** Client testimonial block (social-proof stage) */
  testimonial: {
    display: boolean;
    /** Who this person is, shown above the quote */
    context?: string;
    quote: string;
    author: string;
    role: string;
    /** Optional path to a signed recommendation letter (PDF) */
    letter?: string;
  };
  /** "How I work" block (process stage) */
  process: {
    display: boolean;
    title: string;
    subtitle: string;
    steps: Array<{
      /** Ordinal shown as a label, e.g. "01" */
      step: string;
      title: string;
      description: string;
    }>;
  };
  /** FAQ block (objection-handling stage). Also emitted as FAQPage schema. */
  faq: {
    display: boolean;
    title: string;
    items: Array<{ q: string; a: string }>;
  };
}

/**
 * About page configuration.
 * @description Configuration for the About page, including sections for table of contents, avatar, calendar, introduction, work experience, studies, and technical skills.
 */
export interface About extends BasePageConfig {
  /** Table of contents configuration */
  tableOfContent: {
    /** Whether to display the table of contents */
    display: boolean;
    /** Whether to show sub-items in the table of contents */
    subItems: boolean;
  };
  /** Avatar section configuration */
  avatar: {
    /** Whether to display the avatar */
    display: boolean;
  };
  /** Calendar section configuration */
  calendar: {
    /** Whether to display the calendar */
    display: boolean;
    /** Link to the calendar */
    link: string;
  };
  /** Introduction section */
  intro: {
    /** Whether to display the introduction */
    display: boolean;
    /** Title of the introduction section */
    title: string;
    /** Description of the introduction section */
    description: React.ReactNode;
  };
  /** Work experience section */
  work: {
    /** Whether to display work experience */
    display: boolean;
    /** Title for the work experience section */
    title: string;
    /** List of work experiences */
    experiences: Array<{
      /** Company name */
      company: string;
      /** Timeframe of employment */
      timeframe: string;
      /** Role or job title */
      role: string;
      /** Where the work happened. Kept separate from `role` so the two are laid
       *  out with spacing rather than joined by a "·" inside one string. */
      location?: string;
      /** Achievements at the company */
      achievements: React.ReactNode[];
      /** Images related to the experience */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
  /** Studies/education section */
  studies: {
    /** Whether to display studies section */
    display: boolean;
    /** Title for the studies section */
    title: string;
    /** List of institutions attended */
    institutions: Array<{
      /** Institution name */
      name: string;
      /** Description of studies */
      description: React.ReactNode;
    }>;
  };
  /** Technical skills section */
  technical: {
    /** Whether to display technical skills section */
    display: boolean;
    /** Title for the technical skills section */
    title: string;
    /** List of technical skills */
    skills: Array<{
      /** Skill title */
      title: string;
      /** Skill description */
      description?: React.ReactNode;
      /**
       * Canonical technology keys from `resources/tech.tsx`, rendered as
       * icon-plus-label chips. Replaced a `{ name }[]` of free-text strings,
       * which could not be given icons without duplicating a lookup table per
       * surface.
       */
      stack?: TechKey[];
      /** Images related to the skill */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
}

/**
 * Work/projects page configuration.
 * @description Configuration for the Work/Projects page, including metadata and navigation label.
 */
export interface Work extends BasePageConfig {}
