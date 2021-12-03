const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post(
	'/',
	// postController.uploadVideos,
	// postController.uploadPostImages,
	// postController.resizePostImages,
	postController.uploadFiles,
	postController.createPost
);

module.exports = router;
