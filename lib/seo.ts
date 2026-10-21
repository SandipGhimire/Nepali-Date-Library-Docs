export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nepali-pkg.date";

export const SITE_NAME = "Nepali Date Library";

export const DEFAULT_TITLE =
  "Nepali Date - Bikram Sambat Library & Converter (BS to AD)";

export const DEFAULT_DESCRIPTION =
  "Universal multi-language library for Bikram Sambat (BS) Nepali dates. Bidirectional conversion (BS to AD / AD to BS), accurate calendar math, fiscal year quarter calculations, and Devanagari formatting across NodeJS, Python, and PHP.";

export const SEO_KEYWORDS = [
  // Primary Converter & Calendar Keywords
  "date converter",
  "nepali date converter",
  "bikram sambat date converter",
  "bikram sambat converter",
  "bs to ad converter",
  "ad to bs converter",
  "nepali date to english date converter",
  "english date to nepali date converter",
  "convert nepali date to english",
  "convert english date to nepali",
  "nepali date converter online",
  "free nepali date converter",
  "nepali calendar converter",
  "bs date converter",
  "ad date converter",
  "nepali miti converter",
  "bs to ad",
  "ad to bs",
  "bs date",
  "ad date",

  // Calendar & Patro Terms
  "nepali date",
  "nepali calendar",
  "bikram sambat",
  "bikram sambat calendar",
  "bs calendar",
  "nepali patro",
  "nepali patro online",
  "nepali miti",
  "today nepali date",
  "aajako nepali date",
  "aajako miti",
  "nepali date today",
  "nepali date picker",
  "bikram sambat to gregorian converter",
  "gregorian to bikram sambat converter",
  "bikram sambat calendar 1976 to 2100",

  // Multi-Language Library Keywords
  "nepali date library",
  "nepalidate",
  "nepali date npm",
  "nepali-date-library",
  "nepali date nodejs",
  "nepali date typescript",
  "nepali date javascript",
  "nepali date python",
  "nepali-date-library python",
  "nepali date pip",
  "nepali date pypi",
  "nepali date php",
  "nepali date composer",
  "sghimire nepali date library",
  "nepali date laravel",
  "nepali calendar api",
  "nepali date api",

  // Capabilities, Arithmetic & Fiscal Year
  "nepali fiscal year calculator",
  "nepal government fiscal year",
  "nepali fiscal year quarter",
  "aarthik barsha",
  "shrawan to ashadh fiscal year",
  "nepali date arithmetic",
  "add days to nepali date",
  "nepali date difference calculator",
  "nepali age calculator",
  "bikram sambat leap year",
  "devanagari date format",
  "nepali date validation",
  "nepali time and date",
];

export const AUTHOR_INFO = {
  name: "Sandip Ghimire",
  url: "https://github.com/SandipGhimire",
  twitter: "@sandipghimire",
};

/**
 * Generates JSON-LD schema for WebSite with search action
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: ["en", "ne"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/docs?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR_INFO.name,
      url: AUTHOR_INFO.url,
    },
  };
}

/**
 * Generates JSON-LD schema for SoftwareApplication / Multi-language Ecosystem
 */
export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    operatingSystem: "Cross-platform (NodeJS, Python, PHP, Browser)",
    applicationCategory: "DeveloperApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    softwareVersion: "1.1.16",
    license: "https://opensource.org/licenses/MIT",
    author: {
      "@type": "Person",
      name: AUTHOR_INFO.name,
      url: AUTHOR_INFO.url,
    },
    programmingLanguage: [
      "TypeScript",
      "JavaScript",
      "Python",
      "PHP",
    ],
  };
}

/**
 * Generates JSON-LD schema for the interactive Nepali Date Converter WebApp
 */
export function getConverterWebAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Nepali Date Converter & Bikram Sambat Tools",
    url: `${SITE_URL}/converter`,
    description:
      "Free interactive online Nepali Date Converter. Instant BS to AD and AD to BS conversion, Nepali age calculation, date arithmetic, and fiscal year quarter breakdown.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All Web Browsers",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Bikram Sambat (BS) to Gregorian (AD) Date Conversion",
      "Gregorian (AD) to Bikram Sambat (BS) Date Conversion",
      "Nepali Date Difference Calculator",
      "Exact Age Calculator in Nepali Years, Months, and Days",
      "Date Arithmetic (Add/Subtract days, months, years)",
      "Nepal Government Fiscal Year & Quarter Inspector",
    ],
  };
}

/**
 * Generates JSON-LD schema for the interactive Nepali Calendar WebApp
 */
export function getCalendarWebAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Nepali Calendar - Online Bikram Sambat (BS) Patro",
    url: `${SITE_URL}/calendar`,
    description:
      "Free interactive online Nepali Calendar (Bikram Sambat / BS Patro). View monthly calendar grid with English and Nepali dates, Saturday weekend holidays, and today highlights.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All Web Browsers",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Bikram Sambat (BS) Monthly Calendar Grid",
      "Corresponding Gregorian (AD) Date Overlay",
      "Saturday and Sunday Weekend Red Highlights",
      "Today Date Indicator in Devanagari",
      "Nepali Government Fiscal Year (Aarthik Barsha) Details",
      "Quick Navigation across 1976 to 2100 BS",
    ],
  };
}

/**
 * FAQ Schema for high-ranking AI and search snippets
 */
export function getFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList schema for documentation hierarchy
 */
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * TechArticle / API Reference schema for individual documentation pages
 */
export function getTechArticleSchema({
  title,
  description,
  url,
  language,
}: {
  title: string;
  description?: string;
  url: string;
  language?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description: description || DEFAULT_DESCRIPTION,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: AUTHOR_INFO.name,
      url: AUTHOR_INFO.url,
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR_INFO.name,
      url: AUTHOR_INFO.url,
    },
    about: {
      "@type": "SoftwareApplication",
      name: language ? `Nepali Date Library (${language})` : SITE_NAME,
    },
  };
}

