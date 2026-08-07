const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

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
const adminRoutes = require('./features/admin/admin.routes');

// Initialize Express app
const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────

// CORS configuration - Must come before other restrictive middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://cyber-security-escape-room-client-production.up.railway.app',
  env.clientUrl,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow any origin that is in our list, or allow all if we want to be permissive
      // For Railway production, reflecting the origin is safest when using credentials
      callback(null, origin || true);
    },
    credentials: true,
  })
);

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: false, // Prevents helmet from blocking cross-origin API requests
}));

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

// Request logging (development only)
if (env.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

// ─── API Routes ───────────────────────────────────────────────────────────────

app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/scores', scoresRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/admin/content', adminContentRoutes);
app.use('/api/admin/resources', adminResourcesRoutes);
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

const startServer = async () => {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
  });
};

startServer();

module.exports = app;
