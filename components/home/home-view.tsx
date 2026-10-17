"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Code2,
  Copy,
  Cpu,
  Globe,
  ShieldCheck,
  Smartphone,
  Terminal,
  Zap,
  ChevronRight,
  FileCode2,
} from "lucide-react";
import { GithubStarButton } from "@/components/github-star";
import { WovenBackground } from "@/components/home/woven-background";
import { HeroVisual } from "@/components/home/hero-visual";
import { Footer } from "@/components/home/footer";
import { AdSenseBanner } from "@/components/ads/adsense-banner";
import { ADSENSE_SLOTS } from "@/lib/adsense";

const steps = [
  {
    number: "01",
    title: "Install Your Package",
    description:
      "Get started in seconds using npm for Node.js/TypeScript, pip for Python, or composer for PHP applications.",
    tag: "Package Registry",
  },
  {
    number: "02",
    title: "Parse & Convert",
    description:
      "Convert accurately between Bikram Sambat (BS) and Gregorian (AD) calendars using pre-computed historical tables.",
    tag: "Bidirectional Engine",
  },
  {
    number: "03",
    title: "Manipulate & Calculate",
    description:
      "Add or subtract days, months, and years, calculate intervals, and compute Nepali fiscal years and quarters.",
    tag: "Date Arithmetic",
  },
  {
    number: "04",
    title: "Format & Localize",
    description:
      "Render formatted date strings using intuitive tokens like YYYY-MM-DD or full Devanagari and Nepali month names.",
    tag: "Localization",
  },
];

const features = [
  {
    icon: Zap,
    title: "Verified Bikram Sambat Data",
    description:
      "Accurate date mapping from 1976 BS to 2100 BS. Built with verified month day counts, leap years, and official calendar logic.",
    highlight: "1976 - 2100 BS",
    span: "lg:col-span-2",
  },
  {
    icon: Globe,
    title: "Consistent Multi-Language API",
    description:
      "Write identical logic across NodeJS/TypeScript, Python, and PHP projects with standardized method names and return types.",
    highlight: "Universal API",
    span: "lg:col-span-1",
  },
  {
    icon: Smartphone,
    title: "Date Arithmetic & Manipulation",
    description:
      "Easily add or subtract days, months, and years with automatic edge-case handling for varying Nepali month lengths.",
    highlight: "Smart Arithmetic",
    span: "lg:col-span-1",
  },
  {
    icon: Cpu,
    title: "Nepali Fiscal Year Support",
    description:
      "Built-in logic for Government of Nepal fiscal years (Shrawan to Ashadh) and automatic quarter calculations.",
    highlight: "Fiscal Logic",
    span: "lg:col-span-1",
  },
  {
    icon: ShieldCheck,
    title: "Zero Dependencies & Lightweight",
    description:
      "Zero runtime bloat. Extremely fast execution and minimal footprint designed for high-concurrency servers and web apps.",
    highlight: "Zero Bloat",
    span: "lg:col-span-1",
  },
];

const languages = [
  { name: "TypeScript", color: "border-sky-500/30 text-sky-600 dark:text-sky-400 bg-sky-500/5" },
  { name: "Node.js", color: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5" },
  { name: "Python", color: "border-yellow-500/30 text-yellow-600 dark:text-yellow-400 bg-yellow-500/5" },
  { name: "PHP", color: "border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5" },
  { name: "Browser", color: "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5" },
];

const stats = [
  { value: "1976 – 2100 BS", label: "Supported Calendar Range" },
  { value: "AD ↔ BS", label: "Bidirectional Conversion" },
  { value: "Node, Python, PHP", label: "Multi-Language Ecosystem" },
  { value: "Fiscal Year", label: "Quarter & Fiscal Logic" },
];

const codeExamples = {
  ts: {
    filename: "index.ts",
    language: "NodeJS / TypeScript",
    code: `import { NepaliDate } from "nepali-date-library";

// 1. Current Nepali Date
const date = new NepaliDate();
console.log(date.format("YYYY-MM-DD")); // e.g. 2081-06-29

// 2. Conversion from Gregorian (AD)
const bsDate = NepaliDate.fromAD(new Date("2024-10-15"));
console.log(bsDate.format("DD MMMM YYYY")); // 29 Ashwin 2081

// 3. Date Arithmetic & Manipulation
bsDate.addDays(30);
console.log("Future date:", bsDate.format("YYYY-MM-DD"));

// 4. Fiscal Year Calculation
const fiscalYear = bsDate.getFiscalYear();
console.log("Fiscal Year:", fiscalYear); // 2081/82`,
  },
  python: {
    filename: "app.py",
    language: "Python",
    code: `from nepali_date_library import NepaliDate
from datetime import date

# 1. Current Nepali Date
today = NepaliDate()
print(today.format("YYYY-MM-DD")) # e.g. 2081-06-29

# 2. Conversion from Gregorian (AD)
bs_date = NepaliDate.from_ad(date(2024, 10, 15))
print(bs_date.format("DD MMMM YYYY")) # 29 Ashwin 2081

# 3. Date Arithmetic & Manipulation
bs_date.add_days(30)
print("Future date:", bs_date.format("YYYY-MM-DD"))

# 4. Fiscal Year Calculation
print("Fiscal Year:", bs_date.get_fiscal_year()) # 2081/82`,
  },
  php: {
    filename: "index.php",
    language: "PHP",
    code: `<?php
use NepaliDateLibrary\\NepaliDate;
use DateTime;

// 1. Current Nepali Date
$today = new NepaliDate();
echo $today->format("YYYY-MM-DD"); // e.g. 2081-06-29

// 2. Conversion from Gregorian (AD)
$bsDate = NepaliDate::fromAD(new DateTime("2024-10-15"));
echo $bsDate->format("DD MMMM YYYY"); // 29 Ashwin 2081

// 3. Date Arithmetic & Manipulation
$bsDate->addDays(30);
echo "Future date: " . $bsDate->format("YYYY-MM-DD");

// 4. Fiscal Year Calculation
echo "Fiscal Year: " . $bsDate->getFiscalYear(); // 2081/82`,
  },
};

const installOptions = {
  npm: {
    label: "npm",
    cmd: "npm install nepali-date-library",
    lines: ["npm install nepali-date-library"],
  },
  pnpm: {
    label: "pnpm",
    cmd: "pnpm add nepali-date-library",
    lines: ["pnpm add nepali-date-library"],
  },
  yarn: {
    label: "yarn",
    cmd: "yarn add nepali-date-library",
    lines: ["yarn add nepali-date-library"],
  },
  python: {
    label: "pip (Python)",
    cmd: "pip install nepali-date-library",
    lines: ["pip install nepali-date-library"],
  },
  composer: {
    label: "composer (PHP)",
    cmd: "composer require sghimire/nepali-date-library",
    lines: ["composer require sghimire/nepali-date-library"],
  },
};

export function HomeView() {
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"ts" | "python" | "php">("ts");
  const [pmTab, setPmTab] = useState<keyof typeof installOptions>("npm");

  const currentCmd = installOptions[pmTab].cmd;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="relative isolate flex min-h-screen flex-1 flex-col overflow-hidden bg-fd-background text-fd-foreground selection:bg-fd-primary/20 transition-colors duration-300 -mt-14">
      {/* Woven Background Pattern */}
      <WovenBackground />

      {/* Hero Section */}
      <section className="relative z-10 mx-auto w-full max-w-(--fd-layout-width) px-6 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
          {/* Left Column: Hero Content */}
          <div className="relative flex w-full flex-col items-start text-left md:w-[48%] lg:w-[45%] shrink-0">
            {/* Ambient center glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-28 sm:-left-40 md:-left-56 -right-8 sm:-right-16 top-1/2 -translate-y-1/2 h-[155%] -z-10 select-none
                         bg-[radial-gradient(ellipse_85%_75%_at_32%_48%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.85)_42%,rgba(255,255,255,0.4)_68%,transparent_88%)]
                         dark:bg-[radial-gradient(ellipse_85%_75%_at_32%_48%,rgba(23,23,21,0.96)_0%,rgba(23,23,21,0.85)_44%,rgba(23,23,21,0.35)_70%,transparent_90%)]
                         blur-3xl"
            />

            {/* Small Top Title */}
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest text-fd-primary">
              <span className="inline-block h-px w-6 bg-fd-primary/60" />
              <span>Nepali Date Library</span>
            </div>

            {/* Headline */}
            <h1 className="mt-2.5 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-[3.2rem] lg:text-[3.5rem] leading-[1.08] text-balance text-fd-foreground">
              Work with Bikram Sambat Dates using{" "}
              <span className="bg-gradient-to-r from-[#E1804B] via-[#C96937] to-[#AD5429] dark:from-[#F09665] dark:via-[#E1804B] dark:to-[#C96937] bg-clip-text text-transparent">
                Clean, Standardized Code
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-5 max-w-xl text-base sm:text-lg text-fd-muted-foreground leading-relaxed text-pretty">
              A comprehensive multi-language ecosystem to convert, format, validate, and manipulate Nepali (Bikram Sambat)
              dates with consistent APIs across TypeScript, Python, and PHP.
            </p>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-fd-primary px-5 py-3 text-sm font-semibold text-fd-primary-foreground shadow-md shadow-fd-primary/15 transition-all hover:bg-fd-primary/90 hover:scale-[1.01] active:scale-[0.98]"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/docs/origination"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-fd-border bg-fd-card/80 px-5 py-3 text-sm font-semibold text-fd-foreground backdrop-blur-sm transition-all hover:bg-fd-accent hover:border-fd-border/80"
              >
                <Code2 className="h-4 w-4 text-fd-muted-foreground" />
                <span>Read Documentation</span>
              </Link>

              <GithubStarButton className="px-5 py-3 text-sm" />
            </div>

            {/* Terminal Command Bar */}
            <div className="mt-10 w-full max-w-xl overflow-hidden rounded-xl border border-fd-border bg-fd-card/90 shadow-xl text-left backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-fd-border/70 bg-fd-muted/30 px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-fd-muted-foreground" />
                    <span className="font-mono text-xs text-fd-muted-foreground font-medium">Quick Install</span>
                  </div>
                  <div className="flex gap-1 border-l border-fd-border/60 pl-3 overflow-x-auto">
                    {(Object.keys(installOptions) as Array<keyof typeof installOptions>).map((pm) => (
                      <button
                        key={pm}
                        onClick={() => setPmTab(pm)}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium transition-colors ${
                          pmTab === pm
                            ? "bg-fd-primary text-fd-primary-foreground"
                            : "text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-muted/60"
                        }`}
                      >
                        {installOptions[pm].label}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-md border border-fd-border/60 bg-fd-background/80 px-2.5 py-1 text-xs font-medium text-fd-muted-foreground transition-all hover:text-fd-foreground hover:bg-fd-accent"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 font-mono text-xs sm:text-sm text-fd-foreground space-y-1.5">
                {installOptions[pmTab].lines.map((line, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-fd-primary font-bold select-none">$</span>
                    <span className="truncate">{line}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-fd-muted-foreground mr-1">
                Ecosystem:
              </span>
              {languages.map((lang) => (
                <span key={lang.name} className={`rounded-full border px-3 py-0.5 text-xs font-medium ${lang.color}`}>
                  {lang.name}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Showcase (100% Live 3D TSX Component) */}
          <div className="hidden md:flex w-full md:w-[52%] lg:w-[55%] items-center justify-end relative self-stretch overflow-visible">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Stats & Architectural Metrics */}
      <section className="relative z-10 border-y border-fd-border/60 bg-fd-card/40 backdrop-blur-xs">
        <div className="mx-auto max-w-(--fd-layout-width) px-6 py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <div className="text-lg sm:text-xl font-bold tracking-tight text-fd-foreground">{stat.value}</div>
                <div className="mt-1 text-xs font-medium text-fd-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Interactive Playground */}
      <section className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-fd-foreground">
            Unified API, Multi-Language Parity
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-fd-muted-foreground">
            Enjoy a consistent developer experience across NodeJS/TypeScript, Python, and PHP with standardized methods.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-fd-border/80 bg-[#161614] shadow-2xl">
          {/* Tab Bar Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#1C1C19] px-4 pt-2 pb-0">
            <div className="flex gap-1 overflow-x-auto">
              {(["ts", "python", "php"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === tab
                      ? "border-[#E1804B] text-[#E1804B] bg-[#161614] rounded-t-lg"
                      : "border-transparent text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <FileCode2 className="h-4 w-4" />
                  <span>{codeExamples[tab].language}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-xs font-mono text-zinc-400">
                {codeExamples[activeTab].filename}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white px-2.5 py-1 text-xs font-mono transition-colors active:scale-95"
                title="Copy snippet"
              >
                {codeCopied ? (
                  <>
                    <Check className="h-3 w-3 text-[#55B987]" />
                    <span className="text-[#55B987] font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Syntax Highlighted Code Viewer */}
          <div className="p-5 font-mono text-xs sm:text-[13px] leading-[1.7] overflow-x-auto text-zinc-300 text-left">
            {activeTab === "ts" && (
              <pre className="m-0 p-0">
                <code>
                  <span className="text-[#C470D7]">import</span> {"{ "}
                  <span className="text-[#E1804B] font-semibold">NepaliDate</span>
                  {" } "}
                  <span className="text-[#C470D7]">from</span>{" "}
                  <span className="text-[#55B987]">"nepali-date-library"</span>;{"\n\n"}

                  <span className="text-[#77746E] italic">// 1. Current Nepali Date</span>{"\n"}
                  <span className="text-[#C470D7]">const</span>{" "}
                  <span className="text-[#6CB6FF]">date</span> ={" "}
                  <span className="text-[#C470D7]">new</span>{" "}
                  <span className="text-[#E1804B] font-semibold">NepaliDate</span>();{"\n"}
                  console.<span className="text-[#6CB6FF]">log</span>(date.<span className="text-[#6CB6FF]">format</span>(<span className="text-[#55B987]">"YYYY-MM-DD"</span>));{" "}
                  <span className="text-[#77746E] italic">// e.g. 2081-06-29</span>{"\n\n"}

                  <span className="text-[#77746E] italic">// 2. Conversion from Gregorian (AD)</span>{"\n"}
                  <span className="text-[#C470D7]">const</span>{" "}
                  <span className="text-[#6CB6FF]">bsDate</span> ={" "}
                  <span className="text-[#E1804B] font-semibold">NepaliDate</span>.<span className="text-[#6CB6FF]">fromAD</span>(<span className="text-[#C470D7]">new</span> <span className="text-[#E1804B] font-semibold">Date</span>(<span className="text-[#55B987]">"2024-10-15"</span>));{"\n"}
                  console.<span className="text-[#6CB6FF]">log</span>(bsDate.<span className="text-[#6CB6FF]">format</span>(<span className="text-[#55B987]">"DD MMMM YYYY"</span>));{" "}
                  <span className="text-[#77746E] italic">// 29 Ashwin 2081</span>{"\n\n"}

                  <span className="text-[#77746E] italic">// 3. Date Arithmetic & Manipulation</span>{"\n"}
                  bsDate.<span className="text-[#6CB6FF]">addDays</span>(<span className="text-[#E8B65B]">30</span>);{"\n"}
                  console.<span className="text-[#6CB6FF]">log</span>(<span className="text-[#55B987]">"Future date:"</span>, bsDate.<span className="text-[#6CB6FF]">format</span>(<span className="text-[#55B987]">"YYYY-MM-DD"</span>));{"\n\n"}

                  <span className="text-[#77746E] italic">// 4. Fiscal Year Calculation</span>{"\n"}
                  <span className="text-[#C470D7]">const</span>{" "}
                  <span className="text-[#6CB6FF]">fiscalYear</span> = bsDate.<span className="text-[#6CB6FF]">getFiscalYear</span>();{"\n"}
                  console.<span className="text-[#6CB6FF]">log</span>(<span className="text-[#55B987]">"Fiscal Year:"</span>, fiscalYear);{" "}
                  <span className="text-[#77746E] italic">// 2081/82</span>
                </code>
              </pre>
            )}

            {activeTab === "python" && (
              <pre className="m-0 p-0">
                <code>
                  <span className="text-[#C470D7]">from</span> nepali_date_library{" "}
                  <span className="text-[#C470D7]">import</span>{" "}
                  <span className="text-[#E1804B] font-semibold">NepaliDate</span>{"\n"}
                  <span className="text-[#C470D7]">from</span> datetime{" "}
                  <span className="text-[#C470D7]">import</span>{" "}
                  <span className="text-[#E1804B] font-semibold">date</span>{"\n\n"}

                  <span className="text-[#77746E] italic"># 1. Current Nepali Date</span>{"\n"}
                  <span className="text-[#6CB6FF]">today</span> ={" "}
                  <span className="text-[#E1804B] font-semibold">NepaliDate</span>(){"\n"}
                  <span className="text-[#6CB6FF]">print</span>(today.<span className="text-[#6CB6FF]">format</span>(<span className="text-[#55B987]">"YYYY-MM-DD"</span>)){" "}
                  <span className="text-[#77746E] italic"># e.g. 2081-06-29</span>{"\n\n"}

                  <span className="text-[#77746E] italic"># 2. Conversion from Gregorian (AD)</span>{"\n"}
                  <span className="text-[#6CB6FF]">bs_date</span> ={" "}
                  <span className="text-[#E1804B] font-semibold">NepaliDate</span>.<span className="text-[#6CB6FF]">from_ad</span>(date(<span className="text-[#E8B65B]">2024</span>, <span className="text-[#E8B65B]">10</span>, <span className="text-[#E8B65B]">15</span>)){"\n"}
                  <span className="text-[#6CB6FF]">print</span>(bs_date.<span className="text-[#6CB6FF]">format</span>(<span className="text-[#55B987]">"DD MMMM YYYY"</span>)){" "}
                  <span className="text-[#77746E] italic"># 29 Ashwin 2081</span>{"\n\n"}

                  <span className="text-[#77746E] italic"># 3. Date Arithmetic & Manipulation</span>{"\n"}
                  bs_date.<span className="text-[#6CB6FF]">add_days</span>(<span className="text-[#E8B65B]">30</span>){"\n"}
                  <span className="text-[#6CB6FF]">print</span>(<span className="text-[#55B987]">"Future date:"</span>, bs_date.<span className="text-[#6CB6FF]">format</span>(<span className="text-[#55B987]">"YYYY-MM-DD"</span>)){"\n\n"}

                  <span className="text-[#77746E] italic"># 4. Fiscal Year Calculation</span>{"\n"}
                  <span className="text-[#6CB6FF]">print</span>(<span className="text-[#55B987]">"Fiscal Year:"</span>, bs_date.<span className="text-[#6CB6FF]">get_fiscal_year</span>()){" "}
                  <span className="text-[#77746E] italic"># 2081/82</span>
                </code>
              </pre>
            )}

            {activeTab === "php" && (
              <pre className="m-0 p-0">
                <code>
                  <span className="text-[#C470D7]">&lt;?php</span>{"\n"}
                  <span className="text-[#C470D7]">use</span> NepaliDateLibrary\
                  <span className="text-[#E1804B] font-semibold">NepaliDate</span>;{"\n\n"}

                  <span className="text-[#77746E] italic">// 1. Current Nepali Date</span>{"\n"}
                  <span className="text-[#6CB6FF]">$date</span> ={" "}
                  <span className="text-[#C470D7]">new</span>{" "}
                  <span className="text-[#E1804B] font-semibold">NepaliDate</span>();{"\n"}
                  <span className="text-[#C470D7]">echo</span> $date-&gt;<span className="text-[#6CB6FF]">format</span>(<span className="text-[#55B987]">"YYYY-MM-DD"</span>) . PHP_EOL;{" "}
                  <span className="text-[#77746E] italic">// e.g. 2081-06-29</span>{"\n\n"}

                  <span className="text-[#77746E] italic">// 2. Conversion from Gregorian (AD)</span>{"\n"}
                  <span className="text-[#6CB6FF]">$bsDate</span> ={" "}
                  <span className="text-[#E1804B] font-semibold">NepaliDate</span>::<span className="text-[#6CB6FF]">fromAD</span>(<span className="text-[#C470D7]">new</span> <span className="text-[#E1804B] font-semibold">DateTime</span>(<span className="text-[#55B987]">"2024-10-15"</span>));{"\n"}
                  <span className="text-[#C470D7]">echo</span> $bsDate-&gt;<span className="text-[#6CB6FF]">format</span>(<span className="text-[#55B987]">"DD MMMM YYYY"</span>) . PHP_EOL;{" "}
                  <span className="text-[#77746E] italic">// 29 Ashwin 2081</span>{"\n\n"}

                  <span className="text-[#77746E] italic">// 3. Date Arithmetic & Manipulation</span>{"\n"}
                  $bsDate-&gt;<span className="text-[#6CB6FF]">addDays</span>(<span className="text-[#E8B65B]">30</span>);{"\n"}
                  <span className="text-[#C470D7]">echo</span> <span className="text-[#55B987]">"Future date: "</span> . $bsDate-&gt;<span className="text-[#6CB6FF]">format</span>(<span className="text-[#55B987]">"YYYY-MM-DD"</span>);{"\n\n"}

                  <span className="text-[#77746E] italic">// 4. Fiscal Year Calculation</span>{"\n"}
                  <span className="text-[#C470D7]">echo</span> <span className="text-[#55B987]">"Fiscal Year: "</span> . $bsDate-&gt;<span className="text-[#6CB6FF]">getFiscalYear</span>();{" "}
                  <span className="text-[#77746E] italic">// 2081/82</span>
                </code>
              </pre>
            )}
          </div>
        </div>
      </section>

      {/* 4-Step Process Pipeline */}
      <section className="border-t border-fd-border bg-fd-card/20 py-16 md:py-24">
        <div className="mx-auto max-w-(--fd-layout-width) px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-fd-foreground">
              How Nepali Date Works
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-fd-muted-foreground">
              A straightforward workflow to handle Bikram Sambat calendar conversions and calculations.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group relative flex flex-col justify-between rounded-xl border border-fd-border/80 bg-fd-card/70 backdrop-blur-md p-5 shadow-xs transition-all hover:border-fd-primary/50 hover:bg-fd-card/85 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-fd-primary/10 text-xs font-bold text-fd-primary group-hover:bg-fd-primary group-hover:text-fd-primary-foreground transition-colors">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-fd-muted-foreground bg-fd-muted/60 px-2 py-0.5 rounded">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-fd-foreground">{step.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-fd-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Feature Grid */}
      <section className="mx-auto w-full max-w-(--fd-layout-width) px-6 py-16 md:py-24">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-fd-foreground">
            Engineered for Precision & Performance
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-fd-muted-foreground">
            Accurate calendar math, fiscal year modeling, and zero runtime bloat.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feat) => {
            const IconComp = feat.icon;
            return (
              <div
                key={feat.title}
                className={`group rounded-2xl border border-fd-border/80 bg-fd-card/70 backdrop-blur-md p-6 shadow-xs transition-all hover:border-fd-primary/40 hover:bg-fd-card/85 hover:shadow-md ${feat.span}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fd-primary/10 text-fd-primary group-hover:bg-fd-primary group-hover:text-fd-primary-foreground transition-colors">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-mono font-medium text-fd-muted-foreground border border-fd-border/60 bg-fd-muted/40 px-2.5 py-0.5 rounded-full">
                    {feat.highlight}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-fd-foreground">{feat.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-fd-muted-foreground leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Navigation & Documentation Cards */}
      <section className="border-t border-fd-border bg-fd-card/30 py-16 md:py-20">
        <div className="mx-auto max-w-(--fd-layout-width) px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-fd-foreground">Explore Documentation</h2>
            <p className="mt-2 text-sm text-fd-muted-foreground">
              Jump directly into the guides and API references for your language of choice.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <Link
              href="/docs/nodejs"
              className="group rounded-xl border border-fd-border/80 bg-fd-card/70 backdrop-blur-md p-6 transition-all hover:border-fd-primary/50 hover:bg-fd-card/85 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-fd-foreground group-hover:text-fd-primary">NodeJS / TypeScript</span>
                <ChevronRight className="h-4 w-4 text-fd-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-fd-primary" />
              </div>
              <p className="mt-3 text-xs sm:text-sm text-fd-muted-foreground leading-relaxed">
                Full TypeScript typings, date arithmetic, BS/AD conversions, and formatting tokens.
              </p>
            </Link>

            <Link
              href="/docs/python"
              className="group rounded-xl border border-fd-border/80 bg-fd-card/70 backdrop-blur-md p-6 transition-all hover:border-fd-primary/50 hover:bg-fd-card/85 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-fd-foreground group-hover:text-fd-primary">Python Library</span>
                <ChevronRight className="h-4 w-4 text-fd-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-fd-primary" />
              </div>
              <p className="mt-3 text-xs sm:text-sm text-fd-muted-foreground leading-relaxed">
                Pythonic Bikram Sambat package integrating seamlessly with python datetime objects.
              </p>
            </Link>

            <Link
              href="/docs/php"
              className="group rounded-xl border border-fd-border/80 bg-fd-card/70 backdrop-blur-md p-6 transition-all hover:border-fd-primary/50 hover:bg-fd-card/85 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-fd-foreground group-hover:text-fd-primary">PHP Library</span>
                <ChevronRight className="h-4 w-4 text-fd-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-fd-primary" />
              </div>
              <p className="mt-3 text-xs sm:text-sm text-fd-muted-foreground leading-relaxed">
                Composer package for PHP and Laravel backends with complete fiscal year and calendar support.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsor / Ad Banner Section */}
      <section className="mx-auto w-full max-w-4xl px-6 py-4">
        <AdSenseBanner slot={ADSENSE_SLOTS.home} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

