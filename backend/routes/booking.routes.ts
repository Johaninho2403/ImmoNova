import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
  bookingDecision,
  cancelBooking,
  createBooking,
  getBooking,
  getPayment,
} from "../controllers/booking.controller";

const bookingRouter = Router();

bookingRouter.get("/:id", authMiddleware, getBooking);
bookingRouter.get("/get-payment", getPayment);
bookingRouter.post("/create-booking", authMiddleware, createBooking);
bookingRouter.patch("/cancel-booking/:id", authMiddleware, cancelBooking);
bookingRouter.patch("/decision/:id", authMiddleware, bookingDecision);

export default bookingRouter;
