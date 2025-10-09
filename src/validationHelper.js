/**
 * Validation helper utilities for common validation tasks
 */

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @param {object} options - Validation options
 * @returns {boolean} True if valid URL
 */
export function isValidUrl(url, options = {}) {
  if (typeof url !== 'string') {
    return false;
  }
  
  const {
    protocols = ['http:', 'https:'],
    requireProtocol = false
  } = options;
  
  try {
    const urlObj = new URL(url);
    
    if (requireProtocol && !protocols.includes(urlObj.protocol)) {
      return false;
    }
    
    return protocols.includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * Validate phone number
 * @param {string} phone - Phone number to validate
 * @param {string} country - Country code (optional)
 * @returns {boolean} True if valid phone number
 */
export function isValidPhone(phone, country = null) {
  if (typeof phone !== 'string') {
    return false;
  }
  
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Basic validation patterns by country
  const patterns = {
    US: /^1?[2-9]\d{2}[2-9]\d{2}\d{4}$/,
    UK: /^(\+44|0)[1-9]\d{8,9}$/,
    IN: /^(\+91|0)?[6-9]\d{9}$/,
    CA: /^(\+1|1)?[2-9]\d{2}[2-9]\d{2}\d{4}$/,
    AU: /^(\+61|0)[2-478]\d{8}$/,
    DE: /^(\+49|0)[1-9]\d{1,4}\d{1,4}\d{1,4}$/,
    FR: /^(\+33|0)[1-9](\d{8})$/,
    JP: /^(\+81|0)[789]0\d{8}$/,
    CN: /^(\+86|0)?1[3-9]\d{9}$/,
    BR: /^(\+55|0)?[1-9]{2}[2-9]\d{8}$/
  };
  
  if (country && patterns[country.toUpperCase()]) {
    return patterns[country.toUpperCase()].test(digits);
  }
  
  // Generic international validation (7-15 digits)
  return /^\d{7,15}$/.test(digits);
}

/**
 * Validate credit card number
 * @param {string} cardNumber - Credit card number to validate
 * @returns {object} Validation result with card type
 */
export function isValidCreditCard(cardNumber) {
  if (typeof cardNumber !== 'string') {
    return { valid: false, type: null };
  }
  
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.length < 13 || digits.length > 19) {
    return { valid: false, type: null };
  }
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  const valid = sum % 10 === 0;
  
  // Card type detection
  const patterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
    diners: /^3[0689]/,
    jcb: /^35/
  };
  
  let type = null;
  for (const [cardType, pattern] of Object.entries(patterns)) {
    if (pattern.test(digits)) {
      type = cardType;
      break;
    }
  }
  
  return { valid, type };
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @param {object} options - Validation options
 * @returns {object} Password strength result
 */
export function validatePassword(password, options = {}) {
  if (typeof password !== 'string') {
    return { valid: false, score: 0, feedback: ['Password must be a string'] };
  }
  
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSymbols = false,
    maxLength = 128
  } = options;
  
  const feedback = [];
  let score = 0;
  
  // Length check
  if (password.length < minLength) {
    feedback.push(`Password must be at least ${minLength} characters long`);
  } else {
    score += 1;
  }
  
  if (password.length > maxLength) {
    feedback.push(`Password must be no more than ${maxLength} characters long`);
  }
  
  // Character type checks
  if (requireUppercase && !/[A-Z]/.test(password)) {
    feedback.push('Password must contain at least one uppercase letter');
  } else if (requireUppercase) {
    score += 1;
  }
  
  if (requireLowercase && !/[a-z]/.test(password)) {
    feedback.push('Password must contain at least one lowercase letter');
  } else if (requireLowercase) {
    score += 1;
  }
  
  if (requireNumbers && !/\d/.test(password)) {
    feedback.push('Password must contain at least one number');
  } else if (requireNumbers) {
    score += 1;
  }
  
  if (requireSymbols && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    feedback.push('Password must contain at least one special character');
  } else if (requireSymbols) {
    score += 1;
  }
  
  // Additional strength checks
  if (password.length >= 12) score += 1;
  if (/(.)\1{2,}/.test(password)) {
    feedback.push('Password should not contain repeated characters');
  } else {
    score += 1;
  }
  
  const valid = feedback.length === 0;
  const strength = score <= 2 ? 'weak' : score <= 4 ? 'medium' : 'strong';
  
  return { valid, score, strength, feedback };
}

/**
 * Validate IP address
 * @param {string} ip - IP address to validate
 * @param {string} version - IP version ('v4' or 'v6')
 * @returns {boolean} True if valid IP
 */
export function isValidIP(ip, version = 'v4') {
  if (typeof ip !== 'string') {
    return false;
  }
  
  if (version === 'v4') {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
  }
  
  if (version === 'v6') {
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv6Regex.test(ip);
  }
  
  return false;
}

/**
 * Validate date string
 * @param {string} dateString - Date string to validate
 * @param {string} format - Expected format (optional)
 * @returns {boolean} True if valid date
 */
export function isValidDate(dateString, format = null) {
  if (typeof dateString !== 'string') {
    return false;
  }
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return false;
  }
  
  if (format) {
    // Basic format validation
    const formats = {
      'YYYY-MM-DD': /^\d{4}-\d{2}-\d{2}$/,
      'MM/DD/YYYY': /^\d{2}\/\d{2}\/\d{4}$/,
      'DD/MM/YYYY': /^\d{2}\/\d{2}\/\d{4}$/,
      'YYYY/MM/DD': /^\d{4}\/\d{2}\/\d{2}$/
    };
    
    if (formats[format] && !formats[format].test(dateString)) {
      return false;
    }
  }
  
  return true;
}

/**
 * Validate JSON string
 * @param {string} jsonString - JSON string to validate
 * @returns {boolean} True if valid JSON
 */
export function isValidJSON(jsonString) {
  if (typeof jsonString !== 'string') {
    return false;
  }
  
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate UUID
 * @param {string} uuid - UUID to validate
 * @param {string} version - UUID version (1-5, optional)
 * @returns {boolean} True if valid UUID
 */
export function isValidUUID(uuid, version = null) {
  if (typeof uuid !== 'string') {
    return false;
  }
  
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
  if (!uuidRegex.test(uuid)) {
    return false;
  }
  
  if (version) {
    const versionChar = uuid.charAt(14);
    return versionChar === version;
  }
  
  return true;
}

/**
 * Validate hex color
 * @param {string} color - Hex color to validate
 * @returns {boolean} True if valid hex color
 */
export function isValidHexColor(color) {
  if (typeof color !== 'string') {
    return false;
  }
  
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
}

/**
 * Validate ISBN
 * @param {string} isbn - ISBN to validate
 * @returns {object} Validation result with ISBN type
 */
export function isValidISBN(isbn) {
  if (typeof isbn !== 'string') {
    return { valid: false, type: null };
  }
  
  const cleaned = isbn.replace(/[-\s]/g, '');
  
  // ISBN-10 validation
  if (cleaned.length === 10) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleaned[i]) * (10 - i);
    }
    
    const checkDigit = cleaned[9] === 'X' ? 10 : parseInt(cleaned[9]);
    const valid = (sum + checkDigit) % 11 === 0;
    
    return { valid, type: 'ISBN-10' };
  }
  
  // ISBN-13 validation
  if (cleaned.length === 13) {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleaned[i]) * (i % 2 === 0 ? 1 : 3);
    }
    
    const checkDigit = (10 - (sum % 10)) % 10;
    const valid = checkDigit === parseInt(cleaned[12]);
    
    return { valid, type: 'ISBN-13' };
  }
  
  return { valid: false, type: null };
}

/**
 * Validate social security number (US)
 * @param {string} ssn - SSN to validate
 * @returns {boolean} True if valid SSN
 */
export function isValidSSN(ssn) {
  if (typeof ssn !== 'string') {
    return false;
  }
  
  const cleaned = ssn.replace(/\D/g, '');
  
  if (cleaned.length !== 9) {
    return false;
  }
  
  // Check for invalid patterns
  const invalidPatterns = [
    /^000/,      // Area number cannot be 000
    /^666/,      // Area number cannot be 666
    /^9/,        // Area number cannot start with 9
    /^.{3}00/,   // Group number cannot be 00
    /^.{5}0000/  // Serial number cannot be 0000
  ];
  
  return !invalidPatterns.some(pattern => pattern.test(cleaned));
}

/**
 * Validate postal code
 * @param {string} postalCode - Postal code to validate
 * @param {string} country - Country code
 * @returns {boolean} True if valid postal code
 */
export function isValidPostalCode(postalCode, country = 'US') {
  if (typeof postalCode !== 'string') {
    return false;
  }
  
  const patterns = {
    US: /^\d{5}(-\d{4})?$/,
    CA: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/,
    DE: /^\d{5}$/,
    FR: /^\d{5}$/,
    JP: /^\d{3}-\d{4}$/,
    IN: /^\d{6}$/,
    AU: /^\d{4}$/,
    BR: /^\d{5}-?\d{3}$/
  };
  
  const pattern = patterns[country.toUpperCase()];
  return pattern ? pattern.test(postalCode) : false;
}
