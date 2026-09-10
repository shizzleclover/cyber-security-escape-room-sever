/**
 * @fileoverview asyncHandler.js
 * @module utils/asyncHandler.js
 * 
 * Utility/Service module for the CyberEscape platform.
 * This file handles logic specific to its directory domain.
 */

/**
 * Wraps an async route handler to catch errors and pass them to Express error middleware.
 * Eliminates the need for try-catch blocks in every controller function.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
