const express = require('express');
const imageController = require('../controllers/imageController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/:userId', imageController.getAllImages);

module.exports = router;
