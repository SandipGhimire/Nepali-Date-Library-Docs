# Examples

This section provides practical code examples for common tasks with the Nepali Date Library (PHP).

## Quick Navigation

| Category                      | Description                    |
| ------------------------------ | --------------------------------- |
| [Basic Usage](#basic-usage)   | Creating dates, getting values |
| [Formatting](#formatting)     | English and Nepali formatting  |
| [Conversion](#conversion)     | AD ↔ BS conversion             |
| [Manipulation](#manipulation) | Adding/subtracting time        |
| [Comparison](#comparison)     | Comparing dates                |
| [Quarters](#quarters)         | Working with quarters          |
| [Fiscal Year](#fiscal-year)   | Fiscal year operations         |
| [Calendar](#calendar)         | Building calendars             |

---

## Basic Usage {#basic-usage}

### Create Dates

```php
use NepaliDateLibrary\NepaliDate;

// Current date
$today = new NepaliDate();

// From year, month (0-indexed), day
$date1 = new NepaliDate(2082, 9, 15); // Magh 15, 2082

// From string
$date2 = new NepaliDate('2082-10-15');

// From a DateTimeImmutable
$date3 = new NepaliDate(new DateTimeImmutable('2026-01-14', new DateTimeZone('UTC')));

// Clone
$date4 = $today->clone();
```

### Get Date Components

```php
$date = new NepaliDate(2082, 9, 15);

echo $date->getYear(), PHP_EOL; // 2082
echo $date->getMonth(), PHP_EOL; // 9 (Magh)
echo $date->getDate(), PHP_EOL; // 15
echo $date->getDay(), PHP_EOL; // 3 (Wednesday)
echo $date->toString(), PHP_EOL; // '2082/10/15'
```

---

## Formatting {#formatting}

### English Format

```php
$date = new NepaliDate(2082, 9, 15);

echo $date->format('YYYY-MM-DD'), PHP_EOL;    // '2082-10-15'
echo $date->format('YYYY/MM/DD'), PHP_EOL;    // '2082/10/15'
echo $date->format('MMM D, YYYY'), PHP_EOL;   // 'Mag 15, 2082'
echo $date->format('MMMM DD, YYYY'), PHP_EOL; // 'Magh 15, 2082'
echo $date->format('DDDD'), PHP_EOL;          // 'Wednesday'
echo $date->format('DDDD, MMMM DD'), PHP_EOL; // 'Wednesday, Magh 15'
```

### Nepali Format

```php
$date = new NepaliDate(2082, 9, 15);

echo $date->format('yyyy-mm-dd'), PHP_EOL;    // '२०८२-१०-१५'
echo $date->format('mmmm dd, yyyy'), PHP_EOL; // 'माघ १५, २०८२'
echo $date->format('dddd'), PHP_EOL;          // 'बुधबार'
echo $date->format('dddd, mmmm dd'), PHP_EOL; // 'बुधबार, माघ १५'
```

### Mixed Format

```php
$date = new NepaliDate(2082, 9, 15);

// English date, Nepali day name
echo $date->format('MMMM DD, YYYY (dddd)'), PHP_EOL;
// 'Magh 15, 2082 (बुधबार)'

// Nepali date, English day name
echo $date->format('mmmm dd, yyyy (DDDD)'), PHP_EOL;
// 'माघ १५, २०८२ (Wednesday)'
```

---

## Conversion {#conversion}

### AD to BS

```php
use function NepaliDateLibrary\ADtoBS;

echo ADtoBS('2026-01-14'), PHP_EOL; // '2082-10-01'
echo ADtoBS('2024-04-14'), PHP_EOL; // '2081-01-01' (New Year)
echo ADtoBS('2025-12-25'), PHP_EOL; // '2082-09-10'
```

### BS to AD

```php
use function NepaliDateLibrary\BStoAD;

echo BStoAD('2082-10-01'), PHP_EOL; // '2026-01-14'
echo BStoAD('2082-01-01'), PHP_EOL; // '2025-04-14' (New Year)
echo BStoAD('2081-12-30'), PHP_EOL; // '2025-04-13'
```

### Using the NepaliDate Class

```php
use NepaliDateLibrary\NepaliDate;

// AD to BS
$adDate = new DateTimeImmutable('2026-01-14', new DateTimeZone('UTC'));
$bsDate = new NepaliDate($adDate);
echo $bsDate->format('YYYY-MM-DD'), PHP_EOL; // '2082-10-01'

// BS to AD
$nepaliDate = new NepaliDate('2082-10-01');
$englishDate = $nepaliDate->getEnglishDate();
echo $englishDate->format('Y-m-d'), PHP_EOL; // '2026-01-14'
```

---

## Manipulation {#manipulation}

### Add Days

```php
$date = new NepaliDate(2082, 9, 15);

$tomorrow = $date->addDays(1);
echo $tomorrow->format('YYYY-MM-DD'), PHP_EOL; // '2082-10-16'

$nextWeek = $date->addDays(7);
echo $nextWeek->format('YYYY-MM-DD'), PHP_EOL; // '2082-10-22'

$yesterday = $date->addDays(-1);
echo $yesterday->format('YYYY-MM-DD'), PHP_EOL; // '2082-10-14'
```

### Add Months

```php
$date = new NepaliDate(2082, 9, 15);

$nextMonth = $date->addMonths(1);
echo $nextMonth->format('MMMM YYYY'), PHP_EOL; // 'Falgun 2082'

$threeMonthsAgo = $date->addMonths(-3);
echo $threeMonthsAgo->format('MMMM YYYY'), PHP_EOL; // 'Kartik 2082'
```

### Add Years

```php
$date = new NepaliDate(2082, 9, 15);

$nextYear = $date->addYears(1);
echo $nextYear->format('YYYY'), PHP_EOL; // '2083'

$fiveYearsAgo = $date->addYears(-5);
echo $fiveYearsAgo->format('YYYY'), PHP_EOL; // '2077'
```

---

## Comparison {#comparison}

### Compare Dates

```php
$date1 = new NepaliDate(2082, 9, 10);
$date2 = new NepaliDate(2082, 9, 20);

var_dump($date1->isBefore($date2)); // true
var_dump($date1->isAfter($date2));  // false
var_dump($date1->isEqual($date2));  // false

$date3 = new NepaliDate(2082, 9, 10);
var_dump($date1->isEqual($date3)); // true
```

### Compare by Unit

```php
$date1 = new NepaliDate(2082, 9, 10);
$date2 = new NepaliDate(2082, 9, 20);

var_dump($date1->isSame($date2, 'year'));  // true
var_dump($date1->isSame($date2, 'month')); // true
var_dump($date1->isSame($date2, 'day'));   // false
```

### Calculate Difference

```php
$date1 = new NepaliDate(2082, 0, 1);  // Baisakh 1
$date2 = new NepaliDate(2082, 11, 30); // Chaitra 30

echo $date1->diff($date2, 'day'), PHP_EOL;   // ~365 days
echo $date1->diff($date2, 'month'), PHP_EOL; // 11
echo $date1->diff($date2, 'year'), PHP_EOL;  // 0
```

---

## Quarters {#quarters}

### Get Current Quarter

```php
$date = new NepaliDate(2082, 9, 15);
$quarter = $date->getCurrentQuarter();
echo "Quarter: Q{$quarter}", PHP_EOL; // Q4 (Magh is in Q4)
```

### Get Quarter Dates

```php
$q1 = NepaliDate::getQuarter(1, 2082);
echo "Q1 Start: " . $q1['start']->format('MMMM DD'), PHP_EOL; // Baisakh 01
echo "Q1 End: " . $q1['end']->format('MMMM DD'), PHP_EOL;     // Asar 30/31
```

### Get All Quarters

```php
$quarters = NepaliDate::getQuarters(2082);

foreach ($quarters as $key => $value) {
    echo "{$key}: " . $value['start']->format('MMM') . ' - ' . $value['end']->format('MMM YYYY'), PHP_EOL;
}
// Q1: Bai - Asa 2082
// Q2: Shr - Asw 2082
// Q3: Kar - Pou 2082
// Q4: Mag - Cha 2082
```

---

## Fiscal Year {#fiscal-year}

### Current Fiscal Year

```php
$fy = NepaliDate::getCurrentFiscalYear();
echo "Fiscal Year: {$fy}/" . ($fy + 1), PHP_EOL; // 2081/82
```

### Fiscal Quarter

```php
$date = new NepaliDate();
$fq = $date->getCurrentFiscalYearQuarter();
echo "Fiscal Quarter: FQ{$fq}", PHP_EOL;
```

### Fiscal Year Quarters

```php
$fyQuarters = NepaliDate::getFiscalYearQuarters(2081);

echo "FY 2081/82:", PHP_EOL;
foreach (['Q1', 'Q2', 'Q3', 'Q4'] as $q) {
    $range = $fyQuarters[$q];
    echo "  F{$q}: " . $range['start']->format('MMM YYYY') . ' - ' . $range['end']->format('MMM YYYY'), PHP_EOL;
}
```

---

## Calendar {#calendar}

### Generate Calendar

```php
$calendar = NepaliDate::getCalendarDays(2082, 9);

echo "Previous month days: ", print_r($calendar['prevMonth']['days'], true);
echo "Current month days: ", print_r($calendar['currentMonth']['days'], true);
echo "Next month days: ", print_r($calendar['nextMonth']['days'], true);
```

### Simple Calendar Display

```php
use NepaliDateLibrary\Helper\Constants;
use NepaliDateLibrary\NepaliDate;

function printCalendar(int $year, int $month): void
{
    $date = new NepaliDate($year, $month, 1);
    $calendar = NepaliDate::getCalendarDays($year, $month);

    echo PHP_EOL . '  ' . $date->format('MMMM YYYY'), PHP_EOL;
    echo ' ' . implode(' ', Constants::$WEEK_SHORT_EN), PHP_EOL;

    $allDays = [
        ...array_map(fn ($d) => "({$d})", $calendar['prevMonth']['days']),
        ...array_map(fn ($d) => str_pad((string) $d, 3, ' ', STR_PAD_LEFT), $calendar['currentMonth']['days']),
        ...array_map(fn ($d) => "({$d})", $calendar['nextMonth']['days']),
    ];

    foreach (array_chunk($allDays, 7) as $week) {
        echo implode(' ', $week), PHP_EOL;
    }
}

printCalendar(2082, 9); // Magh 2082
```
