import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import validator from "validator";

const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("No token provided");
    }

    if (!validator.isJWT(token)) {
      throw new Error("Invalid JWT token");
    }

    const { userId } = jwt.verify(token, String(process.env.JWT_SECRET_KEY));

    if (!validator.isUUID(userId)) {
      throw new Error("Invalid id");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        bookings: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  },
);

export default authMiddleware;
