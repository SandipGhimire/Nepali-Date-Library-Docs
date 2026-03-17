# Nepali Date Library for Python

## Overview

The **Nepali Date Library** (`nepali-date-library`) is a comprehensive Python library for working with **Nepali (Bikram Sambat)** dates. It provides a powerful `NepaliDate` class along with utility functions for date conversion, manipulation, formatting, and more.

## What is Bikram Sambat?

**Bikram Sambat (BS)** is the official calendar of Nepal. It is approximately 56 years and 8 months ahead of the Gregorian calendar (Anno Domini/AD). For example:

- **AD 2026-01-14** = **BS 2082-10-01**
- The Nepali calendar has 12 months with varying lengths (29-32 days)
- The Nepali New Year falls in mid-April (Baisakh 1st)

## Key Features

| Feature                 | Description                                                               |
| ----------------------- | ------------------------------------------------------------------------- |
| **Date Conversion**     | Convert between AD and BS dates using `ADtoBS()` and `BStoAD()` functions |
| **Date Manipulation**   | Add or subtract days, months, and years                                   |
| **Formatting**          | Format dates in both English and Nepali with customizable patterns        |
| **Date Comparison**     | Compare dates, calculate differences, check equality                      |
| **Date Ranges**         | Get start/end of day, week, month, or year                                |
| **Fiscal Year Support** | Work with Nepali fiscal years and quarters                                |
| **Calendar Generation** | Generate calendar data for datepicker components                          |
| **Pythonic API**        | Built to work seamlessly with native `datetime` and Python standards      |

## Supported Date Range

The library supports Nepali dates within the following range:

| Calendar           | Start          | End                     |
| ------------------ | -------------- | ----------------------- |
| **Bikram Sambat**  | 1976 Baisakh 1 | 2100 Chaitra (Last day) |
| **Gregorian (AD)** | April 13, 1886 | ~April 2044             |

This covers over **150 years** of dates with accurate month lengths for each year.

## Quick Example

```python
from nepali_date_library import NepaliDate, ADtoBS, BStoAD

# Create a Nepali date from today
today = NepaliDate()

# Get date components
print(today.get_year())  # 2082
print(today.get_month()) # 9 (0-indexed, so this is Magh)
print(today.get_date())  # 1

# Format the date
print(today.format("YYYY-MM-DD"))    # 2082-10-01
print(today.format("MMMM DD, YYYY")) # Magh 01, 2082
print(today.format("yyyy mmmm dd"))  # २०८२ माघ ०१

# Convert between calendars
bs = ADtoBS("2026-01-14") # '2082-10-01'
ad = BStoAD("2082-10-01") # '2026-01-14'
```

## Why Use This Library?

1. **Accuracy**: Uses a comprehensive date map covering BS 1976-2100 with correct month lengths.
2. **Full Featured**: Not just conversion - includes manipulation, comparison, formatting, and more.
3. **Localization**: Native support for Nepali language and numerals.
4. **Fiscal Year**: Built-in support for Nepal's fiscal year (starts Shrawan 1st).
5. **Calendar Ready**: Generate complete calendar data for building datepickers or rendering templates.
6. **Pure Python**: Written natively for Python applications, ensuring smooth integration with frameworks like Django, Flask, or FastAPI.
7. **Updates**: We actively update the library to cover the latest date range map.
