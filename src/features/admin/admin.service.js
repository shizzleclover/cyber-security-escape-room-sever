const User = require('../auth/User.model');
const Progress = require('../progress/Progress.model');
const Score = require('../scores/Score.model');
const QuizResponse = require('../quiz/QuizResponse.model');

const ROOMS = ['phishing', 'passwords', 'social-engineering'];

/**
 * List all users with a compact progress/score summary for the admin users table.
 */
const listUsers = async () => {
  const users = await User.find().sort({ createdAt: -1 }).lean();
  const userIds = users.map((u) => u._id);

  const [allScores, allProgress, allQuiz] = await Promise.all([
    Score.find({ userId: { $in: userIds } }).lean(),
    Progress.find({ userId: { $in: userIds } }).lean(),
    QuizResponse.find({ userId: { $in: userIds } }).lean(),
  ]);

  return users.map((user) => {
    const scores = allScores.filter((s) => String(s.userId) === String(user._id));
    const progress = allProgress.filter((p) => String(p.userId) === String(user._id));
    const quizzes = allQuiz.filter((q) => String(q.userId) === String(user._id));

    const roomsCompleted = progress.filter((p) => p.status === 'completed').length;
    const avgPercentage = scores.length
      ? Math.round(scores.reduce((sum, s) => sum + s.percentage, 0) / scores.length)
      : null;
    const preQuiz = quizzes.find((q) => q.type === 'pre');
    const postQuiz = quizzes.find((q) => q.type === 'post');

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      ageGroup: user.ageGroup,
      digitalConfidence: user.digitalConfidence,
      createdAt: user.createdAt,
      roomsCompleted,
      totalRooms: ROOMS.length,
      avgPercentage,
      preQuizScore: preQuiz ? { score: preQuiz.score, total: preQuiz.totalQuestions } : null,
      postQuizScore: postQuiz ? { score: postQuiz.score, total: postQuiz.totalQuestions } : null,
    };
  });
};

/**
 * Full detail for a single user: profile + every progress/score/quiz record.
 */
const getUserDetail = async (userId) => {
  const [user, progress, scores, quizzes] = await Promise.all([
    User.findById(userId).lean(),
    Progress.find({ userId }).lean(),
    Score.find({ userId }).sort({ roomId: 1 }).lean(),
    QuizResponse.find({ userId }).lean(),
  ]);

  if (!user) return null;

  const { password, ...safeUser } = user;
  return { user: safeUser, progress, scores, quizzes };
};

const updateUserRole = async (userId, role) => {
  return User.findByIdAndUpdate(userId, { role }, { new: true, runValidators: true }).select('-password');
};

const deleteUser = async (userId) => {
  await Promise.all([
    User.findByIdAndDelete(userId),
    Progress.deleteMany({ userId }),
    Score.deleteMany({ userId }),
    QuizResponse.deleteMany({ userId }),
  ]);
};

/**
 * Aggregate platform-wide analytics for the admin overview dashboard.
 */
const getOverview = async () => {
  const [totalUsers, usersByAgeGroup, scoresByRoom, quizzes, recentUsers] = await Promise.all([
    User.countDocuments(),
    User.aggregate([{ $group: { _id: '$ageGroup', count: { $sum: 1 } } }]),
    Score.aggregate([
      {
        $group: {
          _id: '$roomId',
          attempts: { $sum: 1 },
          avgPercentage: { $avg: '$percentage' },
          avgHints: { $avg: '$hintsUsed' },
        },
      },
    ]),
    QuizResponse.find().lean(),
    User.find().sort({ createdAt: -1 }).limit(5).select('name email ageGroup createdAt').lean(),
  ]);

  // Learning-gain: average (post% - pre%) across users who have both
  const byUser = {};
  quizzes.forEach((q) => {
    const key = String(q.userId);
    byUser[key] = byUser[key] || {};
    byUser[key][q.type] = (q.score / q.totalQuestions) * 100;
  });
  const gains = Object.values(byUser)
    .filter((u) => u.pre !== undefined && u.post !== undefined)
    .map((u) => u.post - u.pre);
  const avgLearningGain = gains.length ? Math.round(gains.reduce((a, b) => a + b, 0) / gains.length) : null;

  const roomStats = ROOMS.map((roomId) => {
    const stat = scoresByRoom.find((s) => s._id === roomId);
    return {
      roomId,
      attempts: stat?.attempts || 0,
      avgPercentage: stat ? Math.round(stat.avgPercentage) : null,
      avgHints: stat ? Math.round(stat.avgHints * 10) / 10 : null,
    };
  });

  return {
    totalUsers,
    usersByAgeGroup: usersByAgeGroup.map((g) => ({ ageGroup: g._id, count: g.count })),
    roomStats,
    quizzesTaken: { pre: quizzes.filter((q) => q.type === 'pre').length, post: quizzes.filter((q) => q.type === 'post').length },
    avgLearningGain,
    recentUsers,
  };
};

module.exports = {
  listUsers,
  getUserDetail,
  updateUserRole,
  deleteUser,
  getOverview,
};
