const express = require('express');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

// data sanitization against NoSQL query injection
app.use(mongoSanitize());
// data sanitization againt XSS
app.use(xss());

app.use(cors());
app.options('*', cors());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.use(function (err, req, res, next) {
    // Check if the error is thrown from multer
    if (err instanceof multer.MulterError) {
        res.statusCode = 400;
        res.send({ code: err.code });
    } else if (err) {
        // If it is not multer error then check if it is our custom error for FILE_MISSING & INVALID_TYPE
        if (err.message === 'FILE_MISSING' || err.message === 'INVALID_TYPE') {
            res.statusCode = 400;
            res.send({ code: err.message });
        } else {
            //For any other errors set code as GENERIC_ERROR
            res.statusCode = 500;
            res.send({ code: 'GENERIC_ERROR' });
        }
    }
});

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '/client/build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });

module.exports = app;
