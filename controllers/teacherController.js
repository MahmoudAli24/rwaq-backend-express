const User = require('../models/User');
const Course = require('../models/Course');
const userRole = require("../utils/userRoles");

exports.getTeacherProfile = async (req, res) => {
    try {
        const teacher = await User.findById(req.params.id).populate('courses');
        if (!teacher || teacher.role !== userRole.TEACHER) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        res.json(teacher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTeacherCourses = async (req, res) => {
    try {
        const courses = await Course.find({ teacher: req.params.teacherId });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
