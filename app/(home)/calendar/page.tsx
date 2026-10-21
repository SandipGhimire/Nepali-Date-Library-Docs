import { WovenBackground } from "@/components/home/woven-background";
import { Footer } from "@/components/home/footer";
import { CalendarView } from "@/components/calendar/calendar-view";
import { AdSenseBanner } from "@/components/ads/adsense-banner";
import type { Metadata } from "next";
import {
  SITE_URL,
  SITE_NAME,
  getCalendarWebAppSchema,
  getFAQSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Nepali Calendar (Patro) - Online Bikram Sambat & AD Calendar",
  },
  description:
    "Free interactive online Nepali Calendar (Bikram Sambat / BS Patro). Clean monthly grid with dual Nepali and English dates, red Saturday & Sunday weekend highlights, and today date indicator.",
  keywords: [
    "nepali calendar",
    "nepali calendar online",
    "nepali patro",
    "bikram sambat calendar",
    "bs calendar",
    "nepali date calendar",
    "today nepali calendar",
    "aajako nepali date",
    "nepali calendar with english dates",
    "nepali patro online",
    "bikram sambat patro",
    "nepali calendar 2081",
    "nepali calendar 2082",
    "nepali calendar 2083",
    "nepali calendar 2084",
    "nepali calendar saturday holiday",
  ],
  alternates: {
    canonical: `${SITE_URL}/calendar`,
  },
  openGraph: {
    type: "website",
    title: "Nepali Calendar (Patro) - Online Bikram Sambat & AD Calendar",
    description:
      "Interactive Bikram Sambat (BS) monthly calendar grid. Features dual Nepali & English dates, red weekend highlights for Saturday and Sunday, and instant date details.",
    url: `${SITE_URL}/calendar`,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/Logo/Dark/Logo.png`,
        width: 1200,
        height: 630,
        alt: "Nepali Calendar - Bikram Sambat Patro Suite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nepali Calendar (Bikram Sambat Patro) | Online BS & AD Calendar",
    description:
      "Clean interactive Bikram Sambat (BS) monthly calendar with dual Nepali and English dates, red weekend highlights, and fiscal year details.",
    images: [`${SITE_URL}/Logo/Dark/Logo.png`],
  },
};

const calendarFAQs = [
  {
    question: "What is the Nepali Calendar (Bikram Sambat)?",
    answer:
      "The Nepali Calendar is based on the Bikram Sambat (BS) solar sidereal calendar system, which is the official national calendar of Nepal. It is approximately 56.7 years ahead of the Western Gregorian (AD) calendar.",
  },
  {
    question: "Why are Saturdays and Sundays highlighted in red on this calendar?",
    answer:
      "In Nepal, Saturday (शनिबार) is the official weekly public holiday (weekend), traditionally marked in vibrant red across all official Nepali Patro publications. Sundays are also accented in red for international weekend clarity.",
  },
  {
    question: "How do I see both Nepali and English (Gregorian) dates?",
    answer:
      "Each cell displays the primary Nepali Bikram Sambat date in prominent Devanagari numerals along with Western digits, accompanied by the corresponding Gregorian (AD) date at the bottom of the cell.",
  },
  {
    question: "Can I jump to any year or month?",
    answer:
      "Yes. Use the Year and Month dropdown menus at the top of the calendar to navigate any year between 1976 BS and 2100 BS. Click 'Today (आज)' anytime to instantly return to today's date.",
  },
  {
    question: "How can I convert a calendar date to English (AD)?",
    answer:
      "Click on any day cell in the calendar grid. The details panel will instantly show the full Bikram Sambat and Gregorian equivalents with one-click copy buttons and a direct link to the Date Converter suite.",
  },
];

export default function CalendarPage() {
  const webAppSchema = getCalendarWebAppSchema();
  const faqSchema = getFAQSchema(calendarFAQs);

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-fd-background text-fd-foreground selection:bg-fd-primary/20">
      {/* Schema.org WebApplication & FAQ Structured Data */}
      <script
        id="calendar-webapp-schema"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        id="calendar-faq-schema"
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="flex flex-1 flex-col w-full">
        {/* Top Header Banner with Woven Background Pattern */}
        <section className="relative isolate overflow-hidden border-b border-fd-border/70 text-center">
          <WovenBackground className="h-full" />

          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
            {/* Sub Title / Eyebrow */}
            <div className="inline-flex items-center justify-center gap-2.5 font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest text-fd-primary">
              <span className="inline-block h-px w-6 sm:w-8 bg-fd-primary/60" />
              <span>Bikram Sambat Patro</span>
              <span className="inline-block h-px w-6 sm:w-8 bg-fd-primary/60" />
            </div>

            {/* Main Title */}
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-fd-foreground">
              Nepali Calendar
            </h1>

            {/* Description */}
            <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-fd-muted-foreground leading-relaxed text-pretty">
              Explore the monthly Bikram Sambat (BS) calendar with dual Nepali and English dates, red weekend highlights for Saturday & Sunday, and instant date details.
            </p>
          </div>
        </section>

        {/* Content Section: Plain Default Background with Calendar Grid */}
        <section className="relative w-full flex-1 bg-fd-background px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <div className="mx-auto w-full max-w-5xl">
            <CalendarView />
            <AdSenseBanner className="mt-12" />
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}

