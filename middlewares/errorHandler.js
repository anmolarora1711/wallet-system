const { NODE_ENV } = require('../config/constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

const errorResponse = {
    error: message,
  };

  if (err.details) {
    errorResponse.details = err.details;
  }

  if (NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
