const ErrorHeandler = require("../utils/errorHeandler");

module.exports = (err, rep, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal servar error";

  // mongodb error or cast error
  console.log(err);
  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHeandler(400, message);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHeandler(400, message);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHeandler(400, message);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
