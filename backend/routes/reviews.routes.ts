import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
  createReview,
  deleteReview,
  updateReview,
} from "../controllers/reviews.controller";

const reviewsRouter = Router();

reviewsRouter.post("/create-review", authMiddleware, createReview);
reviewsRouter.patch("/:id", authMiddleware, updateReview);
reviewsRouter.delete("/:id", authMiddleware, deleteReview);

export default reviewsRouter;
