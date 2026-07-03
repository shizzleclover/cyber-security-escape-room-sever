const mongoose = require('mongoose');

const RESOURCE_CATEGORIES = ['Reporting Fraud', 'Learning More', 'Password Tools', 'Get Help'];

const resourceSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: RESOURCE_CATEGORIES,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'URL is required'],
      trim: true,
    },
    icon: {
      type: String,
      default: 'Globe', // lucide-react icon name, resolved client-side
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

resourceSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Resource', resourceSchema);
module.exports.RESOURCE_CATEGORIES = RESOURCE_CATEGORIES;
