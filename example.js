/**
 * Example usage of the friendlyfy package
 * Run with: npm start or node example.js
 */

import {
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
  clampNumber
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

console.log('\n🌍 Internationalization Examples:');
console.log('─'.repeat(50));

// Test with different locales
console.log(`timeAgo with Spanish locale: "${timeAgo(testDate2, 'es-ES')}"`);
console.log(`formatWithCommas with German locale: "${formatWithCommas(1234567, 'de-DE')}"`);
console.log(`formatCurrency with Euro: "${formatCurrency(1234.56, 'EUR', 'de-DE')}"`);
console.log(`formatOrdinal with French locale: "${formatOrdinal(1, 'fr-FR')}"`);

console.log('\n✨ All examples completed successfully!');
console.log('\n🎯 Key Features Added:');
console.log('• Timezone support for date formatting');
console.log('• Precision control for relative time');
console.log('• Duration formatting (seconds to human-readable)');
console.log('• File size formatting (bytes to KB/MB/GB)');
console.log('• Ordinal number formatting (1st, 2nd, 3rd)');
console.log('• Number range formatting');
console.log('• Pluralization helpers');
console.log('• Ratio and fraction formatting');
console.log('• Significant digits and engineering notation');
console.log('• Number validation and clamping utilities');
console.log('• Start/end of time periods');

console.log('\nTo use this package in your project:');
console.log('1. npm install friendlyfy');
console.log('2. import { timeAgo, shortenNumber, formatFileSize } from "friendlyfy";');
console.log('3. Use the functions as shown above!');
