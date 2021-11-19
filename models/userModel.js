const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
