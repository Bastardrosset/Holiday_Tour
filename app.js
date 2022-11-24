const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');

const tourRouter = require("./routes/tourRoute");
const userRouter = require("./routes/userRoute");

//Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;