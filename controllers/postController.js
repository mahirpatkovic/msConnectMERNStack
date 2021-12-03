const Post = require('../models/postModel');
const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const aws = require('aws-sdk');
const awsS3 = new aws.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const bucketName = 'msconnectapp';

const maxSize = 30 * 1024 * 1024;

// const processFile = multer({
// 	storage: multer.memoryStorage(),
// 	limits: { fileSize: maxSize },
// }).single('files');

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
exports.createPost = catchAsync(async (req, res, next) => {
	const { user, description, visible } = req.body;
	if (req.files) {
		// Setting up S3 upload parameters
		// console.log(req.files);
		const params = req.files.map((file, i) => {
			return {
				Bucket: `${bucketName}/uploads-${user}`,
				Key: `post${i}-${user}-${Date.now()}.${
					file.mimetype.split('/')[1]
				}`, // File name you want to save as in S3
				Body: file.buffer,
			};
		});
		// awsS3.upload(param).promise()
		// // Uploading files to the bucket
		const fileData = await Promise.all(
			params.map((param) => awsS3.upload(param).promise())
		);
		// console.log(fileData.map((file) => file.Key));
		const newPost = new Post({
			user: user,
			description: description,
			visible: visible,
			files: fileData.map((file) => file.Key),
		});

		await newPost.save();

		return res.status(200).json({
			message: 'Post created successfully',
			data: newPost,
		});
	}
});

// const { Storage } = require('@google-cloud/storage');
// const serviceKey = path.join(__dirname, './msconnect-google-cloud-key.json');
// const storage = new Storage({
// 	projectId: 'msconnect-333908',
// 	keyFilename: serviceKey,
// });

// const bucket = storage.bucket('msconnect');

// const blob = bucket.file(originalname.replace(/ /g, '_'));
// const blobStream = blob.createWriteStream({
//     resumable: false,
// });

// blobStream
//     .on('finish', () => {
//         const publicUrl = format(
//             `https://storage.googleapis.com/${bucket.name}/${blob.name}`
//         );
//         resolve(publicUrl);
//     })
//     .on('error', () => {
//         return res.status(400).json({
//             message: 'Unable to upload image, something went wrong',
//         });
//     })
//     .end(buffer);
// bucket.upload(req.file.originalname, function (err, file) {
// 	if (err) throw new Error(err);
// });

// const blob = bucket.file(req.file.originalname);
// 	const blobStream = blob.createWriteStream({
// 		resumable: false,
// 	});

// 	blobStream.on('error', (err) => {
// 		return res.status(500).json({ message: err.message });
// 	});

// 	blobStream.on('finish', async (data) => {
// 		// Create URL for directly file access via HTTP.
// 		const publicUrl = format(
// 			`https://storage.googleapis.com/${bucket.name}/${blob.name}`
// 		);

// 		try {
// 			// Make the file public
// 			await bucket.file(req.file.originalname).makePublic();
// 		} catch {
// 			return res.status(500).json({
// 				message: `Uploaded the file successfully: ${req.file.originalname}, but public access is denied!`,
// 				url: publicUrl,
// 			});
// 		}

// 		return res.status(200).json({
// 			message: 'Uploaded the file successfully: ' + req.file.originalname,
// 			url: publicUrl,
// 		});
// 	});

// 	blobStream.end(req.file.buffer);
// exports.uploadFiles = fileUpload.array('files', 4);

// const fileStorage = multer.diskStorage({
// 	destination: 'public/postUploads', // Destination to store video
// 	filename: (req, file, cb) => {
// 		cb(
// 			null,
// 			file.mimetype.split('/')[0] +
// 				'-' +
// 				Date.now() +
// 				path.extname(file.originalname)
// 		);
// 	},
// });

// const fileUpload = multer({
// 	storage: fileStorage,
// 	limits: {
// 		fileSize: 10000000, // 10000000 Bytes = 10 MB
// 	},
// 	fileFilter(req, file, cb) {
// 		// upload only mp4 and mkv format
// 		if (!file.originalname.match(/\.(mp4|MPEG-4|mkv|png|jpg|jpeg)$/)) {
// 			return cb(new Error('Please upload image or video'));
// 		}
// 		cb(undefined, true);
// 	},
// });

// exports.uploadPostImages = upload.array('files', 4);

// exports.resizePostImages = catchAsync(async (req, res, next) => {
// 	if (!req.files) return next();

// 	req.files.forEach(async (file, i) => {
// 		if (file.mimetype.startsWith('image')) {
// 			file.filename = `user-${req.body.user}-post${i}-${Date.now()}.jpeg`;
// 			await sharp(file.buffer)
// 				.resize(500, 500)
// 				.toFormat('jpeg')
// 				.jpeg({ quality: 90 })
// 				.toFile(`public/postUploads/${file.filename}`);
// 		}
// 	});

// 	next();
// });

// const videoStorage = multer.diskStorage({
// 	destination: 'public/videos', // Destination to store video
// 	filename: (req, file, cb) => {
// 		cb(
// 			null,
// 			file.fieldname + '_' + Date.now() + path.extname(file.originalname)
// 		);
// 	},
// });
// const videoUpload = multer({
// 	storage: videoStorage,
// 	limits: {
// 		fileSize: 10000000, // 10000000 Bytes = 10 MB
// 	},
// 	fileFilter(req, file, cb) {
// 		// upload only mp4 and mkv format
// 		if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
// 			return cb(new Error('Please upload a video'));
// 		}
// 		cb(undefined, true);
// 	},
// });

// const multerFilter = (req, file, cb) => {
// 	if (
// 		file.mimetype.startsWith('image') ||
// 		file.mimetype.startsWith('video')
// 	) {
// 		cb(null, true);
// 	} else {
// 		cb(new Error('Please upload image or video.', 400), false);
// 	}
// };
// const upload = multer({
// 	storage: multerStorage,
// 	fileFilter: multerFilter,
// });
