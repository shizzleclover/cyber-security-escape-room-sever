const asyncHandler = require('../../utils/asyncHandler');
const progressService = require('./progress.service');

/**
 * GET /api/progress
 * Get all room progress for the authenticated user.
 */
const getProgress = asyncHandler(async (req, res) => {
  const progress = await progressService.getUserProgress(req.user.id);

  res.status(200).json({
    success: true,
    data: { progress },
  });
});

/**
 * PUT /api/progress/:roomId
 * Update progress for a specific room.
 */
const updateProgress = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const { status, currentStep, answers } = req.body;

  const progress = await progressService.updateRoomProgress(req.user.id, roomId, {
    status,
    currentStep,
    answers,
  });

  res.status(200).json({
    success: true,
    data: { progress },
  });
});

/**
 * POST /api/progress/:roomId/reset
 * Reset a room's progress to allow replay.
 */
const resetProgress = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const progress = await progressService.resetRoomProgress(req.user.id, roomId);

  res.status(200).json({
    success: true,
    message: 'Room progress has been reset.',
    data: { progress },
  });
});

module.exports = {
  getProgress,
  updateProgress,
  resetProgress,
};
