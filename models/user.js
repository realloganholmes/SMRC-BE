const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, required: true },
  admin: { type: Boolean, required: false, default: false },
  coolerAdmin: { type: Boolean, required: false, default: false },
  RFGAdmin: { type: Boolean, required: false, default: false },
  raceAdmin: { type: Boolean, required: false, default: false },
  dashboardAdmin: { type: Boolean, required: false, default: false },
  recapAdmin: { type: Boolean, required: false, default: false },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;