const mongoose = require('mongoose');

const CONTENT_KINDS = ['quiz-question', 'phishing-email', 'password-challenge', 'social-scenario'];

/**
 * Generic game-content document.
 * Each doc wraps one item (a quiz question, an email, a challenge, or a scenario)
 * in its original shape under `data`, so admins can create/edit content without
 * code changes and the public API can keep its existing response shapes.
 */
const contentSchema = new mongoose.Schema(
  {
    kind: {
      type: String,
      required: [true, 'Content kind is required'],
      enum: CONTENT_KINDS,
      index: true,
    },
    // Stable numeric id used by the game client and answer checking
    itemId: {
      type: Number,
      required: [true, 'itemId is required'],
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Content data is required'],
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// One item per (kind, itemId)
contentSchema.index({ kind: 1, itemId: 1 }, { unique: true });

module.exports = mongoose.model('Content', contentSchema);
module.exports.CONTENT_KINDS = CONTENT_KINDS;
