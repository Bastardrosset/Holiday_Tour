const fs = require("fs");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

module.exports.getAllTours = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        result: tours.length,
        data: {
            tours
        }
    });
};
module.exports.getATour = (req, res) => {

    const id = req.params.id * 1;

    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    };

    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tour
        }
    });
};
module.exports.createTour = (req, res) => {

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({
        id: newId
    }, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(200).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
};
module.exports.modifyTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        });
    }
    res.status(200).json({
        status: "success",
        data: {
            tour: "<Update tour here...>"
        }
    });
};
module.exports.deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        });
    }
    res.status(204).json({
        status: "success",
        data: null
    });
};