# API Reference

This section provides complete documentation for all classes, functions, and constants provided by the Nepali Date Library (PHP).

## Main Exports

### Classes

| Class                                                    | Description                              |
| ---------------------------------------------------------- | ------------------------------------------ |
| [NepaliDateLibrary\\NepaliDate](/docs/PHP/api/nepali-date-class) | Main class for working with Nepali dates |

### Functions

| Function                                                | Description                                |
| ---------------------------------------------------------- | ------------------------------------------- |
| [NepaliDateLibrary\\ADtoBS](/docs/PHP/api/conversion-functions#adtobs) | Convert AD (Gregorian) date to BS (Nepali) |
| [NepaliDateLibrary\\BStoAD](/docs/PHP/api/conversion-functions#bstoad) | Convert BS (Nepali) date to AD (Gregorian) |

### Constants

All constants live as static properties on `NepaliDateLibrary\Helper\Constants`.

| Constant                                                          | Description                        |
| --------------------------------------------------------------------- | ------------------------------------- |
| [Constants::\$MONTH_EN](/docs/PHP/api/constants#month-names)        | English month names                |
| [Constants::\$MONTH_NP](/docs/PHP/api/constants#month-names)        | Nepali month names                 |
| [Constants::\$MONTH_SHORT_EN](/docs/PHP/api/constants#month-names)  | Short English month names          |
| [Constants::\$MONTH_SHORT_NP](/docs/PHP/api/constants#month-names)  | Short Nepali month names           |
| [Constants::\$WEEK_EN](/docs/PHP/api/constants#weekday-names)       | English weekday names              |
| [Constants::\$WEEK_NP](/docs/PHP/api/constants#weekday-names)       | Nepali weekday names               |
| [Constants::\$WEEK_SHORT_EN](/docs/PHP/api/constants#weekday-names) | Short English weekday names        |
| [Constants::\$WEEK_SHORT_NP](/docs/PHP/api/constants#weekday-names) | Short Nepali weekday names         |
| [Constants::\$NUMBER_NP](/docs/PHP/api/constants#nepali-numbers)    | Nepali digits (०-९)                |
| [Constants::\$NEPALI_DATE_MAP](/docs/PHP/api/constants#date-map)    | Complete date map for BS 1976-2100 |

## Quick Import

```php
<?php

require 'vendor/autoload.php';

// Main class
use NepaliDateLibrary\NepaliDate;

// Conversion functions
use function NepaliDateLibrary\ADtoBS;
use function NepaliDateLibrary\BStoAD;

// Constants
use NepaliDateLibrary\Helper\Constants;
```

::: tip Namespaces vs. NodeJS/Python
NodeJS and Python export constants as top-level bindings you import directly (`MONTH_EN`, `NEPALI_DATE_MAP`, ...). PHP groups them as static properties on `NepaliDateLibrary\Helper\Constants` instead, since PHP has no bare named exports outside of classes/functions — everything else about the API (method names, argument order, return shapes) is identical.
:::
