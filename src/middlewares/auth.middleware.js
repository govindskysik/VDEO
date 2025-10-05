import asyncHandler from '../utils/asyncHandler.js';
import APIError from "../utils/APIerror.js";
import {User} from '../models/user.models.js';
import jwt from 'jsonwebtoken';

// Middleware to protect routes - only authenticated users can access

export const verifyJWT = asyncHandler(async (req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];
        if(!token) {
            throw new APIError(401, "Unauthorized - No token provided");
        }

        // console.log("Token:", token); // Debugging line to check the token value

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!decoded) {
            throw new APIError(401, "Unauthorized - Invalid token");
        }

        // console.log("Decoded JWT:", decoded); // Debugging line to check the decoded token

        const user = await User.findById(decoded?._id).select("-password -refreshToken");
        if(!user) {
            throw new APIError(401, "Unauthorized - User not found");
        }

        req.user = user; // Attach user to request object - this will be available in the next middleware or route handler
        next();
    } catch (error) {
        console.error("Error in verifyJWT middleware:", error);
        throw new APIError(401, "Unauthorized - Invalid token");
    }
})

