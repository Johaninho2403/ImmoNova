import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import validator from "validator";
import cloudinary from "../lib/cloudinary";

export const getUserInfo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    });
  },
);

export const saveProperty = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid id!");
    }

    const property = await prisma.property.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!property) {
      throw new Error("Property not found!");
    }

    const savedProperty = await prisma.savedProperty.findUnique({
      where: {
        like: {
          propertyId: String(id),
          userId: user.id,
        },
      },
    });

    if (savedProperty) {
      await prisma.savedProperty.delete({
        where: {
          like: {
            propertyId: String(id),
            userId: user.id,
          },
        },
      });
    } else {
      await prisma.savedProperty.create({
        data: {
          propertyId: String(id),
          userId: user.id,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: !savedProperty
        ? "Property added to whishlist"
        : "Property removed from wishlist",
    });
  },
);

export const isAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
    });
  },
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const data = {};
    if (req.body.name.trim()) {
      data.name = req.body.name;
    }

    const file = req.file;

    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
      });
      data.avatar = result.secure_url;
    } else {
      data.avatar = null;
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
    });
  },
);

export const getTenantBookings = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    res.status(200).json({
      success: true,
      bookings: user.bookings,
    });
  },
);

export const getHostBookings = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    const bookings = await prisma.booking.findMany({
      where: {
        property: {
          hostId: user.id,
        },
      },
      include: {
        property: {
          include: {
            images: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      bookings,
    });
  },
);
