import { WovenBackground } from "@/components/home/woven-background";
import { Footer } from "@/components/home/footer";
import { ConverterSuite } from "@/components/converter/converter-suite";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Converter & Nepali Tools Suite",
  description:
    "Convert seamlessly between Bikram Sambat (BS) and Gregorian (AD) dates, calculate date differences, exact age, date arithmetic, and fiscal year quarters.",
};

export default function ConverterPage() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-fd-background text-fd-foreground selection:bg-fd-primary/20">
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
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
