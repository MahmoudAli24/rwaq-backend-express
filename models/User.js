const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRoles = require("../utils/userRoles");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [userRoles.ADMIN, userRoles.TEACHER, userRoles.STUDENT],
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }],
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}], // Courses the user is enrolled in (students) or teaches (teachers)
    createdAt: {
        type: Date,
        default: Date.now,
    },
    notifications: [{type: mongoose.Schema.Types.ObjectId, ref: 'Notification'}], // Notifications for the user
});

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        const salt = +process.env.SALT_PASS
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

// Generate an authentication token for the user
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString(), email: user.email, role: user.role}, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

// Find user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
};

// Hide private data
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
