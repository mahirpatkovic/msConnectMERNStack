const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.post(
    '/',
    postController.uploadFiles,
    // postController.resizeUploadImages,
    postController.createPost
);

router.get('/timeline/:userId', postController.getTimelinePosts);

module.exports = router;
