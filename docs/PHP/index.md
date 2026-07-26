# Nepali Date Library

## Overview

The **Nepali Date Library** (`sghimire/nepali-date-library`) is a comprehensive PHP library for working with **Nepali (Bikram Sambat)** dates. It provides a powerful `NepaliDate` class along with utility functions for date conversion, manipulation, formatting, and more.

It is a PHP port of the original TypeScript/JavaScript `NepaliDate` library, with an identical API surface wherever PHP allows it (method names, argument order, and validation messages are kept the same).

## What is Bikram Sambat?

**Bikram Sambat (BS)** is the official calendar of Nepal. It is approximately 56 years and 8 months ahead of the Gregorian calendar (Anno Domini/AD). For example:

- **AD 2026-01-14** = **BS 2082-10-01**
- The Nepali calendar has 12 months with varying lengths (29-32 days)
- The Nepali New Year falls in mid-April (Baisakh 1st)

## Key Features

| Feature                 | Description                                                                    |
| ------------------------ | -------------------------------------------------------------------------------- |
| **Date Conversion**     | Convert between AD and BS dates using `ADtoBS()` and `BStoAD()` functions        |
| **Date Manipulation**   | Add or subtract days, months, and years                                          |
| **Formatting**          | Format dates in both English and Nepali with customizable patterns               |
| **Date Comparison**     | Compare dates, calculate differences, check equality                             |
| **Date Ranges**         | Get start/end of day, week, month, or year                                       |
| **Fiscal Year Support** | Work with Nepali fiscal years and quarters                                       |
| **Calendar Generation** | Generate calendar data for datepicker components                                 |
| **Broad Compatibility** | Supports PHP 7.1 through 8.5, `declare(strict_types=1)` throughout               |

## Supported Date Range

The library supports Nepali dates within the following range:

| Calendar           | Start          | End                     |
| ------------------- | -------------- | ----------------------- |
| **Bikram Sambat**  | 1976 Baisakh 1 | 2100 Chaitra (Last day) |
| **Gregorian (AD)** | April 13, 1919 | ~April 2044             |

This covers over **125 years** of dates with accurate month lengths for each year.

## Quick Example

```php
<?php

require 'vendor/autoload.php';

use NepaliDateLibrary\NepaliDate;
use function NepaliDateLibrary\ADtoBS;
use function NepaliDateLibrary\BStoAD;

// Create a Nepali date from today
$today = new NepaliDate();

// Get date components
echo $today->getYear(), PHP_EOL;  // 2082
echo $today->getMonth(), PHP_EOL; // 9 (0-indexed, so this is Magh)
echo $today->getDate(), PHP_EOL;  // 1

// Format the date
echo $today->format('YYYY-MM-DD'), PHP_EOL;   // 2082-10-01
echo $today->format('MMMM DD, YYYY'), PHP_EOL; // Magh 01, 2082
echo $today->format('yyyy mmmm dd'), PHP_EOL;  // २०८२ माघ ०१

// Convert between calendars
echo ADtoBS('2026-01-14'), PHP_EOL; // '2082-10-01'
echo BStoAD('2082-10-01'), PHP_EOL; // '2026-01-14'
```

## Why Use This Library?

1. **Accuracy**: Uses a comprehensive date map covering BS 1976-2100 with correct month lengths
2. **Full Featured**: Not just conversion - includes manipulation, comparison, formatting, and more
3. **Localization**: Native support for Nepali language and numerals
4. **Fiscal Year**: Built-in support for Nepal's fiscal year (starts Shrawan 1st)
5. **Calendar Ready**: Generate complete calendar data for building datepickers
6. **Consistent Ports**: Same method names and semantics as the [NodeJS](/docs/NodeJS/) and [Python](/docs/Python/) versions, so a team using multiple stacks can share the same mental model
7. **Deterministic Time Getters**: Weekday and time-of-day getters are computed in UTC, so results don't depend on the host machine's timezone
8. **Updates**: We try to update the library every year to cover the latest date range.

::: tip Framework Friendly
Being a plain Composer package with no dependencies, the library drops cleanly into Laravel, Symfony, or any other PHP framework or plain PHP project.
:::
