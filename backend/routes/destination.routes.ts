import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";
import upload from "../lib/multer";
import {
  createDestination,
  deleteDestination,
  getDestination,
  getDestinations,
  updateDestination,
} from "../controllers/destination.controller";

const destinationRouter = Router();

destinationRouter.get("/get-destinations", getDestinations);
destinationRouter.get("/:id", authMiddleware, adminMiddleware, getDestination);
destinationRouter.post(
  "/create-destination",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createDestination,
);
destinationRouter.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateDestination,
);
destinationRouter.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteDestination,
);

export default destinationRouter;
