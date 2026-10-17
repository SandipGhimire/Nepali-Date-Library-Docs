import { WovenBackground } from "@/components/home/woven-background";
import { Footer } from "@/components/home/footer";
import { ConverterSuite } from "@/components/converter/converter-suite";
import { AdSenseBanner } from "@/components/ads/adsense-banner";
import { ADSENSE_SLOTS } from "@/lib/adsense";
import type { Metadata } from "next";
import {
  SITE_URL,
  SITE_NAME,
  getConverterWebAppSchema,
  getFAQSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Nepali Date Converter - BS to AD & AD to BS Online | Bikram Sambat Calendar",
  description:
    "Free online Nepali Date Converter. Instant bidirectional Bikram Sambat (BS) to Gregorian (AD) conversion, Nepali age calculation, date difference, calendar arithmetic, and Nepal fiscal year quarters.",
  keywords: [
    "nepali date converter",
    "bs to ad converter",
    "ad to bs converter",
    "bikram sambat converter",
    "nepali miti converter",
    "nepali date to english date converter",
    "english date to nepali date converter",
    "nepali calendar online",
    "today nepali date",
    "aajako nepali date",
    "nepali age calculator",
    "nepali date difference calculator",
    "nepali fiscal year calculator",
    "bikram sambat to gregorian converter",
  ],
  alternates: {
    canonical: "/converter",
  },
  openGraph: {
    type: "website",
    title: "Nepali Date Converter - BS to AD & AD to BS Online | Bikram Sambat Calendar",
    description:
      "Free interactive online Nepali Date Converter. Instant BS to AD and AD to BS conversion, Nepali age calculation, date arithmetic, and Nepal fiscal quarters.",
    url: `${SITE_URL}/converter`,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/Logo/Dark/Logo.png`,
        width: 1200,
        height: 630,
        alt: "Nepali Date Converter & Bikram Sambat Tools Suite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nepali Date Converter - BS to AD & AD to BS Online",
    description:
      "Fast, verified Bikram Sambat (BS) to Gregorian (AD) date converter, age calculator, and fiscal year suite.",
    images: [`${SITE_URL}/Logo/Dark/Logo.png`],
  },
};

const converterFAQs = [
  {
    question: "How do I convert Nepali Date (BS) to English Date (AD) online?",
    answer:
      "Select the 'Date Converter' tab above, choose 'BS to AD', pick or type the Bikram Sambat Year, Month, and Day, and the converter will instantly calculate the Gregorian (AD) date along with weekday, full month name, and Devanagari details.",
  },
  {
    question: "Can I convert English Date (AD) to Nepali Date (BS)?",
    answer:
      "Yes. Select the 'AD to BS' toggle in the Date Converter tool, input any Gregorian date from 1919 to 2044 AD, and get the accurate Bikram Sambat date immediately.",
  },
  {
    question: "How does the Nepali Age Calculator work?",
    answer:
      "The Age Calculator allows you to enter your date of birth in Bikram Sambat (BS). It calculates your precise age in years, months, and days based on the official Nepali calendar.",
  },
  {
    question: "How is the Nepali Date Difference calculated?",
    answer:
      "The Date Difference tool measures the exact elapsed time between two Nepali dates, breaking the interval down into total days, weeks, months, and years, accounting for variable month days (29-32 days).",
  },
  {
    question: "What is Nepal's Government Fiscal Year and its quarters?",
    answer:
      "The Government of Nepal's fiscal year runs from 1st Shrawan through the end of Ashadh. The Fiscal Year tab calculates the fiscal year (e.g. 2081/82) and provides dates for Q1 (Shrawan-Ashwin), Q2 (Kartik-Poush), Q3 (Magh-Chaitra), and Q4 (Baisakh-Ashadh).",
  },
];

export default function ConverterPage() {
  const webAppSchema = getConverterWebAppSchema();
  const faqSchema = getFAQSchema(converterFAQs);

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-fd-background text-fd-foreground selection:bg-fd-primary/20">
      {/* Schema.org WebApplication & FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="flex flex-1 flex-col w-full">
        {/* Top Header Banner with Woven Background Pattern */}
        <section className="relative isolate overflow-hidden border-b border-fd-border/70 text-center">
          {/* Ambient Woven Pattern confined strictly to Header Banner */}
          <WovenBackground className="h-full" />

          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
            {/* Sub Title / Eyebrow */}
            <div className="inline-flex items-center justify-center gap-2.5 font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest text-fd-primary">
              <span className="inline-block h-px w-6 sm:w-8 bg-fd-primary/60" />
              <span>Nepali Date Tools</span>
              <span className="inline-block h-px w-6 sm:w-8 bg-fd-primary/60" />
            </div>

            {/* Main Title */}
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-fd-foreground">
              Bikram Sambat Date Converter
            </h1>

            {/* Description */}
            <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-fd-muted-foreground leading-relaxed text-pretty">
              Convert between Nepali (Bikram Sambat) and Gregorian (AD) calendars, calculate exact date differences, compute age, and inspect Nepal Government fiscal quarters.
            </p>
          </div>
        </section>

        {/* Content Section: Plain Default Background with Slick Converter Suite */}
        <section className="relative w-full flex-1 bg-fd-background px-4 sm:px-6 py-10 sm:py-16 md:py-20">
          <div className="mx-auto w-full max-w-4xl lg:max-w-5xl">
            <ConverterSuite />
            <AdSenseBanner
              slot={ADSENSE_SLOTS.converter}
              className="mt-12"
            />
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
