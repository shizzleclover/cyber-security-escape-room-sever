const Score = require('./Score.model');
const AppError = require('../../utils/AppError');

/**
 * Submit a score for a completed room.
 * Stores the latest attempt (overwrites previous score for same room).
 */
const submitScore = async (userId, scoreData) => {
  const { roomId, score, maxScore, hintsUsed, timeSpent } = scoreData;

  const validRooms = ['phishing', 'passwords', 'social-engineering'];
  if (!validRooms.includes(roomId)) {
    throw new AppError('Invalid room ID.', 400);
  }

  if (score > maxScore) {
    throw new AppError('Score cannot exceed maximum score.', 400);
  }

  const percentage = Math.round((score / maxScore) * 100);

  // Upsert: update existing score or create new one
  const savedScore = await Score.findOneAndUpdate(
    { userId, roomId },
    {
      score,
      maxScore,
      percentage,
      hintsUsed: hintsUsed || 0,
      timeSpent: timeSpent || 0,
      completedAt: new Date(),
    },
    { new: true, upsert: true, runValidators: true }
  );

  return savedScore;
};

/**
 * Get all scores for a user.
 */
const getUserScores = async (userId) => {
  const scores = await Score.find({ userId }).sort({ roomId: 1 });
  return scores;
};

/**
 * Get a user's score for a specific room.
 */
const getRoomScore = async (userId, roomId) => {
  const score = await Score.findOne({ userId, roomId });
  return score;
};

/**
 * Get leaderboard (aggregate scores by user)
 */
const getLeaderboard = async () => {
  const leaderboard = await Score.aggregate([
    {
      $group: {
        _id: '$userId',
        totalScore: { $sum: '$score' },
        totalMaxScore: { $sum: '$maxScore' },
        roomsCompleted: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $project: {
        _id: 1,
        totalScore: 1,
        totalMaxScore: 1,
        roomsCompleted: 1,
        xp: { $multiply: ['$totalScore', 100] },
        name: '$user.name',
      },
    },
    {
      $sort: { xp: -1 },
    },
    {
      $limit: 10,
    },
  ]);

  return leaderboard;
};

module.exports = {
  submitScore,
  getUserScores,
  getRoomScore,
  getLeaderboard,
};
