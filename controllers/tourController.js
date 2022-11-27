const Tour = require('../models/tourModel');

module.exports.getAllTours = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        // result: tours.length,
        // data: {
        //     tours
        // }
    });
};
module.exports.getATour = (req, res) => {

    const id = req.params.id * 1;

    // const tour = tours.find(el => el.id === id);

    // res.status(200).json({
    //     status: 'success',
    //     result: tours.length,
    //     data: {
    //         tour
    //     }
    // });
};
module.exports.createTour = async (req, res) => {

    try {
        // const newTours = new Tour({});
        // newTours.save();
        const newTour = await Tour.create(req.body)
    
        res.status(200).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    } catch(error){
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent'
        })
    }
};
module.exports.modifyTour = (req, res) => {
    
    res.status(200).json({
        status: "success",
        data: {
            tour: "<Update tour here...>"
        }
    });
};
module.exports.deleteTour = (req, res) => {
    
    res.status(204).json({
        status: "success",
        data: null
    });
};