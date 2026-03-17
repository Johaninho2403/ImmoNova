import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import validator from "validator";
import prisma from "../lib/prisma";
import cloudinary from "../lib/cloudinary";
import redis from "../lib/redis";

export const getDestinations = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let destinations = await redis.get("destinations");

    if (!destinations) {
      destinations = await prisma.destination.findMany();

      await redis.set("destinations", JSON.stringify(destinations));

      return res.status(200).json({
        success: true,
        destinations,
      });
    }

    res.status(200).json({
      success: true,
      destinations: JSON.parse(destinations),
    });
  },
);

export const getDestination = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid id!");
    }

    const destination = await prisma.destination.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!destination) {
      throw new Error("Destination not found");
    }

    res.status(200).json({
      success: true,
      destination,
    });
  },
);

export const createDestination = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { city } = req.body;
    const file = req.file;

    if (!city.trim()) {
      throw new Error("The city of the destination is required!");
    }

    if (!file) {
      throw new Error("You must provide a picture for this destination!");
    }

    const existingDestination = await prisma.destination.findUnique({
      where: {
        city: String(city),
      },
    });

    if (existingDestination) {
      throw new Error("A destination for this city already exists!");
    }

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "image",
    });

    const destination = await prisma.destination.create({
      data: {
        city: city[0].toUpperCase() + city.slice(1),
        image: result.secure_url,
      },
    });

    const destinations = await prisma.destination.findMany();

    await redis.set("destinations", JSON.stringify(destinations));

    res.status(201).json({
      success: true,
      message: "Destination created Successfully!",
    });
  },
);

export const updateDestination = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const file = req.file;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid id!");
    }

    const destination = await prisma.destination.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!destination) {
      throw new Error("Destination not found!");
    }

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

    await prisma.destination.update({
      where: {
        id: String(id),
      },
      data,
    });

    const destinations = await prisma.destination.findMany();

    await redis.set("destinations", JSON.stringify(destinations));

    res.status(200).json({
      success: true,
      message: "Destination updated Succesfully!",
    });
  },
);

export const deleteDestination = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invali Id!");
    }

    const destination = await prisma.destination.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!destination) {
      throw new Error("Destination not found!");
    }

    await prisma.destination.delete({
      where: {
        id: String(id),
      },
    });

    const destinations = await prisma.destination.findMany();

    await redis.set("destinations", JSON.stringify(destinations));

    res.status(200).json({
      success: true,
      message: "Destination deleted successfully!",
    });
  },
);
