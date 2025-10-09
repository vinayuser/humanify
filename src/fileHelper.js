/**
 * File system helper utilities
 */

import { promises as fs } from 'fs';
import path from 'path';

/**
 * Get file extension from filename
 * @param {string} filename - The filename
 * @returns {string} File extension (without dot)
 */
export function getFileExtension(filename) {
  if (typeof filename !== 'string') {
    throw new Error('Filename must be a string');
  }
  
  return path.extname(filename).slice(1).toLowerCase();
}

/**
 * Get filename without extension
 * @param {string} filename - The filename
 * @returns {string} Filename without extension
 */
export function getFilenameWithoutExtension(filename) {
  if (typeof filename !== 'string') {
    throw new Error('Filename must be a string');
  }
  
  return path.basename(filename, path.extname(filename));
}

/**
 * Check if file path is absolute
 * @param {string} filePath - The file path
 * @returns {boolean} True if absolute path
 */
export function isAbsolutePath(filePath) {
  if (typeof filePath !== 'string') {
    throw new Error('File path must be a string');
  }
  
  return path.isAbsolute(filePath);
}

/**
 * Normalize file path
 * @param {string} filePath - The file path
 * @returns {string} Normalized path
 */
export function normalizePath(filePath) {
  if (typeof filePath !== 'string') {
    throw new Error('File path must be a string');
  }
  
  return path.normalize(filePath);
}

/**
 * Join file paths
 * @param {...string} paths - Paths to join
 * @returns {string} Joined path
 */
export function joinPaths(...paths) {
  return path.join(...paths);
}

/**
 * Get relative path between two paths
 * @param {string} from - From path
 * @param {string} to - To path
 * @returns {string} Relative path
 */
export function getRelativePath(from, to) {
  if (typeof from !== 'string' || typeof to !== 'string') {
    throw new Error('Paths must be strings');
  }
  
  return path.relative(from, to);
}

/**
 * Get directory name from file path
 * @param {string} filePath - The file path
 * @returns {string} Directory name
 */
export function getDirname(filePath) {
  if (typeof filePath !== 'string') {
    throw new Error('File path must be a string');
  }
  
  return path.dirname(filePath);
}

/**
 * Get basename from file path
 * @param {string} filePath - The file path
 * @param {string} ext - Optional extension to remove
 * @returns {string} Basename
 */
export function getBasename(filePath, ext = '') {
  if (typeof filePath !== 'string') {
    throw new Error('File path must be a string');
  }
  
  return path.basename(filePath, ext);
}

/**
 * Check if file exists
 * @param {string} filePath - The file path
 * @returns {Promise<boolean>} True if file exists
 */
export async function fileExists(filePath) {
  if (typeof filePath !== 'string') {
    throw new Error('File path must be a string');
  }
  
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if directory exists
 * @param {string} dirPath - The directory path
 * @returns {Promise<boolean>} True if directory exists
 */
export async function dirExists(dirPath) {
  if (typeof dirPath !== 'string') {
    throw new Error('Directory path must be a string');
  }
  
  try {
    const stats = await fs.stat(dirPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Get file stats
 * @param {string} filePath - The file path
 * @returns {Promise<object>} File stats
 */
export async function getFileStats(filePath) {
  if (typeof filePath !== 'string') {
    throw new Error('File path must be a string');
  }
  
  try {
    const stats = await fs.stat(filePath);
    return {
      size: stats.size,
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory(),
      isSymbolicLink: stats.isSymbolicLink(),
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
      accessedAt: stats.atime
    };
  } catch (error) {
    throw new Error(`Failed to get file stats: ${error.message}`);
  }
}

/**
 * Read file content
 * @param {string} filePath - The file path
 * @param {object} options - Read options
 * @returns {Promise<string|Buffer>} File content
 */
export async function readFile(filePath, options = {}) {
  if (typeof filePath !== 'string') {
    throw new Error('File path must be a string');
  }
  
  const {
    encoding = 'utf8',
    flag = 'r'
  } = options;
  
  try {
    return await fs.readFile(filePath, { encoding, flag });
  } catch (error) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
}

/**
 * Write file content
 * @param {string} filePath - The file path
 * @param {string|Buffer} content - Content to write
 * @param {object} options - Write options
 * @returns {Promise<void>}
 */
export async function writeFile(filePath, content, options = {}) {
  if (typeof filePath !== 'string') {
    throw new Error('File path must be a string');
  }
  
  const {
    encoding = 'utf8',
    mode = 0o666,
    flag = 'w'
  } = options;
  
  try {
    await fs.writeFile(filePath, content, { encoding, mode, flag });
  } catch (error) {
    throw new Error(`Failed to write file: ${error.message}`);
  }
}

/**
 * Create directory
 * @param {string} dirPath - The directory path
 * @param {object} options - Create options
 * @returns {Promise<void>}
 */
export async function createDir(dirPath, options = {}) {
  if (typeof dirPath !== 'string') {
    throw new Error('Directory path must be a string');
  }
  
  const {
    recursive = true,
    mode = 0o755
  } = options;
  
  try {
    await fs.mkdir(dirPath, { recursive, mode });
  } catch (error) {
    throw new Error(`Failed to create directory: ${error.message}`);
  }
}

/**
 * Delete file
 * @param {string} filePath - The file path
 * @returns {Promise<void>}
 */
export async function deleteFile(filePath) {
  if (typeof filePath !== 'string') {
    throw new Error('File path must be a string');
  }
  
  try {
    await fs.unlink(filePath);
  } catch (error) {
    throw new Error(`Failed to delete file: ${error.message}`);
  }
}

/**
 * Delete directory
 * @param {string} dirPath - The directory path
 * @param {object} options - Delete options
 * @returns {Promise<void>}
 */
export async function deleteDir(dirPath, options = {}) {
  if (typeof dirPath !== 'string') {
    throw new Error('Directory path must be a string');
  }
  
  const { recursive = false } = options;
  
  try {
    await fs.rmdir(dirPath, { recursive });
  } catch (error) {
    throw new Error(`Failed to delete directory: ${error.message}`);
  }
}

/**
 * List directory contents
 * @param {string} dirPath - The directory path
 * @param {object} options - List options
 * @returns {Promise<Array>} Directory contents
 */
export async function listDir(dirPath, options = {}) {
  if (typeof dirPath !== 'string') {
    throw new Error('Directory path must be a string');
  }
  
  const {
    withFileTypes = false,
    encoding = 'utf8'
  } = options;
  
  try {
    return await fs.readdir(dirPath, { withFileTypes, encoding });
  } catch (error) {
    throw new Error(`Failed to list directory: ${error.message}`);
  }
}

/**
 * Copy file
 * @param {string} src - Source file path
 * @param {string} dest - Destination file path
 * @param {object} options - Copy options
 * @returns {Promise<void>}
 */
export async function copyFile(src, dest, options = {}) {
  if (typeof src !== 'string' || typeof dest !== 'string') {
    throw new Error('Source and destination paths must be strings');
  }
  
  const { mode } = options;
  
  try {
    await fs.copyFile(src, dest, mode);
  } catch (error) {
    throw new Error(`Failed to copy file: ${error.message}`);
  }
}

/**
 * Move/rename file
 * @param {string} src - Source file path
 * @param {string} dest - Destination file path
 * @returns {Promise<void>}
 */
export async function moveFile(src, dest) {
  if (typeof src !== 'string' || typeof dest !== 'string') {
    throw new Error('Source and destination paths must be strings');
  }
  
  try {
    await fs.rename(src, dest);
  } catch (error) {
    throw new Error(`Failed to move file: ${error.message}`);
  }
}

/**
 * Get file size in human-readable format
 * @param {string} filePath - The file path
 * @param {object} options - Size formatting options
 * @returns {Promise<string>} Human-readable file size
 */
export async function getFileSize(filePath, options = {}) {
  if (typeof filePath !== 'string') {
    throw new Error('File path must be a string');
  }
  
  const {
    binary = false,
    precision = 2
  } = options;
  
  try {
    const stats = await fs.stat(filePath);
    const bytes = stats.size;
    
    if (bytes === 0) return '0 Bytes';
    
    const k = binary ? 1024 : 1000;
    const sizes = binary 
      ? ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
      : ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = bytes / Math.pow(k, i);
    
    return `${size.toFixed(precision)} ${sizes[i]}`;
  } catch (error) {
    throw new Error(`Failed to get file size: ${error.message}`);
  }
}

/**
 * Check if path is a file
 * @param {string} filePath - The file path
 * @returns {Promise<boolean>} True if path is a file
 */
export async function isFile(filePath) {
  if (typeof filePath !== 'string') {
    throw new Error('File path must be a string');
  }
  
  try {
    const stats = await fs.stat(filePath);
    return stats.isFile();
  } catch {
    return false;
  }
}

/**
 * Check if path is a directory
 * @param {string} dirPath - The directory path
 * @returns {Promise<boolean>} True if path is a directory
 */
export async function isDirectory(dirPath) {
  if (typeof dirPath !== 'string') {
    throw new Error('Directory path must be a string');
  }
  
  try {
    const stats = await fs.stat(dirPath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Get file MIME type based on extension
 * @param {string} filename - The filename
 * @returns {string} MIME type
 */
export function getMimeType(filename) {
  if (typeof filename !== 'string') {
    throw new Error('Filename must be a string');
  }
  
  const ext = getFileExtension(filename).toLowerCase();
  
  const mimeTypes = {
    // Images
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'webp': 'image/webp',
    'bmp': 'image/bmp',
    'ico': 'image/x-icon',
    
    // Documents
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'txt': 'text/plain',
    'rtf': 'application/rtf',
    
    // Archives
    'zip': 'application/zip',
    'rar': 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed',
    'tar': 'application/x-tar',
    'gz': 'application/gzip',
    
    // Audio
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'flac': 'audio/flac',
    'aac': 'audio/aac',
    
    // Video
    'mp4': 'video/mp4',
    'avi': 'video/x-msvideo',
    'mov': 'video/quicktime',
    'wmv': 'video/x-ms-wmv',
    'flv': 'video/x-flv',
    'webm': 'video/webm',
    
    // Code
    'js': 'application/javascript',
    'html': 'text/html',
    'css': 'text/css',
    'json': 'application/json',
    'xml': 'application/xml',
    'php': 'application/x-httpd-php',
    'py': 'text/x-python',
    'java': 'text/x-java-source',
    'cpp': 'text/x-c++src',
    'c': 'text/x-csrc',
    'cs': 'text/x-csharp',
    'go': 'text/x-go',
    'rs': 'text/x-rust',
    'rb': 'text/x-ruby',
    'sh': 'application/x-sh',
    'sql': 'application/sql'
  };
  
  return mimeTypes[ext] || 'application/octet-stream';
}

/**
 * Sanitize filename for safe storage
 * @param {string} filename - The filename to sanitize
 * @param {object} options - Sanitization options
 * @returns {string} Sanitized filename
 */
export function sanitizeFilename(filename, options = {}) {
  if (typeof filename !== 'string') {
    throw new Error('Filename must be a string');
  }
  
  const {
    maxLength = 255,
    replacement = '_',
    keepExtension = true
  } = options;
  
  let sanitized = filename;
  
  // Remove or replace invalid characters
  sanitized = sanitized.replace(/[<>:"/\\|?*]/g, replacement);
  
  // Remove control characters
  sanitized = sanitized.replace(/[\x00-\x1f\x80-\x9f]/g, '');
  
  // Remove leading/trailing dots and spaces
  sanitized = sanitized.replace(/^[\s.]+|[\s.]+$/g, '');
  
  // Limit length
  if (keepExtension) {
    const ext = path.extname(sanitized);
    const nameWithoutExt = path.basename(sanitized, ext);
    const maxNameLength = maxLength - ext.length;
    
    if (nameWithoutExt.length > maxNameLength) {
      sanitized = nameWithoutExt.substring(0, maxNameLength) + ext;
    }
  } else {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized || 'file';
}
