import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import APIError from "../utils/APIerror.js";
import APIResponse from "../utils/ApiRespone.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

// Helper function to generate access and refresh tokens, save refresh token to user document
// and return both tokens
const generateAccessTokenandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId); // Fetch user from DB using userId
        const accessToken = user.generateAccessToken(); // Generate access token using user method
        const refreshToken = user.generateRefreshToken(); // Generate refresh token using user method

        // Save the refresh token to the user document in the database - why we save it?
        // This allows us to verify the refresh token later during token refresh requests
        // It also helps in invalidating tokens during logout or if a token is compromised
        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken, refreshToken };
    } catch (error) {
        throw new APIError(500, "Token generation failed");
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists - username, email should be unique
    // check for images, check for avatar
    // upload image to cloudinary - avatar
    // create user object - save to db
    // remove password and refresh token before sending response
    // check for user creation
    // return response

    const { fullName, username, email, password } = req.body;

    if (
        [username, email, password].some((field) => field.trim() === '')
    ) {
        throw new Error(400, "All fields are required");
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
        throw new APIError(409, "User already exists");
    }

    const avatarLocalFilePath = req.files?.avatar[0]?.path;
    if (!avatarLocalFilePath) {
        throw new APIError(400, "Avatar is required");
    }

    const coverImageLocalFilePath = req.files?.coverImage?.[0]?.path;

    const avatar = await uploadOnCloudinary(avatarLocalFilePath);
    const coverImage = coverImageLocalFilePath ? await uploadOnCloudinary(coverImageLocalFilePath) : undefined;

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new APIError(500, "User creation failed");
    }

    return res.status(201).json(new APIResponse(201, "User created successfully", createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
    // get email and password from req.body
    // validation - not empty
    // find user by email
    // password comparison
    // if all ok, generate access token and refresh token
    // send cookie and response

    const { email, username, password } = req.body;

    if ([email, username, password].some((field) => field.trim() === '')) {
        throw new APIError(400, "All fields are required");
    }

    const user = await User.findOne(
        {
            $or: [{ email }, { username }]
        }
    );

    if (!user) {
        throw new APIError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new APIError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessTokenandRefreshToken(user._id);

    const loggedinUser = await User.findById(user._id).select("-password -refreshToken");

    // send http only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
    });

    return res.status(200).json(new APIResponse(200, "Login successful", { user: loggedinUser, accessToken, refreshToken }));

})

const logoutUser = asyncHandler(async (req, res) => {
    // we need to clear cookie on the client side
    // we need to reset refresh token in db model
    // also need to remove refresh token from db
    // but how we will identify the user? - we cant go and ask the user to send email or username again
    // we will build an auth middleware that will verify access token and set req.user
    // we will use that req.user to identify the user and remove refresh token from db

    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: 1 } // remove refreshToken field from document - why 1? because we want to remove the field, not set it to null
    },
        { new: true } // return the updated document
    );

    // clear cookie
    const options = {
        httpOnly: true,
        secure: true,
    }

    res.status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options) // in case you stored access token in cookie
        .json(new APIResponse(200, "Logout successful"));
})

const refreshToken = asyncHandler(async (req, res) => {
    // get refresh token from cookie or body
    // validation - not empty
    // verify refresh token
    // find user by id and refresh token
    // validate - user should exist, refresh token should match
    // generate new access token and refresh token
    // save new refresh token to db
    // send new tokens in response

    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    // console.log("Incoming refresh token:", incomingRefreshToken);

    if ([incomingRefreshToken].some((field) => field.trim() === '')) {
        throw new APIError(400, "Refresh token is required");
    }

    // console.log("Verifying refresh token...");

    try {
        // console.log('hi')
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        // console.log(decoded);
        if (!decoded) {
            throw new APIError(401, "Invalid refresh token");
        }
        // console.log(decoded);


        const user = await User.findById(decoded?._id);
        // console.log(user)
        if (!user || user.refreshToken !== incomingRefreshToken) {
            throw new APIError(401, "Invalid refresh token");
        }

        const options = {
            httpOnly: true,
            secure: true,
        }

        const { accessToken, newRefreshToken } = await generateAccessTokenandRefreshToken(user._id);

        res.status(200)
            .cookie("refreshToken", newRefreshToken, options) // set new refresh token in cookie
            .cookie("accessToken", accessToken, options) // in case you want to store access token in cookie
            .json(new APIResponse(200, "Token refreshed successfully", { accessToken, newRefreshToken }));

    } catch (error) {
        throw new APIError(401, "refresh token expired" || error?.message);
    }

});


export { registerUser, loginUser, logoutUser, refreshToken };