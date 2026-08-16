const mongoose = require('mongoose');
const env = require('../config/env');
const User = require('../features/auth/User.model');
const Score = require('../features/scores/Score.model');
const Progress = require('../features/progress/Progress.model');
const QuizResponse = require('../features/quiz/QuizResponse.model');

mongoose.connect(env.mongoUri).then(async () => {
  // Clear all gameplay data
  await Score.deleteMany({});
  await Progress.deleteMany({});
  await QuizResponse.deleteMany({});

  // Clear dummy users (like Jane Doe)
  await User.deleteMany({ email: { $in: ['jane@example.com', 'test@test.com', 'test@example.com'] } });

  console.log('Cleared all dummy data and reset scores');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
