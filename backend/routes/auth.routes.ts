import { Router } from "express";
import upload from "../lib/multer";
import {
  checkResetOTP,
  resetPassword,
  sendResetOTP,
  sendVerificationOTP,
  signIn,
  signOut,
  signUp,
  verifyEmail,
} from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/signup", upload.single("avatar"), signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signOut);
authRouter.post("/send-verification-otp", authMiddleware, sendVerificationOTP);
authRouter.post("/verify-email", authMiddleware, verifyEmail);
authRouter.post("/send-reset-otp", sendResetOTP);
authRouter.post('/check-reset-otp', checkResetOTP)
authRouter.post("/reset-password", resetPassword);

export default authRouter;
