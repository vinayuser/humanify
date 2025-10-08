/**
 * Humanify - A utility package for formatting dates and numbers in human-readable formats
 * 
 * @fileoverview Main entry point for the humanify package
 * @version 1.0.0
 * @license MIT
 */

// Export all date helper functions
export {
  timeAgo,
  timeFromNow,
  formatDate,
  humanizeDate,
  formatDateWithTimezone,
  timeAgoWithPrecision,
  timeFromNowWithPrecision,
  formatDuration,
  startOf,
  endOf
} from './dateHelper.js';

// Export all number helper functions
export {
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
} from './numberHelper.js';

// Re-export modules for direct access
export * as dateHelper from './dateHelper.js';
export * as numberHelper from './numberHelper.js';
