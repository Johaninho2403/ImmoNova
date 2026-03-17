import { Router } from "express";
import upload from "../lib/multer";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";
import {
  addImages,
  createProperty,
  deleteImages,
  deleteProperty,
  getPopularProperties,
  getProperties,
  getProperty,
  updateFacilities,
  updateInformations,
} from "../controllers/property.controller";

const propertyRouter = Router();

propertyRouter.get("/get-properties", getProperties);
propertyRouter.get("/popular-properties", getPopularProperties)
propertyRouter.get("/:id", getProperty);
propertyRouter.post(
  "/create-property",
  authMiddleware,
  adminMiddleware,
  upload.array("images"),
  createProperty,
);
propertyRouter.patch(
  "/add-images/:id",
  authMiddleware,
  upload.array("images"),
  addImages,
);
propertyRouter.patch(
  "/update-informations/:id",
  authMiddleware,
  updateInformations,
);
propertyRouter.patch(
  "/update-facilities/:id",
  authMiddleware,
  updateFacilities,
);
propertyRouter.delete("/delete-property", authMiddleware, deleteProperty);
propertyRouter.delete("/delete-images/:id", authMiddleware, deleteImages);

export default propertyRouter;
