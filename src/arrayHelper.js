/**
 * Array helper utilities for common array operations
 */

/**
 * Chunk array into smaller arrays of specified size
 * @param {Array} arr - The array to chunk
 * @param {number} size - Size of each chunk
 * @returns {Array} Array of chunks
 */
export function chunk(arr, size) {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid array provided');
  }
  
  if (typeof size !== 'number' || size <= 0) {
    throw new Error('Invalid size provided');
  }
  
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  
  return chunks;
}

/**
 * Remove duplicates from array
 * @param {Array} arr - The array to deduplicate
 * @param {Function} keyFn - Optional key function for object arrays
 * @returns {Array} Array with unique values
 */
export function unique(arr, keyFn = null) {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid array provided');
  }
  
  if (keyFn) {
    const seen = new Set();
    return arr.filter(item => {
      const key = keyFn(item);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
  
  return [...new Set(arr)];
}

/**
 * Shuffle array randomly
 * @param {Array} arr - The array to shuffle
 * @param {boolean} inPlace - Whether to modify original array
 * @returns {Array} Shuffled array
 */
export function shuffle(arr, inPlace = false) {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid array provided');
  }
  
  const result = inPlace ? arr : [...arr];
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  
  return result;
}

/**
 * Get random item from array
 * @param {Array} arr - The array to pick from
 * @param {number} count - Number of items to pick (default: 1)
 * @returns {Array|any} Random item(s)
 */
export function randomItem(arr, count = 1) {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid array provided');
  }
  
  if (arr.length === 0) {
    throw new Error('Cannot pick from empty array');
  }
  
  if (count === 1) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  const shuffled = shuffle(arr);
  return shuffled.slice(0, Math.min(count, arr.length));
}

/**
 * Group array items by key
 * @param {Array} arr - The array to group
 * @param {string|Function} key - Key to group by
 * @returns {Object} Grouped object
 */
export function groupBy(arr, key) {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid array provided');
  }
  
  return arr.reduce((groups, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {});
}

/**
 * Flatten nested array
 * @param {Array} arr - The array to flatten
 * @param {number} depth - Flattening depth (default: Infinity)
 * @returns {Array} Flattened array
 */
export function flatten(arr, depth = Infinity) {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid array provided');
  }
  
  return arr.flat(depth);
}

/**
 * Get intersection of two arrays
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 * @returns {Array} Intersection array
 */
export function intersection(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('Invalid arrays provided');
  }
  
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}

/**
 * Get difference between two arrays
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 * @returns {Array} Difference array
 */
export function difference(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('Invalid arrays provided');
  }
  
  const set2 = new Set(arr2);
  return arr1.filter(item => !set2.has(item));
}

/**
 * Get union of two arrays
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 * @returns {Array} Union array
 */
export function union(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('Invalid arrays provided');
  }
  
  return unique([...arr1, ...arr2]);
}

/**
 * Sort array by key
 * @param {Array} arr - The array to sort
 * @param {string|Function} key - Key to sort by
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted array
 */
export function sortBy(arr, key, order = 'asc') {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid array provided');
  }
  
  const sorted = [...arr].sort((a, b) => {
    const aVal = typeof key === 'function' ? key(a) : a[key];
    const bVal = typeof key === 'function' ? key(b) : b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
}

/**
 * Get array statistics
 * @param {Array} arr - The array to analyze
 * @returns {Object} Statistics object
 */
export function arrayStats(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid array provided');
  }
  
  if (arr.length === 0) {
    return {
      length: 0,
      sum: 0,
      average: 0,
      min: undefined,
      max: undefined,
      median: undefined
    };
  }
  
  const numbers = arr.filter(item => typeof item === 'number');
  const sorted = [...numbers].sort((a, b) => a - b);
  
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  
  let median;
  if (sorted.length % 2 === 0) {
    median = (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
  } else {
    median = sorted[Math.floor(sorted.length / 2)];
  }
  
  return {
    length: arr.length,
    sum,
    average,
    min,
    max,
    median
  };
}

/**
 * Remove falsy values from array
 * @param {Array} arr - The array to clean
 * @returns {Array} Array without falsy values
 */
export function compact(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid array provided');
  }
  
  return arr.filter(Boolean);
}

/**
 * Get last N items from array
 * @param {Array} arr - The array
 * @param {number} n - Number of items to get
 * @returns {Array} Last N items
 */
export function last(arr, n = 1) {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid array provided');
  }
  
  if (typeof n !== 'number' || n < 0) {
    throw new Error('Invalid number provided');
  }
  
  return arr.slice(-n);
}

/**
 * Get first N items from array
 * @param {Array} arr - The array
 * @param {number} n - Number of items to get
 * @returns {Array} First N items
 */
export function first(arr, n = 1) {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid array provided');
  }
  
  if (typeof n !== 'number' || n < 0) {
    throw new Error('Invalid number provided');
  }
  
  return arr.slice(0, n);
}

/**
 * Sample array items
 * @param {Array} arr - The array to sample
 * @param {number} size - Sample size
 * @returns {Array} Sampled items
 */
export function sample(arr, size) {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid array provided');
  }
  
  if (typeof size !== 'number' || size < 0) {
    throw new Error('Invalid size provided');
  }
  
  const shuffled = shuffle(arr);
  return shuffled.slice(0, Math.min(size, arr.length));
}

/**
 * Zip arrays together
 * @param {...Array} arrays - Arrays to zip
 * @returns {Array} Zipped array
 */
export function zip(...arrays) {
  if (arrays.length === 0) {
    return [];
  }
  
  const maxLength = Math.max(...arrays.map(arr => arr.length));
  const result = [];
  
  for (let i = 0; i < maxLength; i++) {
    result.push(arrays.map(arr => arr[i]));
  }
  
  return result;
}

/**
 * Unzip zipped array
 * @param {Array} zipped - Zipped array
 * @returns {Array} Array of unzipped arrays
 */
export function unzip(zipped) {
  if (!Array.isArray(zipped)) {
    throw new Error('Invalid array provided');
  }
  
  if (zipped.length === 0) {
    return [];
  }
  
  const maxLength = Math.max(...zipped.map(item => item.length));
  const result = [];
  
  for (let i = 0; i < maxLength; i++) {
    result.push(zipped.map(item => item[i]));
  }
  
  return result;
}
