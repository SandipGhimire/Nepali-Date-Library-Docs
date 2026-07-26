# Date Ranges

Working with date ranges is essential for reports, filters, and period-based calculations. The library provides methods to get boundaries for days, weeks, months, and years.

## Day Boundaries

### Start and End of Day

```php
use NepaliDateLibrary\NepaliDate;

$date = new NepaliDate(2082, 9, 15);

$dayStart = $date->startOfDay();
echo $dayStart->getHours(), PHP_EOL;   // 0
echo $dayStart->getMinutes(), PHP_EOL; // 0
echo $dayStart->getSeconds(), PHP_EOL; // 0

$dayEnd = $date->endOfDay();
echo $dayEnd->getHours(), PHP_EOL;   // 23
echo $dayEnd->getMinutes(), PHP_EOL; // 59
echo $dayEnd->getSeconds(), PHP_EOL; // 59
```

### Use Case: Filter Records for a Day

```php
use NepaliDateLibrary\NepaliDate;

/**
 * @param array<int, array{id: int, timestamp: int}> $records
 * @return array<int, array{id: int, timestamp: int}>
 */
function getRecordsForDay(array $records, NepaliDate $date): array
{
    $start = $date->startOfDay()->getTime();
    $end = $date->endOfDay()->getTime();

    return array_values(array_filter(
        $records,
        fn (array $r) => $r['timestamp'] >= $start && $r['timestamp'] <= $end
    ));
}
```

---

## Week Boundaries

### Start and End of Week

```php
use NepaliDateLibrary\NepaliDate;

$date = new NepaliDate(2082, 9, 15); // Wednesday

// Default: Week starts on Sunday (0)
$weekStart = $date->startOfWeek();
echo $weekStart->format('DDDD, MMMM DD'), PHP_EOL; // Sunday, Magh 12

$weekEnd = $date->endOfWeek();
echo $weekEnd->format('DDDD, MMMM DD'), PHP_EOL; // Saturday, Magh 18
```

### Custom Week Start (Monday)

```php
use NepaliDateLibrary\NepaliDate;

$date = new NepaliDate(2082, 9, 15); // Wednesday

// Week starts on Monday (1)
$weekStartMon = $date->startOfWeek(1);
echo $weekStartMon->format('DDDD, MMMM DD'), PHP_EOL; // Monday, Magh 13

$weekEndMon = $date->endOfWeek(1);
echo $weekEndMon->format('DDDD, MMMM DD'), PHP_EOL; // Sunday, Magh 19
```

### Get Week Range

```php
use NepaliDateLibrary\NepaliDate;

/**
 * @return array{start: NepaliDate, end: NepaliDate, label: string}
 */
function getCurrentWeek(int $startOfWeek = 0): array
{
    $today = new NepaliDate();
    $start = $today->startOfWeek($startOfWeek);
    $end = $today->endOfWeek($startOfWeek);

    return [
        'start' => $start,
        'end' => $end,
        'label' => $start->format('MMM DD') . ' - ' . $end->format('MMM DD, YYYY'),
    ];
}

$week = getCurrentWeek();
echo $week['label'], PHP_EOL; // 'Mag 12 - Mag 18, 2082'
```

---

## Month Boundaries

### Start and End of Month

```php
use NepaliDateLibrary\NepaliDate;

$date = new NepaliDate(2082, 9, 15); // Magh 15

$monthStart = $date->startOfMonth();
echo $monthStart->format('YYYY-MM-DD'), PHP_EOL; // '2082-10-01'

$monthEnd = $date->endOfMonth();
echo $monthEnd->format('YYYY-MM-DD'), PHP_EOL; // '2082-10-29'
echo $monthEnd->getDate(), PHP_EOL;             // 29 (Magh 2082 has 29 days)
```

### Monthly Report Range

```php
use NepaliDateLibrary\NepaliDate;

/**
 * @return array{year: int, month: int, monthName: string, start: NepaliDate, end: NepaliDate, totalDays: int}
 */
function getMonthRange(int $year, int $month): array
{
    $start = new NepaliDate($year, $month, 1);
    $end = $start->endOfMonth();

    return [
        'year' => $year,
        'month' => $month,
        'monthName' => NepaliDate::getMonthName($month),
        'start' => $start,
        'end' => $end,
        'totalDays' => $end->getDate(),
    ];
}

$range = getMonthRange(2082, 9);
echo "{$range['monthName']} {$range['year']}", PHP_EOL; // 'Magh 2082'
echo $range['start']->format('DD') . ' - ' . $range['end']->format('DD'), PHP_EOL; // '01 - 29'
echo "Total days: {$range['totalDays']}", PHP_EOL; // 29
```

---

## Year Boundaries

### Start and End of Year

```php
use NepaliDateLibrary\NepaliDate;

$date = new NepaliDate(2082, 9, 15);

$yearStart = $date->startOfYear();
echo $yearStart->format('MMMM DD, YYYY'), PHP_EOL; // 'Baisakh 01, 2082'

$yearEnd = $date->endOfYear();
echo $yearEnd->format('MMMM DD, YYYY'), PHP_EOL; // 'Chaitra 30, 2082' (or 31)
```

### Annual Report Range

```php
use NepaliDateLibrary\NepaliDate;

/**
 * @return array{start: NepaliDate, end: NepaliDate}
 */
function getYearRange(int $year): array
{
    $start = new NepaliDate($year, 0, 1); // Baisakh 1
    $end = $start->endOfYear();           // Last day of Chaitra

    return ['start' => $start, 'end' => $end];
}

$year2082 = getYearRange(2082);
echo "Year: " . $year2082['start']->format('YYYY'), PHP_EOL;
echo "Range: " . $year2082['start']->format('MMMM DD') . ' - ' . $year2082['end']->format('MMMM DD'), PHP_EOL;
```

---

## Custom Date Ranges

### Get Last N Days

```php
use NepaliDateLibrary\NepaliDate;

/**
 * @return array{start: NepaliDate, end: NepaliDate}
 */
function getLastNDays(int $n): array
{
    $end = new NepaliDate();
    $start = $end->addDays(-($n - 1));

    return ['start' => $start, 'end' => $end];
}

$last7Days = getLastNDays(7);
echo "Last 7 days: " . $last7Days['start']->format('MMM DD') . ' - ' . $last7Days['end']->format('MMM DD'), PHP_EOL;

$last30Days = getLastNDays(30);
echo "Last 30 days: " . $last30Days['start']->format('MMM DD') . ' - ' . $last30Days['end']->format('MMM DD'), PHP_EOL;
```

### Get Last N Months

```php
use NepaliDateLibrary\NepaliDate;

/**
 * @return array{start: NepaliDate, end: NepaliDate}
 */
function getLastNMonths(int $n): array
{
    $today = new NepaliDate();
    $end = $today->endOfMonth();
    $start = $today->addMonths(-($n - 1))->startOfMonth();

    return ['start' => $start, 'end' => $end];
}

$last3Months = getLastNMonths(3);
echo "Last 3 months: " . $last3Months['start']->format('MMM YYYY') . ' - ' . $last3Months['end']->format('MMM YYYY'), PHP_EOL;
```

### Get Date Range Between Two Dates

```php
use NepaliDateLibrary\NepaliDate;

/**
 * @return NepaliDate[]
 */
function getDatesBetween(NepaliDate $startDate, NepaliDate $endDate): array
{
    $dates = [];
    $current = $startDate->clone();

    while (!$current->isAfter($endDate)) {
        $dates[] = $current->clone();
        $current = $current->addDays(1);
    }

    return $dates;
}

$start = new NepaliDate(2082, 9, 1);
$end = new NepaliDate(2082, 9, 7);
$dates = getDatesBetween($start, $end);

foreach ($dates as $d) {
    echo $d->format('YYYY-MM-DD'), PHP_EOL;
}
// 2082-10-01, 2082-10-02, ..., 2082-10-07
```

---

## Period Presets

### Common Report Periods

```php
use NepaliDateLibrary\NepaliDate;

/**
 * @return array{start: NepaliDate, end: NepaliDate, label: string}
 */
function getDateRangePreset(string $preset): array
{
    $today = new NepaliDate();

    switch ($preset) {
        case 'today':
            return ['start' => $today->startOfDay(), 'end' => $today->endOfDay(), 'label' => 'Today'];

        case 'yesterday':
            $yesterday = $today->addDays(-1);
            return ['start' => $yesterday->startOfDay(), 'end' => $yesterday->endOfDay(), 'label' => 'Yesterday'];

        case 'thisWeek':
            return ['start' => $today->startOfWeek(), 'end' => $today->endOfWeek(), 'label' => 'This Week'];

        case 'lastWeek':
            $lastWeek = $today->addDays(-7);
            return ['start' => $lastWeek->startOfWeek(), 'end' => $lastWeek->endOfWeek(), 'label' => 'Last Week'];

        case 'thisMonth':
            return ['start' => $today->startOfMonth(), 'end' => $today->endOfMonth(), 'label' => $today->format('MMMM YYYY')];

        case 'lastMonth':
            $lastMonth = $today->addMonths(-1);
            return ['start' => $lastMonth->startOfMonth(), 'end' => $lastMonth->endOfMonth(), 'label' => $lastMonth->format('MMMM YYYY')];

        case 'thisYear':
            return ['start' => $today->startOfYear(), 'end' => $today->endOfYear(), 'label' => "Year {$today->getYear()}"];

        case 'lastYear':
            $lastYear = $today->addYears(-1);
            return ['start' => $lastYear->startOfYear(), 'end' => $lastYear->endOfYear(), 'label' => "Year {$lastYear->getYear()}"];

        default:
            throw new InvalidArgumentException("Unknown preset: {$preset}");
    }
}

// Usage
$thisMonth = getDateRangePreset('thisMonth');
echo "{$thisMonth['label']}: " . $thisMonth['start']->format('DD') . ' - ' . $thisMonth['end']->format('DD'), PHP_EOL;
```

---

## Overlapping Ranges

### Check if Date is in Range

```php
use NepaliDateLibrary\NepaliDate;

function isDateInRange(NepaliDate $date, NepaliDate $start, NepaliDate $end): bool
{
    return !$date->isBefore($start) && !$date->isAfter($end);
}

$date = new NepaliDate(2082, 9, 15);
$start = new NepaliDate(2082, 9, 1);
$end = new NepaliDate(2082, 9, 30);

var_dump(isDateInRange($date, $start, $end)); // true
```

### Check if Ranges Overlap

```php
use NepaliDateLibrary\NepaliDate;

/**
 * @param array{start: NepaliDate, end: NepaliDate} $range1
 * @param array{start: NepaliDate, end: NepaliDate} $range2
 */
function doRangesOverlap(array $range1, array $range2): bool
{
    return !$range1['end']->isBefore($range2['start']) && !$range2['end']->isBefore($range1['start']);
}

$range1 = ['start' => new NepaliDate(2082, 9, 1), 'end' => new NepaliDate(2082, 9, 15)];
$range2 = ['start' => new NepaliDate(2082, 9, 10), 'end' => new NepaliDate(2082, 9, 25)];

var_dump(doRangesOverlap($range1, $range2)); // true
```
