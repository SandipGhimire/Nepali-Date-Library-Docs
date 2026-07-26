# Fiscal Year Operations

Nepal's fiscal year starts on **Shrawan 1st** (mid-July) and ends on **Asar end** (mid-July of the next year). The library provides comprehensive support for fiscal year calculations.

## Understanding Nepal's Fiscal Year

| Fiscal Year | Start Date (BS) | End Date (BS) | Approximate AD Range |
| ------------ | ---------------- | -------------- | ----------------------- |
| FY 2080/81  | 2080 Shrawan 1  | 2081 Asar 31  | Jul 2023 - Jul 2024  |
| FY 2081/82  | 2081 Shrawan 1  | 2082 Asar 30  | Jul 2024 - Jul 2025  |
| FY 2082/83  | 2082 Shrawan 1  | 2083 Asar 30  | Jul 2025 - Jul 2026  |

### Fiscal Quarters

| Quarter | Months          | Month Indices            |
| ------- | ---------------- | --------------------------- |
| FQ1     | Shrawan - Aswin | 3-5                       |
| FQ2     | Kartik - Poush  | 6-8                       |
| FQ3     | Magh - Chaitra  | 9-11                      |
| FQ4     | Baisakh - Asar  | 0-2 (next calendar year) |

---

## Getting Current Fiscal Year

```php
use NepaliDateLibrary\NepaliDate;

// Get current fiscal year
$currentFY = NepaliDate::getCurrentFiscalYear();
echo "Current Fiscal Year: {$currentFY}/" . ($currentFY + 1), PHP_EOL;
// Output: Current Fiscal Year: 2081/82

// Check fiscal year for a specific date
$date = new NepaliDate(2082, 9, 15); // Magh 2082
// This is still in FY 2081/82 (since FY runs Shrawan to Asar)
```

---

## Fiscal Year Quarters

### Get Current Quarter

```php
use NepaliDateLibrary\NepaliDate;

$date = new NepaliDate(2082, 9, 15); // Magh 15, 2082

// Get fiscal quarter (1-4)
$quarter = $date->getCurrentFiscalYearQuarter();
echo "Fiscal Quarter: Q{$quarter}", PHP_EOL; // Q3 (Magh is in Q3)
```

### Get Quarter Date Range

```php
use NepaliDateLibrary\NepaliDate;

// Get dates for a specific fiscal quarter
$q1 = NepaliDate::getFiscalYearQuarter(1, 2081);
echo "FQ1 2081/82:", PHP_EOL;
echo "  Start: " . $q1['start']->format('MMMM DD, YYYY'), PHP_EOL; // Shrawan 01, 2081
echo "  End: " . $q1['end']->format('MMMM DD, YYYY'), PHP_EOL;     // Aswin end, 2081

$q4 = NepaliDate::getFiscalYearQuarter(4, 2081);
echo "FQ4 2081/82:", PHP_EOL;
echo "  Start: " . $q4['start']->format('MMMM DD, YYYY'), PHP_EOL; // Baisakh 01, 2082
echo "  End: " . $q4['end']->format('MMMM DD, YYYY'), PHP_EOL;     // Asar end, 2082
```

### Get All Quarters for a Fiscal Year

```php
use NepaliDateLibrary\NepaliDate;

$fyQuarters = NepaliDate::getFiscalYearQuarters(2081);

echo "Fiscal Year 2081/82 Quarters:", PHP_EOL;
foreach (['Q1', 'Q2', 'Q3', 'Q4'] as $q) {
    $range = $fyQuarters[$q];
    echo "{$q}: " . $range['start']->format('MMM YYYY') . ' - ' . $range['end']->format('MMM YYYY'), PHP_EOL;
}
```

---

## Financial Reporting

### Generate Fiscal Year Report Header

```php
use NepaliDateLibrary\NepaliDate;

/**
 * @return array{fiscalYear: string, startDate: NepaliDate, endDate: NepaliDate, currentQuarter: int, quarterProgress: string}
 */
function getFiscalYearInfo(): array
{
    $fy = NepaliDate::getCurrentFiscalYear();
    $quarters = NepaliDate::getFiscalYearQuarters($fy);
    $today = new NepaliDate();
    $currentQuarter = $today->getCurrentFiscalYearQuarter();

    // Calculate quarter progress
    $qDates = $today->getCurrentFiscalYearQuarterDates();
    $totalDays = $qDates['start']->diff($qDates['end'], 'day') * -1;
    $daysElapsed = $qDates['start']->diff($today, 'day') * -1;
    $progress = (int) round(($daysElapsed / $totalDays) * 100);

    return [
        'fiscalYear' => "{$fy}/" . substr((string) ($fy + 1), -2),
        'startDate' => $quarters['Q1']['start'],
        'endDate' => $quarters['Q4']['end'],
        'currentQuarter' => $currentQuarter,
        'quarterProgress' => "{$progress}%",
    ];
}

$info = getFiscalYearInfo();
echo "Fiscal Year: {$info['fiscalYear']}", PHP_EOL;
echo "Current Quarter: Q{$info['currentQuarter']} ({$info['quarterProgress']} complete)", PHP_EOL;
```

### Quarterly Report Dates

```php
use NepaliDateLibrary\NepaliDate;

/**
 * @return array<int, array{quarter: string, reportingPeriod: string, startDate: string, endDate: string, dueDate: string}>
 */
function getQuarterlyReportDates(int $fiscalYear): array
{
    $quarters = NepaliDate::getFiscalYearQuarters($fiscalYear);
    $periods = [
        'Q1' => 'Shrawan - Aswin',
        'Q2' => 'Kartik - Poush',
        'Q3' => 'Magh - Chaitra',
        'Q4' => 'Baisakh - Asar',
    ];

    $reports = [];
    foreach ($periods as $q => $label) {
        $range = $quarters[$q];
        $reports[] = [
            'quarter' => $q,
            'reportingPeriod' => $label,
            'startDate' => $range['start']->format('YYYY-MM-DD'),
            'endDate' => $range['end']->format('YYYY-MM-DD'),
            'dueDate' => $range['end']->addDays(25)->format('YYYY-MM-DD'), // 25 days after quarter end
        ];
    }

    return $reports;
}

$reports = getQuarterlyReportDates(2081);
print_r($reports);
```

---

## Tax Period Calculations

### Check if Date is in Fiscal Year

```php
use NepaliDateLibrary\NepaliDate;

function isInFiscalYear(NepaliDate $date, int $fiscalYear): bool
{
    $quarters = NepaliDate::getFiscalYearQuarters($fiscalYear);
    $fyStart = $quarters['Q1']['start'];
    $fyEnd = $quarters['Q4']['end'];

    return !$date->isBefore($fyStart) && !$date->isAfter($fyEnd);
}

$date = new NepaliDate(2082, 3, 15); // Shrawan 15, 2082
var_dump(isInFiscalYear($date, 2081)); // false (this is FY 2082/83)
var_dump(isInFiscalYear($date, 2082)); // true
```

### Get Fiscal Year for Any Date

```php
use NepaliDateLibrary\NepaliDate;

function getFiscalYearForDate(NepaliDate $date): int
{
    $month = $date->getMonth();
    $year = $date->getYear();

    // If month is Shrawan (3) or later, FY starts in the current calendar year
    // If month is before Shrawan (0-2), FY started in the previous calendar year
    return $month >= 3 ? $year : $year - 1;
}

echo getFiscalYearForDate(new NepaliDate(2082, 9, 15)), PHP_EOL; // 2081 (Magh is FQ3 of 2081/82)
echo getFiscalYearForDate(new NepaliDate(2082, 1, 15)), PHP_EOL; // 2081 (Jestha is FQ4 of 2081/82)
echo getFiscalYearForDate(new NepaliDate(2082, 4, 15)), PHP_EOL; // 2082 (Bhadra is FQ1 of 2082/83)
```

---

## Remaining Days Calculations

### Days Remaining in Fiscal Year

```php
use NepaliDateLibrary\NepaliDate;

function daysRemainingInFiscalYear(): int
{
    $today = new NepaliDate();
    $fy = NepaliDate::getCurrentFiscalYear();
    $quarters = NepaliDate::getFiscalYearQuarters($fy);
    $fyEnd = $quarters['Q4']['end'];

    return $today->diff($fyEnd, 'day') * -1;
}

echo "Days remaining in FY: " . daysRemainingInFiscalYear(), PHP_EOL;
```

### Days Remaining in Quarter

```php
use NepaliDateLibrary\NepaliDate;

function daysRemainingInQuarter(): int
{
    $today = new NepaliDate();
    $qDates = $today->getCurrentFiscalYearQuarterDates();

    return $today->diff($qDates['end'], 'day') * -1;
}

echo "Days remaining in quarter: " . daysRemainingInQuarter(), PHP_EOL;
```

---

## Fiscal Year Comparison

### Compare Period Across Fiscal Years

```php
use NepaliDateLibrary\NepaliDate;

/**
 * @return array{currentFY: array{start: string, end: string}, previousFY: array{start: string, end: string}}
 */
function getComparablePeriods(int $quarter): array
{
    $currentFY = NepaliDate::getCurrentFiscalYear();
    $previousFY = $currentFY - 1;

    $currentQ = NepaliDate::getFiscalYearQuarter($quarter, $currentFY);
    $previousQ = NepaliDate::getFiscalYearQuarter($quarter, $previousFY);

    return [
        'currentFY' => [
            'start' => $currentQ['start']->format('YYYY-MM-DD'),
            'end' => $currentQ['end']->format('YYYY-MM-DD'),
        ],
        'previousFY' => [
            'start' => $previousQ['start']->format('YYYY-MM-DD'),
            'end' => $previousQ['end']->format('YYYY-MM-DD'),
        ],
    ];
}

$q2Comparison = getComparablePeriods(2);
echo "Q2 This Year: ", print_r($q2Comparison['currentFY'], true);
echo "Q2 Last Year: ", print_r($q2Comparison['previousFY'], true);
```

---

## UI Component Example

### Fiscal Year Period Selector

```php
use NepaliDateLibrary\NepaliDate;

/**
 * @return array<int, array{value: string, label: string, start: NepaliDate, end: NepaliDate}>
 */
function getFiscalPeriodOptions(int $fiscalYear): array
{
    $quarters = NepaliDate::getFiscalYearQuarters($fiscalYear);

    return [
        ['value' => 'full', 'label' => "Full Year {$fiscalYear}/" . ($fiscalYear + 1), 'start' => $quarters['Q1']['start'], 'end' => $quarters['Q4']['end']],
        ['value' => 'q1', 'label' => 'Q1 (Shrawan - Aswin)', 'start' => $quarters['Q1']['start'], 'end' => $quarters['Q1']['end']],
        ['value' => 'q2', 'label' => 'Q2 (Kartik - Poush)', 'start' => $quarters['Q2']['start'], 'end' => $quarters['Q2']['end']],
        ['value' => 'q3', 'label' => 'Q3 (Magh - Chaitra)', 'start' => $quarters['Q3']['start'], 'end' => $quarters['Q3']['end']],
        ['value' => 'q4', 'label' => 'Q4 (Baisakh - Asar)', 'start' => $quarters['Q4']['start'], 'end' => $quarters['Q4']['end']],
        ['value' => 'h1', 'label' => 'First Half (Q1 + Q2)', 'start' => $quarters['Q1']['start'], 'end' => $quarters['Q2']['end']],
        ['value' => 'h2', 'label' => 'Second Half (Q3 + Q4)', 'start' => $quarters['Q3']['start'], 'end' => $quarters['Q4']['end']],
    ];
}

$options = getFiscalPeriodOptions(2081);
foreach ($options as $opt) {
    echo "{$opt['label']}: " . $opt['start']->format('MMM DD') . ' - ' . $opt['end']->format('MMM DD'), PHP_EOL;
}
```
