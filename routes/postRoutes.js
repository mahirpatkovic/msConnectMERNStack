const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post(
	'/',
	postController.uploadFiles,
	// postController.resizeUploadImages,
	postController.createPost
);

router.get('/timeline/:userId', postController.getTimelinePosts);

module.exports = router;
