const sendErrorDev = (res, req) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (req, res) => {

    // Operational; trusted error send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });

        // Programming or other unknow error don't leak error details
    } else {
        // 1) Log error
        console.error('ERROR', err);

        // 2) Send generic error
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong !'
        })
    }
};

module.exports = (err, req, res, next) => {
    //console.log(err.stack);

    err.status = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'developpement') {
        sendErrorDev(req, res);
        
    } else if (process.env.NODE_ENV === 'production') {
        sendErrorProd(req, res);
    }
};