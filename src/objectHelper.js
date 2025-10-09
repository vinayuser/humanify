/**
 * Object helper utilities for common object operations
 */

/**
 * Deep clone an object
 * @param {any} obj - The object to clone
 * @returns {any} Deep cloned object
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  
  if (typeof obj === 'object') {
    const cloned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
  
  return obj;
}

/**
 * Deep merge objects
 * @param {Object} target - Target object
 * @param {...Object} sources - Source objects
 * @returns {Object} Merged object
 */
export function deepMerge(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();
  
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  
  return deepMerge(target, ...sources);
}

/**
 * Pick specific properties from object
 * @param {Object} obj - The object to pick from
 * @param {Array|string} keys - Keys to pick
 * @returns {Object} Object with picked properties
 */
export function pick(obj, keys) {
  if (!isObject(obj)) {
    throw new Error('Invalid object provided');
  }
  
  const keyArray = Array.isArray(keys) ? keys : [keys];
  const result = {};
  
  for (const key of keyArray) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  
  return result;
}

/**
 * Omit specific properties from object
 * @param {Object} obj - The object to omit from
 * @param {Array|string} keys - Keys to omit
 * @returns {Object} Object without omitted properties
 */
export function omit(obj, keys) {
  if (!isObject(obj)) {
    throw new Error('Invalid object provided');
  }
  
  const keyArray = Array.isArray(keys) ? keys : [keys];
  const result = {};
  
  for (const key in obj) {
    if (!keyArray.includes(key)) {
      result[key] = obj[key];
    }
  }
  
  return result;
}

/**
 * Get nested object property safely
 * @param {Object} obj - The object to get property from
 * @param {string} path - Dot-separated path
 * @param {any} defaultValue - Default value if property doesn't exist
 * @returns {any} Property value or default
 */
export function get(obj, path, defaultValue = undefined) {
  if (!isObject(obj)) {
    return defaultValue;
  }
  
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result == null || !isObject(result)) {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result !== undefined ? result : defaultValue;
}

/**
 * Set nested object property
 * @param {Object} obj - The object to set property on
 * @param {string} path - Dot-separated path
 * @param {any} value - Value to set
 * @returns {Object} Modified object
 */
export function set(obj, path, value) {
  if (!isObject(obj)) {
    throw new Error('Invalid object provided');
  }
  
  const keys = path.split('.');
  const lastKey = keys.pop();
  let current = obj;
  
  for (const key of keys) {
    if (!isObject(current[key])) {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[lastKey] = value;
  return obj;
}

/**
 * Check if object has nested property
 * @param {Object} obj - The object to check
 * @param {string} path - Dot-separated path
 * @returns {boolean} True if property exists
 */
export function has(obj, path) {
  if (!isObject(obj)) {
    return false;
  }
  
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (!isObject(current) || !(key in current)) {
      return false;
    }
    current = current[key];
  }
  
  return true;
}

/**
 * Transform object keys
 * @param {Object} obj - The object to transform
 * @param {Function} transformFn - Function to transform keys
 * @returns {Object} Object with transformed keys
 */
export function transformKeys(obj, transformFn) {
  if (!isObject(obj)) {
    throw new Error('Invalid object provided');
  }
  
  const result = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = transformFn(key);
      result[newKey] = obj[key];
    }
  }
  
  return result;
}

/**
 * Transform object values
 * @param {Object} obj - The object to transform
 * @param {Function} transformFn - Function to transform values
 * @returns {Object} Object with transformed values
 */
export function transformValues(obj, transformFn) {
  if (!isObject(obj)) {
    throw new Error('Invalid object provided');
  }
  
  const result = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = transformFn(obj[key], key);
    }
  }
  
  return result;
}

/**
 * Invert object keys and values
 * @param {Object} obj - The object to invert
 * @returns {Object} Inverted object
 */
export function invert(obj) {
  if (!isObject(obj)) {
    throw new Error('Invalid object provided');
  }
  
  const result = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[obj[key]] = key;
    }
  }
  
  return result;
}

/**
 * Get object size (number of properties)
 * @param {Object} obj - The object to measure
 * @returns {number} Number of properties
 */
export function objectSize(obj) {
  if (!isObject(obj)) {
    return 0;
  }
  
  return Object.keys(obj).length;
}

/**
 * Check if object is empty
 * @param {Object} obj - The object to check
 * @returns {boolean} True if object is empty
 */
export function isEmpty(obj) {
  if (!isObject(obj)) {
    return true;
  }
  
  return Object.keys(obj).length === 0;
}

/**
 * Create object from array of key-value pairs
 * @param {Array} pairs - Array of [key, value] pairs
 * @returns {Object} Object created from pairs
 */
export function fromPairs(pairs) {
  if (!Array.isArray(pairs)) {
    throw new Error('Invalid array provided');
  }
  
  const result = {};
  
  for (const [key, value] of pairs) {
    result[key] = value;
  }
  
  return result;
}

/**
 * Convert object to array of key-value pairs
 * @param {Object} obj - The object to convert
 * @returns {Array} Array of [key, value] pairs
 */
export function toPairs(obj) {
  if (!isObject(obj)) {
    throw new Error('Invalid object provided');
  }
  
  return Object.entries(obj);
}

/**
 * Map object values
 * @param {Object} obj - The object to map
 * @param {Function} mapFn - Mapping function
 * @returns {Object} Object with mapped values
 */
export function mapValues(obj, mapFn) {
  if (!isObject(obj)) {
    throw new Error('Invalid object provided');
  }
  
  const result = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = mapFn(obj[key], key);
    }
  }
  
  return result;
}

/**
 * Filter object properties
 * @param {Object} obj - The object to filter
 * @param {Function} predicate - Filter function
 * @returns {Object} Filtered object
 */
export function filterObject(obj, predicate) {
  if (!isObject(obj)) {
    throw new Error('Invalid object provided');
  }
  
  const result = {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  }
  
  return result;
}

/**
 * Check if two objects are equal (shallow comparison)
 * @param {Object} obj1 - First object
 * @param {Object} obj2 - Second object
 * @returns {boolean} True if objects are equal
 */
export function isEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2;
  }
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  for (const key of keys1) {
    if (!keys2.includes(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  
  return true;
}

/**
 * Helper function to check if value is an object
 * @param {any} value - Value to check
 * @returns {boolean} True if value is an object
 */
function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
