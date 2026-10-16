"use client";

import { useState, useMemo, useEffect } from "react";
import { NepaliDate } from "nepali-date-library";
import {
  Calculator,
  Plus,
  Minus,
  Copy,
  Check,
  Clock,
} from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";
import {
  WEEK_DAYS,
  GREGORIAN_MONTHS,
  toDevanagariNumerals,
  padZero,
  getDaysInBSMonth,
  getTodayBS,
  NEPALI_MONTHS,
  getBSYearOptions,
  getBSMonthOptions,
  getBSDayOptions,
} from "./converter-utils";

export function ArithmeticTab() {
  const today = useMemo(() => getTodayBS(), []);

  // Base date
  const [baseYear, setBaseYear] = useState<number>(today.year);
  const [baseMonth, setBaseMonth] = useState<number>(today.month);
  const [baseDay, setBaseDay] = useState<number>(today.day);

  // Operation: ADD or SUBTRACT
  const [operation, setOperation] = useState<"ADD" | "SUBTRACT">("ADD");

  // Arithmetic values
  const [addYears, setAddYears] = useState<number>(0);
  const [addMonths, setAddMonths] = useState<number>(0);
  const [addDays, setAddDays] = useState<number>(30);

  // Copy state
  const [copied, setCopied] = useState(false);

  const maxBaseDays = useMemo(
    () => getDaysInBSMonth(baseYear, baseMonth),
    [baseYear, baseMonth]
  );

  // Automatically clamp baseDay when month/year changes
  useEffect(() => {
    if (baseDay > maxBaseDays) {
      setBaseDay(maxBaseDays);
    }
  }, [baseDay, maxBaseDays]);

  const validBaseDay = Math.min(baseDay, maxBaseDays);

  const yearOptions = useMemo(() => getBSYearOptions(), []);
  const monthOptions = useMemo(() => getBSMonthOptions(), []);
  const dayOptions = useMemo(() => getBSDayOptions(maxBaseDays), [maxBaseDays]);

  const { result, error } = useMemo(() => {
    try {
      const base = new NepaliDate(baseYear, baseMonth, validBaseDay);
      const sign = operation === "ADD" ? 1 : -1;

      let target = base;
      if (addYears !== 0) {
        target = target.addYears(sign * addYears);
      }
      if (addMonths !== 0) {
        target = target.addMonths(sign * addMonths);
      }
      if (addDays !== 0) {
        target = target.addDays(sign * addDays);
      }

      const dayOfWeek = WEEK_DAYS[target.getDay()];
      const monthInfo = NEPALI_MONTHS[target.getMonth()];
      const adDate = target.getEnglishDate();

      const bsFormatted = `${target.getYear()}-${padZero(target.getMonth() + 1)}-${padZero(target.getDate())}`;
      const bsDevanagari = `${toDevanagariNumerals(target.getYear())} ${monthInfo.np} ${toDevanagariNumerals(target.getDate())}, ${dayOfWeek.np}`;
      const bsEnglish = `${target.getDate()} ${monthInfo.en} ${target.getYear()}, ${dayOfWeek.en}`;

      const adFormatted = adDate.toISOString().split("T")[0];
      const adFull = `${dayOfWeek.en}, ${GREGORIAN_MONTHS[adDate.getMonth()]} ${adDate.getDate()}, ${adDate.getFullYear()}`;

      return {
        result: {
          bsFormatted,
          bsDevanagari,
          bsEnglish,
          adFormatted,
          adFull,
          dayOfWeek,
        },
        error: null,
      };
    } catch (e: any) {
      return { result: null, error: e?.message || "Calculation error" };
    }
  }, [baseYear, baseMonth, validBaseDay, operation, addYears, addMonths, addDays]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setPreset = (days: number, months: number = 0, years: number = 0) => {
    setOperation("ADD");
    setAddDays(days);
    setAddMonths(months);
    setAddYears(years);
  };

  return (
    <div className="space-y-8">
      {/* Top Grid: Starting Date & Controls */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Starting Date */}
        <div className="rounded-2xl sm:rounded-3xl border border-fd-border/80 bg-fd-card p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-fd-border/60">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary">
                <Calculator className="size-4" />
              </div>
              <h3 className="text-sm font-bold text-fd-foreground">Starting Date (BS)</h3>
            </div>
            <button
              type="button"
              onClick={() => {
                setBaseYear(today.year);
                setBaseMonth(today.month);
                setBaseDay(today.day);
              }}
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
              value={baseYear}
              onChange={(v) => setBaseYear(Number(v))}
              options={yearOptions}
              searchable={true}
              searchPlaceholder="Search year..."
            />

            {/* Month */}
            <CustomSelect
              label="Month"
              value={baseMonth}
              onChange={(v) => setBaseMonth(Number(v))}
              options={monthOptions}
            />

            {/* Day */}
            <CustomSelect
              label="Day"
              value={validBaseDay}
              onChange={(v) => setBaseDay(Number(v))}
              options={dayOptions}
            />
          </div>
        </div>

        {/* Operation & Values */}
        <div className="rounded-2xl sm:rounded-3xl border border-fd-border/80 bg-fd-card p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-fd-border/60">
            <h3 className="text-sm font-bold text-fd-foreground">Amount to Add / Subtract</h3>

            {/* Toggle Add / Subtract */}
            <div className="inline-flex rounded-lg border border-fd-border bg-fd-secondary/30 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setOperation("ADD")}
                className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-semibold transition-all ${
                  operation === "ADD"
                    ? "bg-fd-primary text-fd-primary-foreground shadow-xs"
                    : "text-fd-muted-foreground hover:text-fd-foreground"
                }`}
              >
                <Plus className="size-3" />
                <span>Add</span>
              </button>
              <button
                type="button"
                onClick={() => setOperation("SUBTRACT")}
                className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-semibold transition-all ${
                  operation === "SUBTRACT"
                    ? "bg-fd-primary text-fd-primary-foreground shadow-xs"
                    : "text-fd-muted-foreground hover:text-fd-foreground"
                }`}
              >
                <Minus className="size-3" />
                <span>Subtract</span>
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {/* Days */}
            <div>
              <label className="block text-[11px] font-medium text-fd-muted-foreground mb-1">
                Days
              </label>
              <input
                type="number"
                min="0"
                max="10000"
                value={addDays}
                onChange={(e) => setAddDays(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-fd-border bg-fd-background px-2.5 py-2 text-xs font-mono font-medium text-fd-foreground focus:outline-none focus:ring-2 focus:ring-fd-primary/40"
              />
            </div>

            {/* Months */}
            <div>
              <label className="block text-[11px] font-medium text-fd-muted-foreground mb-1">
                Months
              </label>
              <input
                type="number"
                min="0"
                max="1200"
                value={addMonths}
                onChange={(e) => setAddMonths(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-fd-border bg-fd-background px-2.5 py-2 text-xs font-mono font-medium text-fd-foreground focus:outline-none focus:ring-2 focus:ring-fd-primary/40"
              />
            </div>

            {/* Years */}
            <div>
              <label className="block text-[11px] font-medium text-fd-muted-foreground mb-1">
                Years
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={addYears}
                onChange={(e) => setAddYears(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-fd-border bg-fd-background px-2.5 py-2 text-xs font-mono font-medium text-fd-foreground focus:outline-none focus:ring-2 focus:ring-fd-primary/40"
              />
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="mt-3.5 pt-3 border-t border-fd-border/50 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setPreset(7)}
              className="rounded-lg border border-fd-border bg-fd-background px-2 py-1 text-[11px] text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent"
            >
              +7 Days
            </button>
            <button
              type="button"
              onClick={() => setPreset(30)}
              className="rounded-lg border border-fd-border bg-fd-background px-2 py-1 text-[11px] text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent"
            >
              +30 Days
            </button>
            <button
              type="button"
              onClick={() => setPreset(90)}
              className="rounded-lg border border-fd-border bg-fd-background px-2 py-1 text-[11px] text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent"
            >
              +90 Days
            </button>
            <button
              type="button"
              onClick={() => setPreset(0, 6)}
              className="rounded-lg border border-fd-border bg-fd-background px-2 py-1 text-[11px] text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent"
            >
              +6 Months
            </button>
            <button
              type="button"
              onClick={() => setPreset(0, 0, 1)}
              className="rounded-lg border border-fd-border bg-fd-background px-2 py-1 text-[11px] text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent"
            >
              +1 Year
            </button>
          </div>
        </div>
      </div>

      {/* Result Display Card */}
      {result ? (
        <div className="rounded-2xl sm:rounded-3xl border border-fd-border/80 bg-fd-card p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-fd-muted-foreground">
                Calculated Result Date (BS)
              </span>
              <div className="mt-1 text-2xl sm:text-4xl font-extrabold font-mono text-fd-foreground">
                {result.bsFormatted}
              </div>
              <div className="mt-1 text-sm font-semibold text-fd-primary">
                {result.bsEnglish}
              </div>
              <div className="text-sm font-serif text-fd-muted-foreground">
                {result.bsDevanagari}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(result.bsFormatted)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-fd-border bg-fd-secondary/30 px-3.5 py-2 text-xs font-medium text-fd-foreground transition-all hover:bg-fd-accent active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>Copy BS Date</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-fd-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-fd-muted-foreground gap-2">
            <span>
              Equivalent Gregorian (AD): <strong className="text-fd-foreground font-mono">{result.adFormatted}</strong> ({result.adFull})
            </span>
            <span className="font-medium text-fd-foreground">
              Day: {result.dayOfWeek.en} ({result.dayOfWeek.np})
            </span>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-center text-sm text-rose-500">
          {error || "Calculation error"}
        </div>
      )}
    </div>
  );
}
