# NepaliDate Class

The `NepaliDate` class is the core of the library, providing a complete API for creating, manipulating, and formatting Nepali (Bikram Sambat) dates.

## Import

```php
use NepaliDateLibrary\NepaliDate;
```

::: info Timezone Handling
Unlike the NodeJS port (which reads hour/minute/second from the host's local timezone), the PHP port computes `getDay()`, `getHours()`, `getMinutes()`, `getSeconds()`, and day/week/month/year boundaries in **UTC**. This makes results deterministic regardless of the server's configured timezone.
:::

---

## Constructors

The `NepaliDate` constructor accepts several different argument shapes:

### Default Constructor

Creates a `NepaliDate` for the current date and time.

```php
new NepaliDate()
```

**Example:**

```php
$today = new NepaliDate();
echo $today->toString(), PHP_EOL; // '2082/10/1'
```

### From a DateTimeInterface

Creates a `NepaliDate` from a `DateTime` or `DateTimeImmutable` object.

```php
new NepaliDate(DateTimeInterface $date)
```

**Parameters:**

- `$date` - A `DateTime` or `DateTimeImmutable` instance

**Example:**

```php
$phpDate = new DateTimeImmutable('2026-01-14', new DateTimeZone('UTC'));
$nepaliDate = new NepaliDate($phpDate);
echo $nepaliDate->toString(), PHP_EOL; // '2082/10/1'
```

### From NepaliDate

Creates a copy of another `NepaliDate` instance.

```php
new NepaliDate(NepaliDate $date)
```

**Example:**

```php
$original = new NepaliDate();
$copy = new NepaliDate($original);
```

### From Timestamp

Creates a `NepaliDate` from a Unix timestamp in milliseconds.

```php
new NepaliDate(int $timestampMs)
```

**Example:**

```php
$timestampMs = (int) round(microtime(true) * 1000);
$nepaliDate = new NepaliDate($timestampMs);
```

::: warning Timestamp vs. Components
A bare `int` is always treated as a millisecond timestamp. To build a date from year/month/day, pass all three arguments — see [From Components](#from-components) below.
:::

### From Date String

Creates a `NepaliDate` from a formatted BS date string.

```php
new NepaliDate(string $dateString)
```

**Supported formats:**

- `YYYY-MM-DD` (e.g., `'2082-10-01'`)
- `YYYY/MM/DD` (e.g., `'2082/10/01'`)
- `YYYY.MM.DD` (e.g., `'2082.10.01'`)

**Example:**

```php
$date = new NepaliDate('2082-10-15');
echo $date->getYear(), PHP_EOL;  // 2082
echo $date->getMonth(), PHP_EOL; // 9 (0-indexed)
echo $date->getDate(), PHP_EOL;  // 15
```

### From Components

Creates a `NepaliDate` with specific year, month, and day values.

```php
new NepaliDate(int $year, int $month, int $day)
```

**Parameters:**

- `$year` - Nepali year (e.g., 2082)
- `$month` - Nepali month (0-11, where 0 = Baisakh)
- `$day` - Day of month (1-32)

::: warning Month is 0-indexed
The month parameter is 0-indexed: 0 = Baisakh, 1 = Jestha, ..., 11 = Chaitra — matching the NodeJS and Python ports.
:::

**Example:**

```php
// Magh 15, 2082 (month 9 = Magh since 0-indexed)
$date = new NepaliDate(2082, 9, 15);
echo $date->format('MMMM DD, YYYY'), PHP_EOL; // 'Magh 15, 2082'
```

---

## Getter Methods

### getYear()

Returns the Nepali year.

```php
public function getYear(): int
```

**Returns:** Nepali year (e.g., 2082)

**Example:**

```php
$date = new NepaliDate(2082, 9, 15);
echo $date->getYear(), PHP_EOL; // 2082
```

---

### getMonth()

Returns the Nepali month (0-indexed).

```php
public function getMonth(): int
```

**Returns:** Nepali month (0-11, where 0 = Baisakh, 11 = Chaitra)

**Example:**

```php
$date = new NepaliDate(2082, 9, 15);
echo $date->getMonth(), PHP_EOL; // 9 (Magh)
```

---

### getDate()

Returns the day of the month.

```php
public function getDate(): int
```

**Returns:** Day of month (1-32)

**Example:**

```php
$date = new NepaliDate(2082, 9, 15);
echo $date->getDate(), PHP_EOL; // 15
```

---

### getDay()

Returns the day of the week, computed in UTC.

```php
public function getDay(): int
```

**Returns:** Day of week (0-6, where 0 = Sunday, 6 = Saturday)

**Example:**

```php
$date = new NepaliDate(2082, 9, 15);
echo $date->getDay(), PHP_EOL; // 3 (Wednesday)
```

---

### getHours()

Returns the hour component, computed in UTC.

```php
public function getHours(): int
```

**Returns:** Hour (0-23)

---

### getMinutes()

Returns the minutes component, computed in UTC.

```php
public function getMinutes(): int
```

**Returns:** Minutes (0-59)

---

### getSeconds()

Returns the seconds component, computed in UTC.

```php
public function getSeconds(): int
```

**Returns:** Seconds (0-59)

---

### getMilliseconds()

Returns the milliseconds component.

```php
public function getMilliseconds(): int
```

**Returns:** Milliseconds (0-999)

---

### getTime()

Returns the timestamp in milliseconds since the Unix epoch.

```php
public function getTime(): int
```

**Returns:** Timestamp in milliseconds

**Example:**

```php
$date = new NepaliDate();
echo $date->getTime(), PHP_EOL; // 1736848800000
```

---

### getEnglishDate()

Returns the equivalent Gregorian (AD) date as a UTC `DateTimeImmutable`.

```php
public function getEnglishDate(): DateTimeImmutable
```

**Returns:** `DateTimeImmutable` in UTC

**Example:**

```php
$nepaliDate = new NepaliDate(2082, 9, 1);
$englishDate = $nepaliDate->getEnglishDate();
echo $englishDate->format(DateTimeInterface::ATOM), PHP_EOL; // '2026-01-14T00:00:00+00:00'
```

---

## Setter Methods

### setYear()

Sets the Nepali year.

```php
public function setYear(int $year): void
```

**Parameters:**

- `$year` - Nepali year to set

**Example:**

```php
$date = new NepaliDate(2082, 9, 15);
$date->setYear(2083);
echo $date->getYear(), PHP_EOL; // 2083
```

---

### setMonth()

Sets the Nepali month.

```php
public function setMonth(int $month): void
```

**Parameters:**

- `$month` - Nepali month (0-11)

---

### setDate()

Sets the day of month.

```php
public function setDate(int $day): void
```

**Parameters:**

- `$day` - Day of month (1-32)

---

### set()

Sets year, month, and day at once.

```php
public function set(int $year, int $month, int $date): void
```

**Parameters:**

- `$year` - Nepali year
- `$month` - Nepali month (0-11)
- `$date` - Day of month (1-32)

**Example:**

```php
$date = new NepaliDate();
$date->set(2082, 9, 15);
echo $date->toString(), PHP_EOL; // '2082/10/15'
```

---

## Formatting Methods

### format()

Formats the date according to a format string.

```php
public function format(string $formatStr): string
```

**Parameters:**

- `$formatStr` - Format pattern string

**Returns:** Formatted date string

#### English Format Tokens (Uppercase)

| Token  | Description                 | Example        |
| ------ | ---------------------------- | ---------------- |
| `YYYY` | Full year                    | 2082            |
| `YY`   | 2-digit year                 | 82              |
| `MM`   | Month with leading zero      | 01-12           |
| `M`    | Month without leading zero   | 1-12            |
| `MMM`  | Short month name             | Bai, Jes, Mag   |
| `MMMM` | Full month name              | Baisakh, Magh   |
| `DD`   | Day with leading zero        | 01-32           |
| `D`    | Day without leading zero     | 1-32            |
| `DDD`  | Short day name               | Sun, Mon        |
| `DDDD` | Full day name                | Sunday, Monday  |

#### Nepali Format Tokens (Lowercase)

| Token  | Description                 | Example         |
| ------ | ---------------------------- | ----------------- |
| `yyyy` | Full year in Nepali          | २०८२            |
| `yy`   | 2-digit year in Nepali       | ८२              |
| `mm`   | Month with leading zero      | ०१-१२           |
| `m`    | Month without leading zero   | १-१२            |
| `mmm`  | Short month name             | बै, जे, मा      |
| `mmmm` | Full month name              | बैशाख, माघ      |
| `dd`   | Day with leading zero        | ०१-३२           |
| `d`    | Day without leading zero     | १-३२            |
| `ddd`  | Short day name               | आइत, सोम        |
| `dddd` | Full day name                | आइतबार, सोमबार  |

Wrap literal text in double quotes (`"..."`) to keep it from being interpreted as a token, e.g. `"M"MM` outputs `M01`.

**Examples:**

```php
$date = new NepaliDate(2082, 9, 15);

// English formats
echo $date->format('YYYY-MM-DD'), PHP_EOL;      // '2082-10-15'
echo $date->format('MMMM DD, YYYY'), PHP_EOL;   // 'Magh 15, 2082'
echo $date->format('MMM D, YYYY'), PHP_EOL;     // 'Mag 15, 2082'
echo $date->format('DDDD, MMMM DD'), PHP_EOL;   // 'Wednesday, Magh 15'

// Nepali formats
echo $date->format('yyyy-mm-dd'), PHP_EOL;      // '२०८२-१०-१५'
echo $date->format('mmmm dd, yyyy'), PHP_EOL;   // 'माघ १५, २०८२'
echo $date->format('dddd, mmmm dd'), PHP_EOL;   // 'बुधबार, माघ १५'

// Mixed format with literal text
echo $date->format('YYYY"/"MM"/"DD'), PHP_EOL;  // '2082/10/15'
```

---

### toString()

Returns the date as a string in `YYYY/M/D` format with a 1-indexed month, unpadded.

```php
public function toString(): string
```

**Returns:** Date string (e.g., `'2082/10/15'`)

**Example:**

```php
$date = new NepaliDate(2082, 9, 15);
echo $date->toString(), PHP_EOL; // '2082/10/15'
echo $date, PHP_EOL;             // same, via __toString()
```

::: tip
`NepaliDate` implements `__toString()`, so instances can be interpolated directly into strings or passed anywhere PHP expects a `string`-castable value.
:::

---

### parse()

Parses a date string and updates the current instance.

```php
public function parse(string $dateString): void
```

**Parameters:**

- `$dateString` - Date string in format `YYYY-MM-DD`, `YYYY/MM/DD`, or `YYYY.MM.DD`

**Example:**

```php
$date = new NepaliDate();
$date->parse('2082-10-15');
echo $date->getYear(), PHP_EOL;  // 2082
echo $date->getMonth(), PHP_EOL; // 9
echo $date->getDate(), PHP_EOL;  // 15
```

---

## Date Manipulation Methods

### addDays()

Adds the specified number of days and returns a new instance.

```php
public function addDays(int $days): self
```

**Parameters:**

- `$days` - Number of days to add (can be negative)

**Returns:** New `NepaliDate` instance

**Example:**

```php
$date = new NepaliDate(2082, 9, 15);
$tomorrow = $date->addDays(1);
$lastWeek = $date->addDays(-7);
echo $tomorrow->format('YYYY-MM-DD'), PHP_EOL; // '2082-10-16'
```

---

### addMonths()

Adds the specified number of months and returns a new instance.

```php
public function addMonths(int $months): self
```

**Parameters:**

- `$months` - Number of months to add (can be negative)

**Returns:** New `NepaliDate` instance

**Example:**

```php
$date = new NepaliDate(2082, 9, 15);
$nextMonth = $date->addMonths(1);
echo $nextMonth->format('YYYY-MM-DD'), PHP_EOL; // '2082-11-15'
```

---

### addYears()

Adds the specified number of years and returns a new instance.

```php
public function addYears(int $years): self
```

**Parameters:**

- `$years` - Number of years to add (can be negative)

**Returns:** New `NepaliDate` instance

**Example:**

```php
$date = new NepaliDate(2082, 9, 15);
$nextYear = $date->addYears(1);
echo $nextYear->format('YYYY-MM-DD'), PHP_EOL; // '2083-10-15'
```

---

## Date Comparison Methods

### diff()

Calculates the difference between two dates.

```php
public function diff(NepaliDate $date, string $unit): int
```

**Parameters:**

- `$date` - `NepaliDate` to compare with
- `$unit` - Unit of difference: `'year'`, `'month'`, or `'day'`

**Returns:** Difference in the specified unit

**Example:**

```php
$date1 = new NepaliDate(2082, 5, 10);
$date2 = new NepaliDate(2082, 5, 20);

echo $date1->diff($date2, 'day'), PHP_EOL;   // -10
echo $date2->diff($date1, 'day'), PHP_EOL;   // 10
echo $date1->diff($date2, 'month'), PHP_EOL; // 0
```

---

### isAfter()

Checks if this date comes after the specified date.

```php
public function isAfter(NepaliDate $date): bool
```

**Parameters:**

- `$date` - Date to compare with

**Returns:** `true` if this date is after the specified date

**Example:**

```php
$date1 = new NepaliDate(2082, 9, 20);
$date2 = new NepaliDate(2082, 9, 15);
var_dump($date1->isAfter($date2)); // true
```

---

### isBefore()

Checks if this date comes before the specified date.

```php
public function isBefore(NepaliDate $date): bool
```

**Parameters:**

- `$date` - Date to compare with

**Returns:** `true` if this date is before the specified date

**Example:**

```php
$date1 = new NepaliDate(2082, 9, 10);
$date2 = new NepaliDate(2082, 9, 15);
var_dump($date1->isBefore($date2)); // true
```

---

### isEqual()

Checks if this date is exactly equal to the specified date (year, month, day).

```php
public function isEqual(NepaliDate $date): bool
```

**Parameters:**

- `$date` - Date to compare with

**Returns:** `true` if dates are equal

**Example:**

```php
$date1 = new NepaliDate(2082, 9, 15);
$date2 = new NepaliDate(2082, 9, 15);
var_dump($date1->isEqual($date2)); // true
```

---

### isSame()

Checks if this date is the same as the specified date for the given unit.

```php
public function isSame(NepaliDate $date, string $unit): bool
```

**Parameters:**

- `$date` - Date to compare with
- `$unit` - Unit to compare: `'year'`, `'month'`, or `'day'`

**Returns:** `true` if dates are the same for the specified unit

**Example:**

```php
$date1 = new NepaliDate(2082, 9, 10);
$date2 = new NepaliDate(2082, 9, 20);

var_dump($date1->isSame($date2, 'year'));  // true
var_dump($date1->isSame($date2, 'month')); // true
var_dump($date1->isSame($date2, 'day'));   // false
```

---

## Date Range Methods

### startOfDay()

Returns a new `NepaliDate` set to the start of the current day (00:00:00 UTC).

```php
public function startOfDay(): self
```

**Returns:** New `NepaliDate` at start of day

---

### endOfDay()

Returns a new `NepaliDate` set to the end of the current day (23:59:59.999 UTC).

```php
public function endOfDay(): self
```

**Returns:** New `NepaliDate` at end of day

---

### startOfWeek()

Returns a new `NepaliDate` representing the start of the week.

```php
public function startOfWeek(int $startOfWeek = 0): self
```

**Parameters:**

- `$startOfWeek` - Day to consider as start of week (0-6, 0 = Sunday). Default: `0`

**Returns:** New `NepaliDate` at start of week

**Example:**

```php
$date = new NepaliDate(2082, 9, 15); // Wednesday
$weekStart = $date->startOfWeek();   // Previous Sunday
$weekStartMon = $date->startOfWeek(1); // Previous Monday
```

---

### endOfWeek()

Returns a new `NepaliDate` representing the end of the week.

```php
public function endOfWeek(int $startOfWeek = 0): self
```

**Parameters:**

- `$startOfWeek` - Day to consider as start of week (0-6, 0 = Sunday). Default: `0`

**Returns:** New `NepaliDate` at end of week

---

### startOfMonth()

Returns a new `NepaliDate` representing the first day of the month.

```php
public function startOfMonth(): self
```

**Returns:** New `NepaliDate` at first day of month

**Example:**

```php
$date = new NepaliDate(2082, 9, 15);
$monthStart = $date->startOfMonth();
echo $monthStart->format('YYYY-MM-DD'), PHP_EOL; // '2082-10-01'
```

---

### endOfMonth()

Returns a new `NepaliDate` representing the last day of the month.

```php
public function endOfMonth(): self
```

**Returns:** New `NepaliDate` at last day of month

**Example:**

```php
$date = new NepaliDate(2082, 9, 15);
$monthEnd = $date->endOfMonth();
echo $monthEnd->format('YYYY-MM-DD'), PHP_EOL; // '2082-10-29'
```

---

### startOfYear()

Returns a new `NepaliDate` representing the first day of the year (1st Baisakh).

```php
public function startOfYear(): self
```

**Returns:** New `NepaliDate` at first day of year

**Example:**

```php
$date = new NepaliDate(2082, 9, 15);
$yearStart = $date->startOfYear();
echo $yearStart->format('YYYY-MM-DD'), PHP_EOL; // '2082-01-01'
```

---

### endOfYear()

Returns a new `NepaliDate` representing the last day of the year (last day of Chaitra).

```php
public function endOfYear(): self
```

**Returns:** New `NepaliDate` at last day of year

---

## Date Information Methods

### daysInMonth()

Returns the number of days in a given (or the current) month.

```php
public function daysInMonth(?int $year = null, ?int $month = null): int
```

**Parameters:**

- `$year` - Nepali year (optional, defaults to this instance's year)
- `$month` - Nepali month, 0-11 (optional, defaults to this instance's month)

**Returns:** Number of days (29-32)

**Example:**

```php
$date = new NepaliDate(2082, 9, 15); // Magh 2082
echo $date->daysInMonth(), PHP_EOL; // 30

// Check any month statically without a matching instance
echo $date->daysInMonth(2081, 5), PHP_EOL;
```

---

### isLeapYear()

Checks if the current year is a leap year in the Nepali calendar.

```php
public function isLeapYear(): bool
```

**Returns:** `true` if leap year

---

### getWeeksInMonth()

Calculates the number of weeks in the current month.

```php
public function getWeeksInMonth(): int
```

**Returns:** Number of weeks

---

## Quarter Methods

### getCurrentQuarter()

Returns the quarter number (1-4) for the current date.

```php
public function getCurrentQuarter(): int
```

**Returns:** Quarter number (1-4)

**Example:**

```php
$date = new NepaliDate(2082, 9, 15); // Magh = Q4
echo $date->getCurrentQuarter(), PHP_EOL; // 4
```

---

### getCurrentFiscalYearQuarter()

Returns the current fiscal year quarter number (1-4).

```php
public function getCurrentFiscalYearQuarter(): int
```

**Returns:** Fiscal year quarter number (1-4)

::: info Fiscal Year
Nepal's fiscal year starts from Shrawan 1st (month index 3). So:

- Q1: Shrawan - Aswin (months 3-5)
- Q2: Kartik - Poush (months 6-8)
- Q3: Magh - Chaitra (months 9-11)
- Q4: Baisakh - Asar (months 0-2)
:::

---

### getCurrentFiscalYearQuarterDates()

Returns the start and end dates of the current fiscal year quarter.

```php
public function getCurrentFiscalYearQuarterDates(): array{start: self, end: self}
```

**Returns:** Array with `'start'` and `'end'` `NepaliDate` values

::: tip Arrays, not objects
Wherever the NodeJS/Python ports return an object with `start`/`end` properties, the PHP port returns an associative array with `'start'`/`'end'` keys — access them as `$result['start']` / `$result['end']`.
:::

---

## Utility Methods

### clone()

Creates a copy of the current `NepaliDate` instance.

```php
public function clone(): self
```

**Returns:** New `NepaliDate` with the same date and time

**Example:**

```php
$date = new NepaliDate(2082, 9, 15);
$copy = $date->clone();
$copy->setDate(20);
echo $date->getDate(), PHP_EOL; // 15 (unchanged)
echo $copy->getDate(), PHP_EOL; // 20
```

---

### isValidInstance()

Checks if the current `NepaliDate` instance contains a valid date.

```php
public function isValidInstance(): bool
```

**Returns:** `true` if valid

::: warning Named differently from NodeJS/Python
NodeJS and Python expose an instance method named `isValid()`. PHP cannot have a static and an instance method share the same name, and `NepaliDate::isValid()` is already used for the [static validator](/docs/PHP/api/static-methods#isvalid-static) — so the instance check is named `isValidInstance()` here.
:::
