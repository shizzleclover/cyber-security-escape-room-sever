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
const Resource = require('../features/resources/Resource.model');

const sources = {
  'quiz-question': require('../data/quizQuestions'),
  'phishing-email': require('../data/phishingEmails'),
  'password-challenge': require('../data/passwordChallenges'),
  'social-scenario': require('../data/socialEngineeringScenarios'),
};

// Mirrors the resources previously hardcoded in client/src/app/resources/page.tsx
const resourceSeeds = [
  { category: 'Reporting Fraud', title: 'Action Fraud (UK)', description: 'The UK national reporting centre for fraud and cybercrime.', url: 'https://www.actionfraud.police.uk/', icon: 'Landmark' },
  { category: 'Reporting Fraud', title: 'An Garda Síochána', description: 'Report cybercrime to Irish police.', url: 'https://www.garda.ie/en/crime/fraud/', icon: 'Shield' },
  { category: 'Reporting Fraud', title: 'FraudSMART (Ireland)', description: 'Banking and Payments Federation Ireland fraud awareness.', url: 'https://www.fraudsmart.ie/', icon: 'AlertTriangle' },
  { category: 'Learning More', title: 'National Cyber Security Centre', description: 'UK government guidance on staying safe online.', url: 'https://www.ncsc.gov.uk/cyberaware', icon: 'Globe' },
  { category: 'Learning More', title: 'Age Action Ireland', description: 'Digital literacy programmes for older adults.', url: 'https://www.ageaction.ie/', icon: 'Users' },
  { category: 'Learning More', title: 'Google Phishing Quiz', description: 'Test your phishing detection skills with Google.', url: 'https://phishingquiz.withgoogle.com/', icon: 'FileText' },
  { category: 'Password Tools', title: 'Bitwarden', description: 'Free, open-source password manager. Works on all devices.', url: 'https://bitwarden.com/', icon: 'Lock' },
  { category: 'Password Tools', title: 'Have I Been Pwned', description: 'Check if your email has been in a data breach.', url: 'https://haveibeenpwned.com/', icon: 'AlertTriangle' },
  { category: 'Password Tools', title: 'How Secure Is My Password', description: 'See how long it would take to crack your password.', url: 'https://www.security.org/how-secure-is-my-password/', icon: 'Shield' },
  { category: 'Get Help', title: 'Citizens Information (Ireland)', description: 'Free information and advice on public services.', url: 'https://www.citizensinformation.ie/', icon: 'BookOpen' },
  { category: 'Get Help', title: 'Age UK Helpline', description: 'Free advice line for older people: 0800 678 1602.', url: 'https://www.ageuk.org.uk/', icon: 'Phone' },
  { category: 'Get Help', title: 'Victim Support', description: 'Free support for victims of crime including fraud.', url: 'https://www.victimsupport.org.uk/', icon: 'Users' },
];

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

  // Resources: only seed if the collection is empty, so admin edits aren't clobbered on re-run
  const existingResourceCount = await Resource.countDocuments();
  if (existingResourceCount === 0) {
    for (const [index, resource] of resourceSeeds.entries()) {
      await Resource.create({ ...resource, order: index });
    }
    console.log(`Seeded ${resourceSeeds.length} resource(s)`);
  } else {
    console.log(`Skipped resource seeding (${existingResourceCount} already exist)`);
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
