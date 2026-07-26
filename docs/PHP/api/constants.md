# Constants

The library exposes month names, weekday names, Nepali numerals, and the complete date mapping table as static properties on `NepaliDateLibrary\Helper\Constants`.

## Import

```php
use NepaliDateLibrary\Helper\Constants;
```

::: tip Why a class instead of top-level constants?
NodeJS and Python export these as top-level bindings you import directly (`MONTH_EN`, `NEPALI_DATE_MAP`, ...). PHP has no equivalent for named exports outside of classes/functions, so the PHP port groups them as public static properties on `Constants` instead. The values and indexing are identical across all three ports.
:::

---

## Month Names

### Constants::\$MONTH_EN

Full English month names.

```php
/** @var string[] */
Constants::$MONTH_EN = [
    'Baisakh', 'Jestha', 'Asar', 'Shrawan', 'Bhadra', 'Aswin',
    'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra',
];
```

**Example:**

```php
echo Constants::$MONTH_EN[0], PHP_EOL; // 'Baisakh'
echo Constants::$MONTH_EN[9], PHP_EOL; // 'Magh'
echo Constants::$MONTH_EN[11], PHP_EOL; // 'Chaitra'
```

---

### Constants::\$MONTH_SHORT_EN

Short English month names (3 characters).

```php
/** @var string[] */
Constants::$MONTH_SHORT_EN = [
    'Bai', 'Jes', 'Asa', 'Shr', 'Bhd', 'Asw',
    'Kar', 'Man', 'Pou', 'Mag', 'Fal', 'Cha',
];
```

---

### Constants::\$MONTH_NP

Full Nepali month names in Devanagari script.

```php
/** @var string[] */
Constants::$MONTH_NP = [
    'बैशाख', 'जेठ', 'असार', 'श्रावण', 'भाद्र', 'आश्विन',
    'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुण', 'चैत्र',
];
```

**Example:**

```php
echo Constants::$MONTH_NP[0], PHP_EOL; // 'बैशाख'
echo Constants::$MONTH_NP[9], PHP_EOL; // 'माघ'
```

---

### Constants::\$MONTH_SHORT_NP

Short Nepali month names.

```php
/** @var string[] */
Constants::$MONTH_SHORT_NP = [
    'बै', 'जे', 'अ', 'श्रा', 'भा', 'आ',
    'का', 'मं', 'पौ', 'मा', 'फा', 'चै',
];
```

---

### Month Reference Table

| Index | MONTH_EN | MONTH_SHORT_EN | MONTH_NP | MONTH_SHORT_NP |
| ----- | -------- | -------------- | -------- | -------------- |
| 0     | Baisakh  | Bai            | बैशाख    | बै             |
| 1     | Jestha   | Jes            | जेठ      | जे             |
| 2     | Asar     | Asa            | असार     | अ              |
| 3     | Shrawan  | Shr            | श्रावण   | श्रा           |
| 4     | Bhadra   | Bhd            | भाद्र    | भा             |
| 5     | Aswin    | Asw            | आश्विन   | आ              |
| 6     | Kartik   | Kar            | कार्तिक  | का             |
| 7     | Mangsir  | Man            | मंसिर    | मं             |
| 8     | Poush    | Pou            | पौष      | पौ             |
| 9     | Magh     | Mag            | माघ      | मा             |
| 10    | Falgun   | Fal            | फाल्गुण  | फा             |
| 11    | Chaitra  | Cha            | चैत्र    | चै             |

---

## Weekday Names

### Constants::\$WEEK_EN

Full English day names.

```php
/** @var string[] */
Constants::$WEEK_EN = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
];
```

**Example:**

```php
$dayIndex = (new NepaliDate())->getDay();
echo Constants::$WEEK_EN[$dayIndex], PHP_EOL; // 'Wednesday'
```

---

### Constants::\$WEEK_SHORT_EN

Short English day names (3 characters).

```php
/** @var string[] */
Constants::$WEEK_SHORT_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
```

---

### Constants::\$WEEK_NP

Full Nepali day names in Devanagari script.

```php
/** @var string[] */
Constants::$WEEK_NP = [
    'आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहिबार', 'शुक्रबार', 'शनिबार',
];
```

---

### Constants::\$WEEK_SHORT_NP

Short Nepali day names.

```php
/** @var string[] */
Constants::$WEEK_SHORT_NP = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'];
```

---

### Weekday Reference Table

| Index | WEEK_EN   | WEEK_SHORT_EN | WEEK_NP  | WEEK_SHORT_NP |
| ----- | --------- | ------------- | -------- | ------------- |
| 0     | Sunday    | Sun           | आइतबार   | आइत           |
| 1     | Monday    | Mon           | सोमबार   | सोम           |
| 2     | Tuesday   | Tue           | मंगलबार  | मंगल          |
| 3     | Wednesday | Wed           | बुधबार   | बुध           |
| 4     | Thursday  | Thu           | बिहिबार  | बिहि          |
| 5     | Friday    | Fri           | शुक्रबार | शुक्र         |
| 6     | Saturday  | Sat           | शनिबार   | शनि           |

---

## Nepali Numbers {#nepali-numbers}

### Constants::\$NUMBER_NP

Array of Nepali numerals (०-९).

```php
/** @var string[] */
Constants::$NUMBER_NP = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
```

**Example:**

```php
// Convert an English number to Nepali digits
function toNepaliNumber(int $num): string
{
    $digits = str_split((string) $num);
    return implode('', array_map(fn ($d) => Constants::$NUMBER_NP[(int) $d], $digits));
}

echo toNepaliNumber(2082), PHP_EOL; // '२०८२'
echo toNepaliNumber(15), PHP_EOL;   // '१५'
```

::: tip
The `format()` method with lowercase tokens automatically uses Nepali numerals:

```php
$date = new NepaliDate(2082, 9, 15);
echo $date->format('yyyy-mm-dd'), PHP_EOL; // '२०८२-१०-१५'
```
:::

---

## Date Map {#date-map}

### Constants::\$NEPALI_DATE_MAP

Complete mapping of days in each month for years BS 1976-2100.

```php
/**
 * @var array<int, array{
 *     year: int,
 *     days: int[],       // Array of 12 month lengths
 *     totalDays: int,    // Total days in the year
 *     daysTillNow: int,  // Cumulative days from the start of the supported range
 * }>
 */
Constants::$NEPALI_DATE_MAP;
```

`totalDays` and `daysTillNow` are computed once by `Constants::init()`, which runs automatically when the file is loaded — you never need to call it yourself.

**Structure:**

```php
// Example entries
[
    [
        'year' => 2000,
        'days' => [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        'totalDays' => 365,
        'daysTillNow' => 8760, // cumulative from BS 1976
    ],
    [
        'year' => 2001,
        'days' => [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        'totalDays' => 365,
        'daysTillNow' => 9125,
    ],
    // ... continues to 2100
]
```

**Example Usage:**

```php
use NepaliDateLibrary\Helper\Constants;

// Get month lengths for a specific year
$mapStartYear = Constants::$NEPALI_DATE_MAP[0]['year'];
$year2082 = Constants::$NEPALI_DATE_MAP[2082 - $mapStartYear];

print_r($year2082['days']);
// [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]

// Days in Magh 2082 (month index 9)
echo $year2082['days'][9], PHP_EOL; // 30

// Total days in 2082
echo $year2082['totalDays'], PHP_EOL; // 366
```

---

### Month Length Variations

Nepali months have varying lengths (29-32 days) depending on the year:

| Month   | Min Days | Max Days | Typical |
| ------- | -------- | -------- | ------- |
| Baisakh | 30       | 31       | 31      |
| Jestha  | 31       | 32       | 31-32   |
| Asar    | 31       | 32       | 31-32   |
| Shrawan | 31       | 32       | 32      |
| Bhadra  | 31       | 32       | 31-32   |
| Aswin   | 30       | 31       | 30-31   |
| Kartik  | 29       | 30       | 29-30   |
| Mangsir | 29       | 30       | 29-30   |
| Poush   | 29       | 30       | 29-30   |
| Magh    | 29       | 30       | 29-30   |
| Falgun  | 29       | 30       | 29-30   |
| Chaitra | 30       | 31       | 30-31   |

::: warning
Never hardcode month lengths! Always use `daysInMonth()` or the date map to get accurate values.
:::

---

## Using Constants for Custom Formatting

```php
use NepaliDateLibrary\Helper\Constants;
use NepaliDateLibrary\NepaliDate;

function formatDateCustom(NepaliDate $date, bool $nepali = false): string
{
    $months = $nepali ? Constants::$MONTH_NP : Constants::$MONTH_EN;
    $days = $nepali ? Constants::$WEEK_NP : Constants::$WEEK_EN;

    return sprintf(
        '%s, %s %d, %d',
        $days[$date->getDay()],
        $months[$date->getMonth()],
        $date->getDate(),
        $date->getYear()
    );
}

$date = new NepaliDate(2082, 9, 15);
echo formatDateCustom($date), PHP_EOL;       // 'Wednesday, Magh 15, 2082'
echo formatDateCustom($date, true), PHP_EOL; // 'बुधबार, माघ 15, 2082'
```
