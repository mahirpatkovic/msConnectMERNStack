const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');
const path = require('path');
const sharp = require('sharp');
const jimp = require('jimp');
const jo = require('jpeg-autorotate');

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

exports.updateCoverPhoto = catchAsync(async (req, res, next) => {
    if (!req.body) return next();

    const { croppedAreaPixels, image, userId } = req.body;

    const currentUser = await User.findById(userId);
    if (!currentUser) {
        return res.status(400).json({
            message: 'Cannot update your cover photo, try again later',
        });
    }

    const jimpImage = await jimp.read(image).then((img) => {
        return img
            .crop(
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            )
            .getBufferAsync(jimp.AUTO);
    });

    const croppedImage = await sharp(jimpImage)
        .resize(950, 400)
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
    await awsS3
        .deleteObject({
            Bucket: `${bucketName}/uploads-${userId}`,
            Key: currentUser.cover.split('/')[1],
        })
        .promise();
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

exports.updateProfilePhoto = catchAsync(async (req, res, next) => {
    if (!req.body) return next();

    const { croppedAreaPixels, image, userId } = req.body;

    const currentUser = await User.findById(userId);
    if (!currentUser) {
        return res.status(400).json({
            message: 'Cannot update your profile photo, try again later',
        });
    }

    const jimpImage = await jimp.read(image).then((img) => {
        return img
            .crop(
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            )
            .getBufferAsync(jimp.AUTO);
    });

    const croppedImage = await sharp(jimpImage)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toBuffer();

    const params = {
        Bucket: `${bucketName}/uploads-${userId}`,
        Key: `profile-${userId}-${Date.now()}${
            path.extname(image).split('?')[0]
        }`,
        Body: croppedImage,
    };
    // Uploading files to the bucket
    const uploadData = await awsS3.upload(params).promise();
    await awsS3
        .deleteObject({
            Bucket: `${bucketName}/uploads-${userId}`,
            Key: currentUser.photo.split('/')[1],
        })
        .promise();
    currentUser.photo = uploadData.Key;
    await currentUser.save();

    const profileImage = await awsS3.getSignedUrlPromise('getObject', {
        Bucket: params.Bucket,
        Key: params.Key,
        Expires: 3600,
    });

    currentUser.photo = profileImage;

    res.status(200).json({
        status: 'success',
        message: 'Cover changed successfully',
        currentUser,
    });
});
