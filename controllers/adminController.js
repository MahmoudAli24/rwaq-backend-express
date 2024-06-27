const User = require('../models/User');
const Course = require('../models/Course');
const userRole = require("../utils/userRoles");

exports.getDashboardStats = async (req, res) => {
    try {
        const studentsCount = await User.countDocuments({ role: 'student' });
        const teachersCount = await User.countDocuments({ role: 'teacher' });
        const coursesCount = await Course.countDocuments();

        res.json({ studentsCount, teachersCount, coursesCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.registerTeacher = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newTeacher = new User({ name, email, password, role: userRole.TEACHER });
        await newTeacher.save();
        res.status(201).json(newTeacher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
