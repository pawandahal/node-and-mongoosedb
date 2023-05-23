const ErrorHandler = require("../utils/errorHandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  //wrong mongodb id error
  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //mongoose duplicate key error
  if (err.code === 11000) {
    const message = `duplicate ${object.keys(err.keyvalue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //wrong JWT error
  if (err.name === "jsonwebTokenError") {
    const message = `Json web token is invalid,try again`;
    err = new ErrorHandler(message, 400);
  }

  //JWT Expire Error

  if (err.name === "TokenExpireError") {
    const message = `Json web token is Expire,try again`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    error: err.stack,
    message: err.message,
  });
};
