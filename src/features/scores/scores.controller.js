const asyncHandler = require('../../utils/asyncHandler');
const scoresService = require('./scores.service');

/**
 * POST /api/scores
 * Submit a score after completing a room.
 */
const submitScore = asyncHandler(async (req, res) => {
  const { roomId, score, maxScore, hintsUsed, timeSpent } = req.body;

  const savedScore = await scoresService.submitScore(req.user.id, {
    roomId,
    score,
    maxScore,
    hintsUsed,
    timeSpent,
  });

  res.status(201).json({
    success: true,
    message: 'Score submitted successfully.',
    data: { score: savedScore },
  });
});

/**
 * GET /api/scores
 * Get all scores for the authenticated user.
 */
const getScores = asyncHandler(async (req, res) => {
  const scores = await scoresService.getUserScores(req.user.id);

  res.status(200).json({
    success: true,
    data: { scores },
  });
});

/**
 * GET /api/scores/:roomId
 * Get score for a specific room.
 */
const getRoomScore = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const score = await scoresService.getRoomScore(req.user.id, roomId);

  res.status(200).json({
    success: true,
    data: { score },
  });
});

/**
 * GET /api/scores/leaderboard
 * Get top 10 users by XP.
 */
const getLeaderboard = asyncHandler(async (req, res) => {
  const leaderboard = await scoresService.getLeaderboard();

  res.status(200).json({
    success: true,
    data: { leaderboard },
  });
});

module.exports = {
  submitScore,
  getScores,
  getRoomScore,
  getLeaderboard,
};
