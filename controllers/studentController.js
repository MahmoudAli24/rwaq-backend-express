const User = require('../models/User');
const userRole = require("../utils/userRoles");

exports.getStudentProfile = async (req, res) => {
    try {
        const student = await User.findById(req.params.id).populate('courses');
        if (!student || student.role !== userRole.STUDENT) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.enrollInCourse = async (req, res) => {
    try {
        const student = await User.findById(req.params.studentId);
        if (!student || student.role !== userRole.STUDENT) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        student.courses.push(course._id);
        await student.save();
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
