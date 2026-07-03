const express = require('express');
const router = express.Router();
const scoresController = require('./scores.controller');
const authenticate = require('../../middleware/authenticate');

// All score routes require authentication
router.use(authenticate);

router.post('/', scoresController.submitScore);
router.get('/', scoresController.getScores);
router.get('/leaderboard/top', scoresController.getLeaderboard);
router.get('/:roomId', scoresController.getRoomScore);

module.exports = router;
