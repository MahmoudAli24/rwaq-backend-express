const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.use(authMiddleware); // All student routes require authentication

router.get('/:id', roleMiddleware('student'), studentController.getStudentProfile);
router.post('/:studentId/courses/:courseId/enroll', roleMiddleware('student'), studentController.enrollInCourse);

module.exports = router;
