const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const env = require('./config/env');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Feature routes
const authRoutes = require('./features/auth/auth.routes');
const progressRoutes = require('./features/progress/progress.routes');
const scoresRoutes = require('./features/scores/scores.routes');
const quizRoutes = require('./features/quiz/quiz.routes');
const contentRoutes = require('./features/content/content.routes');
const adminContentRoutes = require('./features/content/admin.routes');
const resourcesRoutes = require('./features/resources/resources.routes');
const adminResourcesRoutes = require('./features/resources/admin.routes');
const roomsRoutes = require('./features/rooms/rooms.routes');
const adminRoomsRoutes = require('./features/rooms/admin.routes');
const adminRoutes = require('./features/admin/admin.routes');

// Initialize Express app
const app = express();
app.set('trust proxy', 1);

// ─── Global Middleware ────────────────────────────────────────────────────────

// Enable request logging in all environments to trace production errors
app.use(morgan('dev'));

// Custom CORS configuration - Extremely permissive to avoid production issues
app.use((req, res, next) => {
  console.log(`[CORS Middleware] Incoming ${req.method} request to ${req.originalUrl}`);
  
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    // Fallback if no origin is provided
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    console.log(`[CORS Middleware] Handled OPTIONS preflight for ${req.originalUrl}`);
    return res.status(200).end();
  }
  
  next();
});

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: false, // Prevents helmet from blocking cross-origin API requests
}));

// Compress responses
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Cookie parsing
app.use(cookieParser());

// ─── API Routes ───────────────────────────────────────────────────────────────

app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/scores', scoresRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/admin/content', adminContentRoutes);
app.use('/api/admin/resources', adminResourcesRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/admin/rooms', adminRoomsRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running.',
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler for undefined routes
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────

app.use(errorHandler);

// ─── Server Start ─────────────────────────────────────────────────────────────

// Catch unhandled errors that might crash the server in production
process.on('uncaughtException', (err) => {
  console.error('[CRITICAL] Uncaught Exception:', err);
  process.exit(1);
});
process.on('unhandledRejection', (err) => {
  console.error('[CRITICAL] Unhandled Rejection:', err);
  process.exit(1);
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(env.port, () => {
      console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
    });
  } catch (error) {
    console.error(`[CRITICAL] Server failed to start:`, error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
