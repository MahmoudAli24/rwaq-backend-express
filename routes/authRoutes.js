const express = require('express');
const authController = require('../controllers/authController');
const {registerValidation, loginValidation} = require("../middlewares/Validation/authValidation");
const router = express.Router();

router.post('/register',registerValidation(), authController.register);
router.post('/login',loginValidation(), authController.login);
router.post('/logout', authController.logout);

module.exports = router;
