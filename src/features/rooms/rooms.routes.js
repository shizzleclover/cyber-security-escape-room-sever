const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const Room = require('./Room.model');

/**
 * GET /api/rooms
 * Fetch all active custom rooms for the frontend hub.
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const rooms = await Room.find({ active: true }).sort({ order: 1, createdAt: -1 }).lean();
    res.status(200).json({ success: true, data: { rooms } });
  })
);

module.exports = router;
