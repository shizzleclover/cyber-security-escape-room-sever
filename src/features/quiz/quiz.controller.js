const asyncHandler = require('../../utils/asyncHandler');
const quizService = require('./quiz.service');

/**
 * POST /api/quiz
 * Submit a pre or post assessment quiz.
 */
const submitQuiz = asyncHandler(async (req, res) => {
  const { type, answers } = req.body;

  const quizResponse = await quizService.submitQuiz(req.user.id, {
    type,
    answers,
  });

  res.status(201).json({
    success: true,
    message: `${type === 'pre' ? 'Pre' : 'Post'}-assessment quiz submitted successfully.`,
    data: {
      quiz: {
        type: quizResponse.type,
        score: quizResponse.score,
        totalQuestions: quizResponse.totalQuestions,
        completedAt: quizResponse.completedAt,
      },
    },
  });
});

/**
 * GET /api/quiz
 * Get all quiz results for the authenticated user.
 */
const getQuizResults = asyncHandler(async (req, res) => {
  const results = await quizService.getUserQuizResults(req.user.id);

  res.status(200).json({
    success: true,
    data: { results },
  });
});

/**
 * GET /api/quiz/status
 * Check which quizzes the user has completed.
 */
const getQuizStatus = asyncHandler(async (req, res) => {
  const preCompleted = await quizService.hasCompletedQuiz(req.user.id, 'pre');
  const postCompleted = await quizService.hasCompletedQuiz(req.user.id, 'post');

  res.status(200).json({
    success: true,
    data: {
      preCompleted,
      postCompleted,
    },
  });
});

module.exports = {
  submitQuiz,
  getQuizResults,
  getQuizStatus,
};
