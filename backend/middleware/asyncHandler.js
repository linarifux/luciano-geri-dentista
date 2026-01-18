/**
 * Wraps async functions to catch errors and pass them to express error middleware
 * This replaces the need for repeated try-catch blocks in controllers.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;