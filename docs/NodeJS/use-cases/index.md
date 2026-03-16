# Use Cases

This section covers common patterns and real-world use cases for the Nepali Date Library.

## Overview

The library is designed to handle various date-related tasks in Nepali applications:

| Use Case                   | Description                             | Link                                                                |
| -------------------------- | --------------------------------------- | ------------------------------------------------------------------- |
| **Date Conversion**        | Converting between AD and BS dates      | [→ Date Conversion](/docs/NodeJS/use-cases/date-conversion)         |
| **Calendar Generation**    | Building datepickers and calendars      | [→ Calendar Generation](/docs/NodeJS/use-cases/calendar-generation) |
| **Fiscal Year Operations** | Working with Nepal's fiscal year        | [→ Fiscal Year](/docs/NodeJS/use-cases/fiscal-year)                 |
| **Date Ranges**            | Working with week/month/year boundaries | [→ Date Ranges](/docs/NodeJS/use-cases/date-ranges)                 |

## Common Scenarios

### Web Applications

- User registration with Nepali date of birth
- Event scheduling in Nepali calendar
- Report generation by Nepali dates
- Bill and invoice dating

### Business Applications

- Fiscal year financial reports
- Quarterly statements
- Tax period calculations
- Payroll processing

### Government & Official Use

- Document dating
- Record keeping
- Official correspondence
- Legal document filing

## Quick Examples

### Display Today's Date in Nepali

```typescript
import { NepaliDate } from "nepali-date-library";

const today = new NepaliDate();

// Full Nepali format
console.log(today.format("dddd, mmmm dd, yyyy"));
// Output: बुधबार, माघ ०१, २०८२

// Mixed format
console.log(today.format("MMMM DD, YYYY (dddd)"));
// Output: Magh 01, 2082 (बुधबार)
```

### Convert API Dates

```typescript
import { ADtoBS, BStoAD } from "nepali-date-library";

// Response from API with Gregorian date
const apiResponse = { createdAt: "2026-01-14T10:30:00Z" };

// Convert to Nepali date for display
const nepaliDate = ADtoBS(apiResponse.createdAt.split("T")[0]);
console.log(`Created on: ${nepaliDate}`); // Created on: 2082-10-01
```

### Age Calculation

```typescript
import { NepaliDate } from "nepali-date-library";

function calculateAge(birthDate: string): number {
  const dob = new NepaliDate(birthDate);
  const today = new NepaliDate();
  return today.diff(dob, "year");
}

console.log(calculateAge("2050-05-15")); // 32
```

### Date Validation

```typescript
import { NepaliDate } from "nepali-date-library";

function validateNepaliDate(year: number, month: number, day: number): boolean {
  return NepaliDate.isValid(year, month, day);
}

// Validate user input
const userYear = 2082;
const userMonth = 9; // 0-indexed
const userDay = 32;

if (validateNepaliDate(userYear, userMonth, userDay)) {
  console.log("Valid date");
} else {
  console.log("Invalid date"); // Day too high for Magh
}
```
