const Post = require('../models/postModel');
const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const path = require('path');
const sharp = require('sharp');
const aws = require('aws-sdk');
const awsS3 = new aws.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const bucketName = process.env.AWS_BUCKET_NAME;

const maxSize = 30 * 1024 * 1024;

const fileUpload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: maxSize, // 10000000 Bytes = 10 MB
	},
	fileFilter(req, file, cb) {
		// upload only mp4 and mkv format
		if (!file.originalname.match(/\.(mp4|MPEG-4|mkv|png|jpg|jpeg|gif)$/)) {
			return cb(new Error('Please upload image or video'));
		}
		cb(undefined, true);
	},
});

exports.uploadFiles = fileUpload.array('files', 4);

// exports.resizeUploadImages = catchAsync(async (req, res, next) => {
// 	if (req.files) {
// 		await Promise.all(
// 			req.files.map(async (file, i) => {
// 				if (file.mimetype.startsWith('image')) {
// 					sharp(file.buffer)
// 						.resize(1200, 630)
// 						.toFormat('jpeg')
// 						.jpeg({ quality: 90 });
// 				}
// 			})
// 		);
// 		next();
// 	} else {
// 		next();
// 	}
// });

exports.createPost = catchAsync(async (req, res, next) => {
	const { user, description, visible } = req.body;
	if (req.files) {
		// console.log(req.files);
		// // Setting up S3 upload parameters
		const params = req.files.map((file, i) => {
			return {
				Bucket: `${bucketName}/uploads-${user}`,
				Key: `post${i}-${user}-${Date.now()}.${
					file.mimetype.split('/')[1]
				}`, // File name you want to save as in S3
				Body: file.buffer,
			};
		});
		// 	// // Uploading files to the bucket
		const fileData = await Promise.all(
			params.map((param) => awsS3.upload(param).promise())
		);
		const newPost = new Post({
			user: user,
			description: description,
			visible: visible,
			files: fileData.map((file) => {
				return {
					file: file.Key,
					type: path.extname(file.Key),
				};
			}),
		});
		await newPost.save();
		return res.status(200).json({
			message: 'Post created successfully',
			data: newPost,
		});
	} else {
		return res.status(400).json({
			message: 'You need to upload images/video, try again',
			data: [],
		});
	}
});

exports.getTimelinePosts = catchAsync(async (req, res, next) => {
	const allPosts = await Post.find({ user: req.params.userId });
	let params = [];
	for (let post of allPosts) {
		post.files.forEach((file, i) => {
			params.push({
				Bucket: `${bucketName}/${file.file.split('/')[0]}`,
				Key: `${file.file.split('/')[1]}`, // File name you want to save as in S3
			});
		});
	}

	const fileData = await Promise.all(
		params.map((param) =>
			awsS3
				.getObject(param)
				.promise()
				.then((data) => {
					let buf = Buffer.from(data.Body);
					let base64 = buf.toString('base64');
					return {
						base64,
						type: path.extname(param.Key),
					};
				})
		)
	);

	let j = 0;
	for (let post of allPosts) {
		for (let i = 0; i < post.files.length; i++) {
			post.files[i] = {
				file: fileData[j].base64,
				type: fileData[j].type,
			};
			j++;
		}
	}

	res.status(200).json({
		status: 'success',
		data: allPosts,
	});
});

// let tmpArr = [];
// await Promise.all(
// 	params.map((param) => {
// 		awsS3.getSignedUrl('getObject', param, function (err, url) {
// 			res.status(200).json({
// 				status: 'success',
// 				data: url,
// 			});
// 		});
// 	})
// );
// console.log(tmpArr);
