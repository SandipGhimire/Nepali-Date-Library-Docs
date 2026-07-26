# Static Methods

The `NepaliDate` class provides several static methods for validation, name lookups, calendar generation, and fiscal year operations.

## Import

```php
use NepaliDateLibrary\NepaliDate;
```

::: tip Arrays instead of objects
Everywhere the NodeJS/Python ports return a plain object (e.g. `{ start, end }` or `{ Q1, Q2, Q3, Q4 }`), the PHP port returns an associative **array** with the same keys — access with `$result['start']`, `$result['Q1']`, etc.
:::

---

## Date Range Utilities

### NepaliDate::minimum()

Returns the earliest date supported by the library.

```php
public static function minimum(): DateTimeImmutable
```

**Returns:** `DateTimeImmutable` (UTC) representing the minimum supported date (April 13, 1919)

**Example:**

```php
$minDate = NepaliDate::minimum();
echo $minDate->format(DateTimeInterface::ATOM), PHP_EOL; // '1919-04-13T00:00:00+00:00'
```

---

### NepaliDate::maximum()

Returns the latest date supported by the library.

```php
public static function maximum(): DateTimeImmutable
```

**Returns:** `DateTimeImmutable` (UTC) representing the maximum supported date (~2044)

**Example:**

```php
$maxDate = NepaliDate::maximum();
echo $maxDate->format('Y'), PHP_EOL; // 2044
```

---

## Validation

### NepaliDate::isValid() {#isvalid-static}

Checks if the specified Nepali date components are valid.

```php
public static function isValid(int $year, int $month, int $day): bool
```

**Parameters:**

- `$year` - Nepali year (1976-2100)
- `$month` - Nepali month (0-11)
- `$day` - Day of month (1-32)

**Returns:** `true` if the date is valid

**Example:**

```php
// Valid dates
var_dump(NepaliDate::isValid(2082, 9, 15)); // true
var_dump(NepaliDate::isValid(2082, 0, 1));  // true

// Invalid dates
var_dump(NepaliDate::isValid(2082, 12, 1)); // false (month out of range)
var_dump(NepaliDate::isValid(2082, 9, 35)); // false (day out of range)
var_dump(NepaliDate::isValid(1999, 0, 1));  // false (year out of range)
var_dump(NepaliDate::isValid(2101, 0, 1));  // false (year out of range)
```

::: tip
Use this method to validate user input before constructing a `NepaliDate` instance and risking an `InvalidArgumentException`.
:::

::: info Instance check has a different name
The instance-level equivalent is [`isValidInstance()`](/docs/PHP/api/nepali-date-class#isvalidinstance), not `isValid()` — PHP does not allow a static and an instance method to share the same name.
:::

---

## Name Utilities

### NepaliDate::getMonthName()

Returns the name of a Nepali month.

```php
public static function getMonthName(int $month, bool $short = false, bool $nepali = false): string
```

**Parameters:**

- `$month` - Month index (0-11)
- `$short` - Return short form (default: `false`)
- `$nepali` - Return Nepali name (default: `false`)

**Returns:** Month name string

**Example:**

```php
// English names
echo NepaliDate::getMonthName(0), PHP_EOL;       // 'Baisakh'
echo NepaliDate::getMonthName(0, true), PHP_EOL; // 'Bai'
echo NepaliDate::getMonthName(9), PHP_EOL;       // 'Magh'
echo NepaliDate::getMonthName(9, true), PHP_EOL; // 'Mag'

// Nepali names
echo NepaliDate::getMonthName(0, false, true), PHP_EOL; // 'बैशाख'
echo NepaliDate::getMonthName(0, true, true), PHP_EOL;  // 'बै'
echo NepaliDate::getMonthName(9, false, true), PHP_EOL; // 'माघ'
echo NepaliDate::getMonthName(9, true, true), PHP_EOL;  // 'मा'
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

### NepaliDate::getDayName()

Returns the name of a day of the week.

```php
public static function getDayName(int $day, bool $short = false, bool $nepali = false): string
```

**Parameters:**

- `$day` - Day of week (0-6, where 0 = Sunday)
- `$short` - Return short form (default: `false`)
- `$nepali` - Return Nepali name (default: `false`)

**Returns:** Day name string

**Example:**

```php
// English names
echo NepaliDate::getDayName(0), PHP_EOL;       // 'Sunday'
echo NepaliDate::getDayName(0, true), PHP_EOL; // 'Sun'
echo NepaliDate::getDayName(3), PHP_EOL;       // 'Wednesday'

// Nepali names
echo NepaliDate::getDayName(0, false, true), PHP_EOL; // 'आइतबार'
echo NepaliDate::getDayName(0, true, true), PHP_EOL;  // 'आइत'
echo NepaliDate::getDayName(3, false, true), PHP_EOL; // 'बुधबार'
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

### NepaliDate::getCalendarDays()

Generates calendar data for a given month, including trailing days from adjacent months. Perfect for building datepicker or calendar components.

```php
public static function getCalendarDays(int $year, int $month): array{
    prevRemainingDays: int,
    prevMonth: array{year: int, month: int, days: int[]},
    currentMonth: array{year: int, month: int, days: int[]},
    nextMonth: array{year: int, month: int, days: int[]},
    remainingDays: int
}
```

**Parameters:**

- `$year` - Nepali year
- `$month` - Nepali month (0-11)

**Returns:** Associative array containing:

- `'prevRemainingDays'` - Number of days from previous month to show
- `'prevMonth'` - Previous month info with a day array
- `'currentMonth'` - Current month info with a day array
- `'nextMonth'` - Next month info with a day array
- `'remainingDays'` - Number of days from next month to show

**Example:**

```php
$calendar = NepaliDate::getCalendarDays(2082, 9); // Magh 2082

print_r($calendar['currentMonth']);
// ['year' => 2082, 'month' => 9, 'days' => [1, 2, 3, ..., 29]]

print_r($calendar['prevMonth']);
// ['year' => 2082, 'month' => 8, 'days' => [28, 29, 30]]

print_r($calendar['nextMonth']);
// ['year' => 2082, 'month' => 10, 'days' => [1, 2, 3, 4]]

echo $calendar['prevRemainingDays'], PHP_EOL; // 3
echo $calendar['remainingDays'], PHP_EOL;     // 4
```

::: tip Building a Calendar Grid
Use this method to populate a 6-week calendar grid:

```php
$calendar = NepaliDate::getCalendarDays(2082, 9);

$allDays = [
    ...array_map(fn ($d) => ['day' => $d, 'type' => 'prev'], $calendar['prevMonth']['days']),
    ...array_map(fn ($d) => ['day' => $d, 'type' => 'current'], $calendar['currentMonth']['days']),
    ...array_map(fn ($d) => ['day' => $d, 'type' => 'next'], $calendar['nextMonth']['days']),
];
```
:::

---

## Quarter Methods

### NepaliDate::getQuarter()

Returns the start and end dates for a specific quarter.

```php
public static function getQuarter(int $quarter, ?int $year = null): array{start: self, end: self}
```

**Parameters:**

- `$quarter` - Quarter number (1-4)
- `$year` - Nepali year (optional, defaults to current year)

**Returns:** Array with `'start'` and `'end'` `NepaliDate` values

**Quarter Mapping:**

- Q1: Baisakh - Asar (months 0-2)
- Q2: Shrawan - Aswin (months 3-5)
- Q3: Kartik - Poush (months 6-8)
- Q4: Magh - Chaitra (months 9-11)

**Example:**

```php
$q1 = NepaliDate::getQuarter(1, 2082);
echo $q1['start']->format('YYYY-MM-DD'), PHP_EOL; // '2082-01-01'
echo $q1['end']->format('YYYY-MM-DD'), PHP_EOL;   // '2082-03-31'

$q4 = NepaliDate::getQuarter(4, 2082);
echo $q4['start']->format('MMMM'), PHP_EOL; // 'Magh'
echo $q4['end']->format('MMMM'), PHP_EOL;   // 'Chaitra'
```

---

### NepaliDate::getQuarters()

Returns all quarters for a year.

```php
public static function getQuarters(?int $year = null): array{
    Q1: array{start: self, end: self},
    Q2: array{start: self, end: self},
    Q3: array{start: self, end: self},
    Q4: array{start: self, end: self}
}
```

**Parameters:**

- `$year` - Nepali year (optional, defaults to current year)

**Returns:** Array with all four quarters, keyed `'Q1'`-`'Q4'`

**Example:**

```php
$quarters = NepaliDate::getQuarters(2082);

echo $quarters['Q1']['start']->format('MMMM YYYY'), PHP_EOL; // 'Baisakh 2082'
echo $quarters['Q1']['end']->format('MMMM YYYY'), PHP_EOL;   // 'Asar 2082'
```

---

## Fiscal Year Methods

::: info Nepal's Fiscal Year
Nepal's fiscal year starts on **Shrawan 1st** (mid-July). Fiscal Year 2081/82 runs from Shrawan 1, 2081 to Asar end, 2082.
:::

### NepaliDate::getCurrentFiscalYear()

Returns the current fiscal year.

```php
public static function getCurrentFiscalYear(): int
```

**Returns:** Current fiscal year number

**Example:**

```php
// On Magh 1, 2082 (within FY 2081/82)
$fy = NepaliDate::getCurrentFiscalYear();
echo $fy, PHP_EOL; // 2081
```

---

### NepaliDate::getFiscalYearQuarter()

Returns the start and end dates for a specific fiscal year quarter.

```php
public static function getFiscalYearQuarter(int $quarter, ?int $fiscalYear = null): array{start: self, end: self}
```

**Parameters:**

- `$quarter` - Fiscal quarter number (1-4)
- `$fiscalYear` - Fiscal year (optional, defaults to current fiscal year)

**Fiscal Quarter Mapping:**

- FQ1: Shrawan - Aswin (months 3-5)
- FQ2: Kartik - Poush (months 6-8)
- FQ3: Magh - Chaitra (months 9-11)
- FQ4: Baisakh - Asar (months 0-2 of next year)

**Example:**

```php
$fq1 = NepaliDate::getFiscalYearQuarter(1, 2081);
echo $fq1['start']->format('YYYY-MM-DD'), PHP_EOL; // '2081-04-01' (Shrawan 1)
echo $fq1['end']->format('YYYY-MM-DD'), PHP_EOL;   // '2081-06-30' (Aswin end)
```

---

### NepaliDate::getFiscalYearQuarters()

Returns all quarters for a fiscal year.

```php
public static function getFiscalYearQuarters(?int $fiscalYear = null): array{
    Q1: array{start: self, end: self},
    Q2: array{start: self, end: self},
    Q3: array{start: self, end: self},
    Q4: array{start: self, end: self}
}
```

**Parameters:**

- `$fiscalYear` - Fiscal year (optional, defaults to current fiscal year)

**Returns:** Array with all four fiscal quarters, keyed `'Q1'`-`'Q4'`

**Example:**

```php
$fyQuarters = NepaliDate::getFiscalYearQuarters(2081);

// FY 2081/82
echo $fyQuarters['Q1']['start']->format('MMMM YYYY'), PHP_EOL; // 'Shrawan 2081'
echo $fyQuarters['Q4']['end']->format('MMMM YYYY'), PHP_EOL;   // 'Asar 2082'
```

::: info Instance shortcuts
[`getCurrentFiscalYearQuarter()`](/docs/PHP/api/nepali-date-class#getcurrentfiscalyearquarter) and [`getCurrentFiscalYearQuarterDates()`](/docs/PHP/api/nepali-date-class#getcurrentfiscalyearquarterdates) are available as instance methods for getting the fiscal quarter of an existing `NepaliDate`.
:::
