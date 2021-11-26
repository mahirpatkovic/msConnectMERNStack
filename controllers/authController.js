const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const validator = require('validator');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie('token', token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: false,
        secure: 'https',
    });
    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        user,
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    let { firstName, lastName, email, password, dob, gender } = req.body;
    if (!firstName || !lastName || !email || !password || !dob || !gender)
        return res
            .status(400)
            .json({ message: 'You have to enter all fields.' });
    else if (password.length < 8)
        return res.status(400).json({
            message: 'The password needs to be at least 8 characters long.',
        });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
        return res.status(400).json({
            message: 'An account with this email already exists.',
        });
    else if (!validator.isEmail(email)) {
        return res.status(400).json({
            message: 'Please provide a valid email.',
        });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        dob,
        gender,
    });
    await newUser.save();

    createSendToken(newUser, 200, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Please provide email and password.' });
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({
            message: 'Incorrect email or password!',
        });
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({
            message: 'You are not logged. Please log in to get access',
        });
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return res.status(401).json({
            message: 'The user belonging to this token does no longer exist.',
        });
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.passwordChangedAt) {
        const changedTimestamp = parseInt(
            currentUser.passwordChangedAt.getTime() / 1000,
            10
        );
        return decoded.iat < changedTimestamp;
    }

    createSendToken(currentUser, 202, req, res);
    // res.status(202).json({
    //     status: 'success',
    //     currentUser,
    // });
    next();
});
