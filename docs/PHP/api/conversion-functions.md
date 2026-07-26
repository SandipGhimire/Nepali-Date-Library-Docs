# Conversion Functions

The library provides two utility functions for converting between Anno Domini (AD/Gregorian) and Bikram Sambat (BS/Nepali) dates. Both live in the `NepaliDateLibrary` namespace.

## Import

```php
use function NepaliDateLibrary\ADtoBS;
use function NepaliDateLibrary\BStoAD;
```

---

## ADtoBS() {#adtobs}

Converts an Anno Domini (AD) date to a Bikram Sambat (BS) date.

### Signature

```php
function ADtoBS(string $adDate): string
```

### Parameters

| Parameter | Type     | Description                     |
| ---------- | -------- | ---------------------------------- |
| `$adDate` | `string` | AD date in `YYYY-MM-DD` format   |

### Returns

`string` - BS date in `YYYY-MM-DD` format

### Example

```php
use function NepaliDateLibrary\ADtoBS;

// Convert Gregorian date to Nepali date
$bsDate = ADtoBS('2026-01-14');
echo $bsDate, PHP_EOL; // '2082-10-01'

// More examples
echo ADtoBS('2024-04-13'), PHP_EOL; // '2080-12-31' (Last day of 2080)
echo ADtoBS('2024-04-14'), PHP_EOL; // '2081-01-01' (Nepali New Year 2081)
echo ADtoBS('2025-04-14'), PHP_EOL; // '2082-01-01' (Nepali New Year 2082)
```

### Error Handling

The function throws exceptions in the following cases:

```php
use function NepaliDateLibrary\ADtoBS;

// Invalid format
try {
    ADtoBS('2026/01/14'); // Wrong separator
} catch (InvalidArgumentException $e) {
    echo $e->getMessage(), PHP_EOL; // 'Invalid date format. Expected format: YYYY-MM-DD'
}

// Invalid date
try {
    ADtoBS('2026-13-01'); // Invalid month
} catch (InvalidArgumentException $e) {
    echo $e->getMessage(), PHP_EOL; // "Invalid date input '2026-13-01'"
}

// Out of range
try {
    ADtoBS('1900-01-01'); // Before supported range
} catch (RuntimeException $e) {
    echo $e->getMessage(), PHP_EOL;           // 'Failed to convert AD to BS'
    echo $e->getPrevious()->getMessage(), PHP_EOL; // Underlying cause
}
```

---

## BStoAD() {#bstoad}

Converts a Bikram Sambat (BS) date to an Anno Domini (AD) date.

### Signature

```php
function BStoAD(string $bsDate): string
```

### Parameters

| Parameter | Type     | Description                     |
| ---------- | -------- | ---------------------------------- |
| `$bsDate` | `string` | BS date in `YYYY-MM-DD` format   |

### Returns

`string` - AD date in `YYYY-MM-DD` format

### Example

```php
use function NepaliDateLibrary\BStoAD;

// Convert Nepali date to Gregorian date
$adDate = BStoAD('2082-10-01');
echo $adDate, PHP_EOL; // '2026-01-14'

// More examples
echo BStoAD('2081-01-01'), PHP_EOL; // '2024-04-13' (Nepali New Year 2081)
echo BStoAD('2082-01-01'), PHP_EOL; // '2025-04-14' (Nepali New Year 2082)
```

### Error Handling

```php
use function NepaliDateLibrary\BStoAD;

// Invalid format
try {
    BStoAD('2082/10/01'); // Wrong separator
} catch (InvalidArgumentException $e) {
    echo $e->getMessage(), PHP_EOL; // 'Invalid date format. Expected format: YYYY-MM-DD'
}

// Out of range
try {
    BStoAD('1975-01-01'); // Before BS 1976
} catch (RuntimeException $e) {
    echo $e->getMessage(), PHP_EOL; // 'Failed to convert BS to AD'
}
```

---

## Supported Date Range

Both conversion functions work within the following range:

| Calendar               | Start      | End        |
| ------------------------ | ---------- | ---------- |
| **Bikram Sambat (BS)** | 1976-01-01 | 2100-12-30 |
| **Anno Domini (AD)**   | 1919-04-13 | ~2044-04   |

Dates outside this range throw a `RuntimeException`.

---

## Using with the NepaliDate Class

You can also perform conversions using the `NepaliDate` class:

```php
use NepaliDateLibrary\NepaliDate;

// AD to BS using the constructor
$phpDate = new DateTimeImmutable('2026-01-14', new DateTimeZone('UTC'));
$nepaliDate = new NepaliDate($phpDate);
echo $nepaliDate->format('YYYY-MM-DD'), PHP_EOL; // '2082-10-01'

// BS to AD using getEnglishDate()
$bsDate = new NepaliDate('2082-10-01');
$adDate = $bsDate->getEnglishDate();
echo $adDate->format('Y-m-d'), PHP_EOL; // '2026-01-14'
```

---

## Common Patterns

### Batch Conversion

```php
use function NepaliDateLibrary\ADtoBS;

$adDates = ['2026-01-14', '2026-02-15', '2026-03-16'];
$bsDates = array_map(fn (string $date) => ADtoBS($date), $adDates);
print_r($bsDates);
// ['2082-10-01', '2082-11-03', '2082-12-03']
```

### Safe Conversion with Error Handling

```php
use function NepaliDateLibrary\ADtoBS;

function safeADtoBS(string $adDate): ?string
{
    try {
        return ADtoBS($adDate);
    } catch (Throwable $e) {
        return null;
    }
}

echo safeADtoBS('2026-01-14'), PHP_EOL; // '2082-10-01'
var_dump(safeADtoBS('invalid'));         // NULL
```

### Validating Input Before Conversion

```php
use function NepaliDateLibrary\ADtoBS;

function isValidAdDate(string $dateString): bool
{
    if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $dateString) !== 1) {
        return false;
    }

    return DateTimeImmutable::createFromFormat('!Y-m-d', $dateString) !== false;
}

$input = '2026-01-14';
if (isValidAdDate($input)) {
    echo ADtoBS($input), PHP_EOL;
}
```
