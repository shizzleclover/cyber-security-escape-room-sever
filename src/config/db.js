/**
 * @fileoverview db.js
 * @module config/db.js
 * 
 * Utility/Service module for the CyberEscape platform.
 * This file handles logic specific to its directory domain.
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
