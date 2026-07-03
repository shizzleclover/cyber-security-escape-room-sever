const QuizResponse = require('./QuizResponse.model');
const AppError = require('../../utils/AppError');
const contentService = require('../content/content.service');

/**
 * Submit a quiz response (pre or post assessment).
 * Answers are validated server-side against the question bank —
 * any `correct` flag sent by the client is ignored.
 */
const submitQuiz = async (userId, quizData) => {
  const { type, answers } = quizData;

  if (!['pre', 'post'].includes(type)) {
    throw new AppError('Quiz type must be "pre" or "post".', 400);
  }

  if (!Array.isArray(answers) || answers.length === 0) {
    throw new AppError('At least one answer is required.', 400);
  }

  // Check if user already submitted this quiz type
  const existing = await QuizResponse.findOne({ userId, type });
  if (existing) {
    throw new AppError(`You have already completed the ${type}-assessment quiz.`, 409);
  }

  // Grade answers server-side against the question bank
  const questions = await contentService.getItems('quiz-question');
  const questionById = new Map(questions.map((q) => [q.id, q]));

  const gradedAnswers = answers.map(({ questionId, selectedAnswer }) => {
    const question = questionById.get(questionId);
    if (!question) {
      throw new AppError(`Unknown quiz question: ${questionId}`, 400);
    }
    return {
      questionId,
      selectedAnswer,
      correct: selectedAnswer === question.correctAnswer,
    };
  });

  const score = gradedAnswers.filter((a) => a.correct).length;
  const totalQuestions = gradedAnswers.length;

  const quizResponse = await QuizResponse.create({
    userId,
    type,
    answers: gradedAnswers,
    score,
    totalQuestions,
    completedAt: new Date(),
  });

  return quizResponse;
};

/**
 * Get all quiz results for a user (both pre and post if they exist).
 */
const getUserQuizResults = async (userId) => {
  const results = await QuizResponse.find({ userId }).sort({ type: 1 });
  return results;
};

/**
 * Check if user has completed a specific quiz type.
 */
const hasCompletedQuiz = async (userId, type) => {
  const result = await QuizResponse.findOne({ userId, type });
  return !!result;
};

module.exports = {
  submitQuiz,
  getUserQuizResults,
  hasCompletedQuiz,
};
