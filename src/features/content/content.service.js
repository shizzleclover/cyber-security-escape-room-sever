const Content = require('./Content.model');
const AppError = require('../../utils/AppError');

// Static fallbacks so the app works before the DB has been seeded
const staticData = {
  'quiz-question': require('../../data/quizQuestions'),
  'phishing-email': require('../../data/phishingEmails'),
  'password-challenge': require('../../data/passwordChallenges'),
  'social-scenario': require('../../data/socialEngineeringScenarios'),
};

/**
 * Get all active items of a kind, in order, as plain data objects
 * (the same shape the old static data files exported).
 * Falls back to the bundled static data when the DB is unseeded.
 */
const getItems = async (kind) => {
  const docs = await Content.find({ kind, active: true }).sort({ order: 1, itemId: 1 }).lean();
  if (docs.length > 0) {
    return docs.map((d) => ({ ...d.data, id: d.itemId }));
  }
  return staticData[kind] || [];
};

/**
 * Get a single item of a kind by its numeric item id.
 */
const getItem = async (kind, itemId) => {
  const items = await getItems(kind);
  return items.find((item) => item.id === Number(itemId)) || null;
};

/* ─── Admin operations (operate on raw Content docs) ─────────────────────── */

const adminList = async (kind) => {
  const filter = kind ? { kind } : {};
  return Content.find(filter).sort({ kind: 1, order: 1, itemId: 1 });
};

const adminCreate = async ({ kind, itemId, data, order, active }) => {
  if (!kind || !data) {
    throw new AppError('Both "kind" and "data" are required.', 400);
  }

  // Auto-assign the next itemId within the kind when not provided
  let resolvedItemId = itemId;
  if (resolvedItemId === undefined || resolvedItemId === null) {
    const last = await Content.findOne({ kind }).sort({ itemId: -1 });
    const lastStatic = (staticData[kind] || []).reduce((max, item) => Math.max(max, item.id || 0), 0);
    resolvedItemId = Math.max(last ? last.itemId : 0, lastStatic) + 1;
  }

  return Content.create({ kind, itemId: resolvedItemId, data, order: order ?? resolvedItemId, active });
};

const adminUpdate = async (id, updates) => {
  const allowed = {};
  ['data', 'order', 'active', 'itemId'].forEach((key) => {
    if (updates[key] !== undefined) allowed[key] = updates[key];
  });

  const doc = await Content.findByIdAndUpdate(id, allowed, { new: true, runValidators: true });
  if (!doc) {
    throw new AppError('Content item not found.', 404);
  }
  return doc;
};

const adminDelete = async (id) => {
  const doc = await Content.findByIdAndDelete(id);
  if (!doc) {
    throw new AppError('Content item not found.', 404);
  }
  return doc;
};

module.exports = {
  getItems,
  getItem,
  adminList,
  adminCreate,
  adminUpdate,
  adminDelete,
};
