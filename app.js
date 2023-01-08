const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const reviewRouter = require('./routes/reviewRoute');
const viewRouter = require('./routes/viewRoute');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());

// 1) Global Middleware
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Developpement logging
if (process.env.NODE_ENV === 'developpement') {
    app.use(morgan('dev'));
}

// Limit request from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour !'
});
app.use('/api', limiter);

// Body parser, reading data from body into, req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitize against NoSQL query injection
app.use(mongoSanitize());

// Data sanitize against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
    whitelist: [
        'duration',
        'ratingsAverage',
        'ratingsQuantity',
        'maxGroupSize',
        'difficulty',
        'price'
    ]
}));

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.cookies)
    next();
});

// 3) ROUTES

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
});

app.use(globalErrorHandler); 

module.exports = app;