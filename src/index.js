/**
 * friendlyfy - A utility package for formatting dates and numbers in human-readable formats
 * 
 * @fileoverview Main entry point for the friendlyfy-js package
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

// Export all string helper functions
export {
  slugify,
  truncate,
  capitalize,
  toTitleCase,
  camelToKebab,
  kebabToCamel,
  snakeToCamel,
  camelToSnake,
  stripHtml,
  escapeHtml,
  unescapeHtml,
  randomString as randomStringUtil,
  maskString,
  isEmpty as isEmptyString,
  wordCount,
  reverse,
  isPalindrome
} from './stringHelper.js';

// Export all array helper functions
export {
  chunk,
  unique,
  shuffle,
  randomItem,
  groupBy,
  flatten,
  intersection,
  difference,
  union,
  sortBy,
  arrayStats,
  compact,
  last,
  first,
  sample,
  zip,
  unzip
} from './arrayHelper.js';

// Export all object helper functions
export {
  deepClone,
  deepMerge,
  pick,
  omit,
  get,
  set,
  has,
  transformKeys,
  transformValues,
  invert,
  objectSize,
  isEmpty as isEmptyObject,
  fromPairs,
  toPairs,
  mapValues,
  filterObject,
  isEqual
} from './objectHelper.js';

// Export all validation helper functions
export {
  isValidEmail,
  isValidUrl,
  isValidPhone,
  isValidCreditCard,
  validatePassword,
  isValidIP,
  isValidDate,
  isValidJSON,
  isValidUUID,
  isValidHexColor,
  isValidISBN,
  isValidSSN,
  isValidPostalCode
} from './validationHelper.js';

// Export all crypto helper functions
export {
  hash,
  hmac,
  randomString as randomStringCrypto,
  generateRandomBytes,
  generateUUID,
  generateToken,
  hashPassword,
  verifyPassword,
  xorEncrypt,
  xorDecrypt,
  generateApiKey,
  generateSessionId,
  generateCSRFToken,
  verifyCSRFToken,
  secureRandomInt,
  generatePasswordResetToken,
  generateEmailVerificationToken
} from './cryptoHelper.js';

// Export all file helper functions
export {
  getFileExtension,
  getFilenameWithoutExtension,
  isAbsolutePath,
  normalizePath,
  joinPaths,
  getRelativePath,
  getDirname,
  getBasename,
  fileExists,
  dirExists,
  getFileStats,
  readFile,
  writeFile,
  createDir,
  deleteFile,
  deleteDir,
  listDir,
  copyFile,
  moveFile,
  getFileSize,
  isFile,
  isDirectory,
  getMimeType,
  sanitizeFilename
} from './fileHelper.js';

// Re-export modules for direct access
export * as dateHelper from './dateHelper.js';
export * as numberHelper from './numberHelper.js';
export * as stringHelper from './stringHelper.js';
export * as arrayHelper from './arrayHelper.js';
export * as objectHelper from './objectHelper.js';
export * as validationHelper from './validationHelper.js';
export * as cryptoHelper from './cryptoHelper.js';
export * as fileHelper from './fileHelper.js';
