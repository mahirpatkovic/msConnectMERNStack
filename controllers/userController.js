const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');
const path = require('path');
const sharp = require('sharp');
const aws = require('aws-sdk');
const awsS3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const bucketName = process.env.AWS_BUCKET_NAME;

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const allUsers = await User.find();

    res.status(200).json({
        status: 'success',
        allUsers,
    });
});

exports.uploadCoverPhoto = catchAsync(async (req, res, next) => {
    if (!req.body) return next();

    const { croppedAreaPixels, image, userId } = req.body;

    const currentUser = await User.findById(userId);
    if (!currentUser) {
        return res.status(400).json({
            message: 'Cannot update your cover photo, try again later',
        });
    }

    const response = await axios.get(image, {
        responseType: 'arraybuffer',
    });
    const bufferredImage = Buffer.from(response.data, 'utf-8');

    const croppedImage = await sharp(bufferredImage)
        .extract({
            width: croppedAreaPixels.width,
            height: croppedAreaPixels.height,
            left: croppedAreaPixels.x,
            top: croppedAreaPixels.y,
        })
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toBuffer();

    const params = {
        Bucket: `${bucketName}/uploads-${userId}`,
        Key: `cover-${userId}-${Date.now()}${
            path.extname(image).split('?')[0]
        }`,
        Body: croppedImage,
    };
    // Uploading files to the bucket
    const uploadData = await awsS3.upload(params).promise();
    currentUser.cover = uploadData.Key;
    await currentUser.save();

    const coverImage = await awsS3.getSignedUrlPromise('getObject', {
        Bucket: params.Bucket,
        Key: params.Key,
        Expires: 3600,
    });

    currentUser.cover = coverImage;

    res.status(200).json({
        status: 'success',
        message: 'Cover changed successfully',
        currentUser,
    });
});
