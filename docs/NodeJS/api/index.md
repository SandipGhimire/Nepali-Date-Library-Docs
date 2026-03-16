# API Reference

This section provides complete documentation for all classes, functions, and constants exported by the Nepali Date Library.

## Main Exports

### Classes

| Class                                            | Description                              |
| ------------------------------------------------ | ---------------------------------------- |
| [NepaliDate](/docs/NodeJS/api/nepali-date-class) | Main class for working with Nepali dates |

### Functions

| Function                                               | Description                                |
| ------------------------------------------------------ | ------------------------------------------ |
| [ADtoBS](/docs/NodeJS/api/conversion-functions#adtobs) | Convert AD (Gregorian) date to BS (Nepali) |
| [BStoAD](/docs/NodeJS/api/conversion-functions#bstoad) | Convert BS (Nepali) date to AD (Gregorian) |

### Constants

| Constant                                                  | Description                        |
| --------------------------------------------------------- | ---------------------------------- |
| [MONTH_EN](/docs/NodeJS/api/constants#month-names)        | English month names                |
| [MONTH_NP](/docs/NodeJS/api/constants#month-names)        | Nepali month names                 |
| [MONTH_SHORT_EN](/docs/NodeJS/api/constants#month-names)  | Short English month names          |
| [MONTH_SHORT_NP](/docs/NodeJS/api/constants#month-names)  | Short Nepali month names           |
| [WEEK_EN](/docs/NodeJS/api/constants#weekday-names)       | English weekday names              |
| [WEEK_NP](/docs/NodeJS/api/constants#weekday-names)       | Nepali weekday names               |
| [WEEK_SHORT_EN](/docs/NodeJS/api/constants#weekday-names) | Short English weekday names        |
| [WEEK_SHORT_NP](/docs/NodeJS/api/constants#weekday-names) | Short Nepali weekday names         |
| [NUMBER_NP](/docs/NodeJS/api/constants#nepali-numbers)    | Nepali digits (०-९)                |
| [NEPALI_DATE_MAP](/docs/NodeJS/api/constants#date-map)    | Complete date map for BS 2000-2100 |

## Quick Import

```typescript
import {
  // Main class
  NepaliDate,

  // Conversion functions
  ADtoBS,
  BStoAD,

  // Month constants
  MONTH_EN,
  MONTH_NP,
  MONTH_SHORT_EN,
  MONTH_SHORT_NP,

  // Week constants
  WEEK_EN,
  WEEK_NP,
  WEEK_SHORT_EN,
  WEEK_SHORT_NP,

  // Other constants
  NUMBER_NP,
  NEPALI_DATE_MAP,
} from "nepali-date-library";
```
