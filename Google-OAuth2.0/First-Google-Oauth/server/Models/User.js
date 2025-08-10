const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },
  name: String,
  picture: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
