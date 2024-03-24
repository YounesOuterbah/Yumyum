import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
  getUserProfile,
} from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
