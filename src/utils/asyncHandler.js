// Higher-order function to handle async errors in Express routes
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((error) => {
                next(error);
            });
    };
};

export default asyncHandler;


//
// This is a higher-order function that takes an asynchronous function (fn) as an argument and returns a new function.
// The returned function takes the standard Express middleware parameters: req, res, and next.
// It ensures that any errors thrown in the asynchronous function are caught and passed to the next middleware (usually an error handler).
// This helps to avoid repetitive try-catch blocks in each async route handler.
// Usage example:
// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next); // Call the original async function
//   } catch (error) {
//        // If an error occurs, pass it to the next middleware (error handler)
//        res.status(error.code || 500).json({
//        res.status(error.code || 500).json({
//         success: false,
//         error: error.message || "Internal Server Error"
//        });
//   }
// }


