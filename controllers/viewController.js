const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');


module.exports.getOverview = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    const tours = await Tour.find();

    // 2) Build template

    // 3) Render that template using tour data from 1)
    res.status(200).render('overview', {
        title: 'All Tours',
        tours
    });
});

module.exports.getTour = catchAsync(async (req, res, next) => {
    // 1) Get the data for the requested tour (including reviews and guides)
    const tour = await Tour.findOne({slug: req.params.slug}).populate({
        path: 'reviews',
        fields: 'review rating user'
    });
    // 2) Build template

    // 3) Render template using data from 1
    res.status(200)
    .set(
        'Content-Security-Policy',
        'connect-src https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com'
      )
    .render('tour', {
        title: `${tour.name} Tour`,
        tour
    });
});

module.exports.getLoginForm = (req, res) => {
    res
    .status(200)
    .set(
        'Content-Security-Policy',
        "connect-src 'self' https://cdnjs.cloudflare.com"
      )
      .render('login', {
        title: 'Log into your account',
    });
};

module.exports.getSignUpForm = (req, res) => {
    res
    .status(200)
    .set(
        'Content-Security-Policy',
        "connect-src 'self' https://cdnjs.cloudflare.com"
      )
    .render('signup', {
        title: `Create New Account`
    });
};

module.exports.getAccount = (req, res) => {
    res
    .status(200)
    .render('account', {
      title: 'Your account'
    });
  };