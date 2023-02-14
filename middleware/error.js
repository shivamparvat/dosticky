const ErrorHeandler = require("../utils/errorHeandler");

module.exports = (err, rep, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal servar error";

    // mongodb error or cast error

    if(err.name == "CastError"){
        const message = `resouce not found , Invalid ${err.path}`
        err = new ErrorHeandler(400,message);
    }
    if(err.code == 11000){
        const message = `duplicate key error ${err.keyValue.number}`
        err = new ErrorHeandler(400,message);
    }
    res.status(err.statusCode).json({
        success: false,
        message:err.message,
    });
}