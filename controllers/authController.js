const User = require('../models/usersModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Signup for creating new user
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});
