/**
 * @fileoverview auth.routes.js
 * @module auth/auth.routes.js
 * 
 * Express Router Definition for the CyberEscape platform.
 * This file handles logic specific to its directory domain.
 */

const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const authenticate = require('../../middleware/authenticate');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.getMe);

module.exports = router;
