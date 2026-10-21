import type { Metadata } from "next";
import { HomeView } from "@/components/home/home-view";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  SEO_KEYWORDS,
  getFAQSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/Logo/Dark/Logo.png`,
        width: 1200,
        height: 630,
        alt: "Nepali Date - Bikram Sambat Multi-language Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}/Logo/Dark/Logo.png`],
  },
};

const homeFAQs = [
  {
    question: "What is Nepali Date Library?",
    answer:
      "Nepali Date Library is a multi-language ecosystem (NodeJS/TypeScript, Python, and PHP) engineered for working with Nepali (Bikram Sambat / BS) dates. It provides bidirectional BS-to-AD and AD-to-BS date conversion, calendar arithmetic, Nepal Government fiscal year calculations, and localization.",
  },
  {
    question: "How do I convert Nepali Date (BS) to English Date (AD)?",
    answer:
      "In NodeJS/TypeScript use NepaliDate.fromBS(year, month, day).toAD() or NepaliDate.toAD(). In Python use NepaliDate(year, month, day).to_ad(). In PHP use (new NepaliDate(year, month, day))->toAD(). You can also use the free online converter at /converter.",
  },
  {
    question: "What date range is supported by the Nepali Date Library?",
    answer:
      "The library supports dates from 1976/01/01 BS to 2100/12/31 BS (approximately 1919 AD to 2044 AD). Dates up to the active year are verified against official Government of Nepal publications. Each year in Ashwin (Ashoj), when the Nepal Government officially releases the upcoming calendar, our mapping tables are updated and verified with exact astronomical corrections.",
  },
  {
    question: "How does Nepal Government Fiscal Year (Aarthik Barsha) calculation work?",
    answer:
      "Nepal's fiscal year runs from 1st Shrawan through the end of Ashadh of the following year. Nepali Date Library calculates the fiscal year label (e.g., 2081/82) and all quarterly breakdowns (Q1: Shrawan-Ashwin, Q2: Kartik-Poush, Q3: Magh-Chaitra, Q4: Baisakh-Ashadh) automatically.",
  },
  {
    question: "How do I install Nepali Date Library across different programming languages?",
    answer:
      "For NodeJS/TypeScript run 'npm install nepali-date-library'. For Python run 'pip install nepali-date-library'. For PHP run 'composer require sghimire/nepali-date-library'.",
  },
];

export default function HomePage() {
  const faqSchema = getFAQSchema(homeFAQs);

  return (
    <>
      <script
        id="home-faq-schema"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeView />
    </>
  );
}
