const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: [true, 'Please provide your first name'],
        },
        lastName: {
            type: String,
            trim: true,
            required: [true, 'Please provide your last name'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email'],
        },
        photo: {
            type: String,
            trim: true,
            default: '',
        },
        cover: {
            type: String,
            trim: true,
            default: '',
        },
        password: {
            type: String,
            trim: true,
            required: [true, 'Please provide a password'],
            minlength: 8,
            select: false,
        },
        dob: Date,
        gender: {
            type: String,
            enum: ['male', 'female'],
        },
        country: {
            type: String,
            default: '',
        },
        city: {
            type: String,
            default: '',
        },
        address: {
            type: String,
            default: '',
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
            type: Boolean,
            default: true,
            select: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
