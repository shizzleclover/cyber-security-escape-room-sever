const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    roomId: {
      type: String,
      required: true,
      enum: ['phishing', 'passwords', 'social-engineering'],
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    maxScore: {
      type: Number,
      required: true,
      min: 1,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    hintsUsed: {
      type: Number,
      default: 0,
      min: 0,
    },
    timeSpent: {
      type: Number, // seconds
      default: 0,
      min: 0,
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

// Index for efficient queries by user
scoreSchema.index({ userId: 1, roomId: 1 });

module.exports = mongoose.model('Score', scoreSchema);
