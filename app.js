const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');

const tourRouter = require("./routes/tourRoute");
const userRouter = require("./routes/userRoute");

//Middleware
if (process.env.NODE_ENV === "developpement") {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

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