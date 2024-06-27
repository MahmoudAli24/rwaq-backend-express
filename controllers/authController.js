const User = require('../models/User');
const asyncWrapper = require("../middlewares/asyncWrapper");
const {validationResult} = require("express-validator");
const userRole = require("../utils/userRoles");

exports.register = asyncWrapper(async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // Sanitize input
        const {name, email, password} = req.body;
        const sanitizedEmail = email.trim();
        const sanitizedName = name.trim();

        // Check if email already exists
        const isFoundEmail = await User.findOne({email: sanitizedEmail});
        if (isFoundEmail) {
            return res.status(400).json({error: 'Email already exists'});
        }

        // Create user
        const user = new User({name: sanitizedName, email: sanitizedEmail, password, role: userRole.STUDENT});
        await user.save();

        // Generate token
        const token = await user.generateAuthToken();

        res.status(201).json({user, token});
    } catch (err) {
        res.status(500).json({error: 'Internal server error'});
    }
})

exports.login = asyncWrapper(
    async (req, res) => {
        try {
            // Validate input
            console.log("hi")
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }

            const {email, password} = req.body;
            const user = await User.findByCredentials(email, password);
            console.log("user", user);
            const token = await user.generateAuthToken();
            res.json({user, token});
        } catch (err) {
            res.status(400).json({error: 'Invalid login credentials'});
        }
    }
)

exports.logout = asyncWrapper(
    async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
            await req.user.save();
            res.json({message: 'Logged out successfully'});
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }
)
