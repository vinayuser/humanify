/**
 * String helper utilities for common string operations
 */

/**
 * Convert string to URL-friendly slug
 * @param {string} str - The string to slugify
 * @param {object} options - Slugify options
 * @returns {string} URL-friendly slug
 */
export function slugify(str, options = {}) {
  if (typeof str !== 'string') {
    throw new Error('Invalid string provided');
  }
  
  const {
    separator = '-',
    lower = true,
    strict = false
  } = options;
  
  let result = str;
  
  if (lower) {
    result = result.toLowerCase();
  }
  
  // Replace spaces and special characters
  result = result.replace(/[^\w\s-]/g, strict ? '' : separator);
  
  // Replace multiple spaces/separators with single separator
  result = result.replace(/[\s_-]+/g, separator);
  
  // Remove leading/trailing separators
  result = result.replace(/^-+|-+$/g, '');
  
  return result;
}

/**
 * Truncate string to specified length with ellipsis
 * @param {string} str - The string to truncate
 * @param {number} length - Maximum length
 * @param {object} options - Truncation options
 * @returns {string} Truncated string
 */
export function truncate(str, length, options = {}) {
  if (typeof str !== 'string') {
    throw new Error('Invalid string provided');
  }
  
  if (typeof length !== 'number' || length < 0) {
    throw new Error('Invalid length provided');
  }
  
  const {
    suffix = '...',
    wordBoundary = false
  } = options;
  
  if (str.length <= length) {
    return str;
  }
  
  let truncated = str.substring(0, length);
  
  if (wordBoundary) {
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 0) {
      truncated = truncated.substring(0, lastSpace);
    }
  }
  
  return truncated + suffix;
}

/**
 * Capitalize first letter of string
 * @param {string} str - The string to capitalize
 * @param {boolean} lowerRest - Whether to lowercase the rest
 * @returns {string} Capitalized string
 */
export function capitalize(str, lowerRest = false) {
  if (typeof str !== 'string') {
    throw new Error('Invalid string provided');
  }
  
  if (str.length === 0) return str;
  
  const first = str.charAt(0).toUpperCase();
  const rest = lowerRest ? str.slice(1).toLowerCase() : str.slice(1);
  
  return first + rest;
}

/**
 * Convert string to title case
 * @param {string} str - The string to convert
 * @returns {string} Title case string
 */
export function toTitleCase(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid string provided');
  }
  
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Convert camelCase to kebab-case
 * @param {string} str - The string to convert
 * @returns {string} Kebab-case string
 */
export function camelToKebab(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid string provided');
  }
  
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Convert kebab-case to camelCase
 * @param {string} str - The string to convert
 * @returns {string} CamelCase string
 */
export function kebabToCamel(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid string provided');
  }
  
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

/**
 * Convert snake_case to camelCase
 * @param {string} str - The string to convert
 * @returns {string} CamelCase string
 */
export function snakeToCamel(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid string provided');
  }
  
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

/**
 * Convert camelCase to snake_case
 * @param {string} str - The string to convert
 * @returns {string} Snake_case string
 */
export function camelToSnake(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid string provided');
  }
  
  return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
}

/**
 * Remove HTML tags from string
 * @param {string} str - The string to clean
 * @returns {string} String without HTML tags
 */
export function stripHtml(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid string provided');
  }
  
  return str.replace(/<[^>]*>/g, '');
}

/**
 * Escape HTML special characters
 * @param {string} str - The string to escape
 * @returns {string} HTML-escaped string
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid string provided');
  }
  
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  
  return str.replace(/[&<>"']/g, (match) => htmlEscapes[match]);
}

/**
 * Unescape HTML entities
 * @param {string} str - The string to unescape
 * @returns {string} Unescaped string
 */
export function unescapeHtml(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid string provided');
  }
  
  const htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };
  
  return str.replace(/&(?:amp|lt|gt|quot|#39);/g, (match) => htmlUnescapes[match]);
}

/**
 * Generate random string
 * @param {number} length - Length of random string
 * @param {object} options - Generation options
 * @returns {string} Random string
 */
export function randomString(length = 10, options = {}) {
  if (typeof length !== 'number' || length < 0) {
    throw new Error('Invalid length provided');
  }
  
  const {
    includeNumbers = true,
    includeUppercase = true,
    includeLowercase = true,
    includeSymbols = false,
    customChars = ''
  } = options;
  
  let chars = '';
  
  if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeNumbers) chars += '0123456789';
  if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (customChars) chars += customChars;
  
  if (chars.length === 0) {
    throw new Error('No character set specified');
  }
  
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

/**
 * Mask sensitive string (like credit card, email)
 * @param {string} str - The string to mask
 * @param {object} options - Masking options
 * @returns {string} Masked string
 */
export function maskString(str, options = {}) {
  if (typeof str !== 'string') {
    throw new Error('Invalid string provided');
  }
  
  const {
    maskChar = '*',
    visibleStart = 2,
    visibleEnd = 2,
    maskAll = false
  } = options;
  
  if (maskAll || str.length <= visibleStart + visibleEnd) {
    return maskChar.repeat(str.length);
  }
  
  const start = str.substring(0, visibleStart);
  const end = str.substring(str.length - visibleEnd);
  const middle = maskChar.repeat(str.length - visibleStart - visibleEnd);
  
  return start + middle + end;
}

/**
 * Check if string is empty or whitespace only
 * @param {string} str - The string to check
 * @returns {boolean} True if empty or whitespace
 */
export function isEmpty(str) {
  if (typeof str !== 'string') {
    return true;
  }
  
  return str.trim().length === 0;
}

/**
 * Count words in string
 * @param {string} str - The string to count words in
 * @returns {number} Number of words
 */
export function wordCount(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid string provided');
  }
  
  return str.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Reverse string
 * @param {string} str - The string to reverse
 * @returns {string} Reversed string
 */
export function reverse(str) {
  if (typeof str !== 'string') {
    throw new Error('Invalid string provided');
  }
  
  return str.split('').reverse().join('');
}

/**
 * Check if string is palindrome
 * @param {string} str - The string to check
 * @param {object} options - Palindrome options
 * @returns {boolean} True if palindrome
 */
export function isPalindrome(str, options = {}) {
  if (typeof str !== 'string') {
    throw new Error('Invalid string provided');
  }
  
  const {
    caseSensitive = false,
    ignoreSpaces = true,
    ignorePunctuation = true
  } = options;
  
  let processed = str;
  
  if (!caseSensitive) {
    processed = processed.toLowerCase();
  }
  
  if (ignoreSpaces) {
    processed = processed.replace(/\s/g, '');
  }
  
  if (ignorePunctuation) {
    processed = processed.replace(/[^\w]/g, '');
  }
  
  return processed === reverse(processed);
}
