const Resource = require('./Resource.model');
const AppError = require('../../utils/AppError');

const getActiveResources = async () => {
  return Resource.find({ active: true }).sort({ category: 1, order: 1 });
};

const adminList = async () => {
  return Resource.find().sort({ category: 1, order: 1 });
};

const adminCreate = async (data) => {
  return Resource.create(data);
};

const adminUpdate = async (id, updates) => {
  const allowed = {};
  ['category', 'title', 'description', 'url', 'icon', 'order', 'active'].forEach((key) => {
    if (updates[key] !== undefined) allowed[key] = updates[key];
  });

  const resource = await Resource.findByIdAndUpdate(id, allowed, { new: true, runValidators: true });
  if (!resource) {
    throw new AppError('Resource not found.', 404);
  }
  return resource;
};

const adminDelete = async (id) => {
  const resource = await Resource.findByIdAndDelete(id);
  if (!resource) {
    throw new AppError('Resource not found.', 404);
  }
  return resource;
};

module.exports = {
  getActiveResources,
  adminList,
  adminCreate,
  adminUpdate,
  adminDelete,
};
