const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/auth', authController.isLoggedIn);

router.get('/', userController.getAllUsers);

module.exports = router;
