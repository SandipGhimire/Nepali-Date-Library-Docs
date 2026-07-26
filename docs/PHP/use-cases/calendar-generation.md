# Calendar Generation

Building calendars and datepickers is a common requirement. The `getCalendarDays()` static method provides all the data you need to render a complete monthly calendar.

## Basic Calendar Data

### Get Calendar Days for a Month

```php
use NepaliDateLibrary\NepaliDate;

$calendar = NepaliDate::getCalendarDays(2082, 9); // Magh 2082

print_r($calendar);
// [
//   'prevRemainingDays' => 3,
//   'prevMonth' => ['year' => 2082, 'month' => 8, 'days' => [28, 29, 30]],
//   'currentMonth' => ['year' => 2082, 'month' => 9, 'days' => [1, 2, 3, ..., 29]],
//   'nextMonth' => ['year' => 2082, 'month' => 10, 'days' => [1, 2, 3, 4, 5]],
//   'remainingDays' => 5,
// ]
```

### Understanding the Output

| Key                    | Description                                                |
| ------------------------ | -------------------------------------------------------------- |
| `'prevRemainingDays'` | Number of days from previous month to fill the first week  |
| `'prevMonth'`         | Previous month's trailing days                              |
| `'currentMonth'`      | Current month's complete day array                          |
| `'nextMonth'`         | Next month's leading days                                   |
| `'remainingDays'`     | Number of days from next month needed to complete the grid |

---

## Building a Calendar Grid

### Plain PHP Calendar Grid

```php
use NepaliDateLibrary\NepaliDate;

/**
 * @return array<int, array{day: int, month: 'prev'|'current'|'next', year: int, monthIndex: int, isToday: bool}>
 */
function generateCalendarGrid(int $year, int $month): array
{
    $calendar = NepaliDate::getCalendarDays($year, $month);
    $today = new NepaliDate();

    $days = [];

    foreach ($calendar['prevMonth']['days'] as $day) {
        $days[] = [
            'day' => $day,
            'month' => 'prev',
            'year' => $calendar['prevMonth']['year'],
            'monthIndex' => $calendar['prevMonth']['month'],
            'isToday' => false,
        ];
    }

    foreach ($calendar['currentMonth']['days'] as $day) {
        $days[] = [
            'day' => $day,
            'month' => 'current',
            'year' => $calendar['currentMonth']['year'],
            'monthIndex' => $calendar['currentMonth']['month'],
            'isToday' => $today->getYear() === $year
                && $today->getMonth() === $month
                && $today->getDate() === $day,
        ];
    }

    foreach ($calendar['nextMonth']['days'] as $day) {
        $days[] = [
            'day' => $day,
            'month' => 'next',
            'year' => $calendar['nextMonth']['year'],
            'monthIndex' => $calendar['nextMonth']['month'],
            'isToday' => false,
        ];
    }

    return $days;
}

// Usage
$days = generateCalendarGrid(2082, 9);
echo count($days), PHP_EOL; // 35 or 42 (5 or 6 weeks)
```

### Laravel Blade Calendar View

Controller:

```php
use NepaliDateLibrary\NepaliDate;

class CalendarController
{
    public function show(int $year, int $month)
    {
        $calendar = NepaliDate::getCalendarDays($year, $month);
        $current = new NepaliDate($year, $month, 1);

        return view('calendar.show', [
            'calendar' => $calendar,
            'title' => $current->format('MMMM YYYY'),
            'weekdays' => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        ]);
    }
}
```

`resources/views/calendar/show.blade.php`:

```blade
<div class="calendar">
    <div class="header">{{ $title }}</div>

    <div class="weekdays">
        @foreach ($weekdays as $day)
            <span class="weekday">{{ $day }}</span>
        @endforeach
    </div>

    <div class="days">
        @foreach ($calendar['prevMonth']['days'] as $day)
            <span class="day prev-month">{{ $day }}</span>
        @endforeach

        @foreach ($calendar['currentMonth']['days'] as $day)
            <span class="day current-month">{{ $day }}</span>
        @endforeach

        @foreach ($calendar['nextMonth']['days'] as $day)
            <span class="day next-month">{{ $day }}</span>
        @endforeach
    </div>
</div>
```

### Navigating Between Months

```php
use NepaliDateLibrary\NepaliDate;

$currentMonth = new NepaliDate(2082, 9, 1);

$prevMonth = $currentMonth->addMonths(-1);
$nextMonth = $currentMonth->addMonths(1);

$prevCalendar = NepaliDate::getCalendarDays($prevMonth->getYear(), $prevMonth->getMonth());
$nextCalendar = NepaliDate::getCalendarDays($nextMonth->getYear(), $nextMonth->getMonth());
```

---

## Nepali Numerals in Calendar

### Calendar with Nepali Display

```php
use NepaliDateLibrary\Helper\Constants;
use NepaliDateLibrary\NepaliDate;

function toNepaliNumber(int $num): string
{
    $digits = str_split((string) $num);
    return implode('', array_map(fn ($d) => Constants::$NUMBER_NP[(int) $d], $digits));
}

function renderNepaliCalendar(int $year, int $month): string
{
    $calendar = NepaliDate::getCalendarDays($year, $month);
    $currentDate = new NepaliDate($year, $month, 1);

    $html = '<div class="nepali-calendar">';
    $html .= '<div class="header">' . $currentDate->format('mmmm yyyy') . '</div>';

    $html .= '<div class="weekdays">';
    foreach (Constants::$WEEK_SHORT_NP as $day) {
        $html .= "<span>{$day}</span>";
    }
    $html .= '</div>';

    $html .= '<div class="days">';

    foreach ($calendar['prevMonth']['days'] as $day) {
        $html .= '<span class="prev">' . toNepaliNumber($day) . '</span>';
    }
    foreach ($calendar['currentMonth']['days'] as $day) {
        $html .= '<span class="current">' . toNepaliNumber($day) . '</span>';
    }
    foreach ($calendar['nextMonth']['days'] as $day) {
        $html .= '<span class="next">' . toNepaliNumber($day) . '</span>';
    }

    $html .= '</div></div>';

    return $html;
}
```

---

## Week Information

### Get Week Number

```php
use NepaliDateLibrary\NepaliDate;

function getWeekNumber(NepaliDate $date): int
{
    $startOfYear = $date->startOfYear();
    $daysDiff = $date->diff($startOfYear, 'day');
    $startDayOfWeek = $startOfYear->getDay();

    return (int) ceil(($daysDiff + $startDayOfWeek + 1) / 7);
}

$date = new NepaliDate(2082, 9, 15);
echo "Week " . getWeekNumber($date), PHP_EOL; // Week 42
```

### Get Weeks in Month

```php
use NepaliDateLibrary\NepaliDate;

$date = new NepaliDate(2082, 9, 1);
$weeks = $date->getWeeksInMonth();
echo "This month has {$weeks} weeks", PHP_EOL; // 5 or 6
```

---

## Calendar Styling Tips

```css
.calendar {
  --day-size: 40px;
  --gap: 4px;
  width: calc(var(--day-size) * 7 + var(--gap) * 6);
}

.days {
  display: grid;
  grid-template-columns: repeat(7, var(--day-size));
  gap: var(--gap);
}

.day {
  width: var(--day-size);
  height: var(--day-size);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}

.day.prev-month,
.day.next-month {
  opacity: 0.4;
}

.day.today {
  background: #3b82f6;
  color: white;
}

.day:hover {
  background: #e5e7eb;
}
```
