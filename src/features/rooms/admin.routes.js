const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const Room = require('./Room.model');
const Content = require('../content/Content.model');

/**
 * GET /api/admin/rooms
 * Fetch all custom rooms
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const rooms = await Room.find().sort({ order: 1, createdAt: -1 }).lean();
    res.status(200).json({ success: true, data: { rooms } });
  })
);

/**
 * POST /api/admin/rooms
 * Create a new custom room
 */
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { roomId, title, description, icon, active, order } = req.body;
    
    // Check if room with this ID already exists
    const existing = await Room.findOne({ roomId });
    if (existing) {
      return res.status(409).json({ success: false, message: 'A room with this ID already exists.' });
    }

    const room = await Room.create({ roomId, title, description, icon, active, order });
    res.status(201).json({ success: true, message: 'Room created successfully.', data: { room } });
  })
);

/**
 * PUT /api/admin/rooms/:id
 * Update an existing room by its _id
 */
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const room = await Room.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found.' });
    }

    res.status(200).json({ success: true, message: 'Room updated successfully.', data: { room } });
  })
);

/**
 * DELETE /api/admin/rooms/:id
 * Delete a room and all its associated questions
 */
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const room = await Room.findByIdAndDelete(id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found.' });
    }

    // Delete associated questions where data.roomId matches the deleted room's slug
    await Content.deleteMany({ kind: 'custom-room-question', 'data.roomId': room.roomId });

    res.status(200).json({ success: true, message: 'Room and its questions deleted successfully.' });
  })
);

module.exports = router;
