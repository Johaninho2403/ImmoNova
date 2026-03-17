import { Router } from "express";
import upload from "../lib/multer";
import {
  createFacility,
  deleteFacility,
  getFacilities,
  getFacility,
  getPopularFacilities,
  toggleIsPopular,
  updateFacility,
} from "../controllers/facility.controller";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";

const facilityRouter = Router();

facilityRouter.get("/get-facilities", getFacilities);
facilityRouter.get("/popular-facilities", getPopularFacilities);

facilityRouter.get("/:id", authMiddleware, adminMiddleware, getFacility);
facilityRouter.post("/create-facility", upload.single("image"), createFacility);
facilityRouter.patch(
  "/toggle-popularity/:id",
  authMiddleware,
  adminMiddleware,
  toggleIsPopular,
);

facilityRouter.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateFacility,
);
facilityRouter.delete("/:id", authMiddleware, adminMiddleware, deleteFacility);

export default facilityRouter;
