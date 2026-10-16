"use client";

import { useState, useMemo, useEffect } from "react";
import { NepaliDate } from "nepali-date-library";
import {
  Cake,
  Sparkles,
  Calendar,
  Clock,
} from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";
import {
  padZero,
  toDevanagariNumerals,
  getDaysInBSMonth,
  getTodayBS,
  calculateAgeBS,
  getNextBirthdayBS,
  WEEK_DAYS,
  getBSYearOptions,
  getBSMonthOptions,
  getBSDayOptions,
} from "./converter-utils";

export function AgeTab() {
  const today = useMemo(() => getTodayBS(), []);

  // Date of birth (default: 2064 Month 3 (Asar) Day 23)
  const [birthYear, setBirthYear] = useState<number>(2064);
  const [birthMonth, setBirthMonth] = useState<number>(2); // 0-indexed month 2 = 03 Asar
  const [birthDay, setBirthDay] = useState<number>(23);

  // Reference "Age as of" date (defaults to today)
  const [asOfYear, setAsOfYear] = useState<number>(today.year);
  const [asOfMonth, setAsOfMonth] = useState<number>(today.month);
  const [asOfDay, setAsOfDay] = useState<number>(today.day);

  const maxBirthDays = useMemo(
    () => getDaysInBSMonth(birthYear, birthMonth),
    [birthYear, birthMonth]
  );
  const maxAsOfDays = useMemo(
    () => getDaysInBSMonth(asOfYear, asOfMonth),
    [asOfYear, asOfMonth]
  );

  // Automatically clamp birthDay when birth month/year changes
  useEffect(() => {
    if (birthDay > maxBirthDays) {
      setBirthDay(maxBirthDays);
    }
  }, [birthDay, maxBirthDays]);

  // Automatically clamp asOfDay when asOf month/year changes
  useEffect(() => {
    if (asOfDay > maxAsOfDays) {
      setAsOfDay(maxAsOfDays);
    }
  }, [asOfDay, maxAsOfDays]);

  const validBirthDay = Math.min(birthDay, maxBirthDays);
  const validAsOfDay = Math.min(asOfDay, maxAsOfDays);

  const yearOptions = useMemo(() => getBSYearOptions(), []);
  const monthOptions = useMemo(() => getBSMonthOptions(), []);
  const birthDayOptions = useMemo(() => getBSDayOptions(maxBirthDays), [maxBirthDays]);
  const asOfDayOptions = useMemo(() => getBSDayOptions(maxAsOfDays), [maxAsOfDays]);

  const { ageData, error } = useMemo(() => {
    try {
      const birthDate = new NepaliDate(birthYear, birthMonth, validBirthDay);
      const asOfDate = new NepaliDate(asOfYear, asOfMonth, validAsOfDay);

      const isFuture = asOfDate.diff(birthDate, "day") < 0;
      if (isFuture) {
        return {
          ageData: null,
          error: "Date of Birth cannot be later than the 'Age As Of' date.",
        };
      }

      const age = calculateAgeBS(birthDate, asOfDate);
      const nextBday = getNextBirthdayBS(birthDate, asOfDate);
      const dayBorn = WEEK_DAYS[birthDate.getDay()];
      const adBirthDate = birthDate.getEnglishDate();

      return {
        ageData: {
          years: age.years,
          months: age.months,
          days: age.days,
          totalDays: age.totalDays,
          totalMonths: age.totalMonths,
          totalWeeks: age.totalWeeks,
          totalHours: age.totalHours,
          nextBirthday: {
            daysRemaining: nextBday.daysRemaining,
            nextAge: nextBday.nextAge,
            dateBS: nextBday.nextBirthdayBS.format("YYYY-MM-DD"),
          },
          dayBorn,
          birthFormattedBS: birthDate.format("YYYY-MM-DD"),
          birthFormattedAD: adBirthDate.toISOString().split("T")[0],
        },
        error: null,
      };
    } catch (e: any) {
      return { ageData: null, error: e?.message || "Invalid birth date calculation" };
    }
  }, [birthYear, birthMonth, validBirthDay, asOfYear, asOfMonth, validAsOfDay]);

  const setAsOfToday = () => {
    setAsOfYear(today.year);
    setAsOfMonth(today.month);
    setAsOfDay(today.day);
  };

  return (
    <div className="space-y-8">
      {/* Date Pickers Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Date of Birth */}
        <div className="rounded-2xl sm:rounded-3xl border border-fd-border/80 bg-fd-card p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 pb-3.5 border-b border-fd-border/60">
            <div className="flex size-7 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary">
              <Cake className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-fd-foreground">Date of Birth (BS)</h3>
              <p className="text-[11px] text-fd-muted-foreground">जन्म मिति (विक्रम संवत्)</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Year */}
            <CustomSelect
              label="Year"
              value={birthYear}
              onChange={(v) => setBirthYear(Number(v))}
              options={yearOptions}
              searchable={true}
              searchPlaceholder="Search year..."
            />

            {/* Month */}
            <CustomSelect
              label="Month"
              value={birthMonth}
              onChange={(v) => setBirthMonth(Number(v))}
              options={monthOptions}
            />

            {/* Day */}
            <CustomSelect
              label="Day"
              value={validBirthDay}
              onChange={(v) => setBirthDay(Number(v))}
              options={birthDayOptions}
            />
          </div>
        </div>

        {/* Age As Of Date */}
        <div className="rounded-2xl sm:rounded-3xl border border-fd-border/80 bg-fd-card p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-fd-border/60">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary">
                <Calendar className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-fd-foreground">Age As Of (BS)</h3>
                <p className="text-[11px] text-fd-muted-foreground">Defaults to today</p>
              </div>
            </div>

            <button
              type="button"
              onClick={setAsOfToday}
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
              value={asOfYear}
              onChange={(v) => setAsOfYear(Number(v))}
              options={yearOptions}
              searchable={true}
              searchPlaceholder="Search year..."
            />

            {/* Month */}
            <CustomSelect
              label="Month"
              value={asOfMonth}
              onChange={(v) => setAsOfMonth(Number(v))}
              options={monthOptions}
            />

            {/* Day */}
            <CustomSelect
              label="Day"
              value={validAsOfDay}
              onChange={(v) => setAsOfDay(Number(v))}
              options={asOfDayOptions}
            />
          </div>
        </div>
      </div>

      {/* Results Display */}
      {ageData ? (
        <div className="space-y-6">
          {/* Main Hero Age Display */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-fd-border/80 bg-fd-card p-6 sm:p-8 shadow-xs text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-fd-primary/10 px-3 py-1 text-xs font-semibold text-fd-primary mb-3">
              <Sparkles className="size-3.5" />
              <span>Exact Age Breakdown</span>
            </span>

            <div className="text-3xl sm:text-5xl font-extrabold tracking-tight text-fd-foreground flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span className="text-fd-primary">
                {ageData.years}{" "}
                <span className="text-lg sm:text-2xl font-normal text-fd-muted-foreground">
                  Years
                </span>
              </span>
              <span>
                {ageData.months}{" "}
                <span className="text-lg sm:text-2xl font-normal text-fd-muted-foreground">
                  Months
                </span>
              </span>
              <span>
                {ageData.days}{" "}
                <span className="text-lg sm:text-2xl font-normal text-fd-muted-foreground">
                  Days
                </span>
              </span>
            </div>

            <p className="mt-2 text-sm sm:text-base font-serif text-fd-muted-foreground">
              {toDevanagariNumerals(ageData.years)} वर्ष, {toDevanagariNumerals(ageData.months)} महिना, {toDevanagariNumerals(ageData.days)} दिन
            </p>

            {/* Next Birthday Countdown Banner */}
            <div className="mt-6 rounded-2xl border border-[#E1804B]/30 bg-[#E1804B]/5 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E1804B]/15 text-[#E1804B]">
                  <Cake className="size-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-fd-foreground">
                    Next Birthday ({ageData.nextBirthday.nextAge}th Birthday)
                  </h4>
                  <p className="text-xs text-fd-muted-foreground">
                    Date: <span className="font-mono">{ageData.nextBirthday.dateBS}</span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg sm:text-xl font-extrabold font-mono text-[#E1804B]">
                  {ageData.nextBirthday.daysRemaining}{" "}
                  <span className="text-xs font-normal text-fd-muted-foreground">Days to go</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Life Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-fd-border/70 bg-fd-secondary/30 p-3.5 text-center">
              <span className="text-[11px] font-mono uppercase text-fd-muted-foreground block">
                Day Born
              </span>
              <span className="text-base sm:text-lg font-bold text-fd-foreground mt-0.5 block">
                {ageData.dayBorn.en}
              </span>
              <span className="text-xs text-fd-muted-foreground block">
                {ageData.dayBorn.np}
              </span>
            </div>

            <div className="rounded-xl border border-fd-border/70 bg-fd-secondary/30 p-3.5 text-center">
              <span className="text-[11px] font-mono uppercase text-fd-muted-foreground block">
                Total Days Lived
              </span>
              <span className="text-xl font-extrabold font-mono text-fd-foreground mt-0.5 block">
                {ageData.totalDays.toLocaleString()}
              </span>
              <span className="text-[11px] text-fd-muted-foreground block">Days</span>
            </div>

            <div className="rounded-xl border border-fd-border/70 bg-fd-secondary/30 p-3.5 text-center">
              <span className="text-[11px] font-mono uppercase text-fd-muted-foreground block">
                Total Weeks Lived
              </span>
              <span className="text-xl font-extrabold font-mono text-fd-foreground mt-0.5 block">
                {ageData.totalWeeks.toLocaleString()}
              </span>
              <span className="text-[11px] text-fd-muted-foreground block">Weeks</span>
            </div>

            <div className="rounded-xl border border-fd-border/70 bg-fd-secondary/30 p-3.5 text-center">
              <span className="text-[11px] font-mono uppercase text-fd-muted-foreground block">
                Total Hours Lived
              </span>
              <span className="text-xl font-extrabold font-mono text-fd-foreground mt-0.5 block">
                {ageData.totalHours.toLocaleString()}
              </span>
              <span className="text-[11px] text-fd-muted-foreground block">Hours</span>
            </div>
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
