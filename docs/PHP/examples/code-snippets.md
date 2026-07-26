# Code Snippets

A comprehensive collection of copy-paste ready code snippets for common tasks.

## Table of Contents

[[toc]]

---

## Date Creation

### All Ways to Create a NepaliDate

```php
use NepaliDateLibrary\NepaliDate;

// 1. Current date and time
$now = new NepaliDate();

// 2. From year, month (0-indexed), day
$specific = new NepaliDate(2082, 9, 15);

// 3. From date string
$fromString = new NepaliDate('2082-10-15');
$fromSlash = new NepaliDate('2082/10/15');
$fromDot = new NepaliDate('2082.10.15');

// 4. From a DateTime / DateTimeImmutable
$fromPhpDate = new NepaliDate(new DateTimeImmutable());
$fromSpecificDate = new NepaliDate(new DateTimeImmutable('2026-01-14', new DateTimeZone('UTC')));

// 5. From a Unix timestamp in milliseconds
$fromTimestamp = new NepaliDate((int) round(microtime(true) * 1000));
$fromPastTimestamp = new NepaliDate(1736848800000);

// 6. From another NepaliDate (copy constructor)
$original = new NepaliDate();
$copy = new NepaliDate($original);

// 7. Using the clone() method
$cloned = $original->clone();
```

---

## Formatting Examples

### All Format Tokens

```php
$date = new NepaliDate(2082, 9, 15);

// === ENGLISH (UPPERCASE) ===

// Year
$date->format('YYYY'); // '2082'
$date->format('YY');   // '82'

// Month
$date->format('MM');   // '10'
$date->format('M');    // '10'
$date->format('MMM');  // 'Mag'
$date->format('MMMM'); // 'Magh'

// Day
$date->format('DD');   // '15'
$date->format('D');    // '15'
$date->format('DDD');  // 'Wed'
$date->format('DDDD'); // 'Wednesday'

// === NEPALI (LOWERCASE) ===

// Year
$date->format('yyyy'); // '२०८२'
$date->format('yy');   // '८२'

// Month
$date->format('mm');   // '१०'
$date->format('m');    // '१०'
$date->format('mmm');  // 'मा'
$date->format('mmmm'); // 'माघ'

// Day
$date->format('dd');   // '१५'
$date->format('d');    // '१५'
$date->format('ddd');  // 'बुध'
$date->format('dddd'); // 'बुधबार'
```

### Common Format Patterns

```php
$date = new NepaliDate(2082, 9, 15);

// ISO style
$date->format('YYYY-MM-DD'); // '2082-10-15'

// Formal
$date->format('MMMM DD, YYYY'); // 'Magh 15, 2082'

// With day name
$date->format('DDDD, MMMM DD, YYYY'); // 'Wednesday, Magh 15, 2082'

// Short
$date->format('MMM DD'); // 'Mag 15'

// Month and year only
$date->format('MMMM YYYY'); // 'Magh 2082'

// Nepali formal
$date->format('mmmm dd, yyyy'); // 'माघ १५, २०८२'

// Nepali with day
$date->format('dddd, mmmm dd yyyy'); // 'बुधबार, माघ १५ २०८२'
```

---

## Date Conversion Snippets

### Complete Conversion Utility

```php
use NepaliDateLibrary\NepaliDate;
use function NepaliDateLibrary\ADtoBS;
use function NepaliDateLibrary\BStoAD;

final class DateConverter
{
    // AD string to BS string
    public static function adToBS(string $adDate): string
    {
        return ADtoBS($adDate);
    }

    // BS string to AD string
    public static function bsToAD(string $bsDate): string
    {
        return BStoAD($bsDate);
    }

    // DateTimeInterface to NepaliDate
    public static function phpToNepali(DateTimeInterface $date): NepaliDate
    {
        return new NepaliDate($date);
    }

    // NepaliDate to DateTimeImmutable
    public static function nepaliToPhp(NepaliDate $nepaliDate): DateTimeImmutable
    {
        return $nepaliDate->getEnglishDate();
    }

    // Timestamp to formatted Nepali date
    public static function timestampToNepali(int $timestampMs, string $format = 'YYYY-MM-DD'): string
    {
        return (new NepaliDate($timestampMs))->format($format);
    }

    // Safe conversion with fallback
    public static function safeADtoBS(string $adDate, string $fallback = ''): string
    {
        try {
            return ADtoBS($adDate);
        } catch (Throwable $e) {
            return $fallback;
        }
    }
}

// Usage
echo DateConverter::adToBS('2026-01-14'), PHP_EOL; // '2082-10-01'
echo DateConverter::timestampToNepali((int) round(microtime(true) * 1000), 'MMMM DD, YYYY'), PHP_EOL;
```

---

## Date Manipulation Snippets

### Date Arithmetic Helper

```php
use NepaliDateLibrary\NepaliDate;

final class DateMath
{
    public static function addDays(NepaliDate $date, int $days): NepaliDate
    {
        return $date->addDays($days);
    }

    public static function addWeeks(NepaliDate $date, int $weeks): NepaliDate
    {
        return $date->addDays($weeks * 7);
    }

    public static function addMonths(NepaliDate $date, int $months): NepaliDate
    {
        return $date->addMonths($months);
    }

    public static function addYears(NepaliDate $date, int $years): NepaliDate
    {
        return $date->addYears($years);
    }

    // Get date N days ago
    public static function daysAgo(int $n): NepaliDate
    {
        return (new NepaliDate())->addDays(-$n);
    }

    // Get date N days from now
    public static function daysFromNow(int $n): NepaliDate
    {
        return (new NepaliDate())->addDays($n);
    }

    // Get date N months ago
    public static function monthsAgo(int $n): NepaliDate
    {
        return (new NepaliDate())->addMonths(-$n);
    }
}

// Usage
echo DateMath::daysAgo(7)->format('YYYY-MM-DD'), PHP_EOL;
echo DateMath::daysFromNow(30)->format('MMMM DD'), PHP_EOL;
```

---

## Date Comparison Snippets

### Complete Comparison Utility

```php
use NepaliDateLibrary\NepaliDate;

final class DateCompare
{
    // Check if date is today
    public static function isToday(NepaliDate $date): bool
    {
        $today = new NepaliDate();
        return $date->isSame($today, 'day')
            && $date->isSame($today, 'month')
            && $date->isSame($today, 'year');
    }

    // Check if date is in the past
    public static function isPast(NepaliDate $date): bool
    {
        return $date->isBefore(new NepaliDate());
    }

    // Check if date is in the future
    public static function isFuture(NepaliDate $date): bool
    {
        return $date->isAfter(new NepaliDate());
    }

    // Check if date is in the current month
    public static function isThisMonth(NepaliDate $date): bool
    {
        $today = new NepaliDate();
        return $date->isSame($today, 'year') && $date->isSame($today, 'month');
    }

    // Check if date is in the current year
    public static function isThisYear(NepaliDate $date): bool
    {
        return $date->isSame(new NepaliDate(), 'year');
    }

    // Get the earlier of two dates
    public static function min(NepaliDate $date1, NepaliDate $date2): NepaliDate
    {
        return $date1->isBefore($date2) ? $date1 : $date2;
    }

    // Get the later of two dates
    public static function max(NepaliDate $date1, NepaliDate $date2): NepaliDate
    {
        return $date1->isAfter($date2) ? $date1 : $date2;
    }

    // Days between two dates
    public static function daysBetween(NepaliDate $date1, NepaliDate $date2): int
    {
        return abs($date1->diff($date2, 'day'));
    }
}

// Usage
$date = new NepaliDate(2082, 9, 15);
var_dump(DateCompare::isToday($date));    // false
var_dump(DateCompare::isThisYear($date)); // true
```

---

## Date Range Snippets

### Date Range Generator

```php
use NepaliDateLibrary\NepaliDate;

final class DateRanges
{
    /** @return array{start: NepaliDate, end: NepaliDate, label: string} */
    public static function today(): array
    {
        $today = new NepaliDate();
        return ['start' => $today->startOfDay(), 'end' => $today->endOfDay(), 'label' => 'Today'];
    }

    /** @return array{start: NepaliDate, end: NepaliDate, label: string} */
    public static function thisWeek(): array
    {
        $today = new NepaliDate();
        return ['start' => $today->startOfWeek(), 'end' => $today->endOfWeek(), 'label' => 'This Week'];
    }

    /** @return array{start: NepaliDate, end: NepaliDate, label: string} */
    public static function thisMonth(): array
    {
        $today = new NepaliDate();
        return ['start' => $today->startOfMonth(), 'end' => $today->endOfMonth(), 'label' => $today->format('MMMM YYYY')];
    }

    /** @return array{start: NepaliDate, end: NepaliDate, label: string} */
    public static function thisYear(): array
    {
        $today = new NepaliDate();
        return ['start' => $today->startOfYear(), 'end' => $today->endOfYear(), 'label' => "Year {$today->getYear()}"];
    }

    /** @return array{start: NepaliDate, end: NepaliDate, label: string} */
    public static function lastNDays(int $n): array
    {
        $today = new NepaliDate();
        return ['start' => $today->addDays(-($n - 1)), 'end' => $today, 'label' => "Last {$n} Days"];
    }

    /** @return array{start: NepaliDate, end: NepaliDate, label: string} */
    public static function custom(NepaliDate $start, NepaliDate $end): array
    {
        return ['start' => $start, 'end' => $end, 'label' => $start->format('MMM DD') . ' - ' . $end->format('MMM DD, YYYY')];
    }
}

// Usage
$thisMonth = DateRanges::thisMonth();
echo $thisMonth['label'], PHP_EOL;
echo $thisMonth['start']->format('YYYY-MM-DD'), PHP_EOL;
```

---

## Validation Snippets

### Complete Validation Utility

```php
use NepaliDateLibrary\NepaliDate;

final class DateValidation
{
    // Validate date components
    public static function isValidDate(int $year, int $month, int $day): bool
    {
        return NepaliDate::isValid($year, $month, $day);
    }

    // Validate date string format
    public static function isValidFormat(string $dateString): bool
    {
        return preg_match('/^\d{4}[-\/.]\d{2}[-\/.]\d{2}$/', $dateString) === 1;
    }

    // Validate and parse date string
    public static function parseOrNull(string $dateString): ?NepaliDate
    {
        if (!self::isValidFormat($dateString)) {
            return null;
        }

        try {
            return new NepaliDate($dateString);
        } catch (Throwable $e) {
            return null;
        }
    }

    // Check if a DateTimeInterface is within the supported range
    public static function isInSupportedRange(DateTimeInterface $date): bool
    {
        $min = NepaliDate::minimum();
        $max = NepaliDate::maximum();
        return $date >= $min && $date <= $max;
    }

    /** @return array{valid: bool, error?: string, date?: NepaliDate} */
    public static function validateInput(string $input): array
    {
        if ($input === '') {
            return ['valid' => false, 'error' => 'Date is required'];
        }

        if (!self::isValidFormat($input)) {
            return ['valid' => false, 'error' => 'Invalid format. Use YYYY-MM-DD'];
        }

        $date = self::parseOrNull($input);
        if ($date === null) {
            return ['valid' => false, 'error' => 'Invalid date'];
        }

        return ['valid' => true, 'date' => $date];
    }
}

// Usage
$result = DateValidation::validateInput('2082-10-15');
if ($result['valid']) {
    echo $result['date']->format('MMMM DD, YYYY'), PHP_EOL;
} else {
    error_log($result['error']);
}
```

---

## Age Calculation

### Calculate Age from DOB

```php
use NepaliDateLibrary\NepaliDate;

/** @return array{years: int, months: int, days: int, description: string} */
function calculateAge(string $dobString): array
{
    $dob = new NepaliDate($dobString);
    $today = new NepaliDate();

    $years = $today->getYear() - $dob->getYear();
    $months = $today->getMonth() - $dob->getMonth();
    $days = $today->getDate() - $dob->getDate();

    if ($days < 0) {
        $months--;
        $prevMonth = $today->addMonths(-1);
        $days += $prevMonth->daysInMonth();
    }

    if ($months < 0) {
        $years--;
        $months += 12;
    }

    $description = '';
    if ($years > 0) {
        $description .= "{$years} year" . ($years > 1 ? 's' : '');
    }
    if ($months > 0) {
        $description .= " {$months} month" . ($months > 1 ? 's' : '');
    }
    if ($days > 0) {
        $description .= " {$days} day" . ($days > 1 ? 's' : '');
    }

    return [
        'years' => $years,
        'months' => $months,
        'days' => $days,
        'description' => trim($description) !== '' ? trim($description) : '0 days',
    ];
}

// Usage
$age = calculateAge('2050-05-15');
echo $age['description'], PHP_EOL; // '32 years 4 months 16 days'
```

---

## Calendar Generation

### Full Calendar Data Structure

```php
use NepaliDateLibrary\Helper\Constants;
use NepaliDateLibrary\NepaliDate;

/**
 * @return array{
 *     year: int, month: int, monthName: string, monthNameNp: string,
 *     weekdays: string[], weeks: array<int, array{days: array}>, totalDays: int
 * }
 */
function generateCalendarData(int $year, int $month): array
{
    $calendar = NepaliDate::getCalendarDays($year, $month);
    $today = new NepaliDate();

    $allDays = [];

    foreach ($calendar['prevMonth']['days'] as $day) {
        $fullDate = new NepaliDate($calendar['prevMonth']['year'], $calendar['prevMonth']['month'], $day);
        $allDays[] = [
            'date' => $day,
            'month' => 'prev',
            'isToday' => false,
            'isWeekend' => in_array($fullDate->getDay(), [0, 6], true),
            'fullDate' => $fullDate,
        ];
    }

    foreach ($calendar['currentMonth']['days'] as $day) {
        $fullDate = new NepaliDate($year, $month, $day);
        $allDays[] = [
            'date' => $day,
            'month' => 'current',
            'isToday' => $today->getYear() === $year && $today->getMonth() === $month && $today->getDate() === $day,
            'isWeekend' => in_array($fullDate->getDay(), [0, 6], true),
            'fullDate' => $fullDate,
        ];
    }

    foreach ($calendar['nextMonth']['days'] as $day) {
        $fullDate = new NepaliDate($calendar['nextMonth']['year'], $calendar['nextMonth']['month'], $day);
        $allDays[] = [
            'date' => $day,
            'month' => 'next',
            'isToday' => false,
            'isWeekend' => in_array($fullDate->getDay(), [0, 6], true),
            'fullDate' => $fullDate,
        ];
    }

    $weeks = array_map(fn ($chunk) => ['days' => $chunk], array_chunk($allDays, 7));

    return [
        'year' => $year,
        'month' => $month,
        'monthName' => Constants::$MONTH_EN[$month],
        'monthNameNp' => NepaliDate::getMonthName($month, false, true),
        'weekdays' => Constants::$WEEK_EN,
        'weeks' => $weeks,
        'totalDays' => count($calendar['currentMonth']['days']),
    ];
}

// Usage
$calData = generateCalendarData(2082, 9);
echo "{$calData['monthName']} {$calData['year']}", PHP_EOL;
echo "Total days: {$calData['totalDays']}", PHP_EOL;
echo "Weeks to display: " . count($calData['weeks']), PHP_EOL;
```

---

## Fiscal Year Snippets

### Complete Fiscal Year Utility

```php
use NepaliDateLibrary\NepaliDate;

final class FiscalYearHelper
{
    /** @return array{fiscalYear: string, startDate: string, endDate: string, currentQuarter: int, daysRemaining: int, percentComplete: int} */
    public static function getCurrentFYData(): array
    {
        $fy = NepaliDate::getCurrentFiscalYear();
        $quarters = NepaliDate::getFiscalYearQuarters($fy);
        $today = new NepaliDate();

        $fyStart = $quarters['Q1']['start'];
        $fyEnd = $quarters['Q4']['end'];

        $totalDays = abs($fyStart->diff($fyEnd, 'day'));
        $daysElapsed = abs($fyStart->diff($today, 'day'));
        $daysRemaining = abs($today->diff($fyEnd, 'day'));

        return [
            'fiscalYear' => "{$fy}/" . substr((string) ($fy + 1), -2),
            'startDate' => $fyStart->format('YYYY-MM-DD'),
            'endDate' => $fyEnd->format('YYYY-MM-DD'),
            'currentQuarter' => $today->getCurrentFiscalYearQuarter(),
            'daysRemaining' => $daysRemaining,
            'percentComplete' => (int) round(($daysElapsed / $totalDays) * 100),
        ];
    }

    /** @return array{start: string, end: string, label: string} */
    public static function getQuarterDates(int $quarter, ?int $fy = null): array
    {
        $fiscalYear = $fy ?? NepaliDate::getCurrentFiscalYear();
        $q = NepaliDate::getFiscalYearQuarter($quarter, $fiscalYear);

        return [
            'start' => $q['start']->format('YYYY-MM-DD'),
            'end' => $q['end']->format('YYYY-MM-DD'),
            'label' => "FQ{$quarter} {$fiscalYear}/" . ($fiscalYear + 1),
        ];
    }
}

// Usage
$fyData = FiscalYearHelper::getCurrentFYData();
echo "Fiscal Year: {$fyData['fiscalYear']}", PHP_EOL;
echo "{$fyData['percentComplete']}% complete", PHP_EOL;
echo "{$fyData['daysRemaining']} days remaining", PHP_EOL;
```

---

## Nepali Number Conversion

### Number to Nepali Digits

```php
use NepaliDateLibrary\Helper\Constants;

function toNepaliDigits(int|string $num): string
{
    $chars = mb_str_split((string) $num);
    return implode('', array_map(
        fn ($char) => ctype_digit($char) ? Constants::$NUMBER_NP[(int) $char] : $char,
        $chars
    ));
}

function fromNepaliDigits(string $nepaliNum): int
{
    $chars = mb_str_split($nepaliNum);
    $englishStr = implode('', array_map(function ($char) {
        $index = array_search($char, Constants::$NUMBER_NP, true);
        return $index !== false ? (string) $index : $char;
    }, $chars));

    return (int) $englishStr;
}

// Usage
echo toNepaliDigits(2082), PHP_EOL;         // '२०८२'
echo toNepaliDigits('15'), PHP_EOL;         // '१५'
echo fromNepaliDigits('२०८२'), PHP_EOL;     // 2082
```

---

## Framework Integration

### Laravel Eloquent Cast

Store dates as AD in the database, but work with `NepaliDate` in your application code via a custom cast:

```php
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use NepaliDateLibrary\NepaliDate;

class NepaliDateCast implements CastsAttributes
{
    public function get($model, string $key, $value, array $attributes): ?NepaliDate
    {
        return $value === null ? null : new NepaliDate(new DateTimeImmutable($value, new DateTimeZone('UTC')));
    }

    public function set($model, string $key, $value, array $attributes): ?string
    {
        if ($value === null) {
            return null;
        }

        $date = $value instanceof NepaliDate ? $value : new NepaliDate($value);
        return $date->getEnglishDate()->format('Y-m-d H:i:s');
    }
}
```

```php
class Event extends Model
{
    protected $casts = [
        'event_date' => NepaliDateCast::class,
    ];
}

$event = Event::find(1);
echo $event->event_date->format('MMMM DD, YYYY'), PHP_EOL;
```

### Simple Facade-Style Helper

```php
use NepaliDateLibrary\NepaliDate;
use function NepaliDateLibrary\ADtoBS;
use function NepaliDateLibrary\BStoAD;

final class NepaliDateHelper
{
    public static function today(string $format = 'YYYY-MM-DD'): string
    {
        return (new NepaliDate())->format($format);
    }

    public static function displayAD(string $adDate, string $format = 'MMMM DD, YYYY'): string
    {
        return (new NepaliDate(ADtoBS($adDate)))->format($format);
    }

    public static function toAD(string $bsDate): string
    {
        return BStoAD($bsDate);
    }
}

echo NepaliDateHelper::today(), PHP_EOL;
echo NepaliDateHelper::displayAD('2026-01-14'), PHP_EOL; // 'Magh 01, 2082'
```
