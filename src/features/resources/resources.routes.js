const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const resourcesService = require('./resources.service');

/**
 * GET /api/resources
 * Public: list active resources grouped by category.
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const resources = await resourcesService.getActiveResources();
    res.status(200).json({ success: true, data: { resources } });
  })
);

module.exports = router;
