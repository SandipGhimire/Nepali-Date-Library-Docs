# Use Cases

This section covers common patterns and real-world use cases for the Nepali Date Library (PHP).

## Overview

The library is designed to handle various date-related tasks in Nepali PHP applications:

| Use Case                   | Description                             | Link                                                             |
| --------------------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| **Date Conversion**        | Converting between AD and BS dates      | [→ Date Conversion](/docs/PHP/use-cases/date-conversion)         |
| **Calendar Generation**    | Building datepickers and calendars      | [→ Calendar Generation](/docs/PHP/use-cases/calendar-generation) |
| **Fiscal Year Operations** | Working with Nepal's fiscal year        | [→ Fiscal Year](/docs/PHP/use-cases/fiscal-year)                 |
| **Date Ranges**            | Working with week/month/year boundaries | [→ Date Ranges](/docs/PHP/use-cases/date-ranges)                 |

## Common Scenarios

### Web Applications (Laravel, Symfony, plain PHP)

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

```php
use NepaliDateLibrary\NepaliDate;

$today = new NepaliDate();

// Full Nepali format
echo $today->format('dddd, mmmm dd, yyyy'), PHP_EOL;
// Output: बुधबार, माघ ०१, २०८२

// Mixed format
echo $today->format('MMMM DD, YYYY (dddd)'), PHP_EOL;
// Output: Magh 01, 2082 (बुधबार)
```

### Convert API Dates

```php
use function NepaliDateLibrary\ADtoBS;

// Response from an API with a Gregorian date
$apiResponse = ['createdAt' => '2026-01-14T10:30:00Z'];

// Convert to Nepali date for display
$nepaliDate = ADtoBS(explode('T', $apiResponse['createdAt'])[0]);
echo "Created on: {$nepaliDate}", PHP_EOL; // Created on: 2082-10-01
```

### Age Calculation

```php
use NepaliDateLibrary\NepaliDate;

function calculateAge(string $birthDate): int
{
    $dob = new NepaliDate($birthDate);
    $today = new NepaliDate();
    return $today->diff($dob, 'year');
}

echo calculateAge('2050-05-15'), PHP_EOL; // 32
```

### Date Validation

```php
use NepaliDateLibrary\NepaliDate;

function validateNepaliDate(int $year, int $month, int $day): bool
{
    return NepaliDate::isValid($year, $month, $day);
}

// Validate user input
$userYear = 2082;
$userMonth = 9; // 0-indexed
$userDay = 32;

if (validateNepaliDate($userYear, $userMonth, $userDay)) {
    echo 'Valid date', PHP_EOL;
} else {
    echo 'Invalid date', PHP_EOL; // Day too high for Magh
}
```
