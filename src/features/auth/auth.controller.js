const asyncHandler = require('../../utils/asyncHandler');
const authService = require('./auth.service');
const env = require('../../config/env');

// Cookie options for JWT token
const cookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

/**
 * POST /api/auth/register
 * Create a new user account and return JWT in cookie.
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password, ageGroup, digitalConfidence } = req.body;

  const { user, token } = await authService.registerUser({
    name,
    email,
    password,
    ageGroup,
    digitalConfidence,
  });

  res.cookie('token', token, cookieOptions);

  res.status(201).json({
    success: true,
    message: 'Account created successfully.',
    data: { user, token },
  });
});

/**
 * POST /api/auth/login
 * Authenticate user and return JWT in cookie.
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await authService.loginUser({ email, password });

  res.cookie('token', token, cookieOptions);

  res.status(200).json({
    success: true,
    message: 'Logged in successfully.',
    data: { user, token },
  });
});

/**
 * GET /api/auth/me
 * Get current authenticated user profile.
 */
const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);

  res.status(200).json({
    success: true,
    data: { user },
  });
});

/**
 * POST /api/auth/logout
 * Clear the authentication cookie.
 */
const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
});

module.exports = {
  register,
  login,
  getMe,
  logout,
};
