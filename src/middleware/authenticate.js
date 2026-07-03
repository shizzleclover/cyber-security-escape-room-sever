const jwt = require('jsonwebtoken');
const env = require('../config/env');
const AppError = require('../utils/AppError');

/**
 * Middleware to verify JWT token from cookies or Authorization header.
 * Attaches decoded user payload to req.user on success.
 */
const authenticate = (req, res, next) => {
  let token;

  // Check httpOnly cookie first
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // Fallback to Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in. Please log in to access this resource.', 401));
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = authenticate;
