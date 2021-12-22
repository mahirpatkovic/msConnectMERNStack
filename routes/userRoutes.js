const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/auth', authController.isLoggedIn);

router.use(authController.protect);

router.get('/', userController.getAllUsers);
router.patch('/updateCoverPhoto', userController.uploadCoverPhoto);

module.exports = router;
