/**
 * Seed script: migrates the bundled static game content into MongoDB
 * and optionally promotes a user to admin.
 *
 * Usage:
 *   npm run seed                          # upsert all content
 *   npm run seed -- --admin you@mail.com  # also promote a user to admin
 */
const mongoose = require('mongoose');
const env = require('../config/env');
const Content = require('../features/content/Content.model');
const User = require('../features/auth/User.model');

const sources = {
  'quiz-question': require('../data/quizQuestions'),
  'phishing-email': require('../data/phishingEmails'),
  'password-challenge': require('../data/passwordChallenges'),
  'social-scenario': require('../data/socialEngineeringScenarios'),
};

const seed = async () => {
  await mongoose.connect(env.mongoUri);
  console.log('Connected to MongoDB');

  for (const [kind, items] of Object.entries(sources)) {
    for (const [index, item] of items.entries()) {
      // JSON round-trip strips functions (e.g. requirement `check` callbacks)
      // — the same thing res.json() did when these were served statically.
      const data = JSON.parse(JSON.stringify(item));

      await Content.findOneAndUpdate(
        { kind, itemId: item.id },
        { kind, itemId: item.id, data, order: index, active: true },
        { upsert: true, new: true, runValidators: true }
      );
    }
    console.log(`Seeded ${items.length} ${kind} item(s)`);
  }

  // Optional: promote a user to admin
  const adminFlagIndex = process.argv.indexOf('--admin');
  if (adminFlagIndex !== -1) {
    const email = process.argv[adminFlagIndex + 1];
    if (!email) {
      console.error('Usage: npm run seed -- --admin <email>');
    } else {
      const user = await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        { role: 'admin' },
        { new: true }
      );
      console.log(
        user
          ? `Promoted ${user.email} to admin`
          : `No user found with email ${email} — register first, then re-run.`
      );
    }
  }

  await mongoose.disconnect();
  console.log('Done.');
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
