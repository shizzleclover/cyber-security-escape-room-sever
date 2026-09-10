/**
 * @fileoverview quiz.routes.js
 * @module quiz/quiz.routes.js
 * 
 * Express Router Definition for the CyberEscape platform.
 * This file handles logic specific to its directory domain.
 */

const express = require('express');
const router = express.Router();
const quizController = require('./quiz.controller');
const authenticate = require('../../middleware/authenticate');

// All quiz routes require authentication
router.use(authenticate);

router.post('/', quizController.submitQuiz);
router.get('/', quizController.getQuizResults);
router.get('/status', quizController.getQuizStatus);

module.exports = router;
