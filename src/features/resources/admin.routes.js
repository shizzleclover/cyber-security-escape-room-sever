const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');
const resourcesService = require('./resources.service');
const { RESOURCE_CATEGORIES } = require('./Resource.model');

router.use(authenticate, authorize('admin'));

/**
 * GET /api/admin/resources
 * List all resources (including inactive).
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const resources = await resourcesService.adminList();
    res.status(200).json({ success: true, data: { resources, categories: RESOURCE_CATEGORIES } });
  })
);

/**
 * POST /api/admin/resources
 * Create a resource.
 */
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const resource = await resourcesService.adminCreate(req.body);
    res.status(201).json({ success: true, message: 'Resource created.', data: { resource } });
  })
);

/**
 * PUT /api/admin/resources/:id
 * Update a resource.
 */
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const resource = await resourcesService.adminUpdate(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Resource updated.', data: { resource } });
  })
);

/**
 * DELETE /api/admin/resources/:id
 * Delete a resource.
 */
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await resourcesService.adminDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Resource deleted.' });
  })
);

module.exports = router;
