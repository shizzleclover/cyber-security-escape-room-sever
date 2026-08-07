const mongoose = require('mongoose');
const env = require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);
const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));
async function run() {
  await User.updateOne({ email: /curl_.*@test\.com/ }, { role: 'admin' });
  mongoose.disconnect();
}
run();
