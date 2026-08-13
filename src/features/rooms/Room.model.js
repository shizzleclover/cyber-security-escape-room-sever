const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: [true, 'Room ID/slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Room title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Room description is required'],
      trim: true,
    },
    icon: {
      type: String,
      default: 'Shield',
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);
