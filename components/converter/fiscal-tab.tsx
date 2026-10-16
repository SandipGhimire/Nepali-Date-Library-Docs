"use client";

import { useState, useMemo, useEffect } from "react";
import { NepaliDate } from "nepali-date-library";
import {
  Landmark,
  Clock,
  PieChart,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";
import {
  getDaysInBSMonth,
  getTodayBS,
  getFiscalYearDetails,
  getBSYearOptions,
  getBSMonthOptions,
  getBSDayOptions,
} from "./converter-utils";

export function FiscalTab() {
  const today = useMemo(() => getTodayBS(), []);

  const [year, setYear] = useState<number>(today.year);
  const [month, setMonth] = useState<number>(today.month);
  const [day, setDay] = useState<number>(today.day);

  const maxDays = useMemo(() => getDaysInBSMonth(year, month), [year, month]);

  // Automatically clamp day when month/year changes
  useEffect(() => {
    if (day > maxDays) {
      setDay(maxDays);
    }
  }, [day, maxDays]);

  const validDay = Math.min(day, maxDays);

  const yearOptions = useMemo(() => getBSYearOptions(), []);
  const monthOptions = useMemo(() => getBSMonthOptions(), []);
  const dayOptions = useMemo(() => getBSDayOptions(maxDays), [maxDays]);

  const { fiscalInfo, error } = useMemo(() => {
    try {
      const date = new NepaliDate(year, month, validDay);
      const details = getFiscalYearDetails(date);

      // Quarters breakdown
      const quarters = [
        {
          q: 1,
          name: "First Quarter (Q1 / प्रथम त्रैमासिक)",
          range: "Shrawan 1 - Ashwin end (श्रावण १ - आश्विन मसान्त)",
          months: "Shrawan, Bhadra, Ashwin",
          isActive: details.quarter === 1,
          isPassed: details.quarter > 1,
        },
        {
          q: 2,
          name: "Second Quarter (Q2 / दोस्रो त्रैमासिक)",
          range: "Kartik 1 - Poush end (कार्तिक १ - पौष मसान्त)",
          months: "Kartik, Mangsir, Poush",
          isActive: details.quarter === 2,
          isPassed: details.quarter > 2,
        },
        {
          q: 3,
          name: "Third Quarter (Q3 / तेस्रो त्रैमासिक)",
          range: "Magh 1 - Chaitra end (माघ १ - चैत्र मसान्त)",
          months: "Magh, Falgun, Chaitra",
          isActive: details.quarter === 3,
          isPassed: details.quarter > 3,
        },
        {
          q: 4,
          name: "Fourth Quarter (Q4 / चौथो त्रैमासिक)",
          range: "Baisakh 1 - Ashadh end (बैशाख १ - असार मसान्त)",
          months: "Baisakh, Jestha, Asar",
          isActive: details.quarter === 4,
          isPassed: false,
        },
      ];

      return {
        fiscalInfo: {
          details,
          quarters,
          dateFormatted: date.format("YYYY-MM-DD"),
        },
        error: null,
      };
    } catch (e: any) {
      return { fiscalInfo: null, error: e?.message || "Invalid date" };
    }
  }, [year, month, validDay]);

  return (
    <div className="space-y-8">
      {/* Date Selector with CustomSelect */}
      <div className="rounded-2xl sm:rounded-3xl border border-fd-border/80 bg-fd-card p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-fd-border/60">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary">
              <Landmark className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-fd-foreground">Select Date for Fiscal Analysis</h3>
              <p className="text-[11px] text-fd-muted-foreground">नेपाल सरकारको आर्थिक वर्ष गणना</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setYear(today.year);
              setMonth(today.month);
              setDay(today.day);
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
            value={year}
            onChange={(v) => setYear(Number(v))}
            options={yearOptions}
            searchable={true}
            searchPlaceholder="Search year..."
          />

          {/* Month */}
          <CustomSelect
            label="Month"
            value={month}
            onChange={(v) => setMonth(Number(v))}
            options={monthOptions}
          />

          {/* Day */}
          <CustomSelect
            label="Day"
            value={validDay}
            onChange={(v) => setDay(Number(v))}
            options={dayOptions}
          />
        </div>
      </div>

      {/* Hero Fiscal Result Card */}
      {fiscalInfo ? (
        <div className="space-y-6">
          <div className="rounded-2xl sm:rounded-3xl border border-fd-border/80 bg-fd-card p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-fd-muted-foreground">
                  Government of Nepal Fiscal Year
                </span>
                <div className="mt-1 text-3xl sm:text-5xl font-extrabold tracking-tight text-fd-foreground">
                  FY {fiscalInfo.details.fiscalYear}
                </div>
                <div className="mt-1 text-base sm:text-lg font-serif text-fd-muted-foreground">
                  आर्थिक वर्ष {fiscalInfo.details.fiscalYearNp}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#E1804B]/30 bg-[#E1804B]/10 px-3.5 py-2 text-sm font-bold text-[#E1804B]">
                  <PieChart className="size-4" />
                  <span>{fiscalInfo.details.quarterName}</span>
                </span>
                <p className="mt-1.5 text-xs text-fd-muted-foreground">
                  {fiscalInfo.details.quarterDatesBS}
                </p>
              </div>
            </div>

            {/* Fiscal Year Timeline Progress Bar */}
            <div className="mt-8 pt-6 border-t border-fd-border/60">
              <div className="flex items-center justify-between text-xs text-fd-muted-foreground mb-2">
                <span>
                  Start: <strong className="text-fd-foreground">{fiscalInfo.details.startDateBS}</strong>
                </span>
                <span>
                  End: <strong className="text-fd-foreground">{fiscalInfo.details.endDateBS}</strong>
                </span>
              </div>

              <div className="relative h-3 w-full overflow-hidden rounded-full bg-fd-secondary">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#E1804B] to-[#C96937] transition-all duration-500"
                  style={{ width: `${fiscalInfo.details.progressPercent}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-fd-foreground">
                  {fiscalInfo.details.progressPercent}% of Fiscal Year Elapsed
                </span>
                <span className="font-mono text-fd-muted-foreground">
                  {fiscalInfo.details.daysRemainingInFY} Days Remaining
                </span>
              </div>
            </div>
          </div>

          {/* 4 Quarters Breakdown Grid */}
          <div className="grid gap-3.5 sm:grid-cols-2">
            {fiscalInfo.quarters.map((q) => (
              <div
                key={q.q}
                className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                  q.isActive
                    ? "border-fd-primary bg-fd-primary/5 shadow-xs"
                    : "border-fd-border/70 bg-fd-card/60"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-fd-foreground">{q.name}</h4>
                  {q.isActive ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-fd-primary/10 px-2 py-0.5 text-[11px] font-semibold text-fd-primary">
                      <Clock3 className="size-3" />
                      <span>Active Now</span>
                    </span>
                  ) : q.isPassed ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="size-3" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-fd-muted-foreground font-mono">
                      Upcoming
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs font-mono text-fd-muted-foreground">{q.range}</p>
                <p className="mt-1 text-xs text-fd-foreground font-medium">{q.months}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-center text-sm text-rose-500">
          {error || "Invalid calculation"}
        </div>
      )}
    </div>
  );
}
