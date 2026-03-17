import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import validator from "validator";

export const createReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      text,
      facilities,
      staff,
      cleanliness,
      comfort,
      valueForMoney,
      geographicSituation,
      propertyId,
    } = req.body;

    const { user } = req;

    if (!validator.isUUID(String(propertyId))) {
      throw new Error("Invalid property Id!");
    }

    if (!text) {
      throw new Error("You must provide a text to your review");
    }

    if (
      Number.isNaN(facilities) ||
      Number.isNaN(staff) ||
      Number.isNaN(cleanliness) ||
      Number.isNaN(comfort) ||
      Number.isNaN(valueForMoney) ||
      Number.isNaN(geographicSituation)
    ) {
      throw new Error(
        "Facilities, staff, cleanliness, comfort, value for money and geographic situation rates must be numbers!",
      );
    }

    if (
      Number(facilities) < 0 ||
      Number(staff) < 0 ||
      Number(cleanliness) < 0 ||
      Number(comfort) < 0 ||
      Number(valueForMoney) < 0 ||
      Number(geographicSituation) < 0
    ) {
      throw new Error("Rates can not be less than 0");
    }

    if (
      Number(facilities) > 5 ||
      Number(staff) > 5 ||
      Number(cleanliness) > 5 ||
      Number(comfort) > 5 ||
      Number(valueForMoney) > 5 ||
      Number(geographicSituation) > 5
    ) {
      throw new Error("Rates can not be more than 5");
    }

    const ratesSum =
      Number(staff) +
      Number(facilities) +
      Number(cleanliness) +
      Number(valueForMoney) +
      Number(geographicSituation) +
      Number(comfort);

    const rate = Number((ratesSum / 6).toFixed(2));

    const bookings = await prisma.booking.findMany({
      where: {
        propertyId,
        tenantId: user.id,
        OR: [
          {
            status: "ACCEPTED",
          },
          {
            status: "COMPLETED",
          },
        ],
        checkIn: {
          lte: new Date(Date.now()),
        },
      },
    });

    if (bookings.length === 0) {
      throw new Error(
        "You must book this property at least once before adding a review!",
      );
    }

    const review = await prisma.review.create({
      data: {
        text,
        staff: Number(staff),
        comfort: Number(comfort),
        facilities: Number(facilities),
        geographicSituation: Number(geographicSituation),
        valueForMoney: Number(valueForMoney),
        cleanliness: Number(cleanliness),
        propertyId: String(propertyId),
        authorId: user.id,
        rate,
      },
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully!",
      review,
    });
  },
);

export const updateReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid id!");
    }

    const review = await prisma.review.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!review) {
      throw new Error("Review not found!");
    }

    if (review.authorId !== user.id) {
      throw new Error("You are not allowed to update this review!");
    }

    const data = {};

    if (req.body.text) {
      data.text = req.body.text;
    }

    if (
      !Number.isNaN(req.body.staff) &&
      req.body.staff > 0 &&
      req.body.staff <= 5
    ) {
      data.staff = req.body.staff;
    }

    if (
      !Number.isNaN(req.body.facilities) &&
      req.body.facilities > 0 &&
      req.body.facilities <= 5
    ) {
      data.facilities = req.body.facilities;
    }

    if (
      !Number.isNaN(req.body.cleanliness) &&
      req.body.cleanliness > 0 &&
      req.body.cleanliness <= 5
    ) {
      data.cleanliness = req.body.cleanliness;
    }

    if (
      !Number.isNaN(req.body.cleanliness) &&
      req.body.cleanliness > 0 &&
      req.body.cleanliness <= 5
    ) {
      data.cleanliness = req.body.cleanliness;
    }

    if (
      !Number.isNaN(req.body.geographicSituation) &&
      req.body.geographicSituation > 0 &&
      req.body.geographicSituation <= 5
    ) {
      data.geographicSituation = req.body.geographicSituation;
    }

    if (
      !Number.isNaN(req.body.comfort) &&
      req.body.comfort > 0 &&
      req.body.comfort <= 5
    ) {
      data.comfort = req.body.comfort;
    }

    const newReview = await prisma.review.update({
      where: {
        id: String(id),
      },
      data,
    });

    const rate = Number(
      (
        newReview.staff +
        newReview.facilities +
        newReview.facilities +
        newReview.geographicSituation +
        newReview.comfort +
        newReview.valueForMoney
      ).toFixed(2),
    );

    await prisma.review.update({
      where: {
        id: String(id),
      },
      data: {
        rate,
      },
    });

    res.status(200).json({
      success: true,
      message: "Review updated successfully!!",
    });
  },
);

export const deleteReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid Id!");
    }

    const review = await prisma.review.findUnique({
      where: {
        id: String(id),
      },
    });

    if (review?.authorId !== user.id) {
      throw new Error("You are not allowed to delete this review");
    }

    await prisma.review.delete({
      where: {
        id: String(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Review deleted successfully!",
    });
  },
);
