const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Creating user model with mongoose
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    unique: [true, 'A user with that email already registered'],
    required: [true, 'A user must have an email'],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Must confirm a password'],
    validate: {
      validator(passwordConfirm) {
        return passwordConfirm === this.password;
      },
      message: 'Passwords do not match',
    },
  },
  passwordChangedAt: Date,
});

/**  Encrypting password using bcrypt
 *  and also deleting passwordConfirm field,
 *  since this don't need to persist in database
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async (enteredPassword, userPassword) =>
  await bcrypt.compare(enteredPassword, userPassword);

userSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const converted = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return jwtTimestamp < converted;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
