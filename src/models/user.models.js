import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
            lowercase: true,
            index: true, // for faster queries
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            maxlength: 100,
            index: true, // for faster queries
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            maxlength: 1024,

        },
        avatar: {
            type: String, // cloudinary url
            required: [true, "Avatar is required"],
        },
        coverImage: {
            type: String, // cloudinary url
        },

        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            }
        ],

        refreshToken: {
            type: String,
        }
    },
    { timestamps: true }
);

// This is pre save hook - it runs before saving the user
// It hashes the password if it is modified or new
// We use function() instead of arrow function to access 'this' as arrow functions do not bind 'this'
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// bcrypt also allows us to compare the password with the hashed password
// This method can be used to compare the password during login
// It returns a promise that resolves to true if passwords match, false otherwise
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

// Method to generate access token
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {   _id: this._id, 
            username: this.username,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d' } // Default to 1 day if not set
    );
}

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        { _id: this._id},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '10d' } // Default to 10 days if not set
    );
}

export const User = mongoose.model("User", userSchema);