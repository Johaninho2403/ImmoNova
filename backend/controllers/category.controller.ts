import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import redis from "../lib/redis";
import cloudinary from "../lib/cloudinary";
import validator from "validator";

export const getCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let categories = await redis.get("categories");

    if (!categories) {
      categories = await prisma.category.findMany();

      await redis.set("categories", JSON.stringify(categories));
      return res.status(200).json({
        success: true,
        categories,
      });
    }

    res.status(200).json({
      success: true,
      categories: JSON.parse(categories),
    });
  },
);

export const getCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid id");
    }

    const category = await prisma.category.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!category) {
      throw new Error("Category not found!");
    }

    res.status(200).json({
      success: true,
      category,
    });
  },
);

export const createCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const file = req.file;

    if (!name.trim()) {
      throw new Error("You must provide a name for the category");
    }

    if (!file) {
      throw new Error("You must provide a picture for the category");
    }

    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".webp",
      ".avif",
      ".png",
      ".gif",
    ];

    const ext = file.originalname
      .toLowerCase()
      .slice(file.originalname.lastIndexOf("."));

    if (!allowedExtensions.includes(ext)) {
      throw new Error("File extension not allowed!");
    }

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "image",
    });

    await prisma.category.create({
      data: {
        name,
        image: result.secure_url,
      },
    });

    const categories = await prisma.category.findMany();

    await redis.set("categories", JSON.stringify(categories));

    res.status(201).json({
      success: true,
      message: "Category created successfully!",
    });
  },
);

export const toggleIsPopular = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid id");
    }

    const category = await prisma.category.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!category) {
      throw new Error("Category not found!");
    }

    await prisma.category.update({
      where: {
        id: String(id),
      },
      data: {
        isPopular: !category.isPopular,
      },
    });

    const popularCategories = await prisma.category.findMany({
      where: {
        isPopular: true,
      },
    });

    await redis.set("popularCategories", JSON.stringify(popularCategories));

    const categories = await prisma.category.findMany();

    await redis.set("categories", JSON.stringify(categories));

    res.status(200).json({
      success: true,
      message: "Category's popularity toggled",
    });
  },
);

export const getPopularCategories = asyncHandler(
  async (req: Request, res: Response, Next: NextFunction) => {
    let popularCategories = await redis.get("popularCategories");

    if (!popularCategories) {
      popularCategories = await prisma.category.findMany({
        where: {
          isPopular: true,
        },
      });

      await redis.set(
        "popularCategories",
        JSON.parse(String(popularCategories)),
      );

      return res.status(200).json({
        success: true,
        popularCategories,
      });
    }

    res.status(200).json({
      success: true,
      popularCategories: JSON.parse(String(popularCategories)),
    });
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid id");
    }

    const file = req.file;
    let result;

    if (file) {
      result = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
      });
    }

    const data = { ...req.body };
    if (file) {
      data.image = result?.secure_url;
    }

    await prisma.category.update({
      where: {
        id: String(id),
      },
      data,
    });

    const categories = await prisma.category.findMany();

    await redis.set("categories", JSON.stringify(categories));

    res.status(200).json({
      success: true,
      message: "Category updated successfully!",
    });
  },
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid id");
    }

    await prisma.category.delete({
      where: {
        id: String(id),
      },
    });

    const categories = await prisma.category.findMany();

    await redis.set("categories", JSON.stringify(categories));

    res.status(200).json({
      success: true,
      message: "Category deleted successfully!",
    });
  },
);
