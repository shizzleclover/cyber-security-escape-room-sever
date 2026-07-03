const Progress = require('./Progress.model');
const AppError = require('../../utils/AppError');

/**
 * Get all room progress records for a user.
 * If no records exist, returns default "not-started" entries.
 */
const getUserProgress = async (userId) => {
  const rooms = ['phishing', 'passwords', 'social-engineering'];
  let progress = await Progress.find({ userId });

  // Create default entries for rooms that have no record yet
  const existingRooms = progress.map((p) => p.roomId);
  const missingRooms = rooms.filter((r) => !existingRooms.includes(r));

  if (missingRooms.length > 0) {
    const defaults = missingRooms.map((roomId) => ({
      userId,
      roomId,
      status: 'not-started',
      currentStep: 0,
      answers: [],
    }));
    const created = await Progress.insertMany(defaults);
    progress = [...progress, ...created];
  }

  return progress;
};

/**
 * Update progress for a specific room.
 */
const updateRoomProgress = async (userId, roomId, updateData) => {
  const validRooms = ['phishing', 'passwords', 'social-engineering'];
  if (!validRooms.includes(roomId)) {
    throw new AppError('Invalid room ID.', 400);
  }

  const progress = await Progress.findOneAndUpdate(
    { userId, roomId },
    { ...updateData, updatedAt: new Date() },
    { new: true, upsert: true, runValidators: true }
  );

  return progress;
};

/**
 * Reset progress for a specific room (allows replay).
 */
const resetRoomProgress = async (userId, roomId) => {
  const progress = await Progress.findOneAndUpdate(
    { userId, roomId },
    { status: 'not-started', currentStep: 0, answers: [] },
    { new: true }
  );

  if (!progress) {
    throw new AppError('Progress record not found.', 404);
  }

  return progress;
};

module.exports = {
  getUserProgress,
  updateRoomProgress,
  resetRoomProgress,
};
