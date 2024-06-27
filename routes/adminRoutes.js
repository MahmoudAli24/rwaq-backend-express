const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router.use(authMiddleware); // All admin routes require authentication

router.get('/dashboard', roleMiddleware('admin'), adminController.getDashboardStats);
router.post('/register-teacher', roleMiddleware('admin'), adminController.registerTeacher);

module.exports = router;
