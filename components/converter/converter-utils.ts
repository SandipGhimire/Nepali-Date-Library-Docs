import { NepaliDate } from "nepali-date-library";

export interface MonthInfo {
  index: number; // 0-11
  np: string;
  en: string;
}

export interface WeekDayInfo {
  index: number; // 0-6
  np: string;
  en: string;
  shortNp: string;
  shortEn: string;
}

export const NEPALI_MONTHS: MonthInfo[] = [
  { index: 0, np: "बैशाख", en: "Baisakh" },
  { index: 1, np: "जेठ", en: "Jestha" },
  { index: 2, np: "असार", en: "Asar" },
  { index: 3, np: "श्रावण", en: "Shrawan" },
  { index: 4, np: "भाद्र", en: "Bhadra" },
  { index: 5, np: "आश्विन", en: "Ashwin" },
  { index: 6, np: "कार्तिक", en: "Kartik" },
  { index: 7, np: "मंसिर", en: "Mangsir" },
  { index: 8, np: "पौष", en: "Poush" },
  { index: 9, np: "माघ", en: "Magh" },
  { index: 10, np: "फाल्गुण", en: "Falgun" },
  { index: 11, np: "चैत्र", en: "Chaitra" },
];

export const GREGORIAN_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const WEEK_DAYS: WeekDayInfo[] = [
  { index: 0, np: "आइतबार", en: "Sunday", shortNp: "आइत", shortEn: "Sun" },
  { index: 1, np: "सोमबार", en: "Monday", shortNp: "सोम", shortEn: "Mon" },
  { index: 2, np: "मंगलबार", en: "Tuesday", shortNp: "मंगल", shortEn: "Tue" },
  { index: 3, np: "बुधबार", en: "Wednesday", shortNp: "बुध", shortEn: "Wed" },
  { index: 4, np: "बिहिबार", en: "Thursday", shortNp: "बिहि", shortEn: "Thu" },
  { index: 5, np: "शुक्रबार", en: "Friday", shortNp: "शुक्र", shortEn: "Fri" },
  { index: 6, np: "शनिबार", en: "Saturday", shortNp: "शनि", shortEn: "Sat" },
];

export const MIN_BS_YEAR = 1976;
export const MAX_BS_YEAR = 2100;

export interface SelectOption<T extends string | number> {
  value: T;
  label: string;
  subLabel?: string;
  badge?: string;
}

export function getBSYearOptions(): SelectOption<number>[] {
  const options: SelectOption<number>[] = [];
  for (let y = MAX_BS_YEAR; y >= MIN_BS_YEAR; y--) {
    options.push({
      value: y,
      label: String(y),
      subLabel: `(${toDevanagariNumerals(y)})`,
    });
  }
  return options;
}

export function getBSMonthOptions(): SelectOption<number>[] {
  return NEPALI_MONTHS.map((m) => ({
    value: m.index,
    label: `${padZero(m.index + 1)} - ${m.en}`,
    subLabel: `(${m.np})`,
  }));
}

export function getBSDayOptions(maxDays: number): SelectOption<number>[] {
  const options: SelectOption<number>[] = [];
  for (let d = 1; d <= maxDays; d++) {
    options.push({
      value: d,
      label: padZero(d),
      subLabel: `(${toDevanagariNumerals(d)})`,
    });
  }
  return options;
}

export function getADYearOptions(): SelectOption<number>[] {
  const options: SelectOption<number>[] = [];
  for (let y = 2044; y >= 1920; y--) {
    options.push({
      value: y,
      label: String(y),
    });
  }
  return options;
}

export function getADMonthOptions(): SelectOption<number>[] {
  return GREGORIAN_MONTHS.map((name, idx) => ({
    value: idx,
    label: `${padZero(idx + 1)} - ${name}`,
  }));
}

export function getADDayOptions(maxDays: number = 31): SelectOption<number>[] {
  const options: SelectOption<number>[] = [];
  for (let d = 1; d <= maxDays; d++) {
    options.push({
      value: d,
      label: padZero(d),
    });
  }
  return options;
}

export function toDevanagariNumerals(num: number | string): string {
  const digits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return String(num).replace(/[0-9]/g, (d) => digits[parseInt(d, 10)]);
}

export function padZero(num: number, length: number = 2): string {
  return String(num).padStart(length, "0");
}

export function getDaysInBSMonth(year: number, monthIndex: number): number {
  try {
    const dummy = new NepaliDate(year, monthIndex, 1);
    return dummy.daysInMonth(year, monthIndex);
  } catch {
    return 30;
  }
}

export function getDaysInADMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function getTodayBS(): { year: number; month: number; day: number } {
  const today = new NepaliDate();
  return {
    year: today.getYear(),
    month: today.getMonth(),
    day: today.getDate(),
  };
}

export function getTodayAD(): { year: number; month: number; day: number } {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  };
}

/**
 * Calculates exact age in BS calendar
 */
export function calculateAgeBS(
  dob: NepaliDate,
  refDate: NepaliDate = new NepaliDate()
): {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalMonths: number;
  totalWeeks: number;
  totalHours: number;
  isPast: boolean;
} {
  const diffDays = refDate.diff(dob, "day");
  if (diffDays < 0) {
    return {
      years: 0,
      months: 0,
      days: 0,
      totalDays: 0,
      totalMonths: 0,
      totalWeeks: 0,
      totalHours: 0,
      isPast: false,
    };
  }

  let y1 = dob.getYear(), m1 = dob.getMonth(), d1 = dob.getDate();
  let y2 = refDate.getYear(), m2 = refDate.getMonth(), d2 = refDate.getDate();

  if (d2 < d1) {
    const prevMonth = m2 === 0 ? 11 : m2 - 1;
    const prevYear = m2 === 0 ? y2 - 1 : y2;
    const daysInPrev = dob.daysInMonth(prevYear, prevMonth);
    d2 += daysInPrev;
    m2 -= 1;
  }

  if (m2 < m1) {
    m2 += 12;
    y2 -= 1;
  }

  const years = y2 - y1;
  const months = m2 - m1;
  const days = d2 - d1;

  return {
    years,
    months,
    days,
    totalDays: diffDays,
    totalMonths: years * 12 + months,
    totalWeeks: Math.floor(diffDays / 7),
    totalHours: diffDays * 24,
    isPast: true,
  };
}

/**
 * Calculates countdown to next birthday in BS
 */
export function getNextBirthdayBS(
  dob: NepaliDate,
  refDate: NepaliDate = new NepaliDate()
): {
  nextBirthdayBS: NepaliDate;
  daysRemaining: number;
  nextAge: number;
} {
  const refYear = refDate.getYear();
  const birthMonth = dob.getMonth();
  const birthDay = dob.getDate();

  // Try birthday in current reference year
  let candidateYear = refYear;
  const daysInCandidateMonth = getDaysInBSMonth(candidateYear, birthMonth);
  const safeDay = Math.min(birthDay, daysInCandidateMonth);
  let nextBday = new NepaliDate(candidateYear, birthMonth, safeDay);

  // If already passed this year, take next year
  if (nextBday.diff(refDate, "day") < 0) {
    candidateYear = refYear + 1;
    const daysInNextMonth = getDaysInBSMonth(candidateYear, birthMonth);
    nextBday = new NepaliDate(candidateYear, birthMonth, Math.min(birthDay, daysInNextMonth));
  }

  const daysRemaining = nextBday.diff(refDate, "day");
  const nextAge = candidateYear - dob.getYear();

  return {
    nextBirthdayBS: nextBday,
    daysRemaining: Math.max(0, daysRemaining),
    nextAge,
  };
}

/**
 * Nepali Fiscal Year breakdown
 */
export function getFiscalYearDetails(date: NepaliDate): {
  fiscalYear: string;
  fiscalYearNp: string;
  quarter: number;
  quarterName: string;
  quarterDatesBS: string;
  startDateBS: string;
  endDateBS: string;
  daysRemainingInFY: number;
  progressPercent: number;
} {
  const year = date.getYear();
  const month = date.getMonth(); // 0 = Baisakh, 3 = Shrawan, 11 = Chaitra

  let fyStartYear: number;
  let fyEndYear: number;
  let quarter: number;
  let quarterName: string;
  let quarterDatesBS: string;

  if (month >= 3) {
    // Shrawan to Chaitra
    fyStartYear = year;
    fyEndYear = year + 1;
    if (month >= 3 && month <= 5) {
      quarter = 1;
      quarterName = "First Quarter (Q1)";
      quarterDatesBS = "Shrawan 1 - Ashwin end";
    } else if (month >= 6 && month <= 8) {
      quarter = 2;
      quarterName = "Second Quarter (Q2)";
      quarterDatesBS = "Kartik 1 - Poush end";
    } else {
      quarter = 3;
      quarterName = "Third Quarter (Q3)";
      quarterDatesBS = "Magh 1 - Chaitra end";
    }
  } else {
    // Baisakh to Asar (Q4 of previous start year)
    fyStartYear = year - 1;
    fyEndYear = year;
    quarter = 4;
    quarterName = "Fourth Quarter (Q4)";
    quarterDatesBS = "Baisakh 1 - Ashadh end";
  }

  const fyLabel = `${fyStartYear}/${String(fyEndYear).slice(-2)}`;
  const fyLabelNp = `${toDevanagariNumerals(fyStartYear)}/${toDevanagariNumerals(String(fyEndYear).slice(-2))}`;

  const startDate = new NepaliDate(fyStartYear, 3, 1); // Shrawan 1
  const daysInAshadh = getDaysInBSMonth(fyEndYear, 2);
  const endDate = new NepaliDate(fyEndYear, 2, daysInAshadh); // Ashadh end

  const totalFYDays = endDate.diff(startDate, "day");
  const passedDays = Math.max(0, date.diff(startDate, "day"));
  const daysRemainingInFY = Math.max(0, endDate.diff(date, "day"));
  const progressPercent = Math.min(100, Math.max(0, Math.round((passedDays / totalFYDays) * 100)));

  return {
    fiscalYear: fyLabel,
    fiscalYearNp: fyLabelNp,
    quarter,
    quarterName,
    quarterDatesBS,
    startDateBS: `${fyStartYear}-04-01 (Shrawan 1)`,
    endDateBS: `${fyEndYear}-03-${daysInAshadh} (Ashadh ${daysInAshadh})`,
    daysRemainingInFY,
    progressPercent,
  };
}

