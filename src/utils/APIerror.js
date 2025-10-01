// Define a custom error class called APIError that extends the built-in JavaScript Error class
// This allows us to create standardized error objects with additional properties for API responses
class APIError extends Error {
    
    // Constructor function that gets called when creating a new APIError instance
    // It accepts parameters to customize the error details
    constructor (
        statusCode,                           // HTTP status code (e.g., 400, 404, 500)
        message= "Something went wrong",      // Error message with default fallback text
        error = [],                          // Array to store multiple error details (validation errors, etc.)
        stack = ""                           // Optional custom stack trace string
    ){
        
        // Call the parent Error class constructor with the message
        // This sets up the basic Error properties like message
        super(message);
        
        // Set the HTTP status code property (e.g., 400 for bad request, 500 for server error)
        this.statusCode = statusCode;
        
        // Store the error array (useful for validation errors with multiple issues)
        this.error = error;
        
        // Set data to null - this property can be used to include additional error context
        this.data = null;
        
        // Mark success as false - indicates this is an error response (not a successful one)
        this.success = false;
        
        // Set the stack trace property (will be overwritten below in most cases)
        this.stack = stack;

        // Check if a custom stack trace was provided
        if (stack) {
            // If custom stack provided, use it as-is
            this.stack = stack;
        }
        // If no custom stack trace provided
        else {
            // Automatically capture the current stack trace
            // captureStackTrace creates a stack trace and removes this constructor from it
            // This gives us a clean stack trace pointing to where the error was thrown
            Error.captureStackTrace(this, this.constructor);
        }
    }
}