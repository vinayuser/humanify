# Humanify

A Node.js v20 ESM-based utility package for formatting dates and numbers in human-readable formats, similar to Laravel's Carbon.

## Features

- 📅 **Advanced Date Helpers**: Human-readable time formatting, timezone support, duration formatting, and period utilities
- 🔢 **Comprehensive Number Helpers**: Number shortening, file size formatting, ordinal numbers, ranges, pluralization, and more
- 🌍 **Full Internationalization**: Complete support for different locales using native `Intl` APIs
- ⚡ **ESM Ready**: Built for Node.js v20+ with native ES modules
- 📦 **Zero Dependencies**: Uses only native JavaScript APIs
- 🛠️ **Developer Utilities**: Validation, clamping, and utility functions for robust applications

## Installation

```bash
npm install humanify
```

## Quick Start

```javascript
import { 
  timeAgo, 
  shortenNumber, 
  formatWithCommas, 
  formatFileSize, 
  formatOrdinal,
  pluralize 
} from 'humanify';

// Date formatting
console.log(timeAgo('2025-10-08T10:00:00Z')); // "3 hours ago"
console.log(timeFromNow('2025-12-25T00:00:00Z')); // "in 2 months"

// Number formatting
console.log(shortenNumber(12543)); // "13k"
console.log(formatWithCommas(1234567)); // "1,234,567"

// Advanced features
console.log(formatFileSize(1048576)); // "1.05 MB"
console.log(formatOrdinal(21)); // "21st"
console.log(pluralize(5, 'item')); // "5 items"
```

## API Reference

### Date Helpers

#### `timeAgo(date, locale?)`
Returns a human-readable time ago string.

```javascript
timeAgo('2024-01-01T00:00:00Z'); // "2 months ago"
timeAgo(new Date(), 'es-ES'); // "hace 2 horas"
```

#### `timeFromNow(date, locale?)`
Returns a human-readable time from now string.

```javascript
timeFromNow('2025-12-25T00:00:00Z'); // "in 8 months"
```

#### `formatDate(date, format?, locale?)`
Formats a date using a custom format string.

```javascript
formatDate('2024-01-15T14:30:00Z', 'YYYY-MM-DD HH:mm'); // "2024-01-15 14:30"
```

#### `humanizeDate(date, options?, locale?)`
Formats a date using `Intl.DateTimeFormat`.

```javascript
humanizeDate('2024-01-15T14:30:00Z'); // "January 15, 2024 at 02:30 PM"
```

#### `formatDateWithTimezone(date, timezone?, options?, locale?)`
Formats a date with timezone support.

```javascript
formatDateWithTimezone('2024-01-15T14:30:00Z', 'America/New_York'); // "01/15/2024, 09:30:00 AM"
```

#### `timeAgoWithPrecision(date, precision?, locale?)`
Get time ago with precision control.

```javascript
timeAgoWithPrecision(date, 'hours'); // "3 hours ago"
timeAgoWithPrecision(date, 'days'); // "2 days ago"
```

#### `timeFromNowWithPrecision(date, precision?, locale?)`
Get time from now with precision control.

```javascript
timeFromNowWithPrecision(date, 'hours'); // "in 3 hours"
```

#### `formatDuration(seconds, options?, locale?)`
Format duration in human-readable format.

```javascript
formatDuration(3661); // "1h 1m 1s"
formatDuration(3661, {compact: true}); // "1h 1m 1s"
formatDuration(3661, {maxUnits: 2}); // "1h 1m"
```

#### `startOf(date, period)`
Get the start of a time period.

```javascript
startOf(new Date(), 'week'); // Start of current week
startOf(new Date(), 'month'); // Start of current month
```

#### `endOf(date, period)`
Get the end of a time period.

```javascript
endOf(new Date(), 'week'); // End of current week
endOf(new Date(), 'month'); // End of current month
```

### Number Helpers

#### `shortenNumber(num, decimals?)`
Shortens numbers with K, M, B, T suffixes.

```javascript
shortenNumber(12543); // "13k"
shortenNumber(1250000); // "1.3M"
shortenNumber(1250000000); // "1.3B"
```

#### `humanizeNumber(num, decimals?)`
Alias for `shortenNumber()`.

#### `roundNumber(num, decimals?)`
Rounds a number to specified decimal places.

```javascript
roundNumber(3.14159, 2); // 3.14
```

#### `formatWithCommas(num, locale?)`
Formats numbers with comma separators.

```javascript
formatWithCommas(1234567); // "1,234,567"
formatWithCommas(1234567, 'de-DE'); // "1.234.567"
```

#### `formatCurrency(num, currency?, locale?)`
Formats numbers as currency.

```javascript
formatCurrency(1234.56); // "$1,234.56"
formatCurrency(1234.56, 'EUR', 'de-DE'); // "1.234,56 €"
```

#### `formatPercentage(num, decimals?, locale?)`
Formats numbers as percentages.

```javascript
formatPercentage(0.1234); // "12.3%"
```

#### `formatCompact(num, locale?)`
Formats numbers in compact notation.

```javascript
formatCompact(1234567); // "1.2M"
```

#### `formatFileSize(bytes, options?, locale?)`
Formats file size in human-readable format.

```javascript
formatFileSize(1024); // "1.02 KB"
formatFileSize(1048576); // "1.05 MB"
formatFileSize(1048576, {binary: true}); // "1.00 MiB"
```

#### `formatOrdinal(num, locale?)`
Formats ordinal numbers (1st, 2nd, 3rd).

```javascript
formatOrdinal(1); // "1st"
formatOrdinal(2); // "2nd"
formatOrdinal(3); // "3rd"
formatOrdinal(21); // "21st"
```

#### `formatRange(start, end, options?, locale?)`
Formats number ranges.

```javascript
formatRange(1, 5); // "1-5"
formatRange(1000, 2000); // "1,000-2,000"
formatRange(1, 5, {separator: ' to '}); // "1 to 5"
```

#### `pluralize(count, singular, plural?, locale?)`
Pluralizes words based on count.

```javascript
pluralize(1, 'item'); // "1 item"
pluralize(5, 'item'); // "5 items"
pluralize(1, 'child', 'children'); // "1 child"
pluralize(3, 'child', 'children'); // "3 children"
```

#### `formatRatio(numerator, denominator, options?, locale?)`
Formats numbers as ratios or fractions.

```javascript
formatRatio(3, 4); // "0.75"
formatRatio(3, 4, {showPercentage: true}); // "75%"
formatRatio(3, 4, {showFraction: true}); // "3/4"
```

#### `formatSignificant(num, digits?, locale?)`
Formats numbers with significant digits.

```javascript
formatSignificant(123.456, 2); // "120"
formatSignificant(0.00123, 3); // "0.00123"
```

#### `formatEngineering(num, precision?, locale?)`
Formats numbers in engineering notation.

```javascript
formatEngineering(1234567); // "1.23e+6"
```

#### `isValidNumber(value)`
Validates if a value is a valid number.

```javascript
isValidNumber(42); // true
isValidNumber('not a number'); // false
```

#### `isValidInteger(value)`
Validates if a value is a valid integer.

```javascript
isValidInteger(42); // true
isValidInteger(42.5); // false
```

#### `clampNumber(num, min, max)`
Clamps a number between min and max values.

```javascript
clampNumber(15, 10, 20); // 15
clampNumber(5, 10, 20); // 10
clampNumber(25, 10, 20); // 20
```

## Internationalization

All functions support locale-specific formatting:

```javascript
import { timeAgo, formatWithCommas, formatCurrency } from 'humanify';

// Spanish
timeAgo(date, 'es-ES'); // "hace 2 horas"
formatWithCommas(1234567, 'es-ES'); // "1.234.567"

// German
formatCurrency(1234.56, 'EUR', 'de-DE'); // "1.234,56 €"

// French
formatCurrency(1234.56, 'EUR', 'fr-FR'); // "1 234,56 €"
```

## Examples

See `example.js` for comprehensive usage examples:

```bash
npm start
# or
node example.js
```

## Requirements

- Node.js v20.0.0 or higher
- ESM support (use `import` syntax)

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Changelog

### 1.0.0
- Initial release
- Date helper functions with `Intl.RelativeTimeFormat`
- Number helper functions with various formatting options
- Full internationalization support
- ESM module support
