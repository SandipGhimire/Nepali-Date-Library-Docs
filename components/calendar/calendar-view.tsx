"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { NepaliDate } from "nepali-date-library";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Calendar as CalendarIcon,
  Clock,
  Copy,
  Check,
  ArrowRightLeft,
  Sparkles,
  Info,
  RotateCcw,
  Landmark,
} from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";
import { cn } from "@/lib/cn";
import {
  NEPALI_MONTHS,
  WEEK_DAYS,
  toDevanagariNumerals,
  padZero,
  getTodayBS,
  getBSYearOptions,
  getBSMonthOptions,
  MIN_BS_YEAR,
  MAX_BS_YEAR,
  getFiscalYearDetails,
} from "@/components/converter/converter-utils";

interface CalendarCell {
  year: number;
  month: number; // 0-11
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  dayOfWeek: number; // 0 = Sunday ... 6 = Saturday
  isSaturday: boolean;
  isSunday: boolean;
  nepaliNumeral: string;
  adDate: Date | null;
  adDay: number | null;
  adMonthShort: string | null;
}

export function CalendarView() {
  const todayBS = useMemo(() => getTodayBS(), []);

  // Current viewed month and year
  const [viewYear, setViewYear] = useState<number>(todayBS.year);
  const [viewMonth, setViewMonth] = useState<number>(todayBS.month);

  // Selected date for the detail panel
  const [selectedDate, setSelectedDate] = useState<{
    year: number;
    month: number;
    day: number;
  }>({
    year: todayBS.year,
    month: todayBS.month,
    day: todayBS.day,
  });

  // Copied indicator state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }, []);

  // Jump to Today
  const handleJumpToday = useCallback(() => {
    setViewYear(todayBS.year);
    setViewMonth(todayBS.month);
    setSelectedDate({
      year: todayBS.year,
      month: todayBS.month,
      day: todayBS.day,
    });
  }, [todayBS]);

  // Navigate to previous month
  const handlePrevMonth = useCallback(() => {
    if (viewMonth === 0) {
      if (viewYear > MIN_BS_YEAR) {
        setViewYear((y) => y - 1);
        setViewMonth(11);
      }
    } else {
      setViewMonth((m) => m - 1);
    }
  }, [viewMonth, viewYear]);

  // Navigate to next month
  const handleNextMonth = useCallback(() => {
    if (viewMonth === 11) {
      if (viewYear < MAX_BS_YEAR) {
        setViewYear((y) => y + 1);
        setViewMonth(0);
      }
    } else {
      setViewMonth((m) => m + 1);
    }
  }, [viewMonth, viewYear]);

  // Navigate selected date by day delta (+/-1 for left/right, +/-7 for up/down)
  const handleStepDay = useCallback(
    (deltaDays: number) => {
      try {
        const cur = new NepaliDate(
          selectedDate.year,
          selectedDate.month,
          selectedDate.day
        );
        const next = cur.addDays(deltaDays);
        const nextYear = next.getYear();
        const nextMonth = next.getMonth();
        const nextDay = next.getDate();

        if (nextYear < MIN_BS_YEAR || nextYear > MAX_BS_YEAR) return;

        setSelectedDate({ year: nextYear, month: nextMonth, day: nextDay });
        if (nextYear !== viewYear || nextMonth !== viewMonth) {
          setViewYear(nextYear);
          setViewMonth(nextMonth);
        }
      } catch {
        // Out of bounds protection
      }
    },
    [selectedDate, viewYear, viewMonth]
  );

  // Keyboard navigation: Arrow keys for date selection, Ctrl/⌘ + Arrows for month/year jump
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const tag = activeEl?.tagName || "";
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        (activeEl as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      // Fast month/year switching with Ctrl / ⌘
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrevMonth();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNextMonth();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (viewYear > MIN_BS_YEAR) setViewYear((y) => y - 1);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          if (viewYear < MAX_BS_YEAR) setViewYear((y) => y + 1);
        }
        return;
      }

      // Default arrow navigation: Left/Right = -1/+1 day, Up/Down = -7/+7 days
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleStepDay(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleStepDay(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handleStepDay(-7);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleStepDay(7);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevMonth, handleNextMonth, handleStepDay, viewYear]);

  // Compute calendar grid
  const { cells, monthStats } = useMemo(() => {
    let rawCalendar;
    try {
      rawCalendar = NepaliDate.getCalendarDays(viewYear, viewMonth);
    } catch {
      rawCalendar = {
        prevRemainingDays: 0,
        prevMonth: { year: 0, month: 0, days: [] },
        currentMonth: { year: viewYear, month: viewMonth, days: [] },
        nextMonth: { year: 0, month: 0, days: [] },
        remainingDays: 0,
      };
    }

    const gridCells: CalendarCell[] = [];

    // Helper to safely construct a cell
    const createCell = (
      y: number,
      m: number,
      d: number,
      isCurrent: boolean
    ): CalendarCell => {
      let adDate: Date | null = null;
      let dayOfWeek = 0;
      try {
        const npDate = new NepaliDate(y, m, d);
        adDate = npDate.getEnglishDate();
        dayOfWeek = npDate.getDay();
      } catch {
        // Fallback calculation
        dayOfWeek = 0;
      }

      const isToday =
        todayBS.year === y && todayBS.month === m && todayBS.day === d;
      const isSelected =
        selectedDate.year === y &&
        selectedDate.month === m &&
        selectedDate.day === d;
      const isSaturday = dayOfWeek === 6;
      const isSunday = dayOfWeek === 0;

      return {
        year: y,
        month: m,
        day: d,
        isCurrentMonth: isCurrent,
        isToday,
        isSelected,
        dayOfWeek,
        isSaturday,
        isSunday,
        nepaliNumeral: toDevanagariNumerals(d),
        adDate,
        adDay: adDate ? adDate.getDate() : null,
        adMonthShort: adDate
          ? adDate.toLocaleDateString("en-US", { month: "short" })
          : null,
      };
    };

    // 1. Previous month days
    if (
      rawCalendar.prevMonth.year > 0 &&
      rawCalendar.prevMonth.days.length > 0
    ) {
      for (const d of rawCalendar.prevMonth.days) {
        gridCells.push(
          createCell(
            rawCalendar.prevMonth.year,
            rawCalendar.prevMonth.month,
            d,
            false
          )
        );
      }
    }

    // 2. Current month days
    for (const d of rawCalendar.currentMonth.days) {
      gridCells.push(createCell(viewYear, viewMonth, d, true));
    }

    // 3. Next month days
    if (
      rawCalendar.nextMonth.year > 0 &&
      rawCalendar.nextMonth.days.length > 0
    ) {
      for (const d of rawCalendar.nextMonth.days) {
        gridCells.push(
          createCell(
            rawCalendar.nextMonth.year,
            rawCalendar.nextMonth.month,
            d,
            false
          )
        );
      }
    }

    // Compute month statistics
    const currentMonthDays = rawCalendar.currentMonth.days;
    const totalDays = currentMonthDays.length;

    let firstAD: Date | null = null;
    let lastAD: Date | null = null;
    let totalSaturdays = 0;
    let totalSundays = 0;

    try {
      const firstNP = new NepaliDate(viewYear, viewMonth, 1);
      firstAD = firstNP.getEnglishDate();

      const lastNP = new NepaliDate(viewYear, viewMonth, totalDays);
      lastAD = lastNP.getEnglishDate();
    } catch {
      // Ignored
    }

    for (const cell of gridCells) {
      if (cell.isCurrentMonth) {
        if (cell.isSaturday) totalSaturdays++;
        if (cell.isSunday) totalSundays++;
      }
    }

    return {
      cells: gridCells,
      monthStats: {
        totalDays,
        totalSaturdays,
        totalSundays,
        firstAD,
        lastAD,
      },
    };
  }, [viewYear, viewMonth, todayBS, selectedDate]);

  // Selected date details
  const selectedInfo = useMemo(() => {
    try {
      const npDate = new NepaliDate(
        selectedDate.year,
        selectedDate.month,
        selectedDate.day
      );
      const adDate = npDate.getEnglishDate();
      const fiscal = getFiscalYearDetails(npDate);
      const dayOfWeek = npDate.getDay();
      const weekDayInfo = WEEK_DAYS[dayOfWeek];
      const monthInfo = NEPALI_MONTHS[selectedDate.month];
      const totalDaysInMonth = npDate.daysInMonth(
        selectedDate.year,
        selectedDate.month
      );

      return {
        npDate,
        adDate,
        fiscal,
        weekDayInfo,
        monthInfo,
        totalDaysInMonth,
        formattedBS: npDate.format("YYYY-MM-DD"),
        formattedBSDevanagari: `${weekDayInfo.np}, ${toDevanagariNumerals(selectedDate.day)} ${monthInfo.np} ${toDevanagariNumerals(selectedDate.year)}`,
        formattedBSEnglish: `${weekDayInfo.en}, ${selectedDate.day} ${monthInfo.en} ${selectedDate.year}`,
        formattedAD: adDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        formattedADISO: adDate.toISOString().split("T")[0],
      };
    } catch {
      return null;
    }
  }, [selectedDate]);

  // Current viewed month information
  const currentMonthInfo = NEPALI_MONTHS[viewMonth];
  const yearOptions = useMemo(() => getBSYearOptions(), []);
  const monthOptions = useMemo(() => getBSMonthOptions(), []);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Top Controls & Navigation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl border border-fd-border bg-fd-card/70 backdrop-blur-md shadow-xs">
        {/* Left: Month / Year Title with Devanagari prominent */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-fd-primary/10 text-fd-primary border border-fd-primary/20">
              <CalendarDays className="size-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-fd-foreground font-mono">
                  {currentMonthInfo.np} {toDevanagariNumerals(viewYear)}
                </h2>
                <span className="text-sm sm:text-base font-semibold text-fd-muted-foreground">
                  ({currentMonthInfo.en} {viewYear} BS)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-fd-muted-foreground font-medium mt-0.5">
                {monthStats.firstAD && monthStats.lastAD
                  ? `${monthStats.firstAD.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} – ${monthStats.lastAD.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} AD`
                  : `Bikram Sambat Calendar`}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Quick Controls & Selectors */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Previous Month Button */}
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={viewYear === MIN_BS_YEAR && viewMonth === 0}
            className="inline-flex size-9.5 items-center justify-center rounded-xl border border-fd-border bg-fd-secondary/60 text-fd-foreground transition-all hover:bg-fd-accent hover:border-fd-border/80 disabled:opacity-40 disabled:pointer-events-none active:scale-95"
            aria-label="Previous Month"
            title="Previous Month"
          >
            <ChevronLeft className="size-4.5" />
          </button>

          {/* Month Selector */}
          <div className="w-[145px] sm:w-[160px]">
            <CustomSelect
              value={viewMonth}
              onChange={(m) => setViewMonth(Number(m))}
              options={monthOptions}
              className="w-full"
            />
          </div>

          {/* Year Selector */}
          <div className="w-[125px] sm:w-[135px]">
            <CustomSelect
              value={viewYear}
              onChange={(y) => setViewYear(Number(y))}
              options={yearOptions}
              searchable
              searchPlaceholder="Type BS year..."
              className="w-full"
            />
          </div>

          {/* Next Month Button */}
          <button
            type="button"
            onClick={handleNextMonth}
            disabled={viewYear === MAX_BS_YEAR && viewMonth === 11}
            className="inline-flex size-9.5 items-center justify-center rounded-xl border border-fd-border bg-fd-secondary/60 text-fd-foreground transition-all hover:bg-fd-accent hover:border-fd-border/80 disabled:opacity-40 disabled:pointer-events-none active:scale-95"
            aria-label="Next Month"
            title="Next Month"
          >
            <ChevronRight className="size-4.5" />
          </button>

          {/* Jump to Today Button */}
          <button
            type="button"
            onClick={handleJumpToday}
            className="inline-flex items-center gap-1.5 h-9.5 px-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold transition-all hover:bg-emerald-500/20 hover:border-emerald-500/50 active:scale-95"
            title="Jump to current Nepali date"
          >
            <RotateCcw className="size-3.5" />
            <span>Today (आज)</span>
          </button>
        </div>
      </div>

      {/* Main Grid & Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Calendar Grid Container (8 Columns on desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-3 rounded-2xl border border-fd-border bg-fd-card/90 p-3 sm:p-5 shadow-xs backdrop-blur-md">
          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center pb-2 border-b border-fd-border/60">
            {WEEK_DAYS.map((day) => {
              const isSat = day.index === 6;
              const isSun = day.index === 0;
              const isWeekend = isSat || isSun;

              return (
                <div
                  key={day.index}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-colors",
                    isWeekend
                      ? "text-red-600 dark:text-red-400 bg-red-500/[0.08] dark:bg-red-500/[0.12] border border-red-500/20 font-bold"
                      : "text-fd-muted-foreground bg-fd-secondary/30 font-medium"
                  )}
                >
                  <span className="text-xs sm:text-sm font-bold font-mono">
                    {day.shortNp}
                  </span>
                  <span className="text-[10px] sm:text-xs opacity-80 uppercase tracking-wider font-sans">
                    {day.shortEn}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 42-Cell Monthly Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {cells.map((cell, index) => {
              const isSelected =
                selectedDate.year === cell.year &&
                selectedDate.month === cell.month &&
                selectedDate.day === cell.day;

              return (
                <button
                  key={`${cell.year}-${cell.month}-${cell.day}-${index}`}
                  type="button"
                  onClick={() => {
                    setSelectedDate({
                      year: cell.year,
                      month: cell.month,
                      day: cell.day,
                    });
                    // If clicked a day outside current month, switch view
                    if (!cell.isCurrentMonth) {
                      setViewYear(cell.year);
                      setViewMonth(cell.month);
                    }
                  }}
                  className={cn(
                    "group relative flex flex-col justify-between p-1.5 sm:p-2 min-h-[64px] sm:min-h-[80px] md:min-h-[88px] rounded-xl border text-left transition-all duration-150 select-none",
                    // Month opacity
                    !cell.isCurrentMonth && "opacity-35 hover:opacity-70 bg-fd-muted/10 border-transparent",
                    // Normal state (unselected, current month)
                    cell.isCurrentMonth &&
                      !isSelected &&
                      !cell.isToday &&
                      !(cell.isSaturday || cell.isSunday) &&
                      "bg-fd-card/90 border-fd-border/75 hover:bg-fd-accent/40 hover:border-fd-border",
                    // Weekend (Sat & Sun) normal (unselected, current month)
                    cell.isCurrentMonth &&
                      !isSelected &&
                      !cell.isToday &&
                      (cell.isSaturday || cell.isSunday) &&
                      "bg-red-500/[0.04] dark:bg-red-500/[0.07] border-red-500/25 hover:border-red-500/40 text-red-600 dark:text-red-400",
                    // Today state (unselected) -> Highlighted by Green
                    cell.isToday &&
                      !isSelected &&
                      "ring-2 ring-emerald-500/80 border-emerald-500/80 bg-emerald-500/10 dark:bg-emerald-500/15 shadow-xs",
                    // Today state (SELECTED) -> Darker Green
                    cell.isToday &&
                      isSelected &&
                      "ring-2 ring-emerald-600 dark:ring-emerald-400 border-emerald-600 dark:border-emerald-400 bg-emerald-600/25 dark:bg-emerald-500/25 shadow-sm z-10",
                    // Weekend (Sat & Sun) state (SELECTED) -> Darker Red (no orange!)
                    (cell.isSaturday || cell.isSunday) &&
                      isSelected &&
                      !cell.isToday &&
                      "ring-2 ring-red-500 dark:ring-red-400 border-red-500 dark:border-red-400 bg-red-500/20 dark:bg-red-500/30 text-red-600 dark:text-red-400 shadow-sm z-10",
                    // Weekday state (SELECTED) -> Clean darker selection (no orange!)
                    !(cell.isSaturday || cell.isSunday) &&
                      isSelected &&
                      !cell.isToday &&
                      "ring-2 ring-fd-foreground/40 border-fd-foreground/50 bg-fd-secondary/90 dark:bg-fd-secondary/80 text-fd-foreground shadow-sm z-10"
                  )}
                >
                  {/* Top Row: Left Badge (Today) & Right English AD Date Number */}
                  <div className="flex items-center justify-between w-full min-h-[18px]">
                    {/* Top Right Corner: English AD Date Number */}
                    <span
                      className={cn(
                        "text-[11px] sm:text-xs font-mono font-semibold transition-colors",
                        cell.isToday
                          ? "text-emerald-700 dark:text-emerald-300 font-bold"
                          : cell.isSaturday || cell.isSunday
                            ? "text-red-600/85 dark:text-red-400/85"
                            : "text-fd-muted-foreground/75"
                      )}
                    >
                      {cell.adDay !== null
                        ? cell.adDay === 1 && cell.adMonthShort
                          ? `${cell.adMonthShort} 1`
                          : cell.adDay
                        : ""}
                    </span>
                  </div>

                  {/* Middle Row: Large Centered Nepali Devanagari Date Number */}
                  <div className="flex flex-1 items-center justify-center my-auto py-1">
                    <span
                      className={cn(
                        "text-xl sm:text-2xl md:text-3xl font-bold font-mono tracking-tight leading-none text-center select-none",
                        cell.isToday
                          ? "text-emerald-600 dark:text-emerald-400 font-black scale-105"
                          : cell.isSaturday || cell.isSunday
                            ? "text-red-600 dark:text-red-400"
                            : "text-fd-foreground"
                      )}
                    >
                      {cell.nepaliNumeral}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Month Stats Footer Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-fd-border/60 text-xs text-fd-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="size-2 rounded-full bg-fd-muted-foreground/60" />
                <span>
                  Total Days: <strong>{monthStats.totalDays} दिन</strong>
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-medium">
                <span className="size-2 rounded-full bg-red-500" />
                <span>
                  Saturdays: <strong>{monthStats.totalSaturdays} शनिबार</strong>
                </span>
              </span>
            </div>
            <div className="text-[11.5px] font-mono flex items-center gap-2 flex-wrap">
              <span>
                <kbd className="px-1.5 py-0.5 rounded-md border bg-fd-secondary text-fd-foreground">←</kbd>{" "}
                <kbd className="px-1.5 py-0.5 rounded-md border bg-fd-secondary text-fd-foreground">→</kbd>{" "}
                <kbd className="px-1.5 py-0.5 rounded-md border bg-fd-secondary text-fd-foreground">↑</kbd>{" "}
                <kbd className="px-1.5 py-0.5 rounded-md border bg-fd-secondary text-fd-foreground">↓</kbd>{" "}
                to navigate dates
              </span>
              <span className="hidden sm:inline text-fd-muted-foreground/50">•</span>
              <span className="hidden sm:inline">
                <kbd className="px-1.5 py-0.5 rounded-md border bg-fd-secondary text-fd-foreground">Ctrl / ⌘</kbd> + <kbd className="px-1.5 py-0.5 rounded-md border bg-fd-secondary text-fd-foreground">← / →</kbd> to change months
              </span>
            </div>
          </div>
        </div>

        {/* Selected Date Inspector Card (4 Columns on desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {selectedInfo ? (
            <div className="flex flex-col gap-4 p-5 rounded-2xl border border-fd-border bg-fd-card/90 shadow-md backdrop-blur-md sticky top-24">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-fd-border/70 pb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex size-7.5 items-center justify-center rounded-lg transition-colors",
                      selectedInfo.npDate.getYear() === todayBS.year &&
                        selectedInfo.npDate.getMonth() === todayBS.month &&
                        selectedInfo.npDate.getDate() === todayBS.day
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        : selectedInfo.weekDayInfo.index === 6 || selectedInfo.weekDayInfo.index === 0
                          ? "bg-red-500/15 text-red-600 dark:text-red-400"
                          : "bg-fd-secondary text-fd-foreground"
                    )}
                  >
                    <CalendarIcon className="size-4" />
                  </div>
                  <h3 className="font-semibold text-sm text-fd-foreground">
                    Selected Date Information
                  </h3>
                </div>
              </div>

              {/* Big Devanagari Date Display */}
              <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-fd-secondary/40 border border-fd-border/60">
                <span
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-wider font-mono",
                    selectedInfo.npDate.getYear() === todayBS.year &&
                      selectedInfo.npDate.getMonth() === todayBS.month &&
                      selectedInfo.npDate.getDate() === todayBS.day
                      ? "text-emerald-600 dark:text-emerald-400"
                      : selectedInfo.weekDayInfo.index === 6 || selectedInfo.weekDayInfo.index === 0
                        ? "text-red-600 dark:text-red-400"
                        : "text-fd-muted-foreground"
                  )}
                >
                  Bikram Sambat (नेपाली मिति)
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-fd-foreground font-mono leading-tight">
                  {selectedInfo.formattedBSDevanagari}
                </span>
                <span className="text-xs font-medium text-fd-muted-foreground mt-0.5">
                  {selectedInfo.formattedBSEnglish}
                </span>
                <div className="flex items-center justify-between pt-2 mt-1 border-t border-fd-border/40">
                  <span className="font-mono text-xs font-semibold text-fd-foreground">
                    {selectedInfo.formattedBS}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedInfo.formattedBS, "bs")}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-fd-primary hover:underline"
                  >
                    {copiedKey === "bs" ? (
                      <>
                        <Check className="size-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy BS</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Gregorian (AD) Date Display */}
              <div className="flex flex-col gap-1 p-3.5 rounded-xl bg-fd-secondary/40 border border-fd-border/60">
                <span className="text-[11px] font-semibold text-fd-muted-foreground uppercase tracking-wider font-mono">
                  Gregorian Equivalent (ईस्वी सम्वत्)
                </span>
                <span className="text-lg sm:text-xl font-bold text-fd-foreground leading-tight">
                  {selectedInfo.formattedAD}
                </span>
                <div className="flex items-center justify-between pt-2 mt-1 border-t border-fd-border/40">
                  <span className="font-mono text-xs font-semibold text-fd-foreground">
                    {selectedInfo.formattedADISO}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedInfo.formattedADISO, "ad")}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-fd-primary hover:underline"
                  >
                    {copiedKey === "ad" ? (
                      <>
                        <Check className="size-3" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy AD</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Fiscal Year & Month Progress Details */}
              <div className="flex flex-col gap-2.5 text-xs text-fd-muted-foreground pt-1">
                <div className="flex items-center justify-between py-1 border-b border-fd-border/40">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Landmark className="size-3.5 text-fd-primary" />
                    <span>Nepal Fiscal Year:</span>
                  </span>
                  <span className="font-mono font-bold text-fd-foreground">
                    {selectedInfo.fiscal.fiscalYear} ({toDevanagariNumerals(selectedInfo.fiscal.fiscalYear)})
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-fd-border/40">
                  <span>Fiscal Quarter:</span>
                  <span className="font-semibold text-fd-foreground">
                    Quarter {selectedInfo.fiscal.quarter} ({selectedInfo.fiscal.quarterName})
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-fd-border/40">
                  <span>Month Progress:</span>
                  <span className="font-medium text-fd-foreground">
                    Day {selectedInfo.npDate.getDate()} of {selectedInfo.totalDaysInMonth}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span>Weekend Holiday:</span>
                  <span
                    className={cn(
                      "font-semibold",
                      selectedInfo.weekDayInfo.index === 6
                        ? "text-red-600 dark:text-red-400"
                        : selectedInfo.weekDayInfo.index === 0
                          ? "text-red-500/90 dark:text-red-400/90"
                          : "text-fd-muted-foreground"
                    )}
                  >
                    {selectedInfo.weekDayInfo.index === 6
                      ? "Yes (Saturday / शनिबार)"
                      : selectedInfo.weekDayInfo.index === 0
                        ? "Sunday (आइतबार)"
                        : "No (Working Day)"}
                  </span>
                </div>
              </div>

              {/* Action: Open in Converter */}
              <div className="pt-2 border-t border-fd-border/60">
                <Link
                  href={`/converter`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-fd-primary px-4 py-2.5 text-xs sm:text-sm font-semibold text-fd-primary-foreground shadow-xs transition-all hover:bg-fd-primary/90 active:scale-98"
                >
                  <ArrowRightLeft className="size-4" />
                  <span>Convert in Date Converter Suite</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl border border-fd-border bg-fd-card/80 text-center text-fd-muted-foreground text-sm">
              Select a date on the calendar grid to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
