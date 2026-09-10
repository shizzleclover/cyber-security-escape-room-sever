/**
 * @fileoverview progress.routes.js
 * @module progress/progress.routes.js
 * 
 * Express Router Definition for the CyberEscape platform.
 * This file handles logic specific to its directory domain.
 */

const express = require('express');
const router = express.Router();
const progressController = require('./progress.controller');
const authenticate = require('../../middleware/authenticate');

// All progress routes require authentication
router.use(authenticate);

router.get('/', progressController.getProgress);
router.put('/:roomId', progressController.updateProgress);
router.post('/:roomId/reset', progressController.resetProgress);

module.exports = router;
