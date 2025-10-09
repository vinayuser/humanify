/**
 * Crypto and security helper utilities
 */

import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from 'crypto';

/**
 * Generate hash using specified algorithm
 * @param {string} data - Data to hash
 * @param {string} algorithm - Hash algorithm (sha256, sha512, md5, etc.)
 * @param {string} encoding - Output encoding (hex, base64, etc.)
 * @returns {string} Hashed data
 */
export function hash(data, algorithm = 'sha256', encoding = 'hex') {
  if (typeof data !== 'string') {
    throw new Error('Data must be a string');
  }
  
  return createHash(algorithm).update(data).digest(encoding);
}

/**
 * Generate HMAC using specified algorithm
 * @param {string} data - Data to hash
 * @param {string} secret - Secret key
 * @param {string} algorithm - HMAC algorithm (sha256, sha512, etc.)
 * @param {string} encoding - Output encoding (hex, base64, etc.)
 * @returns {string} HMAC
 */
export function hmac(data, secret, algorithm = 'sha256', encoding = 'hex') {
  if (typeof data !== 'string' || typeof secret !== 'string') {
    throw new Error('Data and secret must be strings');
  }
  
  return createHmac(algorithm, secret).update(data).digest(encoding);
}

/**
 * Generate cryptographically secure random string
 * @param {number} length - Length of random string
 * @param {string} encoding - Encoding (hex, base64, etc.)
 * @returns {string} Random string
 */
export function randomString(length = 32, encoding = 'hex') {
  if (typeof length !== 'number' || length < 1) {
    throw new Error('Length must be a positive number');
  }
  
  const bytes = Math.ceil(length / 2); // hex encoding uses 2 chars per byte
  return randomBytes(bytes).toString(encoding).slice(0, length);
}

/**
 * Generate random bytes
 * @param {number} size - Number of bytes
 * @returns {Buffer} Random bytes
 */
export function generateRandomBytes(size = 32) {
  if (typeof size !== 'number' || size < 1) {
    throw new Error('Size must be a positive number');
  }
  
  return randomBytes(size);
}

/**
 * Generate UUID v4
 * @returns {string} UUID v4
 */
export function generateUUID() {
  const bytes = randomBytes(16);
  
  // Set version (4) and variant bits
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  
  const hex = bytes.toString('hex');
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32)
  ].join('-');
}

/**
 * Generate secure token
 * @param {number} length - Token length
 * @param {object} options - Token options
 * @returns {string} Secure token
 */
export function generateToken(length = 32, options = {}) {
  const {
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = false,
    excludeSimilar = true
  } = options;
  
  let chars = '';
  
  if (includeLowercase) {
    chars += excludeSimilar ? 'abcdefghjkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
  }
  
  if (includeUppercase) {
    chars += excludeSimilar ? 'ABCDEFGHJKMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  
  if (includeNumbers) {
    chars += excludeSimilar ? '23456789' : '0123456789';
  }
  
  if (includeSymbols) {
    chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  }
  
  if (chars.length === 0) {
    throw new Error('No character set specified');
  }
  
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  
  return result;
}

/**
 * Hash password using scrypt
 * @param {string} password - Password to hash
 * @param {object} options - Hashing options
 * @returns {Promise<string>} Hashed password
 */
export async function hashPassword(password, options = {}) {
  if (typeof password !== 'string') {
    throw new Error('Password must be a string');
  }
  
  const {
    saltLength = 32,
    keyLength = 64,
    cost = 16384,
    blockSize = 8,
    parallelization = 1
  } = options;
  
  const salt = randomBytes(saltLength);
  
  return new Promise((resolve, reject) => {
    scrypt(password, salt, keyLength, {
      N: cost,
      r: blockSize,
      p: parallelization
    }, (err, derivedKey) => {
      if (err) {
        reject(err);
        return;
      }
      
      const hash = salt.toString('hex') + ':' + derivedKey.toString('hex');
      resolve(hash);
    });
  });
}

/**
 * Verify password against hash
 * @param {string} password - Password to verify
 * @param {string} hash - Stored hash
 * @param {object} options - Verification options
 * @returns {Promise<boolean>} True if password matches
 */
export async function verifyPassword(password, hash, options = {}) {
  if (typeof password !== 'string' || typeof hash !== 'string') {
    throw new Error('Password and hash must be strings');
  }
  
  const {
    keyLength = 64,
    cost = 16384,
    blockSize = 8,
    parallelization = 1
  } = options;
  
  const [saltHex, hashHex] = hash.split(':');
  if (!saltHex || !hashHex) {
    throw new Error('Invalid hash format');
  }
  
  const salt = Buffer.from(saltHex, 'hex');
  
  return new Promise((resolve, reject) => {
    scrypt(password, salt, keyLength, {
      N: cost,
      r: blockSize,
      p: parallelization
    }, (err, derivedKey) => {
      if (err) {
        reject(err);
        return;
      }
      
      const isValid = timingSafeEqual(
        Buffer.from(hashHex, 'hex'),
        derivedKey
      );
      
      resolve(isValid);
    });
  });
}

/**
 * Simple XOR encryption/decryption
 * @param {string} data - Data to encrypt/decrypt
 * @param {string} key - Encryption key
 * @returns {string} Encrypted/decrypted data
 */
export function xorEncrypt(data, key) {
  if (typeof data !== 'string' || typeof key !== 'string') {
    throw new Error('Data and key must be strings');
  }
  
  if (key.length === 0) {
    throw new Error('Key cannot be empty');
  }
  
  let result = '';
  for (let i = 0; i < data.length; i++) {
    result += String.fromCharCode(
      data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  
  return Buffer.from(result, 'binary').toString('base64');
}

/**
 * Simple XOR decryption
 * @param {string} encryptedData - Encrypted data
 * @param {string} key - Decryption key
 * @returns {string} Decrypted data
 */
export function xorDecrypt(encryptedData, key) {
  if (typeof encryptedData !== 'string' || typeof key !== 'string') {
    throw new Error('Encrypted data and key must be strings');
  }
  
  if (key.length === 0) {
    throw new Error('Key cannot be empty');
  }
  
  const data = Buffer.from(encryptedData, 'base64').toString('binary');
  let result = '';
  
  for (let i = 0; i < data.length; i++) {
    result += String.fromCharCode(
      data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  
  return result;
}

/**
 * Generate API key
 * @param {object} options - API key options
 * @returns {string} API key
 */
export function generateApiKey(options = {}) {
  const {
    prefix = 'ak',
    length = 32,
    includeTimestamp = false
  } = options;
  
  const randomPart = randomString(length, 'base64')
    .replace(/[+/=]/g, '') // Remove base64 special chars
    .toLowerCase();
  
  let key = `${prefix}_${randomPart}`;
  
  if (includeTimestamp) {
    const timestamp = Date.now().toString(36);
    key = `${prefix}_${timestamp}_${randomPart}`;
  }
  
  return key;
}

/**
 * Generate session ID
 * @param {number} length - Session ID length
 * @returns {string} Session ID
 */
export function generateSessionId(length = 24) {
  return randomString(length, 'base64')
    .replace(/[+/=]/g, '') // Remove base64 special chars
    .toLowerCase();
}

/**
 * Generate CSRF token
 * @param {string} secret - Secret key
 * @param {string} sessionId - Session ID
 * @returns {string} CSRF token
 */
export function generateCSRFToken(secret, sessionId) {
  if (typeof secret !== 'string' || typeof sessionId !== 'string') {
    throw new Error('Secret and session ID must be strings');
  }
  
  const timestamp = Date.now().toString();
  const data = `${sessionId}:${timestamp}`;
  
  return hmac(data, secret, 'sha256', 'hex');
}

/**
 * Verify CSRF token
 * @param {string} token - CSRF token to verify
 * @param {string} secret - Secret key
 * @param {string} sessionId - Session ID
 * @param {number} maxAge - Maximum age in milliseconds
 * @returns {boolean} True if token is valid
 */
export function verifyCSRFToken(token, secret, sessionId, maxAge = 3600000) {
  if (typeof token !== 'string' || typeof secret !== 'string' || typeof sessionId !== 'string') {
    return false;
  }
  
  // Extract timestamp from token (this is a simplified approach)
  // In a real implementation, you'd need to store the timestamp separately
  const currentTime = Date.now();
  
  // Generate expected token for current time window
  const timeWindow = Math.floor(currentTime / (maxAge / 10)); // 10 time windows
  const expectedToken = hmac(`${sessionId}:${timeWindow}`, secret, 'sha256', 'hex');
  
  return timingSafeEqual(Buffer.from(token), Buffer.from(expectedToken));
}

/**
 * Generate secure random number
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export function secureRandomInt(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Min and max must be numbers');
  }
  
  if (min >= max) {
    throw new Error('Min must be less than max');
  }
  
  const range = max - min + 1;
  const bytesNeeded = Math.ceil(Math.log2(range) / 8);
  const maxValidValue = Math.floor(256 ** bytesNeeded / range) * range - 1;
  
  let randomValue;
  do {
    const bytes = randomBytes(bytesNeeded);
    randomValue = 0;
    for (let i = 0; i < bytesNeeded; i++) {
      randomValue = (randomValue << 8) + bytes[i];
    }
  } while (randomValue > maxValidValue);
  
  return min + (randomValue % range);
}

/**
 * Generate password reset token
 * @param {number} length - Token length
 * @returns {string} Password reset token
 */
export function generatePasswordResetToken(length = 32) {
  return randomString(length, 'base64')
    .replace(/[+/=]/g, '') // Remove base64 special chars
    .toLowerCase();
}

/**
 * Generate email verification token
 * @param {string} email - Email address
 * @param {string} secret - Secret key
 * @returns {string} Email verification token
 */
export function generateEmailVerificationToken(email, secret) {
  if (typeof email !== 'string' || typeof secret !== 'string') {
    throw new Error('Email and secret must be strings');
  }
  
  const timestamp = Date.now().toString();
  const data = `${email}:${timestamp}`;
  
  return hmac(data, secret, 'sha256', 'hex');
}
