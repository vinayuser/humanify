/**
 * Number helper utilities for human-readable number formatting
 */

/**
 * Shorten a number with K, M, B, T suffixes (e.g., 12543 → "13k")
 * @param {number} num - The number to shorten
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Shortened number string
 */
export function shortenNumber(num, decimals = 1) {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Invalid number provided');
  }
  
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  
  if (absNum < 1000) {
    return num.toString();
  }
  
  const units = [
    { value: 1e12, suffix: 'T' },
    { value: 1e9, suffix: 'B' },
    { value: 1e6, suffix: 'M' },
    { value: 1e3, suffix: 'K' }
  ];
  
  for (const unit of units) {
    if (absNum >= unit.value) {
      const shortened = (absNum / unit.value).toFixed(decimals);
      return sign + parseFloat(shortened) + unit.suffix;
    }
  }
  
  return num.toString();
}

/**
 * Humanize a number with automatic unit selection (K, M, B, T)
 * @param {number} num - The number to humanize
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Humanized number string
 */
export function humanizeNumber(num, decimals = 1) {
  return shortenNumber(num, decimals);
}

/**
 * Round a number to specified decimal places
 * @param {number} num - The number to round
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {number} Rounded number
 */
export function roundNumber(num, decimals = 2) {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Invalid number provided');
  }
  
  if (typeof decimals !== 'number' || decimals < 0) {
    throw new Error('Invalid decimals provided');
  }
  
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Format a number with commas as thousands separators
 * @param {number} num - The number to format
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Number with comma separators
 */
export function formatWithCommas(num, locale = 'en-US') {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Invalid number provided');
  }
  
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Format a number as currency
 * @param {number} num - The number to format
 * @param {string} currency - The currency code (default: 'USD')
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Formatted currency string
 */
export function formatCurrency(num, currency = 'USD', locale = 'en-US') {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Invalid number provided');
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(num);
}

/**
 * Format a number as a percentage
 * @param {number} num - The number to format (should be between 0 and 1 for percentages)
 * @param {number} decimals - Number of decimal places (default: 1)
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(num, decimals = 1, locale = 'en-US') {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Invalid number provided');
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
}

/**
 * Format a number with compact notation (1.2K, 3.4M, etc.)
 * @param {number} num - The number to format
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Compact formatted number
 */
export function formatCompact(num, locale = 'en-US') {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Invalid number provided');
  }
  
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(num);
}

/**
 * Format file size in human-readable format (bytes, KB, MB, GB, TB)
 * @param {number} bytes - File size in bytes
 * @param {object} options - Formatting options
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Human-readable file size
 */
export function formatFileSize(bytes, options = {}, locale = 'en-US') {
  if (typeof bytes !== 'number' || isNaN(bytes) || bytes < 0) {
    throw new Error('Invalid file size provided');
  }
  
  const {
    precision = 2,
    binary = false,
    unit = 'auto'
  } = options;
  
  if (bytes === 0) return '0 Bytes';
  
  const k = binary ? 1024 : 1000;
  const sizes = binary 
    ? ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    : ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  if (unit !== 'auto') {
    const unitIndex = sizes.indexOf(unit);
    if (unitIndex === -1) {
      throw new Error('Invalid unit provided');
    }
    const size = bytes / Math.pow(k, unitIndex);
    return `${size.toFixed(precision)} ${sizes[unitIndex]}`;
  }
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = bytes / Math.pow(k, i);
  
  return `${size.toFixed(precision)} ${sizes[i]}`;
}

/**
 * Format ordinal numbers (1st, 2nd, 3rd, 4th, etc.)
 * @param {number} num - The number to format
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Ordinal formatted number
 */
export function formatOrdinal(num, locale = 'en-US') {
  if (typeof num !== 'number' || isNaN(num) || !Number.isInteger(num)) {
    throw new Error('Invalid number provided');
  }
  
  // Handle special cases for English
  if (locale.startsWith('en')) {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return `${num}th`;
    }
    
    switch (lastDigit) {
      case 1: return `${num}st`;
      case 2: return `${num}nd`;
      case 3: return `${num}rd`;
      default: return `${num}th`;
    }
  }
  
  // For other locales, try to use Intl.NumberFormat with ordinal style
  // If not supported, fall back to simple formatting
  try {
    return new Intl.NumberFormat(locale, { style: 'ordinal' }).format(num);
  } catch (error) {
    // Fallback for locales that don't support ordinal formatting
    return `${num}`;
  }
}

/**
 * Format a number range (e.g., "1-5", "10-20")
 * @param {number} start - Start of the range
 * @param {number} end - End of the range
 * @param {object} options - Formatting options
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Formatted number range
 */
export function formatRange(start, end, options = {}, locale = 'en-US') {
  if (typeof start !== 'number' || typeof end !== 'number' || isNaN(start) || isNaN(end)) {
    throw new Error('Invalid range provided');
  }
  
  if (start > end) {
    throw new Error('Start value cannot be greater than end value');
  }
  
  const {
    separator = '-',
    includeStart = true,
    includeEnd = true,
    formatNumbers = true
  } = options;
  
  let startStr = includeStart ? (formatNumbers ? formatWithCommas(start, locale) : start.toString()) : '';
  let endStr = includeEnd ? (formatNumbers ? formatWithCommas(end, locale) : end.toString()) : '';
  
  if (!includeStart && !includeEnd) {
    throw new Error('At least one of start or end must be included');
  }
  
  if (start === end) {
    return startStr;
  }
  
  return `${startStr}${separator}${endStr}`;
}

/**
 * Pluralize a word based on count
 * @param {number} count - The count to pluralize for
 * @param {string} singular - Singular form of the word
 * @param {string} plural - Plural form of the word (optional, defaults to singular + 's')
 * @param {string} locale - The locale for pluralization (default: 'en-US')
 * @returns {string} Pluralized string
 */
export function pluralize(count, singular, plural = null, locale = 'en-US') {
  if (typeof count !== 'number' || isNaN(count)) {
    throw new Error('Invalid count provided');
  }
  
  if (typeof singular !== 'string') {
    throw new Error('Invalid singular form provided');
  }
  
  const pluralForm = plural || `${singular}s`;
  
  const rules = new Intl.PluralRules(locale);
  const rule = rules.select(count);
  
  if (rule === 'one') {
    return `${count} ${singular}`;
  } else {
    return `${count} ${pluralForm}`;
  }
}

/**
 * Format a number as a ratio or fraction
 * @param {number} numerator - The numerator
 * @param {number} denominator - The denominator
 * @param {object} options - Formatting options
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Formatted ratio
 */
export function formatRatio(numerator, denominator, options = {}, locale = 'en-US') {
  if (typeof numerator !== 'number' || typeof denominator !== 'number' || isNaN(numerator) || isNaN(denominator)) {
    throw new Error('Invalid ratio provided');
  }
  
  if (denominator === 0) {
    throw new Error('Denominator cannot be zero');
  }
  
  const {
    precision = 2,
    showPercentage = false,
    showFraction = false
  } = options;
  
  const ratio = numerator / denominator;
  
  if (showFraction) {
    return `${numerator}/${denominator}`;
  }
  
  if (showPercentage) {
    return formatPercentage(ratio, precision, locale);
  }
  
  return ratio.toFixed(precision);
}

/**
 * Format a number with significant digits
 * @param {number} num - The number to format
 * @param {number} digits - Number of significant digits (default: 3)
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Number with significant digits
 */
export function formatSignificant(num, digits = 3, locale = 'en-US') {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Invalid number provided');
  }
  
  if (typeof digits !== 'number' || digits < 1 || !Number.isInteger(digits)) {
    throw new Error('Invalid digits provided');
  }
  
  return new Intl.NumberFormat(locale, {
    minimumSignificantDigits: digits,
    maximumSignificantDigits: digits
  }).format(num);
}

/**
 * Format a number with engineering notation (1.23e+6)
 * @param {number} num - The number to format
 * @param {number} precision - Number of decimal places (default: 2)
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Engineering notation formatted number
 */
export function formatEngineering(num, precision = 2, locale = 'en-US') {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Invalid number provided');
  }
  
  return new Intl.NumberFormat(locale, {
    notation: 'scientific',
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  }).format(num);
}

/**
 * Validate if a value is a valid number
 * @param {any} value - The value to validate
 * @returns {boolean} True if valid number
 */
export function isValidNumber(value) {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Validate if a value is a valid integer
 * @param {any} value - The value to validate
 * @returns {boolean} True if valid integer
 */
export function isValidInteger(value) {
  return isValidNumber(value) && Number.isInteger(value);
}

/**
 * Clamp a number between min and max values
 * @param {number} num - The number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped number
 */
export function clampNumber(num, min, max) {
  if (!isValidNumber(num) || !isValidNumber(min) || !isValidNumber(max)) {
    throw new Error('Invalid number provided');
  }
  
  if (min > max) {
    throw new Error('Min value cannot be greater than max value');
  }
  
  return Math.min(Math.max(num, min), max);
}
