const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const authenticate = require('../../middleware/authenticate');
const authorize = require('../../middleware/authorize');
const AppError = require('../../utils/AppError');
const adminService = require('./admin.service');

// All admin routes require an authenticated admin
router.use(authenticate, authorize('admin'));

/**
 * GET /api/admin/overview
 * Platform-wide analytics for the admin dashboard.
 */
router.get(
  '/overview',
  asyncHandler(async (req, res) => {
    const overview = await adminService.getOverview();
    res.status(200).json({ success: true, data: { overview } });
  })
);

/**
 * GET /api/admin/users
 * List all users with a progress/score summary.
 */
router.get(
  '/users',
  asyncHandler(async (req, res) => {
    const users = await adminService.listUsers();
    res.status(200).json({ success: true, data: { users } });
  })
);

/**
 * GET /api/admin/users/:id
 * Full detail for one user (profile + progress + scores + quizzes).
 */
router.get(
  '/users/:id',
  asyncHandler(async (req, res) => {
    const detail = await adminService.getUserDetail(req.params.id);
    if (!detail) {
      throw new AppError('User not found.', 404);
    }
    res.status(200).json({ success: true, data: detail });
  })
);

/**
 * PATCH /api/admin/users/:id/role
 * Promote or demote a user's role.
 */
router.patch(
  '/users/:id/role',
  asyncHandler(async (req, res) => {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      throw new AppError('Role must be "user" or "admin".', 400);
    }
    if (req.params.id === req.user.id && role !== 'admin') {
      throw new AppError('You cannot remove your own admin access.', 400);
    }
    const user = await adminService.updateUserRole(req.params.id, role);
    if (!user) {
      throw new AppError('User not found.', 404);
    }
    res.status(200).json({ success: true, message: 'User role updated.', data: { user } });
  })
);

/**
 * DELETE /api/admin/users/:id
 * Delete a user and all of their associated data.
 */
router.delete(
  '/users/:id',
  asyncHandler(async (req, res) => {
    if (req.params.id === req.user.id) {
      throw new AppError('You cannot delete your own account from the admin panel.', 400);
    }
    await adminService.deleteUser(req.params.id);
    res.status(200).json({ success: true, message: 'User deleted.' });
  })
);

module.exports = router;
