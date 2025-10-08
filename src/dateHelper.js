/**
 * Date helper utilities for human-readable date formatting
 */

/**
 * Get a human-readable time ago string (e.g., "3 hours ago", "2 days ago")
 * @param {Date|string} date - The date to compare against now
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Human-readable time ago string
 */
export function timeAgo(date, locale = 'en-US') {
  const now = new Date();
  const targetDate = new Date(date);
  
  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  const diffInSeconds = Math.floor((now - targetDate) / 1000);
  
  if (diffInSeconds < 0) {
    return timeFromNow(date, locale);
  }
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  const intervals = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'week', seconds: 604800 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 }
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return rtf.format(-count, interval.unit);
    }
  }
  
  return rtf.format(0, 'second');
}

/**
 * Get a human-readable time from now string (e.g., "in 3 hours", "in 2 days")
 * @param {Date|string} date - The date to compare against now
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Human-readable time from now string
 */
export function timeFromNow(date, locale = 'en-US') {
  const now = new Date();
  const targetDate = new Date(date);
  
  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  const diffInSeconds = Math.floor((targetDate - now) / 1000);
  
  if (diffInSeconds < 0) {
    return timeAgo(date, locale);
  }
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  const intervals = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'week', seconds: 604800 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 }
  ];
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return rtf.format(count, interval.unit);
    }
  }
  
  return rtf.format(0, 'second');
}

/**
 * Format a date using a custom format string
 * @param {Date|string} date - The date to format
 * @param {string} format - The format string (supports: YYYY, MM, DD, HH, mm, ss)
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Formatted date string
 */
export function formatDate(date, format = 'YYYY-MM-DD', locale = 'en-US') {
  const targetDate = new Date(date);
  
  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');
  const hours = String(targetDate.getHours()).padStart(2, '0');
  const minutes = String(targetDate.getMinutes()).padStart(2, '0');
  const seconds = String(targetDate.getSeconds()).padStart(2, '0');
  
  return format
    .replace(/YYYY/g, year)
    .replace(/MM/g, month)
    .replace(/DD/g, day)
    .replace(/HH/g, hours)
    .replace(/mm/g, minutes)
    .replace(/ss/g, seconds);
}

/**
 * Get a human-readable date string using Intl.DateTimeFormat
 * @param {Date|string} date - The date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Human-readable date string
 */
export function humanizeDate(date, options = {}, locale = 'en-US') {
  const targetDate = new Date(date);
  
  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  const formatOptions = { ...defaultOptions, ...options };
  
  return new Intl.DateTimeFormat(locale, formatOptions).format(targetDate);
}

/**
 * Format a date with timezone support
 * @param {Date|string} date - The date to format
 * @param {string} timezone - The timezone (e.g., 'America/New_York', 'UTC')
 * @param {object} options - Intl.DateTimeFormat options
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Formatted date with timezone
 */
export function formatDateWithTimezone(date, timezone = 'UTC', options = {}, locale = 'en-US') {
  const targetDate = new Date(date);
  
  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  const defaultOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: timezone
  };
  
  const formatOptions = { ...defaultOptions, ...options };
  
  return new Intl.DateTimeFormat(locale, formatOptions).format(targetDate);
}

/**
 * Get time ago with precision control
 * @param {Date|string} date - The date to compare against now
 * @param {string} precision - 'auto', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Human-readable time ago string with specified precision
 */
export function timeAgoWithPrecision(date, precision = 'auto', locale = 'en-US') {
  const now = new Date();
  const targetDate = new Date(date);
  
  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  const diffInSeconds = Math.floor((now - targetDate) / 1000);
  
  if (diffInSeconds < 0) {
    return timeFromNowWithPrecision(date, precision, locale);
  }
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  if (precision === 'auto') {
    return timeAgo(date, locale);
  }
  
  const intervals = {
    'seconds': { unit: 'second', seconds: 1 },
    'minutes': { unit: 'minute', seconds: 60 },
    'hours': { unit: 'hour', seconds: 3600 },
    'days': { unit: 'day', seconds: 86400 },
    'weeks': { unit: 'week', seconds: 604800 },
    'months': { unit: 'month', seconds: 2592000 },
    'years': { unit: 'year', seconds: 31536000 }
  };
  
  const interval = intervals[precision];
  if (!interval) {
    throw new Error('Invalid precision provided');
  }
  
  const count = Math.floor(diffInSeconds / interval.seconds);
  return rtf.format(-count, interval.unit);
}

/**
 * Get time from now with precision control
 * @param {Date|string} date - The date to compare against now
 * @param {string} precision - 'auto', 'seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Human-readable time from now string with specified precision
 */
export function timeFromNowWithPrecision(date, precision = 'auto', locale = 'en-US') {
  const now = new Date();
  const targetDate = new Date(date);
  
  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  const diffInSeconds = Math.floor((targetDate - now) / 1000);
  
  if (diffInSeconds < 0) {
    return timeAgoWithPrecision(date, precision, locale);
  }
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  if (precision === 'auto') {
    return timeFromNow(date, locale);
  }
  
  const intervals = {
    'seconds': { unit: 'second', seconds: 1 },
    'minutes': { unit: 'minute', seconds: 60 },
    'hours': { unit: 'hour', seconds: 3600 },
    'days': { unit: 'day', seconds: 86400 },
    'weeks': { unit: 'week', seconds: 604800 },
    'months': { unit: 'month', seconds: 2592000 },
    'years': { unit: 'year', seconds: 31536000 }
  };
  
  const interval = intervals[precision];
  if (!interval) {
    throw new Error('Invalid precision provided');
  }
  
  const count = Math.floor(diffInSeconds / interval.seconds);
  return rtf.format(count, interval.unit);
}

/**
 * Format duration in human-readable format (e.g., "1h 30m 45s")
 * @param {number} seconds - Duration in seconds
 * @param {object} options - Formatting options
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} Human-readable duration string
 */
export function formatDuration(seconds, options = {}, locale = 'en-US') {
  if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
    throw new Error('Invalid duration provided');
  }
  
  const {
    includeSeconds = true,
    includeMinutes = true,
    includeHours = true,
    includeDays = true,
    includeWeeks = true,
    includeMonths = true,
    includeYears = true,
    maxUnits = 3,
    compact = false
  } = options;
  
  const units = [];
  let remaining = Math.floor(seconds);
  
  const timeUnits = [
    { name: 'year', seconds: 31536000, enabled: includeYears },
    { name: 'month', seconds: 2592000, enabled: includeMonths },
    { name: 'week', seconds: 604800, enabled: includeWeeks },
    { name: 'day', seconds: 86400, enabled: includeDays },
    { name: 'hour', seconds: 3600, enabled: includeHours },
    { name: 'minute', seconds: 60, enabled: includeMinutes },
    { name: 'second', seconds: 1, enabled: includeSeconds }
  ];
  
  for (const unit of timeUnits) {
    if (!unit.enabled || remaining < unit.seconds) continue;
    
    const count = Math.floor(remaining / unit.seconds);
    remaining = remaining % unit.seconds;
    
    if (count > 0) {
      const unitName = compact ? unit.name.charAt(0) : unit.name;
      units.push(`${count}${unitName}`);
    }
    
    if (units.length >= maxUnits) break;
  }
  
  if (units.length === 0) {
    return compact ? '0s' : '0 seconds';
  }
  
  return units.join(' ');
}

/**
 * Get the start of a time period (day, week, month, year)
 * @param {Date|string} date - The date to get start of period for
 * @param {string} period - 'day', 'week', 'month', 'year'
 * @returns {Date} Start of the period
 */
export function startOf(date, period) {
  const targetDate = new Date(date);
  
  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  const result = new Date(targetDate);
  
  switch (period) {
    case 'day':
      result.setHours(0, 0, 0, 0);
      break;
    case 'week':
      const dayOfWeek = result.getDay();
      const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Monday as start of week
      result.setDate(result.getDate() - daysToSubtract);
      result.setHours(0, 0, 0, 0);
      break;
    case 'month':
      result.setDate(1);
      result.setHours(0, 0, 0, 0);
      break;
    case 'year':
      result.setMonth(0, 1);
      result.setHours(0, 0, 0, 0);
      break;
    default:
      throw new Error('Invalid period provided');
  }
  
  return result;
}

/**
 * Get the end of a time period (day, week, month, year)
 * @param {Date|string} date - The date to get end of period for
 * @param {string} period - 'day', 'week', 'month', 'year'
 * @returns {Date} End of the period
 */
export function endOf(date, period) {
  const targetDate = new Date(date);
  
  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  const result = new Date(targetDate);
  
  switch (period) {
    case 'day':
      result.setHours(23, 59, 59, 999);
      break;
    case 'week':
      const dayOfWeek = result.getDay();
      const daysToAdd = dayOfWeek === 0 ? 0 : 7 - dayOfWeek; // Sunday as end of week
      result.setDate(result.getDate() + daysToAdd);
      result.setHours(23, 59, 59, 999);
      break;
    case 'month':
      result.setMonth(result.getMonth() + 1, 0);
      result.setHours(23, 59, 59, 999);
      break;
    case 'year':
      result.setMonth(11, 31);
      result.setHours(23, 59, 59, 999);
      break;
    default:
      throw new Error('Invalid period provided');
  }
  
  return result;
}
