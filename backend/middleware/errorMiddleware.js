/**
 * Global Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  // If the status code is 200 but we are in the error handler, set it to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for Mongoose bad ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = `Risorsa non trovata`;
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    // Include stack trace only in development mode for debugging
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { errorHandler };