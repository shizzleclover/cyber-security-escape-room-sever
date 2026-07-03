const jwt = require('jsonwebtoken');
const User = require('./User.model');
const AppError = require('../../utils/AppError');
const env = require('../../config/env');

/**
 * Generate a JWT token for a given user ID.
 */
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
};

/**
 * Register a new user account.
 */
const registerUser = async ({ name, email, password, ageGroup, digitalConfidence }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('An account with that email already exists.', 409);
  }

  const user = await User.create({
    name,
    email,
    password,
    ageGroup,
    digitalConfidence,
  });

  const token = generateToken(user);

  // Return user data without password
  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    ageGroup: user.ageGroup,
    digitalConfidence: user.digitalConfidence,
    role: user.role,
  };

  return { user: userData, token };
};

/**
 * Authenticate a user with email and password.
 */
const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError('Please provide both email and password.', 400);
  }

  // Find user and explicitly include password field
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Invalid email or password.', 401);
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new AppError('Invalid email or password.', 401);
  }

  const token = generateToken(user);

  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    ageGroup: user.ageGroup,
    digitalConfidence: user.digitalConfidence,
    role: user.role,
  };

  return { user: userData, token };
};

/**
 * Get the current authenticated user's profile.
 */
const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User not found.', 404);
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    ageGroup: user.ageGroup,
    digitalConfidence: user.digitalConfidence,
    role: user.role,
  };
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
