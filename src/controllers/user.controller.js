import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    
    res.status(200).json({
        success: true,
        message: "User registered successfully",
        data: {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.url
        }
    });
});

export { registerUser };