import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshToken, changePassword, getUserProfile, getAllUsers, deleteUser, updateAccountDetails, updateUserAvatar, updateCoverImage } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshToken);

router.route("/change-password").put(verifyJWT, changePassword);

router.route("/profile").get(verifyJWT, getUserProfile);

router.route("/").get(verifyJWT, getAllUsers);

router.route("/:id").delete(verifyJWT, deleteUser);

router.route("/update-account").put(verifyJWT, updateAccountDetails);

router.route("/update-avatar").put(verifyJWT, upload.single("avatar"), updateUserAvatar);

router.route("/update-cover-image").put(verifyJWT, upload.single("coverImage"), updateCoverImage);

export default router;