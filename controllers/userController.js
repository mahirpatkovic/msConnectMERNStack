const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const allUsers = await User.find();

    res.status(200).json({
        status: 'success',
        allUsers,
    });
});
