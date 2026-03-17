import { Router } from "express";
import upload from "../lib/multer";
import {
  adminSignIn,
  checkResetOTP,
  isAdmin,
  resetPassword,
  sendResetOTP,
  sendVerificationOTP,
  signIn,
  signOut,
  signUp,
  verifyEmail,
} from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";

const authRouter = Router();

authRouter.get('/is-admin', authMiddleware, adminMiddleware, isAdmin)
authRouter.post("/signup", upload.single("avatar"), signUp);
authRouter.post("/signin", signIn);
authRouter.post('/signin-admin', adminSignIn)
authRouter.post("/signout", signOut);
authRouter.post("/send-verification-otp", authMiddleware, sendVerificationOTP);
authRouter.post("/verify-email", authMiddleware, verifyEmail);
authRouter.post("/send-reset-otp", sendResetOTP);
authRouter.post("/check-reset-otp", checkResetOTP);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
