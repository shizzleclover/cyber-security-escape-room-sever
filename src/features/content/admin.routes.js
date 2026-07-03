const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');
const contentService = require('./content.service');
const { CONTENT_KINDS } = require('./Content.model');

// All admin routes require an authenticated admin
router.use(authenticate, authorize('admin'));

/**
 * GET /api/admin/content
 * List all content docs (raw, including answers). Optional ?kind= filter.
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { kind } = req.query;
    if (kind && !CONTENT_KINDS.includes(kind)) {
      return res.status(400).json({ success: false, message: `Invalid kind. Must be one of: ${CONTENT_KINDS.join(', ')}` });
    }
    const items = await contentService.adminList(kind);
    res.status(200).json({
      success: true,
      data: { items, kinds: CONTENT_KINDS },
    });
  })
);

/**
 * POST /api/admin/content
 * Create a content item. Body: { kind, data, itemId?, order?, active? }
 */
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const item = await contentService.adminCreate(req.body);
    res.status(201).json({
      success: true,
      message: 'Content item created.',
      data: { item },
    });
  })
);

/**
 * PUT /api/admin/content/:id
 * Update a content item's data, order, active flag, or itemId.
 */
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const item = await contentService.adminUpdate(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Content item updated.',
      data: { item },
    });
  })
);

/**
 * DELETE /api/admin/content/:id
 * Delete a content item.
 */
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await contentService.adminDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Content item deleted.',
    });
  })
);

module.exports = router;
