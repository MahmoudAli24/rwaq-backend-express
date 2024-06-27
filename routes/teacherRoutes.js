const express = require('express');
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.use(authMiddleware); // All teacher routes require authentication

router.get('/:id', roleMiddleware('teacher'), teacherController.getTeacherProfile);
router.get('/:teacherId/courses', roleMiddleware('teacher'), teacherController.getTeacherCourses);

module.exports = router;
