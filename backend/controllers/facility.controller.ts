import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import cloudinary from "../lib/cloudinary";
import redis from "../lib/redis";
import validator from "validator";

export const getFacilities = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const facilities = await redis.get("facilities");

    res.status(200).json({
      success: true,
      facilities: JSON.parse(String(facilities)),
    });
  },
);

export const getFacility = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid id");
    }

    const facility = await prisma.facility.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!facility) {
      throw new Error("Facility not found");
    }

    res.status(200).json({
      success: true,
      facility,
    });
  },
);

export const createFacility = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const file = req.file;

    if (!name.trim()) {
      throw new Error("The name of the facility is required");
    }

    if (!file) {
      throw new Error("You must provide an image form the facility");
    }

    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".avif",
      ".webp",
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

    const facility = await prisma.facility.create({
      data: {
        name,
        image: result.secure_url,
      },
    });

    const facilities = await prisma.facility.findMany();

    await redis.set("facilities", JSON.stringify(facilities));

    res.status(201).json({
      success: true,
      message: "Facility created successfully!",
    });
  },
);

export const toggleIsPopular = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid id");
    }

    const facility = await prisma.facility.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!facility) {
      throw new Error("Facility not found");
    }

    await prisma.facility.update({
      where: {
        id: String(id),
      },
      data: {
        isPopular: !facility.isPopular,
      },
    });

    const popularFacilities = await prisma.facility.findMany({
      where: {
        isPopular: true,
      },
    });

    await redis.set("popularFacilities", JSON.stringify(popularFacilities));

    const facilities = await prisma.facility.findMany();

    await redis.set("facilities", JSON.stringify(facilities));

    res.status(200).json({
      success: true,
      message: "Facility's popularity toggled",
    });
  },
);

export const getPopularFacilities = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let popularFacilities = await redis.get("popularFacilities");

    if (!popularFacilities) {
      popularFacilities = await prisma.facility.findMany({
        where: {
          isPopular: true,
        },
      });

      await redis.set("popularFacilities", JSON.stringify(popularFacilities));
      return res.status(200).json({
        success: true,
        popularFacilities,
      });
    }

    res.status(200).json({
      success: true,
      popularFacilities: JSON.parse(popularFacilities),
    });
  },
);

export const updateFacility = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid id");
    }

    const file = req.file;
    const data = { ...req.body };

    let result;

    if (file) {
      result = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
      });
      data.image = result.secure_url;
    }

    await prisma.facility.update({
      where: {
        id: String(id),
      },
      data,
    });

    const facilities = await prisma.facility.findMany();

    await redis.set("facilities", JSON.stringify(facilities));

    res.status(200).json({
      success: true,
      message: "Facility updated successfully!",
    });
  },
);

export const deleteFacility = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid id!");
    }

    const facility = await prisma.facility.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!facility) {
      throw new Error("Facility not found!");
    }

    await prisma.facility.delete({
      where: {
        id: String(id),
      },
    });

    const facilities = await prisma.facility.findMany();

    await redis.set("facilities", JSON.stringify(facilities));

    res.status(200).json({
      success: true,
      message: "Facility updated successfully!",
    });
  },
);
