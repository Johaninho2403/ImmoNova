import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { getUserInfo } from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/user-info', authMiddleware, getUserInfo)

export default userRouter