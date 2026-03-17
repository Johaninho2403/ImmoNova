import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import categoryRouter from "./routes/category.routes";
import facilityRouter from "./routes/facility.routes";
import propertyRouter from "./routes/property.routes";
import destinationRouter from "./routes/destination.routes";
import bookingRouter from "./routes/booking.routes";
import webhookRouter from "./routes/webhook.routes";
import { Request, Response, NextFunction } from "express";
import reviewsRouter from "./routes/reviews.routes";
import asyncHandler from "express-async-handler";
import prisma from "./lib/prisma";
import authMiddleware from "./middlewares/auth.middleware";
import adminMiddleware from "./middlewares/admin.middleware";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [String(process.env.FRONTEND_URL), String(process.env.ADMIN_URL)],
    credentials: true,
  }),
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/facility", facilityRouter);
app.use("/api/v1/property", propertyRouter);
app.use("/api/v1/destination", destinationRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/review", reviewsRouter);
app.use("/api/v1/webhook", webhookRouter);

app.get(
  "/api/v1/dashboard-data",
  authMiddleware,
  adminMiddleware,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const users = await prisma.user.count();
    const categories = await prisma.category.count();
    const facilities = await prisma.facility.count();
    const destinations = await prisma.destination.count();

    res.status(200).json({
      success: true,
      users,
      categories,
      facilities,
      destinations,
    });
  }),
);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
