import asyncHandler from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js";
import APIError from "../utils/APIerror.js";
import APIResponse from "../utils/ApiRespone.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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

    const {fullName, username, email, password } = req.body;

    if(
        [username, email, password].some((field) => field.trim() === '')
    )
        {
            throw new Error(400, "All fields are required");
        }

    const existingUser = await User.findOne({ $or: [{username}, {email}] });

    if(existingUser) {
        throw new APIError(409, "User already exists");
    }
    
    const avatarLocalFilePath = req.files?.avatar[0]?.path;
    if(!avatarLocalFilePath) {
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

    if(!createdUser) {
        throw new APIError(500, "User creation failed");
    }

    return res.status(201).json(new APIResponse(201, "User created successfully", createdUser));
});

export { registerUser };