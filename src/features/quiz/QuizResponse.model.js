const mongoose = require('mongoose');

const quizAnswerSchema = new mongoose.Schema(
  {
    questionId: {
      type: Number,
      required: true,
    },
    selectedAnswer: {
      type: Number,
      required: true,
    },
    correct: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

const quizResponseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['pre', 'post'],
    },
    answers: {
      type: [quizAnswerSchema],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: 'At least one answer is required.',
      },
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index: one pre-quiz and one post-quiz per user
quizResponseSchema.index({ userId: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('QuizResponse', quizResponseSchema);
