/**
 * @fileoverview clearResources.js
 * @module scripts/clearResources.js
 * 
 * Utility/Service module for the CyberEscape platform.
 * This file handles logic specific to its directory domain.
 */

const mongoose = require('mongoose');
const env = require('../config/env');
const Resource = require('../features/resources/Resource.model');

mongoose.connect(env.mongoUri).then(async () => {
  await Resource.deleteMany({});
  console.log('Cleared resources collection');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
