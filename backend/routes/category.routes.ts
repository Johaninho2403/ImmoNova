import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import adminMiddleware from "../middlewares/admin.middleware";
import upload from "../lib/multer";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  getPopularCategories,
  toggleIsPopular,
  updateCategory,
} from "../controllers/category.controller";

const categoryRouter = Router();

categoryRouter.post(
  "/create-category",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createCategory,
);
categoryRouter.get("/get-categories", getCategories);
categoryRouter.get("/popular-categories", getPopularCategories);
categoryRouter.get("/:id", authMiddleware, adminMiddleware, getCategory);
categoryRouter.patch(
  "/toggle-popularity/:id",
  authMiddleware,
  adminMiddleware,
  toggleIsPopular,
);
categoryRouter.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateCategory,
);
categoryRouter.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);

export default categoryRouter;
