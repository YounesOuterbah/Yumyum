import express from "express";
const router = express.Router();
import { registerUser, loginUser } from "../controllers/authController";

router.get("/register", registerUser);
router.get("/login", loginUser);

export default router;
