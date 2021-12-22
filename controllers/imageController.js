const path = require('path');
const catchAsync = require('../utils/catchAsync');
const aws = require('aws-sdk');
const awsS3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const bucketName = process.env.AWS_BUCKET_NAME;

exports.getAllImages = catchAsync(async (req, res, next) => {
    // console.log(req.params.userId);
    // console.log(req.body);
    const params = {
        Bucket: bucketName,
        // Key: `uploads-${req.params.userId}/`,
        // Delimiter: '/',
        Prefix: `uploads-${req.params.userId}/`,
    };

    const filesData = await awsS3
        .listObjects(params)
        .promise()
        .then((tmpData) => {
            let tmpArr = [];
            for (let img of tmpData.Contents) {
                if (
                    path.extname(img.Key) === '.jpeg' ||
                    path.extname(img.Key) === '.jpg' ||
                    path.extname(img.Key) === '.gif' ||
                    path.extname(img.Key) === '.png'
                ) {
                    if (img.Key.split('/')[1].startsWith('post')) {
                        tmpArr.push(img.Key);
                    }
                }
            }
            return tmpArr;
        });
    const data = await Promise.all(
        filesData.map((file) =>
            awsS3
                .getSignedUrlPromise('getObject', {
                    Bucket: bucketName,
                    Key: file,
                })
                .then((tmpDat) => {
                    return tmpDat;
                })
        )
    );

    res.status(200).json({
        status: 'success',
        data,
    });
});
