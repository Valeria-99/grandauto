import express from "express";
import { getCars, getUserData, loginUser, registerUser, updateUserImage } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserData);
userRouter.get('/cars', getCars);
userRouter.post('/update-image', protect, upload.single('image'), updateUserImage);

export default userRouter;