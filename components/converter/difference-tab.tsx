"use client";

import { useState, useMemo, useEffect } from "react";
import { NepaliDate } from "nepali-date-library";
import {
  CalendarRange,
  ArrowRightLeft,
  Clock,
} from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";
import {
  padZero,
  getDaysInBSMonth,
  getTodayBS,
  calculateAgeBS,
  getBSYearOptions,
  getBSMonthOptions,
  getBSDayOptions,
} from "./converter-utils";

export function DifferenceTab() {
  const today = useMemo(() => getTodayBS(), []);

  // Date 1 (Start)
  const [d1Year, setD1Year] = useState<number>(today.year);
  const [d1Month, setD1Month] = useState<number>(today.month);
  const [d1Day, setD1Day] = useState<number>(today.day);

  // Date 2 (End) - default to 1 month ahead
  const [d2Year, setD2Year] = useState<number>(today.year);
  const [d2Month, setD2Month] = useState<number>((today.month + 1) % 12);
  const [d2Day, setD2Day] = useState<number>(Math.min(today.day, 28));

  const maxD1Days = useMemo(() => getDaysInBSMonth(d1Year, d1Month), [d1Year, d1Month]);
  const maxD2Days = useMemo(() => getDaysInBSMonth(d2Year, d2Month), [d2Year, d2Month]);

  // Automatically clamp day when month/year changes
  useEffect(() => {
    if (d1Day > maxD1Days) {
      setD1Day(maxD1Days);
    }
  }, [d1Day, maxD1Days]);

  useEffect(() => {
    if (d2Day > maxD2Days) {
      setD2Day(maxD2Days);
    }
  }, [d2Day, maxD2Days]);

  const validD1Day = Math.min(d1Day, maxD1Days);
  const validD2Day = Math.min(d2Day, maxD2Days);

  const yearOptions = useMemo(() => getBSYearOptions(), []);
  const monthOptions = useMemo(() => getBSMonthOptions(), []);
  const d1DayOptions = useMemo(() => getBSDayOptions(maxD1Days), [maxD1Days]);
  const d2DayOptions = useMemo(() => getBSDayOptions(maxD2Days), [maxD2Days]);

  const { difference, error } = useMemo(() => {
    try {
      const date1 = new NepaliDate(d1Year, d1Month, validD1Day);
      const date2 = new NepaliDate(d2Year, d2Month, validD2Day);

      const isSame = date1.diff(date2, "day") === 0;
      const isDate2Later = date2.diff(date1, "day") >= 0;

      const earlier = isDate2Later ? date1 : date2;
      const later = isDate2Later ? date2 : date1;

      const breakdown = calculateAgeBS(earlier, later);
      const totalDays = later.diff(earlier, "day");
      const weeks = Math.floor(totalDays / 7);
      const remainderDays = totalDays % 7;

      return {
        difference: {
          isSame,
          isDate2Later,
          years: breakdown.years,
          months: breakdown.months,
          days: breakdown.days,
          totalDays,
          weeks,
          remainderDays,
          totalHours: totalDays * 24,
          totalMonths: breakdown.totalMonths,
          date1Str: date1.format("YYYY-MM-DD"),
          date2Str: date2.format("YYYY-MM-DD"),
        },
        error: null,
      };
    } catch (e: any) {
      return { difference: null, error: e?.message || "Invalid dates" };
    }
  }, [d1Year, d1Month, validD1Day, d2Year, d2Month, validD2Day]);

  const handleSwap = () => {
    setD1Year(d2Year);
    setD1Month(d2Month);
    setD1Day(d2Day);
    setD2Year(d1Year);
    setD2Month(d1Month);
    setD2Day(d1Day);
  };

  const setD1Today = () => {
    setD1Year(today.year);
    setD1Month(today.month);
    setD1Day(today.day);
  };

  const setD2Today = () => {
    setD2Year(today.year);
    setD2Month(today.month);
    setD2Day(today.day);
  };

  return (
    <div className="space-y-8">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border border-fd-border/70 bg-fd-secondary/30 p-3.5 sm:p-4">
        <div className="flex items-center gap-2">
          <CalendarRange className="size-4 text-fd-primary" />
          <span className="text-xs font-semibold text-fd-foreground">
            Calculate the exact duration between two Nepali (BS) dates
          </span>
        </div>

        <button
          type="button"
          onClick={handleSwap}
          className="inline-flex items-center gap-1.5 self-end sm:self-auto rounded-xl border border-fd-border bg-fd-card px-3.5 py-2 text-xs font-semibold text-fd-foreground shadow-xs transition-all hover:bg-fd-accent active:scale-95"
        >
          <ArrowRightLeft className="size-3.5 text-fd-primary" />
          <span>Swap Date 1 & Date 2</span>
        </button>
      </div>

      {/* Date Pickers Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Date 1 Box */}
        <div className="rounded-2xl sm:rounded-3xl border border-fd-border/80 bg-fd-card p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-fd-border/60">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary font-bold text-xs">
                1
              </span>
              <h3 className="text-sm font-bold text-fd-foreground">Start Date (Date 1)</h3>
            </div>
            <button
              type="button"
              onClick={setD1Today}
              className="text-xs text-fd-primary font-medium hover:underline inline-flex items-center gap-1"
            >
              <Clock className="size-3" />
              <span>Today</span>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Year */}
            <CustomSelect
              label="Year"
              value={d1Year}
              onChange={(v) => setD1Year(Number(v))}
              options={yearOptions}
              searchable={true}
              searchPlaceholder="Search year..."
            />

            {/* Month */}
            <CustomSelect
              label="Month"
              value={d1Month}
              onChange={(v) => setD1Month(Number(v))}
              options={monthOptions}
            />

            {/* Day */}
            <CustomSelect
              label="Day"
              value={validD1Day}
              onChange={(v) => setD1Day(Number(v))}
              options={d1DayOptions}
            />
          </div>
        </div>

        {/* Date 2 Box */}
        <div className="rounded-2xl sm:rounded-3xl border border-fd-border/80 bg-fd-card p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-fd-border/60">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-[#E1804B]/15 text-[#E1804B] font-bold text-xs">
                2
              </span>
              <h3 className="text-sm font-bold text-fd-foreground">End Date (Date 2)</h3>
            </div>
            <button
              type="button"
              onClick={setD2Today}
              className="text-xs text-fd-primary font-medium hover:underline inline-flex items-center gap-1"
            >
              <Clock className="size-3" />
              <span>Today</span>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Year */}
            <CustomSelect
              label="Year"
              value={d2Year}
              onChange={(v) => setD2Year(Number(v))}
              options={yearOptions}
              searchable={true}
              searchPlaceholder="Search year..."
            />

            {/* Month */}
            <CustomSelect
              label="Month"
              value={d2Month}
              onChange={(v) => setD2Month(Number(v))}
              options={monthOptions}
            />

            {/* Day */}
            <CustomSelect
              label="Day"
              value={validD2Day}
              onChange={(v) => setD2Day(Number(v))}
              options={d2DayOptions}
            />
          </div>
        </div>
      </div>

      {/* Result Metrics */}
      {difference ? (
        <div className="rounded-2xl sm:rounded-3xl border border-fd-border/80 bg-fd-card p-6 sm:p-8 shadow-xs space-y-6">
          {/* Hero Difference Stat */}
          <div className="text-center">
            <span className="text-xs font-mono uppercase tracking-wider text-fd-muted-foreground">
              Total Duration Difference
            </span>

            {difference.isSame ? (
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-fd-foreground">
                Both dates are the same day (0 Days)
              </div>
            ) : (
              <div className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-fd-foreground flex flex-wrap items-center justify-center gap-2">
                {difference.years > 0 && (
                  <span className="text-fd-primary">
                    {difference.years}{" "}
                    <span className="text-base sm:text-xl font-normal text-fd-muted-foreground">
                      {difference.years === 1 ? "Year" : "Years"}
                    </span>
                  </span>
                )}
                {difference.months > 0 && (
                  <span>
                    {difference.months}{" "}
                    <span className="text-base sm:text-xl font-normal text-fd-muted-foreground">
                      {difference.months === 1 ? "Month" : "Months"}
                    </span>
                  </span>
                )}
                <span>
                  {difference.days}{" "}
                  <span className="text-base sm:text-xl font-normal text-fd-muted-foreground">
                    {difference.days === 1 ? "Day" : "Days"}
                  </span>
                </span>
              </div>
            )}

            <p className="mt-2 text-xs sm:text-sm text-fd-muted-foreground">
              {difference.isSame
                ? "There is no time difference between the selected dates."
                : difference.isDate2Later
                ? `Date 2 (${difference.date2Str}) is ahead of Date 1 (${difference.date1Str})`
                : `Date 2 (${difference.date2Str}) is before Date 1 (${difference.date1Str})`}
            </p>
          </div>

          {/* Secondary Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-fd-border/60">
            <div className="rounded-xl border border-fd-border/70 bg-fd-secondary/30 p-3 text-center">
              <span className="text-[11px] font-mono uppercase text-fd-muted-foreground block">
                Total Days
              </span>
              <span className="text-xl font-extrabold font-mono text-fd-foreground mt-0.5 block">
                {difference.totalDays.toLocaleString()}
              </span>
            </div>

            <div className="rounded-xl border border-fd-border/70 bg-fd-secondary/30 p-3 text-center">
              <span className="text-[11px] font-mono uppercase text-fd-muted-foreground block">
                Weeks & Days
              </span>
              <span className="text-base sm:text-lg font-bold text-fd-foreground mt-0.5 block">
                {difference.weeks}w {difference.remainderDays}d
              </span>
            </div>

            <div className="rounded-xl border border-fd-border/70 bg-fd-secondary/30 p-3 text-center">
              <span className="text-[11px] font-mono uppercase text-fd-muted-foreground block">
                Total Months
              </span>
              <span className="text-xl font-extrabold font-mono text-fd-foreground mt-0.5 block">
                ~{difference.totalMonths}
              </span>
            </div>

            <div className="rounded-xl border border-fd-border/70 bg-fd-secondary/30 p-3 text-center">
              <span className="text-[11px] font-mono uppercase text-fd-muted-foreground block">
                Total Hours
              </span>
              <span className="text-xl font-extrabold font-mono text-fd-foreground mt-0.5 block">
                {difference.totalHours.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-center text-sm text-rose-500">
          {error || "Invalid date comparison."}
        </div>
      )}
    </div>
  );
}
