const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed'],
      default: 'not-started',
    },
    currentStep: {
      type: Number,
      default: 0,
    },
    answers: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Compound index: one progress record per user per room
progressSchema.index({ userId: 1, roomId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
