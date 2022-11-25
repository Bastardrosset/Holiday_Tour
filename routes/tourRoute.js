const express = require('express');
const tourController = require('../controllers/tourController')

const router = express.Router();

router.param("id", tourController.checkId);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour);

router
    .route('/:id')
    .get(tourController.getATour)
    .patch(tourController.modifyTour)
    .delete(tourController.deleteTour);


module.exports = router;