"use client";

import { useState, useMemo, useEffect } from "react";
import { NepaliDate } from "nepali-date-library";
import {
  ArrowRightLeft,
  Check,
  Copy,
  Clock,
} from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";
import {
  NEPALI_MONTHS,
  GREGORIAN_MONTHS,
  WEEK_DAYS,
  toDevanagariNumerals,
  padZero,
  getDaysInBSMonth,
  getDaysInADMonth,
  getTodayBS,
  getTodayAD,
  getFiscalYearDetails,
  getBSYearOptions,
  getBSMonthOptions,
  getBSDayOptions,
  getADYearOptions,
  getADMonthOptions,
  getADDayOptions,
} from "./converter-utils";

export function ConvertTab() {
  const [mode, setMode] = useState<"BS_TO_AD" | "AD_TO_BS">("BS_TO_AD");

  // BS state (defaults to today)
  const todayBS = useMemo(() => getTodayBS(), []);
  const [bsYear, setBsYear] = useState<number>(todayBS.year);
  const [bsMonth, setBsMonth] = useState<number>(todayBS.month);
  const [bsDay, setBsDay] = useState<number>(todayBS.day);

  // AD state (defaults to today)
  const todayAD = useMemo(() => getTodayAD(), []);
  const [adYear, setAdYear] = useState<number>(todayAD.year);
  const [adMonth, setAdMonth] = useState<number>(todayAD.month);
  const [adDay, setAdDay] = useState<number>(todayAD.day);

  // Copy state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Max days in the current selected BS month
  const maxBSDays = useMemo(() => {
    return getDaysInBSMonth(bsYear, bsMonth);
  }, [bsYear, bsMonth]);

  // Max days in the current selected AD month
  const maxADDays = useMemo(() => {
    return getDaysInADMonth(adYear, adMonth);
  }, [adYear, adMonth]);

  // Automatically clamp BS day when month/year changes
  useEffect(() => {
    if (bsDay > maxBSDays) {
      setBsDay(maxBSDays);
    }
  }, [bsDay, maxBSDays]);

  // Automatically clamp AD day when month/year changes
  useEffect(() => {
    if (adDay > maxADDays) {
      setAdDay(maxADDays);
    }
  }, [adDay, maxADDays]);

  // Adjust day values safely
  const validBsDay = Math.min(bsDay, maxBSDays);
  const validAdDay = Math.min(adDay, maxADDays);

  // Option lists dynamically generated based on current Year & Month
  const bsYearOptions = useMemo(() => getBSYearOptions(), []);
  const bsMonthOptions = useMemo(() => getBSMonthOptions(), []);
  const bsDayOptions = useMemo(() => getBSDayOptions(maxBSDays), [maxBSDays]);

  const adYearOptions = useMemo(() => getADYearOptions(), []);
  const adMonthOptions = useMemo(() => getADMonthOptions(), []);
  const adDayOptions = useMemo(() => getADDayOptions(maxADDays), [maxADDays]);

  // Computed results based on current mode
  const { result, error } = useMemo(() => {
    try {
      if (mode === "BS_TO_AD") {
        const bsDate = new NepaliDate(bsYear, bsMonth, validBsDay);
        const adDate = bsDate.getEnglishDate();
        const fy = getFiscalYearDetails(bsDate);
        const dayOfWeek = WEEK_DAYS[bsDate.getDay()];
        const monthInfo = NEPALI_MONTHS[bsMonth];

        const bsFormatted = `${bsYear}-${padZero(bsMonth + 1)}-${padZero(validBsDay)}`;
        const bsDevanagari = `${toDevanagariNumerals(bsYear)} ${monthInfo.np} ${toDevanagariNumerals(validBsDay)}, ${dayOfWeek.np}`;
        const bsEnglish = `${validBsDay} ${monthInfo.en} ${bsYear}, ${dayOfWeek.en}`;

        const adYearVal = adDate.getFullYear();
        const adMonthVal = adDate.getMonth();
        const adDayVal = adDate.getDate();
        const adFormatted = `${adYearVal}-${padZero(adMonthVal + 1)}-${padZero(adDayVal)}`;
        const adFull = `${dayOfWeek.en}, ${GREGORIAN_MONTHS[adMonthVal]} ${adDayVal}, ${adYearVal}`;

        return {
          result: {
            outputDateStr: adFormatted,
            outputDisplay: adFull,
            outputDevanagari: "",
            meta: {
              dayOfWeek,
              fiscalYear: fy.fiscalYear,
              fiscalYearNp: fy.fiscalYearNp,
              quarter: fy.quarterName,
              isLeapYear: bsDate.isLeapYear(),
              monthDays: maxBSDays,
            },
          },
          error: null,
        };
      } else {
        // AD to BS
        const jsDate = new Date(adYear, adMonth, validAdDay);
        const bsDate = new NepaliDate(jsDate);
        const fy = getFiscalYearDetails(bsDate);
        const dayOfWeek = WEEK_DAYS[bsDate.getDay()];
        const monthInfo = NEPALI_MONTHS[bsDate.getMonth()];
        const bsDayVal = bsDate.getDate();
        const bsMonthVal = bsDate.getMonth();
        const bsYearVal = bsDate.getYear();

        const bsFormatted = `${bsYearVal}-${padZero(bsMonthVal + 1)}-${padZero(bsDayVal)}`;
        const bsDevanagari = `${toDevanagariNumerals(bsYearVal)} ${monthInfo.np} ${toDevanagariNumerals(bsDayVal)}, ${dayOfWeek.np}`;
        const bsEnglish = `${bsDayVal} ${monthInfo.en} ${bsYearVal}, ${dayOfWeek.en}`;

        return {
          result: {
            outputDateStr: bsFormatted,
            outputDisplay: bsEnglish,
            outputDevanagari: bsDevanagari,
            meta: {
              dayOfWeek,
              fiscalYear: fy.fiscalYear,
              fiscalYearNp: fy.fiscalYearNp,
              quarter: fy.quarterName,
              isLeapYear: bsDate.isLeapYear(),
              monthDays: getDaysInBSMonth(bsYearVal, bsMonthVal),
            },
          },
          error: null,
        };
      }
    } catch (err: any) {
      return {
        result: null,
        error: err?.message || "Invalid date provided.",
      };
    }
  }, [mode, bsYear, bsMonth, validBsDay, adYear, adMonth, adDay, maxBSDays]);

  const handleSetToday = () => {
    if (mode === "BS_TO_AD") {
      const today = getTodayBS();
      setBsYear(today.year);
      setBsMonth(today.month);
      setBsDay(today.day);
    } else {
      const today = getTodayAD();
      setAdYear(today.year);
      setAdMonth(today.month);
      setAdDay(today.day);
    }
  };

  const handleSwapMode = () => {
    if (mode === "BS_TO_AD" && result) {
      const parts = result.outputDateStr.split("-").map(Number);
      setAdYear(parts[0]);
      setAdMonth(parts[1] - 1);
      setAdDay(parts[2]);
      setMode("AD_TO_BS");
    } else if (mode === "AD_TO_BS" && result) {
      const parts = result.outputDateStr.split("-").map(Number);
      setBsYear(parts[0]);
      setBsMonth(parts[1] - 1);
      setBsDay(parts[2]);
      setMode("BS_TO_AD");
    } else {
      setMode((prev) => (prev === "BS_TO_AD" ? "AD_TO_BS" : "BS_TO_AD"));
    }
  };

  return (
    <div className="space-y-8">
      {/* Direction & Mode Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border border-fd-border/70 bg-fd-secondary/30 p-3.5 sm:p-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium uppercase tracking-wider text-fd-muted-foreground">
            Conversion Direction:
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-fd-primary/10 px-2.5 py-1 text-xs font-semibold text-fd-primary">
            {mode === "BS_TO_AD" ? "Bikram Sambat (BS) → Gregorian (AD)" : "Gregorian (AD) → Bikram Sambat (BS)"}
          </span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={handleSwapMode}
            className="inline-flex items-center gap-1.5 rounded-xl border border-fd-border bg-fd-card px-3.5 py-2 text-xs font-semibold text-fd-foreground shadow-xs transition-all hover:bg-fd-accent hover:border-fd-primary/50 active:scale-95"
            title="Swap conversion direction"
          >
            <ArrowRightLeft className="size-3.5 text-fd-primary" />
            <span>Swap Direction</span>
          </button>

          <button
            type="button"
            onClick={handleSetToday}
            className="inline-flex items-center gap-1.5 rounded-xl border border-fd-border bg-fd-card px-3 py-2 text-xs font-medium text-fd-muted-foreground transition-all hover:text-fd-foreground hover:bg-fd-accent active:scale-95"
          >
            <Clock className="size-3.5" />
            <span>Today</span>
          </button>
        </div>
      </div>

      {/* Main Conversion Grid */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Input Column */}
        <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-fd-border/80 bg-fd-card p-5 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-fd-border/60">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary font-bold text-xs">
                IN
              </div>
              <div>
                <h3 className="text-sm font-bold text-fd-foreground">
                  {mode === "BS_TO_AD" ? "Nepali Date (Bikram Sambat)" : "English Date (Gregorian)"}
                </h3>
                <p className="text-[11px] text-fd-muted-foreground">Select year, month, and day</p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-fd-primary bg-fd-primary/10 px-2.5 py-1 rounded-md">
              {mode === "BS_TO_AD" ? "BS" : "AD"}
            </span>
          </div>

          {/* Form Controls with CustomSelect */}
          {mode === "BS_TO_AD" ? (
            <div className="mt-6 space-y-4">
              {/* Year & Month Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Custom Year Select with Search */}
                <div>
                  <CustomSelect
                    label="Year (वर्ष)"
                    value={bsYear}
                    onChange={(val) => setBsYear(Number(val))}
                    options={bsYearOptions}
                    searchable={true}
                    searchPlaceholder="Search year (e.g. 2081)..."
                  />
                </div>

                {/* Custom Month Select */}
                <div>
                  <CustomSelect
                    label="Month (महिना)"
                    value={bsMonth}
                    onChange={(val) => setBsMonth(Number(val))}
                    options={bsMonthOptions}
                  />
                </div>
              </div>

              {/* Custom Day Select */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-fd-muted-foreground">
                    Day (गते)
                  </span>
                  <span className="text-[11px] text-fd-muted-foreground font-mono">
                    Max: {maxBSDays} days
                  </span>
                </div>
                <CustomSelect
                  value={validBsDay}
                  onChange={(val) => setBsDay(Number(val))}
                  options={bsDayOptions}
                />
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {/* Year & Month Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Custom AD Year */}
                <div>
                  <CustomSelect
                    label="Year (AD)"
                    value={adYear}
                    onChange={(val) => setAdYear(Number(val))}
                    options={adYearOptions}
                    searchable={true}
                    searchPlaceholder="Search year (e.g. 2024)..."
                  />
                </div>

                {/* Custom AD Month */}
                <div>
                  <CustomSelect
                    label="Month (AD)"
                    value={adMonth}
                    onChange={(val) => setAdMonth(Number(val))}
                    options={adMonthOptions}
                  />
                </div>
              </div>

              {/* Custom AD Day */}
              <div>
                <CustomSelect
                  label="Day (AD)"
                  value={validAdDay}
                  onChange={(val) => setAdDay(Number(val))}
                  options={adDayOptions}
                />
              </div>

              {/* Native Date Picker Helper */}
              <div className="pt-2">
                <label className="block text-[11px] font-medium text-fd-muted-foreground mb-1">
                  Or pick from native calendar:
                </label>
                <input
                  type="date"
                  min="1920-04-14"
                  max="2044-04-12"
                  value={`${adYear}-${padZero(adMonth + 1)}-${padZero(adDay)}`}
                  onChange={(e) => {
                    if (e.target.value) {
                      const parts = e.target.value.split("-").map(Number);
                      setAdYear(parts[0]);
                      setAdMonth(parts[1] - 1);
                      setAdDay(parts[2]);
                    }
                  }}
                  className="w-full rounded-xl border border-fd-border bg-fd-background px-3 py-2 text-xs font-mono text-fd-foreground focus:outline-none focus:ring-2 focus:ring-fd-primary/40 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Output Column */}
        <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl border border-fd-border/80 bg-fd-card p-5 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-fd-border/60">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#E1804B]/15 text-[#E1804B] font-bold text-xs">
                OUT
              </div>
              <div>
                <h3 className="text-sm font-bold text-fd-foreground">
                  {mode === "BS_TO_AD" ? "Converted English Date (Gregorian)" : "Converted Nepali Date (Bikram Sambat)"}
                </h3>
                <p className="text-[11px] text-fd-muted-foreground">Standardized conversion result</p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-[#E1804B] bg-[#E1804B]/10 px-2.5 py-1 rounded-md">
              {mode === "BS_TO_AD" ? "AD Result" : "BS Result"}
            </span>
          </div>

          {result ? (
            <div className="mt-6 space-y-5">
              {/* Primary Converted Result Card */}
              <div className="relative rounded-2xl border border-[#E1804B]/30 bg-[#E1804B]/5 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-fd-muted-foreground">
                      Standard ISO Format
                    </span>
                    <div className="mt-0.5 text-2xl sm:text-3xl font-extrabold tracking-tight font-mono text-fd-foreground">
                      {result.outputDateStr}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(result.outputDateStr, "iso")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-fd-border bg-fd-card px-2.5 py-1.5 text-xs font-medium text-fd-muted-foreground transition-all hover:text-fd-foreground hover:bg-fd-accent active:scale-95"
                    title="Copy ISO date"
                  >
                    {copiedKey === "iso" ? (
                      <>
                        <Check className="size-3.5 text-emerald-500" />
                        <span className="text-emerald-500 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Formatted Textual */}
                <div className="mt-4 pt-3 border-t border-fd-border/50 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-fd-muted-foreground">
                    <span>Full Textual Format:</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(result.outputDisplay, "full")}
                      className="text-[11px] text-fd-primary hover:underline inline-flex items-center gap-1"
                    >
                      {copiedKey === "full" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <div className="text-sm font-semibold text-fd-foreground">
                    {result.outputDisplay}
                  </div>

                  {result.outputDevanagari && (
                    <div className="mt-2 text-sm font-semibold text-fd-foreground font-serif">
                      {result.outputDevanagari}
                    </div>
                  )}
                </div>
              </div>

              {/* Meta Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {/* Day of Week */}
                <div className="rounded-xl border border-fd-border/70 bg-fd-secondary/30 p-2.5">
                  <span className="text-[10px] font-mono uppercase text-fd-muted-foreground block">
                    Day of Week
                  </span>
                  <span className="font-semibold text-fd-foreground mt-0.5 block truncate">
                    {result.meta.dayOfWeek.en}
                  </span>
                  <span className="text-[11px] text-fd-muted-foreground block">
                    {result.meta.dayOfWeek.np}
                  </span>
                </div>

                {/* Fiscal Year */}
                <div className="rounded-xl border border-fd-border/70 bg-fd-secondary/30 p-2.5">
                  <span className="text-[10px] font-mono uppercase text-fd-muted-foreground block">
                    Fiscal Year
                  </span>
                  <span className="font-semibold text-fd-foreground mt-0.5 block truncate">
                    FY {result.meta.fiscalYear}
                  </span>
                  <span className="text-[11px] text-fd-muted-foreground block">
                    आ.व. {result.meta.fiscalYearNp}
                  </span>
                </div>

                {/* Quarter */}
                <div className="rounded-xl border border-fd-border/70 bg-fd-secondary/30 p-2.5 col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono uppercase text-fd-muted-foreground block">
                    Nepali Quarter
                  </span>
                  <span className="font-semibold text-fd-foreground mt-0.5 block truncate">
                    {result.meta.quarter.split(" ")[0]} ({result.meta.quarter.split(" ")[2]})
                  </span>
                  <span className="text-[11px] text-fd-muted-foreground block">
                    {result.meta.monthDays} Days in Month
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-center text-sm text-rose-500">
              {error || "Invalid date conversion."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
