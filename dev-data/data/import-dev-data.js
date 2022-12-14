const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

const dotenv = require('dotenv');
dotenv.config({
    path: './service/config.env'
});

const uri = process.env.DATABASE_ACCESS.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connection successful !'))
    .catch(() => console.log('MongoDB connection failed !'));

//Read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

//Import data into Base de donnée
const importData = async () => {

    try {
        await Tour.create(tours);
        await User.create(users, { validateBeforeSave: false });
        await Review.create(reviews);
        console.log('Data successfuly loaded !');
    } catch (error) {
        console.log(error);
    }
    process.exit();
};

//Delete all data from base de donnée
const deleteData = async () => {

    try {
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log('Data successfuly deleted');
    } catch (error) {
        console.log(error);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
};
