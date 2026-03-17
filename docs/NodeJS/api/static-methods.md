# Static Methods

The `NepaliDate` class provides several static methods for validation, name lookups, calendar generation, and fiscal year operations.

## Import

```typescript
import { NepaliDate } from "nepali-date-library";
```

---

## Date Range Utilities

### NepaliDate.minimum()

Returns the earliest date supported by the library.

```typescript
static minimum(): Date
```

**Returns:** JavaScript Date object representing the minimum supported date (April 13, 1919)

**Example:**

```typescript
const minDate = NepaliDate.minimum();
console.log(minDate.toISOString()); // '1943-04-14T...'
```

---

### NepaliDate.maximum()

Returns the latest date supported by the library.

```typescript
static maximum(): Date
```

**Returns:** JavaScript Date object representing the maximum supported date (~2044)

**Example:**

```typescript
const maxDate = NepaliDate.maximum();
console.log(maxDate.getFullYear()); // 2044
```

---

### NepaliDate.daysInMonth()

Returns the number of days in a given Nepali month.

```typescript
static daysInMonth(year: number, month: number): number
```

**Parameters:**

- `year` - Nepali year (1976-2100)
- `month` - Nepali month (0-11)

**Returns:** Number of days in the given Nepali month

**Example:**

```typescript
const daysInMonth = NepaliDate.daysInMonth(2082, 9);
console.log(daysInMonth); // 30
```

---

## Validation

### NepaliDate.isValid() {#isvalid-static}

Checks if the specified Nepali date components are valid.

```typescript
static isValid(year: number, month: number, day: number): boolean
```

**Parameters:**

- `year` - Nepali year (1976-2100)
- `month` - Nepali month (0-11)
- `day` - Day of month (1-32)

**Returns:** `true` if the date is valid

**Example:**

```typescript
// Valid dates
console.log(NepaliDate.isValid(2082, 9, 15)); // true
console.log(NepaliDate.isValid(2082, 0, 1)); // true

// Invalid dates
console.log(NepaliDate.isValid(2082, 12, 1)); // false (month out of range)
console.log(NepaliDate.isValid(2082, 9, 35)); // false (day out of range)
console.log(NepaliDate.isValid(1999, 0, 1)); // false (year out of range)
console.log(NepaliDate.isValid(2101, 0, 1)); // false (year out of range)
```

::: tip
Use this method to validate user input before creating a NepaliDate instance.
:::

---

## Name Utilities

### NepaliDate.getMonthName()

Returns the name of a Nepali month.

```typescript
static getMonthName(month: number, short?: boolean, nepali?: boolean): string
```

**Parameters:**

- `month` - Month index (0-11)
- `short` - Return short form (default: `false`)
- `nepali` - Return Nepali name (default: `false`)

**Returns:** Month name string

**Example:**

```typescript
// English names
console.log(NepaliDate.getMonthName(0)); // 'Baisakh'
console.log(NepaliDate.getMonthName(0, true)); // 'Bai'
console.log(NepaliDate.getMonthName(9)); // 'Magh'
console.log(NepaliDate.getMonthName(9, true)); // 'Mag'

// Nepali names
console.log(NepaliDate.getMonthName(0, false, true)); // 'बैशाख'
console.log(NepaliDate.getMonthName(0, true, true)); // 'बै'
console.log(NepaliDate.getMonthName(9, false, true)); // 'माघ'
console.log(NepaliDate.getMonthName(9, true, true)); // 'मा'
```

#### Month Reference

| Index | English | Short | Nepali  | Short (NP) |
| ----- | ------- | ----- | ------- | ---------- |
| 0     | Baisakh | Bai   | बैशाख   | बै         |
| 1     | Jestha  | Jes   | जेठ     | जे         |
| 2     | Asar    | Asa   | असार    | अ          |
| 3     | Shrawan | Shr   | श्रावण  | श्रा       |
| 4     | Bhadra  | Bhd   | भाद्र   | भा         |
| 5     | Aswin   | Asw   | आश्विन  | आ          |
| 6     | Kartik  | Kar   | कार्तिक | का         |
| 7     | Mangsir | Man   | मंसिर   | मं         |
| 8     | Poush   | Pou   | पौष     | पौ         |
| 9     | Magh    | Mag   | माघ     | मा         |
| 10    | Falgun  | Fal   | फाल्गुण | फा         |
| 11    | Chaitra | Cha   | चैत्र   | चै         |

---

### NepaliDate.getDayName()

Returns the name of a day of the week.

```typescript
static getDayName(day: number, short?: boolean, nepali?: boolean): string
```

**Parameters:**

- `day` - Day of week (0-6, where 0 = Sunday)
- `short` - Return short form (default: `false`)
- `nepali` - Return Nepali name (default: `false`)

**Returns:** Day name string

**Example:**

```typescript
// English names
console.log(NepaliDate.getDayName(0)); // 'Sunday'
console.log(NepaliDate.getDayName(0, true)); // 'Sun'
console.log(NepaliDate.getDayName(3)); // 'Wednesday'

// Nepali names
console.log(NepaliDate.getDayName(0, false, true)); // 'आइतबार'
console.log(NepaliDate.getDayName(0, true, true)); // 'आइत'
console.log(NepaliDate.getDayName(3, false, true)); // 'बुधबार'
```

#### Day Reference

| Index | English   | Short | Nepali   | Short (NP) |
| ----- | --------- | ----- | -------- | ---------- |
| 0     | Sunday    | Sun   | आइतबार   | आइत        |
| 1     | Monday    | Mon   | सोमबार   | सोम        |
| 2     | Tuesday   | Tue   | मंगलबार  | मंगल       |
| 3     | Wednesday | Wed   | बुधबार   | बुध        |
| 4     | Thursday  | Thu   | बिहिबार  | बिहि       |
| 5     | Friday    | Fri   | शुक्रबार | शुक्र      |
| 6     | Saturday  | Sat   | शनिबार   | शनि        |

---

## Calendar Generation

### NepaliDate.getCalendarDays()

Generates calendar data for a given month, including trailing days from adjacent months. Perfect for building datepicker or calendar components.

```typescript
static getCalendarDays(year: number, month: number): {
  prevRemainingDays: number;
  prevMonth: { year: number; month: number; days: number[] };
  currentMonth: { year: number; month: number; days: number[] };
  nextMonth: { year: number; month: number; days: number[] };
  remainingDays: number;
}
```

**Parameters:**

- `year` - Nepali year
- `month` - Nepali month (0-11)

**Returns:** Object containing:

- `prevRemainingDays` - Number of days from previous month to show
- `prevMonth` - Previous month info with day array
- `currentMonth` - Current month info with day array
- `nextMonth` - Next month info with day array
- `remainingDays` - Number of days from next month to show

**Example:**

```typescript
const calendar = NepaliDate.getCalendarDays(2082, 9); // Magh 2082

console.log(calendar.currentMonth);
// { year: 2082, month: 9, days: [1, 2, 3, ..., 29] }

console.log(calendar.prevMonth);
// { year: 2082, month: 8, days: [28, 29, 30] }

console.log(calendar.nextMonth);
// { year: 2082, month: 10, days: [1, 2, 3, 4] }

console.log(calendar.prevRemainingDays); // 3
console.log(calendar.remainingDays); // 4
```

::: tip Building a Calendar Grid
Use this method to populate a 6-week calendar grid:

```typescript
const calendar = NepaliDate.getCalendarDays(2082, 9);

// Combine all days for a complete 6x7 grid
const allDays = [
  ...calendar.prevMonth.days.map((d) => ({ day: d, type: "prev" })),
  ...calendar.currentMonth.days.map((d) => ({ day: d, type: "current" })),
  ...calendar.nextMonth.days.map((d) => ({ day: d, type: "next" })),
];
```

:::

---

## Quarter Methods

### NepaliDate.getQuarter()

Returns the start and end dates for a specific quarter.

```typescript
static getQuarter(quarter: number, year?: number): {
  start: NepaliDate;
  end: NepaliDate
}
```

**Parameters:**

- `quarter` - Quarter number (1-4)
- `year` - Nepali year (optional, defaults to current year)

**Returns:** Object with `start` and `end` NepaliDate instances

**Quarter Mapping:**

- Q1: Baisakh - Asar (months 0-2)
- Q2: Shrawan - Aswin (months 3-5)
- Q3: Kartik - Poush (months 6-8)
- Q4: Magh - Chaitra (months 9-11)

**Example:**

```typescript
const q1 = NepaliDate.getQuarter(1, 2082);
console.log(q1.start.format("YYYY-MM-DD")); // '2082-01-01'
console.log(q1.end.format("YYYY-MM-DD")); // '2082-03-31'

const q4 = NepaliDate.getQuarter(4, 2082);
console.log(q4.start.format("MMMM")); // 'Magh'
console.log(q4.end.format("MMMM")); // 'Chaitra'
```

---

### NepaliDate.getQuarters()

Returns all quarters for a year.

```typescript
static getQuarters(year?: number): {
  Q1: { start: NepaliDate; end: NepaliDate };
  Q2: { start: NepaliDate; end: NepaliDate };
  Q3: { start: NepaliDate; end: NepaliDate };
  Q4: { start: NepaliDate; end: NepaliDate };
}
```

**Parameters:**

- `year` - Nepali year (optional, defaults to current year)

**Returns:** Object with all four quarters

**Example:**

```typescript
const quarters = NepaliDate.getQuarters(2082);

console.log(quarters.Q1.start.format("MMMM YYYY")); // 'Baisakh 2082'
console.log(quarters.Q1.end.format("MMMM YYYY")); // 'Asar 2082'
```

---

## Fiscal Year Methods

::: info Nepal's Fiscal Year
Nepal's fiscal year starts on **Shrawan 1st** (mid-July). Fiscal Year 2081/82 runs from Shrawan 1, 2081 to Asar end, 2082.
:::

### NepaliDate.getCurrentFiscalYear()

Returns the current fiscal year.

```typescript
static getCurrentFiscalYear(): number
```

**Returns:** Current fiscal year number

**Example:**

```typescript
// On Magh 1, 2082 (within FY 2081/82)
const fy = NepaliDate.getCurrentFiscalYear();
console.log(fy); // 2081
```

---

### NepaliDate.getFiscalYearQuarter()

Returns the start and end dates for a specific fiscal year quarter.

```typescript
static getFiscalYearQuarter(quarter: number, fiscalYear?: number): {
  start: NepaliDate;
  end: NepaliDate
}
```

**Parameters:**

- `quarter` - Fiscal quarter number (1-4)
- `fiscalYear` - Fiscal year (optional, defaults to current fiscal year)

**Fiscal Quarter Mapping:**

- FQ1: Shrawan - Aswin (months 3-5)
- FQ2: Kartik - Poush (months 6-8)
- FQ3: Magh - Chaitra (months 9-11)
- FQ4: Baisakh - Asar (months 0-2 of next year)

**Example:**

```typescript
const fq1 = NepaliDate.getFiscalYearQuarter(1, 2081);
console.log(fq1.start.format("YYYY-MM-DD")); // '2081-04-01' (Shrawan 1)
console.log(fq1.end.format("YYYY-MM-DD")); // '2081-06-30' (Aswin end)
```

---

### NepaliDate.getFiscalYearQuarters()

Returns all quarters for a fiscal year.

```typescript
static getFiscalYearQuarters(fiscalYear?: number): {
  Q1: { start: NepaliDate; end: NepaliDate };
  Q2: { start: NepaliDate; end: NepaliDate };
  Q3: { start: NepaliDate; end: NepaliDate };
  Q4: { start: NepaliDate; end: NepaliDate };
}
```

**Parameters:**

- `fiscalYear` - Fiscal year (optional, defaults to current fiscal year)

**Returns:** Object with all four fiscal quarters

**Example:**

```typescript
const fyQuarters = NepaliDate.getFiscalYearQuarters(2081);

// FY 2081/82
console.log(fyQuarters.Q1.start.format("MMMM YYYY")); // 'Shrawan 2081'
console.log(fyQuarters.Q4.end.format("MMMM YYYY")); // 'Asar 2082'
```
