const mongoose = require('mongoose');
const env = require('../config/env');
const Resource = require('../features/resources/Resource.model');

mongoose.connect(env.mongoUri).then(async () => {
  await Resource.deleteMany({});
  console.log('Cleared resources collection');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
