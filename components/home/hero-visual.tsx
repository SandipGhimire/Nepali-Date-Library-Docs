"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { NepaliDate, NUMBER_NP, MONTH_NP } from "nepali-date-library";
import {
  ArrowLeftRight,
  Check,
  Copy,
  RefreshCw,
} from "lucide-react";

// Short Nepali weekday headers for clean 7 equal columns
const WEEKDAYS = ["आ", "सोम", "मं", "बुध", "बिह", "शुक्र", "शनि"];

export function HeroVisual() {
  const [mounted, setMounted] = useState(false);
  const [codeTab, setCodeTab] = useState<"ts" | "python" | "php">("ts");
  const [copied, setCopied] = useState(false);

  // Mouse tilt tracking state for interactive 3D feel
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Today's date components
  const today = useMemo(() => new NepaliDate(), []);
  const initialYear = today.getYear();
  const initialMonth = today.getMonth(); // 0-indexed
  const initialDate = today.getDate();

  // Selected day state (defaults to today's date)
  const [selectedDay, setSelectedDay] = useState<number>(initialDate);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toNp = (num: number | string) =>
    String(num).replace(/\d/g, (d) => NUMBER_NP[Number(d)] || d);

  // Compute date information based on selected day
  const dateInfo = useMemo(() => {
    try {
      const active = new NepaliDate(initialYear, initialMonth, selectedDay);
      const y = active.getYear();
      const m = active.getMonth();
      const dt = active.getDate();
      const totalDays = active.daysInMonth();

      // First day of this month (0 = Sunday, 1 = Monday...)
      const firstDay = new NepaliDate(y, m, 1).getDay();

      const greg = active.getEnglishDate();
      const gregFormatted = greg.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const gregIso = greg.toISOString().split("T")[0];

      const days: { day: number; dayNp: string; isSelected: boolean }[] = [];
      for (let i = 1; i <= totalDays; i++) {
        days.push({
          day: i,
          dayNp: toNp(i),
          isSelected: i === selectedDay,
        });
      }

      return {
        bsYear: y,
        bsMonth: m,
        bsDate: dt,
        bsYearNp: toNp(y),
        bsDateNp: toNp(dt),
        monthNameNp: MONTH_NP[m] || "आश्विन",
        gregFormatted,
        gregIso,
        firstDayOffset: firstDay,
        days,
      };
    } catch {
      return {
        bsYear: 2083,
        bsMonth: 6,
        bsDate: selectedDay,
        bsYearNp: "२०८३",
        bsDateNp: toNp(selectedDay),
        monthNameNp: "कार्तिक",
        gregFormatted: "Nov 15, 2026",
        gregIso: "2026-11-15",
        firstDayOffset: 0,
        days: Array.from({ length: 30 }, (_, i) => ({
          day: i + 1,
          dayNp: toNp(i + 1),
          isSelected: i + 1 === selectedDay,
        })),
      };
    }
  }, [initialYear, initialMonth, selectedDay]);

  const snippets = {
    ts: `import { NepaliDate } from 'nepali-date-library';

const date = new NepaliDate(${dateInfo.bsYear}, ${dateInfo.bsMonth + 1}, ${dateInfo.bsDate});
console.log(date.toAD());
// ${dateInfo.gregIso}`,
    python: `from nepali_date_library import NepaliDate

date = NepaliDate(${dateInfo.bsYear}, ${dateInfo.bsMonth + 1}, ${dateInfo.bsDate})
print(date.to_ad())
# ${dateInfo.gregIso}`,
    php: `<?php
use NepaliDateLibrary\\NepaliDate;

$date = new NepaliDate(${dateInfo.bsYear}, ${dateInfo.bsMonth + 1}, ${dateInfo.bsDate});
echo $date->toAD();
// ${dateInfo.gregIso}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[codeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mouse move handler for interactive 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[580px] lg:max-w-[620px] select-none py-6 [perspective:1400px]"
    >
      {/* 
        3D PERSPECTIVE TILT:
        Left side closer/facing viewer (positive rotateY: +20deg), 
        top slightly tilted back (rotateX: +12deg), 
        counter-clockwise angle (-rotateZ: -3.5deg)
      */}
      <div
        className="relative h-[480px] w-full transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${12 + tilt.y}deg) rotateY(${20 + tilt.x}deg) rotateZ(-3.5deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Soft Ambient Radial Glow Behind Composition */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-6 top-8 h-72 w-72 rounded-full bg-[#E1804B]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-8 bottom-6 h-64 w-64 rounded-full bg-[#E1804B]/15 blur-3xl"
        />

        {/* ========================================================= */}
        {/* HOVERING BACKGROUND ORANGE FROSTED GLASS SCATTER BLOCKS   */}
        {/* ========================================================= */}
        {/* Left Shard */}
        <div
          style={{ transform: "translateZ(-40px) rotate(-10deg)" }}
          className="absolute -left-6 top-24 h-36 w-28 rounded-3xl border-2 border-[#E1804B]/40 bg-[#E1804B]/10 backdrop-blur-md shadow-lg pointer-events-none"
        >
          <div className="absolute inset-3 rounded-2xl bg-[#E1804B]/15" />
        </div>

        {/* Top Shard */}
        <div
          style={{ transform: "translateZ(-30px) rotate(8deg)" }}
          className="absolute left-64 -top-5 h-20 w-24 rounded-2xl border-2 border-[#E1804B]/35 bg-[#E1804B]/10 backdrop-blur-md shadow-md pointer-events-none"
        />

        {/* Bottom Right Shard */}
        <div
          style={{ transform: "translateZ(-20px) rotate(6deg)" }}
          className="absolute right-20 -bottom-4 h-24 w-32 rounded-3xl border-2 border-[#E1804B]/35 bg-[#E1804B]/10 backdrop-blur-md shadow-md pointer-events-none"
        />

        {/* ========================================================= */}
        {/* 1. CALENDAR CARD (Tilted Back Layer, Left)               */}
        {/* ========================================================= */}
        <div
          style={{ transform: "translateZ(0px)" }}
          className="absolute left-0 top-0 w-[325px] sm:w-[350px] rounded-3xl border border-[#E1804B]/30 dark:border-[#E1804B]/40 bg-white/95 dark:bg-[#1C1C19]/95 p-5 shadow-[0_20px_50px_rgba(225,128,75,0.18)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(225,128,75,0.15)] backdrop-blur-xl transition-all duration-300"
        >
          {/* Card Header: Uses Actual Nepali Date Logo (Left) & Today Button (Opposite Side) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl overflow-hidden p-1 shadow-xs">
                <img
                  src="/Logo/Dark/Icon.svg"
                  alt="Nepali Date Logo"
                  className="h-full w-full object-contain dark:hidden"
                />
                <img
                  src="/Logo/Light/Icon.svg"
                  alt="Nepali Date Logo"
                  className="h-full w-full object-contain hidden dark:block"
                />
              </div>
              <span className="font-bold tracking-tight text-fd-foreground text-[15px]">
                Nepali Date
              </span>
            </div>

            {/* Simple Clickable "Today" Button on the opposite side */}
            <button
              type="button"
              onClick={() => setSelectedDay(initialDate)}
              className="inline-flex items-center gap-1 rounded-lg border border-[#E1804B]/40 bg-[#E1804B]/10 hover:bg-[#E1804B]/20 text-[#E1804B] px-2.5 py-1 text-[11px] font-semibold transition-all active:scale-95"
              title="Reset to today's date"
            >
              Today
            </button>
          </div>

          {/* Converter Bar: Bikram Sambat <-> Gregorian */}
          <div className="mt-3.5 flex items-center justify-between gap-1 rounded-2xl border border-[#E5E2DC] dark:border-[#383630] bg-[#F7F7F5] dark:bg-[#252420] p-2.5">
            {/* Left Box: Bikram Sambat */}
            <div className="flex flex-col text-left pl-1">
              <span className="font-bold text-fd-foreground text-[13px] leading-tight">
                {mounted ? `${dateInfo.bsYearNp} ${dateInfo.monthNameNp} ${dateInfo.bsDateNp}` : "२०८३ आश्विन २९"}
              </span>
              <span className="text-[10px] font-medium text-fd-muted-foreground">
                (Bikram Sambat)
              </span>
            </div>

            {/* Exchange Button */}
            <div className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full bg-[#E1804B] text-white shadow-sm shadow-[#E1804B]/40">
              <ArrowLeftRight className="h-3.5 w-3.5 stroke-[2.2]" />
            </div>

            {/* Right Box: Gregorian */}
            <div className="flex flex-col text-right pr-1">
              <span className="font-bold text-fd-foreground text-[13px] leading-tight">
                {mounted ? dateInfo.gregFormatted : "Oct 15, 2026"}
              </span>
              <span className="text-[10px] font-medium text-fd-muted-foreground">
                (Gregorian)
              </span>
            </div>
          </div>

          {/* Month Calendar Section */}
          <div className="mt-4 pb-1">
            {/* Month & Year Title */}
            <div className="text-left font-bold text-fd-foreground text-[14px]">
              {mounted ? `${dateInfo.monthNameNp} ${dateInfo.bsYearNp}` : "आश्विन २०८३"}
            </div>

            {/* Weekdays Row: Equal 7 Columns */}
            <div className="mt-2.5 grid grid-cols-7 text-center font-semibold text-fd-muted-foreground text-[11.5px]">
              {WEEKDAYS.map((w) => (
                <div key={w} className="py-0.5">
                  {w}
                </div>
              ))}
            </div>

            {/* Days Grid: Interactive clickable calendar */}
            <div className="mt-1.5 grid grid-cols-7 gap-y-1 text-center text-[11.5px] font-medium">
              {/* Empty leading offsets */}
              {Array.from({ length: dateInfo.firstDayOffset }).map((_, i) => (
                <div key={`offset-${i}`} className="h-6.5 w-full" />
              ))}

              {/* Month Days */}
              {dateInfo.days.map((d) => (
                <div key={d.day} className="flex h-6.5 w-full items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setSelectedDay(d.day)}
                    className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-150 ${
                      d.isSelected
                        ? "bg-[#E1804B] font-bold text-white shadow-md shadow-[#E1804B]/50 ring-2 ring-white dark:ring-[#1C1C19] scale-110"
                        : "text-fd-muted-foreground hover:bg-[#E1804B]/15 hover:text-[#E1804B] hover:font-bold"
                    }`}
                  >
                    {d.dayNp}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. CONVERT BUTTON (Directly Above Console, Above Copy)     */}
        {/* ========================================================= */}
        <div
          style={{ transform: "translateZ(46px)" }}
          className="absolute left-[360px] sm:left-[395px] top-[156px] sm:top-[164px] flex items-center gap-2 rounded-xl border border-[#E1804B]/40 bg-white/95 dark:bg-[#20201D]/95 px-3 py-1.5 shadow-lg shadow-[#E1804B]/15 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#E1804B] cursor-pointer"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#E1804B]/15 text-[#E1804B]">
            <RefreshCw className="h-3 w-3 stroke-[2.4]" />
          </div>
          <span className="font-bold text-fd-foreground text-[11.5px] tracking-tight">Convert</span>
        </div>

        {/* ========================================================= */}
        {/* 3. CODE TERMINAL (Shifted More Right, Compact & Sleek)    */}
        {/* ========================================================= */}
        <div
          style={{ transform: "translateZ(38px)" }}
          className="absolute left-[180px] sm:left-[205px] top-[200px] sm:top-[210px] w-[275px] sm:w-[300px] rounded-2xl border border-[#E1804B]/40 bg-[#171715]/98 p-3 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_20px_rgba(225,128,75,0.18)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.01]"
        >
          {/* Titlebar: macOS Traffic Lights & Copy Button */}
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#FF5F56]" />
              <span className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
              <span className="h-2 w-2 rounded-full bg-[#27C93F]" />
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[9.5px] font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Copy snippet"
            >
              {copied ? (
                <>
                  <Check className="h-2.5 w-2.5 text-[#55B987]" />
                  <span className="text-[#55B987] font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-2.5 w-2.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Syntax Highlighted Code without Scrollbars */}
          <div className="mt-2 font-mono text-[9.5px] sm:text-[10px] leading-[1.55] text-zinc-300 overflow-hidden text-left">
            {codeTab === "ts" && (
              <pre className="m-0 p-0 overflow-hidden">
                <code>
                  <span className="text-[#C470D7]">import</span> {"{ "}
                  <span className="text-[#E1804B] font-semibold">NepaliDate</span>
                  {" } "}
                  <span className="text-[#C470D7]">from</span>{" "}
                  <span className="text-[#55B987]">'nepali-date-library'</span>;{"\n\n"}
                  <span className="text-[#C470D7]">const</span>{" "}
                  <span className="text-[#6CB6FF]">date</span> ={" "}
                  <span className="text-[#C470D7]">new</span>{" "}
                  <span className="text-[#E1804B] font-semibold">NepaliDate</span>(
                  <span className="text-[#E8B65B]">{dateInfo.bsYear}</span>,{" "}
                  <span className="text-[#E8B65B]">{dateInfo.bsMonth + 1}</span>,{" "}
                  <span className="text-[#E8B65B]">{dateInfo.bsDate}</span>
                  );{"\n"}
                  console.<span className="text-[#6CB6FF]">log</span>(date.
                  <span className="text-[#6CB6FF]">toAD</span>());{"\n"}
                  <span className="text-[#77746E]">// {dateInfo.gregIso}</span>
                </code>
              </pre>
            )}

            {codeTab === "python" && (
              <pre className="m-0 p-0 overflow-hidden">
                <code>
                  <span className="text-[#C470D7]">from</span> nepali_date_library{" "}
                  <span className="text-[#C470D7]">import</span>{" "}
                  <span className="text-[#E1804B] font-semibold">NepaliDate</span>
                  {"\n\n"}
                  <span className="text-[#6CB6FF]">date</span> ={" "}
                  <span className="text-[#E1804B] font-semibold">NepaliDate</span>(
                  <span className="text-[#E8B65B]">{dateInfo.bsYear}</span>,{" "}
                  <span className="text-[#E8B65B]">{dateInfo.bsMonth + 1}</span>,{" "}
                  <span className="text-[#E8B65B]">{dateInfo.bsDate}</span>
                  ){"\n"}
                  print(date.<span className="text-[#6CB6FF]">to_ad</span>()){"\n"}
                  <span className="text-[#77746E]"># {dateInfo.gregIso}</span>
                </code>
              </pre>
            )}

            {codeTab === "php" && (
              <pre className="m-0 p-0 overflow-hidden">
                <code>
                  <span className="text-[#C470D7]">&lt;?php</span>{"\n"}
                  <span className="text-[#C470D7]">use</span> NepaliDateLibrary\NepaliDate;
                  {"\n\n"}
                  <span className="text-[#6CB6FF]">$date</span> ={" "}
                  <span className="text-[#C470D7]">new</span>{" "}
                  <span className="text-[#E1804B] font-semibold">NepaliDate</span>(
                  <span className="text-[#E8B65B]">{dateInfo.bsYear}</span>,{" "}
                  <span className="text-[#E8B65B]">{dateInfo.bsMonth + 1}</span>,{" "}
                  <span className="text-[#E8B65B]">{dateInfo.bsDate}</span>
                  );{"\n"}
                  echo $date-&gt;<span className="text-[#6CB6FF]">toAD</span>();{"\n"}
                  <span className="text-[#77746E]">// {dateInfo.gregIso}</span>
                </code>
              </pre>
            )}
          </div>

          {/* Language Selector Pills */}
          <div className="mt-2.5 flex items-center gap-1.5 pt-1.5 border-t border-white/10">
            {/* TypeScript Tab */}
            <button
              onClick={() => setCodeTab("ts")}
              className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[9.5px] font-mono font-bold transition-all ${
                codeTab === "ts"
                  ? "bg-[#007ACC] text-white shadow-sm shadow-[#007ACC]/50"
                  : "bg-white/10 text-zinc-300 hover:bg-white/15"
              }`}
            >
              TS
            </button>

            {/* Python Tab */}
            <button
              onClick={() => setCodeTab("python")}
              className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[9.5px] font-medium transition-all ${
                codeTab === "python"
                  ? "bg-[#3776AB] text-white font-bold shadow-sm shadow-[#3776AB]/50"
                  : "bg-white/10 text-zinc-300 hover:bg-white/15"
              }`}
            >
              <span>🐍</span>
              <span>Python</span>
            </button>

            {/* PHP Tab */}
            <button
              onClick={() => setCodeTab("php")}
              className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[9.5px] font-mono font-bold transition-all ${
                codeTab === "php"
                  ? "bg-[#777BB4] text-white shadow-sm shadow-[#777BB4]/50"
                  : "bg-white/10 text-zinc-300 hover:bg-white/15"
              }`}
            >
              PHP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
