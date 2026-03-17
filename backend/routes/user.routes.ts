import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
  getHostBookings,
  getUserInfo,
  isAuth,
  saveProperty,
  updateProfile,
} from "../controllers/user.controller";
import adminMiddleware from "../middlewares/admin.middleware";

const userRouter = Router();
userRouter.get("/host-bookings", authMiddleware, getHostBookings);
userRouter.get("/tenant-bookings", authMiddleware, getHostBookings);
userRouter.get("/user-info", authMiddleware, getUserInfo);
userRouter.get("/is-auth", authMiddleware, isAuth);
userRouter.post("/save-property/:id", authMiddleware, saveProperty);
userRouter.patch("/update-profile", authMiddleware, updateProfile);

export default userRouter;
