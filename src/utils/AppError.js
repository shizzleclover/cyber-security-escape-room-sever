/**
 * @fileoverview AppError.js
 * @module utils/AppError.js
 * 
 * Utility/Service module for the CyberEscape platform.
 * This file handles logic specific to its directory domain.
 */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
