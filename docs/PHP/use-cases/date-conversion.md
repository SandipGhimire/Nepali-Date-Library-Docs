# Date Conversion

Converting between Anno Domini (AD/Gregorian) and Bikram Sambat (BS/Nepali) dates is one of the most common operations.

## Basic Conversion

### AD to BS

```php
use function NepaliDateLibrary\ADtoBS;

// Simple conversion
$bsDate = ADtoBS('2026-01-14');
echo $bsDate, PHP_EOL; // '2082-10-01'
```

### BS to AD

```php
use function NepaliDateLibrary\BStoAD;

// Simple conversion
$adDate = BStoAD('2082-10-01');
echo $adDate, PHP_EOL; // '2026-01-14'
```

---

## Converting User Input

### Form Input Handling

```php
use NepaliDateLibrary\NepaliDate;
use function NepaliDateLibrary\ADtoBS;
use function NepaliDateLibrary\BStoAD;

/**
 * @return array{ad: string, bs: string, nepaliDate: NepaliDate}
 */
function handleDateInput(string $value, string $inputType): array
{
    if ($inputType === 'ad') {
        $bsDate = ADtoBS($value);
        return [
            'ad' => $value,
            'bs' => $bsDate,
            'nepaliDate' => new NepaliDate($bsDate),
        ];
    }

    $adDate = BStoAD($value);
    return [
        'ad' => $adDate,
        'bs' => $value,
        'nepaliDate' => new NepaliDate($value),
    ];
}

// Usage
$result = handleDateInput('2026-01-14', 'ad');
echo $result['bs'], PHP_EOL; // '2082-10-01'
echo $result['nepaliDate']->format('MMMM DD, YYYY'), PHP_EOL; // 'Magh 01, 2082'
```

### Laravel Form Request Example

```php
use Illuminate\Foundation\Http\FormRequest;
use function NepaliDateLibrary\BStoAD;

class CreateEventRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'event_date_bs' => ['required', 'regex:/^\d{4}-\d{2}-\d{2}$/'],
        ];
    }

    public function eventDateAsAD(): string
    {
        // Store the AD equivalent in the database
        return BStoAD($this->validated()['event_date_bs']);
    }
}
```

---

## API Integration

### Storing Dates to a Backend

```php
use NepaliDateLibrary\NepaliDate;
use function NepaliDateLibrary\BStoAD;

/**
 * User selects a Nepali date; convert to AD for storage.
 *
 * @return array{title: string, eventDate: string}
 */
function createEvent(string $title, string $nepaliDateStr): array
{
    return [
        'title' => $title,
        'eventDate' => BStoAD($nepaliDateStr), // '2026-01-14'
    ];
}

$event = createEvent('New Year Party', '2082-10-01');
```

### Displaying Dates from a Backend

```php
use NepaliDateLibrary\NepaliDate;
use function NepaliDateLibrary\ADtoBS;

/**
 * @param array{id: int, title: string, eventDate: string} $event Stored as AD
 */
function displayEvent(array $event): string
{
    $bsDate = ADtoBS($event['eventDate']);
    $nepaliDate = new NepaliDate($bsDate);

    return sprintf(
        "<div class=\"event\"><h3>%s</h3><p>%s</p><p class=\"nepali\">%s</p></div>",
        $event['title'],
        $nepaliDate->format('MMMM DD, YYYY'),
        $nepaliDate->format('mmmm dd, yyyy')
    );
}
```

---

## Batch Conversion

### Converting Multiple Dates

```php
use function NepaliDateLibrary\ADtoBS;

// Convert an array of AD dates to BS
$adDates = ['2026-01-14', '2026-02-15', '2026-03-16'];
$bsDates = array_map(fn (string $date) => ADtoBS($date), $adDates);
print_r($bsDates);
// ['2082-10-01', '2082-11-03', '2082-12-03']

// Convert with error handling
function batchConvertADtoBS(array $dates): array
{
    return array_map(function (string $date) {
        try {
            return ADtoBS($date);
        } catch (Throwable $e) {
            return null;
        }
    }, $dates);
}
```

### Processing Date Ranges

```php
use function NepaliDateLibrary\ADtoBS;

/**
 * @param array{start: string, end: string} $adRange
 * @return array{start: string, end: string}
 */
function convertDateRange(array $adRange): array
{
    return [
        'start' => ADtoBS($adRange['start']),
        'end' => ADtoBS($adRange['end']),
    ];
}

$adRange = ['start' => '2026-01-01', 'end' => '2026-01-31'];
$bsRange = convertDateRange($adRange);
print_r($bsRange);
// ['start' => '2082-09-17', 'end' => '2082-10-17']
```

---

## Error Handling

### Safe Conversion Functions

```php
use function NepaliDateLibrary\ADtoBS;

// Safe wrapper with a default value
function safeADtoBS(string $adDate, string $fallback = ''): string
{
    try {
        return ADtoBS($adDate);
    } catch (Throwable $e) {
        error_log("Failed to convert {$adDate}: {$e->getMessage()}");
        return $fallback;
    }
}

// Safe wrapper returning a discriminated result array
/**
 * @return array{success: true, value: string}|array{success: false, error: string}
 */
function convertADtoBSSafe(string $adDate): array
{
    try {
        return ['success' => true, 'value' => ADtoBS($adDate)];
    } catch (Throwable $e) {
        return ['success' => false, 'error' => $e->getMessage()];
    }
}

// Usage
$result = convertADtoBSSafe('invalid-date');
if ($result['success']) {
    echo $result['value'], PHP_EOL;
} else {
    error_log($result['error']);
}
```

### Validation Before Conversion

```php
use NepaliDateLibrary\NepaliDate;
use function NepaliDateLibrary\ADtoBS;

function isValidAdDateFormat(string $dateString): bool
{
    return preg_match('/^\d{4}-\d{2}-\d{2}$/', $dateString) === 1;
}

function isWithinSupportedRange(string $adDate): bool
{
    $date = new DateTimeImmutable($adDate, new DateTimeZone('UTC'));
    $min = NepaliDate::minimum();
    $max = NepaliDate::maximum();
    return $date >= $min && $date <= $max;
}

function validateAndConvert(string $adDate): ?string
{
    if (!isValidAdDateFormat($adDate)) {
        error_log('Invalid format. Use YYYY-MM-DD');
        return null;
    }

    if (!isWithinSupportedRange($adDate)) {
        error_log('Date out of supported range');
        return null;
    }

    return ADtoBS($adDate);
}
```

---

## Real-World Examples

### Date of Birth Handling

```php
use NepaliDateLibrary\NepaliDate;
use function NepaliDateLibrary\ADtoBS;
use function NepaliDateLibrary\BStoAD;

final class Person
{
    public function __construct(
        public string $name,
        public string $dobAD, // Stored in database
        public string $dobBS, // For display
    ) {}
}

function createPersonFromAD(string $name, string $dobAD): Person
{
    return new Person($name, $dobAD, ADtoBS($dobAD));
}

function createPersonFromBS(string $name, string $dobBS): Person
{
    return new Person($name, BStoAD($dobBS), $dobBS);
}

function displayPerson(Person $person): string
{
    $dob = new NepaliDate($person->dobBS);
    return sprintf(
        "Name: %s\nDate of Birth (BS): %s\nDate of Birth (AD): %s",
        $person->name,
        $dob->format('MMMM DD, YYYY'),
        $person->dobAD
    );
}
```

### Document Date Formatting

```php
use NepaliDateLibrary\NepaliDate;

/**
 * @return array{formal: string, informal: string, nepali: string, full: string}
 */
function formatDocumentDate(NepaliDate $date): array
{
    return [
        'formal' => $date->format('YYYY-MM-DD'),      // 2082-10-01
        'informal' => $date->format('MMM D, YYYY'),    // Mag 1, 2082
        'nepali' => $date->format('yyyy mmmm dd'),     // २०८२ माघ ०१
        'full' => $date->format('dddd, mmmm dd, yyyy'), // बुधबार, माघ ०१, २०८२
    ];
}

$today = new NepaliDate();
print_r(formatDocumentDate($today));
```
