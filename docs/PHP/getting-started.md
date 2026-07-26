# Getting Started

## Requirements

The library requires **PHP 7.1 through 8.5** and has no runtime dependencies.

## Installation

Install the library with [Composer](https://getcomposer.org/):

```bash [Composer]
composer require sghimire/nepali-date-library
```

## Importing

The library lives under the `NepaliDateLibrary` namespace. Import the class and functions you need:

```php
<?php

require 'vendor/autoload.php';

use NepaliDateLibrary\NepaliDate;
use function NepaliDateLibrary\ADtoBS;
use function NepaliDateLibrary\BStoAD;
```

### Referencing Constants

Month names, weekday names, and the raw calendar map live on the `Constants` helper class:

```php
use NepaliDateLibrary\Helper\Constants;

Constants::$MONTH_EN;       // English month names
Constants::$MONTH_NP;       // Nepali month names
Constants::$WEEK_EN;        // English weekday names
Constants::$WEEK_NP;        // Nepali weekday names
Constants::$NUMBER_NP;      // Nepali digits (०-९)
Constants::$NEPALI_DATE_MAP; // Full BS 1976-2100 calendar map
```

## Quick Start

### Creating a NepaliDate

There are multiple ways to create a `NepaliDate` instance:

```php
// Current date and time
$today = new NepaliDate();

// From a DateTimeInterface (DateTime or DateTimeImmutable)
$fromDate = new NepaliDate(new DateTimeImmutable());

// From year, month (0-indexed), day
$specific = new NepaliDate(2082, 9, 15); // Magh 15, 2082

// From a date string (YYYY-MM-DD, YYYY/MM/DD, or YYYY.MM.DD)
$fromString = new NepaliDate('2082-10-01');

// From a Unix timestamp in milliseconds
$fromTimestamp = new NepaliDate((int) (microtime(true) * 1000));

// Clone another NepaliDate
$clone = new NepaliDate($today);
```

::: warning Month is 0-indexed
When creating a date with year, month, and day, the month is **0-indexed** (0 = Baisakh, 11 = Chaitra), matching the NodeJS and Python ports.
:::

### Date Conversion

```php
use function NepaliDateLibrary\ADtoBS;
use function NepaliDateLibrary\BStoAD;

// Convert AD (Gregorian) to BS (Nepali)
$bsDate = ADtoBS('2026-01-14');
echo $bsDate, PHP_EOL; // '2082-10-01'

// Convert BS (Nepali) to AD (Gregorian)
$adDate = BStoAD('2082-10-01');
echo $adDate, PHP_EOL; // '2026-01-14'

// Using the NepaliDate class
$nepaliDate = new NepaliDate();
$englishDate = $nepaliDate->getEnglishDate(); // Returns a DateTimeImmutable (UTC)
```

### Formatting Dates

```php
$date = new NepaliDate(2082, 9, 15);

// English format tokens (uppercase)
echo $date->format('YYYY-MM-DD'), PHP_EOL;    // '2082-10-15'
echo $date->format('MMMM DD, YYYY'), PHP_EOL; // 'Magh 15, 2082'
echo $date->format('MMM D, YYYY'), PHP_EOL;   // 'Mag 15, 2082'
echo $date->format('DDDD'), PHP_EOL;          // 'Wednesday'

// Nepali format tokens (lowercase)
echo $date->format('yyyy-mm-dd'), PHP_EOL;     // '२०८२-१०-१५'
echo $date->format('mmmm dd, yyyy'), PHP_EOL;  // 'माघ १५, २०८२'
echo $date->format('dddd'), PHP_EOL;           // 'बुधबार'
```

### Date Manipulation

```php
$date = new NepaliDate(2082, 9, 15);

// Add days, months, or years (returns a new instance)
$tomorrow = $date->addDays(1);
$nextMonth = $date->addMonths(1);
$nextYear = $date->addYears(1);

// Go backwards with negative values
$yesterday = $date->addDays(-1);
$lastMonth = $date->addMonths(-1);
```

### Date Comparison

```php
$date1 = new NepaliDate(2082, 5, 10);
$date2 = new NepaliDate(2082, 5, 20);

// Comparison methods
var_dump($date1->isBefore($date2)); // true
var_dump($date1->isAfter($date2));  // false
var_dump($date1->isEqual($date2));  // false

// Check if same year/month/day
var_dump($date1->isSame($date2, 'year'));  // true
var_dump($date1->isSame($date2, 'month')); // true
var_dump($date1->isSame($date2, 'day'));   // false

// Calculate difference
echo $date1->diff($date2, 'day'), PHP_EOL;   // -10
echo $date1->diff($date2, 'month'), PHP_EOL; // 0
```

## Laravel & Symfony Usage

The package has no framework dependencies, so it works as-is anywhere Composer autoloading is available. A common pattern is a thin service/wrapper for converting between your ORM's `DateTime` and `NepaliDate`:

```php
use NepaliDateLibrary\NepaliDate;

class NepaliDateService
{
    public static function fromModel(\DateTimeInterface $date): NepaliDate
    {
        return new NepaliDate($date);
    }

    public static function displayFormat(NepaliDate $date): string
    {
        return $date->format('MMMM DD, YYYY');
    }
}
```

## Error Handling

Invalid input (out-of-range years, invalid months/days, malformed strings) throws `InvalidArgumentException`. Conversion failures from `ADtoBS()`/`BStoAD()` throw `RuntimeException` with the original error available via `getPrevious()`:

```php
use function NepaliDateLibrary\ADtoBS;

try {
    ADtoBS('1900-01-01'); // Before the supported range
} catch (RuntimeException $e) {
    echo $e->getMessage(), PHP_EOL; // 'Failed to convert AD to BS'
    echo $e->getPrevious()->getMessage(), PHP_EOL; // Underlying cause
}
```

## Quick Reference

### Most Used Methods

| Method            | Description                  | Example                        |
| ----------------- | ----------------------------- | -------------------------------- |
| `getYear()`      | Get Nepali year               | `$date->getYear()` → `2082`    |
| `getMonth()`     | Get Nepali month (0-11)       | `$date->getMonth()` → `9`      |
| `getDate()`      | Get Nepali day                | `$date->getDate()` → `15`      |
| `format($str)`   | Format date as string         | `$date->format('YYYY-MM-DD')`  |
| `addDays($n)`    | Add n days                    | `$date->addDays(7)`            |
| `addMonths($n)`  | Add n months                  | `$date->addMonths(1)`          |
| `addYears($n)`   | Add n years                   | `$date->addYears(1)`           |
| `isBefore($d)`   | Check if before another date  | `$date1->isBefore($date2)`     |
| `isAfter($d)`    | Check if after another date   | `$date1->isAfter($date2)`      |
| `clone()`        | Create a copy                 | `$date->clone()`               |

### Conversion Functions

| Function       | Description       | Example                                 |
| --------------- | ------------------ | ------------------------------------------ |
| `ADtoBS($str)` | Convert AD to BS   | `ADtoBS('2026-01-14')` → `'2082-10-01'` |
| `BStoAD($str)` | Convert BS to AD   | `BStoAD('2082-10-01')` → `'2026-01-14'` |
