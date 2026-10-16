import Link from "next/link";
import { ArrowLeftRight, BookOpen } from "lucide-react";
import { WovenBackground } from "@/components/home/woven-background";
import { Footer } from "@/components/home/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Converter",
  description: "Interactive Bikram Sambat (BS) to Gregorian (AD) date converter.",
};

export default function ConverterPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-fd-background text-fd-foreground selection:bg-fd-primary/20">
      <main className="flex flex-1 flex-col w-full">
        {/* Top Header Banner with Woven Background Pattern */}
        <section className="relative isolate overflow-hidden border-b border-fd-border/70 text-center">
          {/* Ambient Woven Pattern confined strictly to Header Banner */}
          <WovenBackground className="h-full" />

          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-14 sm:py-20 md:py-24">
            {/* Sub Title / Eyebrow */}
            <div className="inline-flex items-center justify-center gap-2.5 font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest text-fd-primary">
              <span className="inline-block h-px w-6 sm:w-8 bg-fd-primary/60" />
              <span>Nepali Date Converter</span>
              <span className="inline-block h-px w-6 sm:w-8 bg-fd-primary/60" />
            </div>

            {/* Main Title */}
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-fd-foreground">
              Bikram Sambat Date Converter
            </h1>

            {/* Description */}
            <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-fd-muted-foreground leading-relaxed text-pretty">
              Convert seamlessly between Nepali (Bikram Sambat) and Gregorian (AD) dates.
              An interactive, bidirectional calendar converter playground is coming soon.
            </p>
          </div>
        </section>

        {/* Content Section: Plain Default Background with Converter Card */}
        <section className="relative w-full flex-1 bg-fd-background px-4 sm:px-6 py-14 sm:py-20 md:py-24">
          <div className="mx-auto w-full max-w-xl sm:max-w-2xl">
            {/* Converter Card on Clean Plain Background */}
            <div className="rounded-2xl sm:rounded-3xl border border-fd-border/80 bg-fd-card p-6 sm:p-10 shadow-lg shadow-black/5 dark:shadow-black/25">
              {/* Icon */}
              <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#E1804B]/15 text-[#E1804B] shadow-inner shadow-[#E1804B]/20">
                <ArrowLeftRight className="size-7 sm:size-8 stroke-[2.2]" />
              </div>

              {/* Title & Description */}
              <div className="mt-5 sm:mt-6 text-center">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-fd-foreground">
                  Converter Playground Under Construction
                </h2>

                <p className="mt-2.5 text-xs sm:text-sm text-fd-muted-foreground leading-relaxed max-w-md mx-auto">
                  We are actively integrating the live bidirectional converter interface. In the meantime, you can convert dates using the library directly in your code.
                </p>
              </div>

              {/* Responsive CTAs */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-fd-primary hover:bg-fd-primary/90 text-fd-primary-foreground px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-md shadow-fd-primary/20"
                >
                  <BookOpen className="size-4" />
                  <span>Explore Documentation</span>
                </Link>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-fd-border bg-fd-secondary/40 hover:bg-fd-accent px-5 py-2.5 text-xs sm:text-sm font-medium transition-colors"
                >
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
