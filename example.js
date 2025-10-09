/**
 * Example usage of the friendlyfy package
 * Run with: npm start or node example.js
 */

import {
  // Date helpers
  timeAgo,
  timeFromNow,
  formatDate,
  humanizeDate,
  formatDateWithTimezone,
  timeAgoWithPrecision,
  timeFromNowWithPrecision,
  formatDuration,
  startOf,
  endOf,
  
  // Number helpers
  shortenNumber,
  humanizeNumber,
  roundNumber,
  formatWithCommas,
  formatCurrency,
  formatPercentage,
  formatCompact,
  formatFileSize,
  formatOrdinal,
  formatRange,
  pluralize,
  formatRatio,
  formatSignificant,
  formatEngineering,
  isValidNumber,
  isValidInteger,
  clampNumber,
  
  // String helpers
  slugify,
  truncate,
  capitalize,
  toTitleCase,
  camelToKebab,
  kebabToCamel,
  stripHtml,
  escapeHtml,
  maskString,
  wordCount,
  reverse,
  isPalindrome,
  
  // Array helpers
  chunk,
  unique,
  shuffle,
  randomItem,
  groupBy,
  flatten,
  intersection,
  difference,
  sortBy,
  arrayStats,
  compact,
  
  // Object helpers
  deepClone,
  deepMerge,
  pick,
  omit,
  get,
  set,
  has,
  transformKeys,
  invert,
  objectSize,
  
  // Validation helpers
  isValidEmail,
  isValidUrl,
  isValidPhone,
  isValidCreditCard,
  validatePassword,
  isValidIP,
  isValidUUID,
  isValidHexColor,
  
  // Crypto helpers
  hash,
  hmac,
  generateUUID,
  generateToken,
  generateApiKey,
  generateSessionId,
  
  // File helpers
  getFileExtension,
  getFilenameWithoutExtension,
  isAbsolutePath,
  normalizePath,
  joinPaths,
  getMimeType,
  sanitizeFilename
} from './src/index.js';

console.log('🚀 friendlyfy Package Examples\n');

// Date Helper Examples
console.log('📅 Date Helper Examples:');
console.log('─'.repeat(50));

// Create some test dates
const now = new Date();
const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
const testDate = new Date('2025-10-08T10:00:00Z');

console.log(`timeAgo("${testDate.toISOString()}") → "${timeAgo(testDate)}"`);
console.log(`timeAgo("${threeHoursAgo.toISOString()}") → "${timeAgo(threeHoursAgo)}"`);
console.log(`timeFromNow("${twoDaysFromNow.toISOString()}") → "${timeFromNow(twoDaysFromNow)}"`);
console.log(`formatDate("${testDate.toISOString()}", "YYYY-MM-DD HH:mm") → "${formatDate(testDate, 'YYYY-MM-DD HH:mm')}"`);
console.log(`humanizeDate("${testDate.toISOString()}") → "${humanizeDate(testDate)}"`);

console.log('\n🔢 Number Helper Examples:');
console.log('─'.repeat(50));

// Test numbers
const testNumbers = [12543, 1250000, 1250000000, 1250000000000, 999, 0.123456];

testNumbers.forEach(num => {
  console.log(`shortenNumber(${num}) → "${shortenNumber(num)}"`);
});

console.log('\nAdditional Number Examples:');
console.log(`humanizeNumber(12543) → "${humanizeNumber(12543)}"`);
console.log(`roundNumber(3.14159, 2) → ${roundNumber(3.14159, 2)}`);
console.log(`formatWithCommas(1234567) → "${formatWithCommas(1234567)}"`);
console.log(`formatCurrency(1234.56) → "${formatCurrency(1234.56)}"`);
console.log(`formatPercentage(0.1234) → "${formatPercentage(0.1234)}"`);
console.log(`formatCompact(1234567) → "${formatCompact(1234567)}"`);

console.log('\n🕐 Advanced Date Features:');
console.log('─'.repeat(50));

// Timezone support
const testDate2 = new Date('2024-01-15T14:30:00Z');
console.log(`formatDateWithTimezone: "${formatDateWithTimezone(testDate2, 'America/New_York')}"`);
console.log(`timeAgoWithPrecision (hours): "${timeAgoWithPrecision(testDate2, 'hours')}"`);
console.log(`timeFromNowWithPrecision (days): "${timeFromNowWithPrecision(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), 'days')}"`);

// Duration formatting
console.log(`formatDuration(3661): "${formatDuration(3661)}"`);
console.log(`formatDuration(3661, {compact: true}): "${formatDuration(3661, {compact: true})}"`);
console.log(`formatDuration(3661, {maxUnits: 2}): "${formatDuration(3661, {maxUnits: 2})}"`);

// Start/End of periods
const currentDate = new Date();
console.log(`startOf(currentDate, 'week'): ${startOf(currentDate, 'week')}`);
console.log(`endOf(currentDate, 'month'): ${endOf(currentDate, 'month')}`);

console.log('\n📊 Advanced Number Features:');
console.log('─'.repeat(50));

// File size formatting
console.log(`formatFileSize(1024): "${formatFileSize(1024)}"`);
console.log(`formatFileSize(1048576): "${formatFileSize(1048576)}"`);
console.log(`formatFileSize(1048576, {binary: true}): "${formatFileSize(1048576, {binary: true})}"`);

// Ordinal numbers
console.log(`formatOrdinal(1): "${formatOrdinal(1)}"`);
console.log(`formatOrdinal(2): "${formatOrdinal(2)}"`);
console.log(`formatOrdinal(3): "${formatOrdinal(3)}"`);
console.log(`formatOrdinal(21): "${formatOrdinal(21)}"`);

// Number ranges
console.log(`formatRange(1, 5): "${formatRange(1, 5)}"`);
console.log(`formatRange(1000, 2000): "${formatRange(1000, 2000)}"`);
console.log(`formatRange(1, 5, {separator: ' to '}): "${formatRange(1, 5, {separator: ' to '})}"`);

// Pluralization
console.log(`pluralize(1, 'item'): "${pluralize(1, 'item')}"`);
console.log(`pluralize(5, 'item'): "${pluralize(5, 'item')}"`);
console.log(`pluralize(1, 'child', 'children'): "${pluralize(1, 'child', 'children')}"`);
console.log(`pluralize(3, 'child', 'children'): "${pluralize(3, 'child', 'children')}"`);

// Ratios and fractions
console.log(`formatRatio(3, 4): "${formatRatio(3, 4)}"`);
console.log(`formatRatio(3, 4, {showPercentage: true}): "${formatRatio(3, 4, {showPercentage: true})}"`);
console.log(`formatRatio(3, 4, {showFraction: true}): "${formatRatio(3, 4, {showFraction: true})}"`);

// Significant digits and engineering notation
console.log(`formatSignificant(123.456, 2): "${formatSignificant(123.456, 2)}"`);
console.log(`formatEngineering(1234567): "${formatEngineering(1234567)}"`);

// Validation and utilities
console.log(`isValidNumber(42): ${isValidNumber(42)}`);
console.log(`isValidNumber('not a number'): ${isValidNumber('not a number')}`);
console.log(`isValidInteger(42.5): ${isValidInteger(42.5)}`);
console.log(`clampNumber(15, 10, 20): ${clampNumber(15, 10, 20)}`);
console.log(`clampNumber(5, 10, 20): ${clampNumber(5, 10, 20)}`);

console.log('\n🔤 String Helper Examples:');
console.log('─'.repeat(50));

// String manipulation
console.log(`slugify("Hello World! 123"): "${slugify('Hello World! 123')}"`);
console.log(`truncate("This is a long text", 10): "${truncate('This is a long text', 10)}"`);
console.log(`capitalize("hello world"): "${capitalize('hello world')}"`);
console.log(`toTitleCase("hello world"): "${toTitleCase('hello world')}"`);
console.log(`camelToKebab("camelCaseString"): "${camelToKebab('camelCaseString')}"`);
console.log(`kebabToCamel("kebab-case-string"): "${kebabToCamel('kebab-case-string')}"`);
console.log(`stripHtml("<p>Hello <b>World</b></p>"): "${stripHtml('<p>Hello <b>World</b></p>')}"`);
console.log(`escapeHtml("<script>alert('xss')</script>"): "${escapeHtml('<script>alert(\'xss\')</script>')}"`);
console.log(`maskString("1234567890"): "${maskString('1234567890')}"`);
console.log(`wordCount("Hello world from friendlyfy"): ${wordCount('Hello world from friendlyfy')}`);
console.log(`reverse("Hello"): "${reverse('Hello')}"`);
console.log(`isPalindrome("racecar"): ${isPalindrome('racecar')}`);

console.log('\n📊 Array Helper Examples:');
console.log('─'.repeat(50));

// Array operations
const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const duplicateArray = [1, 2, 2, 3, 3, 3, 4, 5];
const users = [
  { name: 'John', age: 25, city: 'New York' },
  { name: 'Jane', age: 30, city: 'London' },
  { name: 'Bob', age: 25, city: 'New York' }
];

console.log(`chunk([1,2,3,4,5,6,7,8,9,10], 3): ${JSON.stringify(chunk(testArray, 3))}`);
console.log(`unique([1,2,2,3,3,3,4,5]): ${JSON.stringify(unique(duplicateArray))}`);
console.log(`shuffle([1,2,3,4,5]): ${JSON.stringify(shuffle([1,2,3,4,5]))}`);
console.log(`randomItem([1,2,3,4,5], 2): ${JSON.stringify(randomItem([1,2,3,4,5], 2))}`);
console.log(`groupBy(users, 'city'): ${JSON.stringify(groupBy(users, 'city'), null, 2)}`);
console.log(`flatten([1, [2, 3], [4, [5, 6]]]): ${JSON.stringify(flatten([1, [2, 3], [4, [5, 6]]]))}`);
console.log(`intersection([1,2,3,4], [3,4,5,6]): ${JSON.stringify(intersection([1,2,3,4], [3,4,5,6]))}`);
console.log(`difference([1,2,3,4], [3,4,5,6]): ${JSON.stringify(difference([1,2,3,4], [3,4,5,6]))}`);
console.log(`sortBy(users, 'age'): ${JSON.stringify(sortBy(users, 'age'), null, 2)}`);
console.log(`arrayStats([1,2,3,4,5]): ${JSON.stringify(arrayStats([1,2,3,4,5]))}`);
console.log(`compact([1, null, 2, undefined, 3, 0, 4]): ${JSON.stringify(compact([1, null, 2, undefined, 3, 0, 4]))}`);

console.log('\n🔧 Object Helper Examples:');
console.log('─'.repeat(50));

// Object operations
const testObj = { name: 'John', age: 30, city: 'New York', country: 'USA' };
const nestedObj = { user: { profile: { name: 'John', settings: { theme: 'dark' } } } };

console.log(`pick(testObj, ['name', 'age']): ${JSON.stringify(pick(testObj, ['name', 'age']))}`);
console.log(`omit(testObj, ['age', 'country']): ${JSON.stringify(omit(testObj, ['age', 'country']))}`);
console.log(`get(nestedObj, 'user.profile.name'): "${get(nestedObj, 'user.profile.name')}"`);
console.log(`has(nestedObj, 'user.profile.settings.theme'): ${has(nestedObj, 'user.profile.settings.theme')}`);
console.log(`transformKeys(testObj, k => k.toUpperCase()): ${JSON.stringify(transformKeys(testObj, k => k.toUpperCase()))}`);
console.log(`invert({a: 1, b: 2, c: 3}): ${JSON.stringify(invert({a: 1, b: 2, c: 3}))}`);
console.log(`objectSize(testObj): ${objectSize(testObj)}`);

console.log('\n✅ Validation Helper Examples:');
console.log('─'.repeat(50));

// Validation
console.log(`isValidEmail("user@example.com"): ${isValidEmail('user@example.com')}`);
console.log(`isValidUrl("https://example.com"): ${isValidUrl('https://example.com')}`);
console.log(`isValidPhone("+1234567890", "US"): ${isValidPhone('+1234567890', 'US')}`);
console.log(`isValidCreditCard("4111111111111111"): ${JSON.stringify(isValidCreditCard('4111111111111111'))}`);
console.log(`validatePassword("MySecure123!"): ${JSON.stringify(validatePassword('MySecure123!'))}`);
console.log(`isValidIP("192.168.1.1"): ${isValidIP('192.168.1.1')}`);
console.log(`isValidUUID("550e8400-e29b-41d4-a716-446655440000"): ${isValidUUID('550e8400-e29b-41d4-a716-446655440000')}`);
console.log(`isValidHexColor("#FF5733"): ${isValidHexColor('#FF5733')}`);

console.log('\n🔐 Crypto Helper Examples:');
console.log('─'.repeat(50));

// Crypto operations
console.log(`hash("Hello World"): "${hash('Hello World')}"`);
console.log(`hmac("Hello World", "secret"): "${hmac('Hello World', 'secret')}"`);
console.log(`generateUUID(): "${generateUUID()}"`);
console.log(`generateToken(16): "${generateToken(16)}"`);
console.log(`generateApiKey(): "${generateApiKey()}"`);
console.log(`generateSessionId(): "${generateSessionId()}"`);

console.log('\n📁 File Helper Examples:');
console.log('─'.repeat(50));

// File operations
console.log(`getFileExtension("document.pdf"): "${getFileExtension('document.pdf')}"`);
console.log(`getFilenameWithoutExtension("document.pdf"): "${getFilenameWithoutExtension('document.pdf')}"`);
console.log(`isAbsolutePath("/home/user/file.txt"): ${isAbsolutePath('/home/user/file.txt')}`);
console.log(`normalizePath("./folder/../file.txt"): "${normalizePath('./folder/../file.txt')}"`);
console.log(`joinPaths("folder", "subfolder", "file.txt"): "${joinPaths('folder', 'subfolder', 'file.txt')}"`);
console.log(`getMimeType("image.jpg"): "${getMimeType('image.jpg')}"`);
console.log(`sanitizeFilename("file<>:\"|?*.txt"): "${sanitizeFilename('file<>:\"|?*.txt')}"`);

console.log('\n🌍 Internationalization Examples:');
console.log('─'.repeat(50));

// Test with different locales
console.log(`timeAgo with Spanish locale: "${timeAgo(testDate2, 'es-ES')}"`);
console.log(`formatWithCommas with German locale: "${formatWithCommas(1234567, 'de-DE')}"`);
console.log(`formatCurrency with Euro: "${formatCurrency(1234.56, 'EUR', 'de-DE')}"`);
console.log(`formatOrdinal with French locale: "${formatOrdinal(1, 'fr-FR')}"`);

console.log('\n✨ All examples completed successfully!');
console.log('\n🎯 Complete Feature Set (100+ Functions):');
console.log('\n📅 Date & Time (10 functions):');
console.log('  • Human-readable time formatting (timeAgo, timeFromNow)');
console.log('  • Timezone support and precision control');
console.log('  • Duration formatting and period utilities');
console.log('  • Custom date formatting with Intl APIs');

console.log('\n🔢 Numbers & Math (15 functions):');
console.log('  • Number shortening (K, M, B, T) and formatting');
console.log('  • File size formatting (bytes to human-readable)');
console.log('  • Ordinal numbers, ranges, and pluralization');
console.log('  • Currency, percentage, and engineering notation');
console.log('  • Number validation and clamping utilities');

console.log('\n🔤 String Manipulation (15 functions):');
console.log('  • Text transformation (slugify, capitalize, case conversion)');
console.log('  • HTML escaping/unescaping and sanitization');
console.log('  • String masking, truncation, and validation');
console.log('  • Palindrome detection and word counting');

console.log('\n📊 Array Operations (15 functions):');
console.log('  • Array manipulation (chunk, unique, shuffle, group)');
console.log('  • Set operations (intersection, difference, union)');
console.log('  • Sorting, filtering, and statistical analysis');
console.log('  • Array flattening and sampling');

console.log('\n🔧 Object Utilities (15 functions):');
console.log('  • Deep cloning, merging, and transformation');
console.log('  • Property picking, omitting, and nested access');
console.log('  • Object validation and comparison');
console.log('  • Key/value transformation and inversion');

console.log('\n✅ Validation & Security (13 functions):');
console.log('  • Email, URL, phone, and credit card validation');
console.log('  • Password strength checking and IP validation');
console.log('  • UUID, ISBN, and postal code validation');
console.log('  • JSON and date string validation');

console.log('\n🔐 Cryptography (15 functions):');
console.log('  • Hashing, HMAC, and secure random generation');
console.log('  • Password hashing with scrypt');
console.log('  • UUID, token, and API key generation');
console.log('  • CSRF protection and session management');

console.log('\n📁 File System (20 functions):');
console.log('  • Path manipulation and normalization');
console.log('  • File/directory existence and stats');
console.log('  • MIME type detection and filename sanitization');
console.log('  • File operations (read, write, copy, move)');

console.log('\n🌍 Internationalization:');
console.log('  • Full locale support for all formatting functions');
console.log('  • Native Intl API integration');
console.log('  • Multi-language validation and formatting');

console.log('\nTo use this comprehensive package:');
console.log('1. npm install friendlyfy-js');
console.log('2. import { timeAgo, slugify, isValidEmail, generateUUID } from "friendlyfy-js";');
console.log('3. Use any of the 100+ utility functions as shown above!');
