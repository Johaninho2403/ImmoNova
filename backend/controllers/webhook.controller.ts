import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";


export const bookingWebhook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const notification = { ...req.query };

    const payment = await prisma.payment.findUnique({
      where: {
        ref: String(notification.external_reference),
      },
    });

    if (!payment) {
      return res.status(404).send("Payment not found!");
    }

    if (payment.status !== "PENDING") {
      return res.status(400).send("Payment already processed!");
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: String(payment.bookingId),
      },
      include: {
        property: {
          select: {
            instantBooking: true,
          },
        },
      },
    });

    if (!booking) {
      return res.status(404).send("Booking not found!");
    }

    if (notification.status === "SUCCESSFUL") {
      await prisma.$transaction(async (tx) => {
        await prisma.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            status: "SUCCESS",
            operator: String(notification.operator),
          },
        });
        await prisma.booking.update({
          where: {
            id: booking.id,
          },
          data: {
            status: booking.property.instantBooking
              ? "ACCEPTED"
              : "PENDING_APPROVAL",
          },
        });
      });
    } else {
      await prisma.$transaction([
        prisma.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            status: "FAILED",
            operator: String(notification.operator),
          },
        }),
      ]);
      await prisma.booking.update({
        where: {
          id: booking.id,
        },
        data: {
          status: "FAILED",
        },
      });
    }

    res.status(200).send("OK");
  },
);
