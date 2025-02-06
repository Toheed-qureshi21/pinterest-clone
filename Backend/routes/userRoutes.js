import express from "express";
import { anotherUserProfile, followAndUnfollowUser, loginUser, logoutUser, registerUser, userProfile } from "../controllers/userControllers.js";
import { isAuth } from "../middlewares/Auth.js";
const router = express.Router();
router.post('/register',registerUser)
router.post('/login',loginUser);
// Logout
router.get('/logout',isAuth,logoutUser);
// Apni profile  ka route
router.get('/me',isAuth,userProfile);
// Dusro ki profile
router.get("/:id",isAuth,anotherUserProfile);
// Follow and unfollow
router.post('/follow/:id',isAuth,followAndUnfollowUser);

export default router;