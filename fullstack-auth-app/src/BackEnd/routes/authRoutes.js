import express from "express";
import { signup, verifyEmail } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/verify-email", verifyEmail);

export default router;
