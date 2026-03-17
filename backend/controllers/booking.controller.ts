import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import validator from "validator";
import prisma from "../lib/prisma";
import axios from "axios";
import { v4 as uuid } from "uuid";

export const getBooking = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid Id!");
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: String(id),
      },
      include: {
        property: true,
      },
    });

    if (!booking) {
      throw new Error("Booking not found!");
    }

    if (booking.tenantId !== user.id && booking.property.hostId !== user.id) {
      throw new Error("You are not allowed to get this booking");
    }

    res.status(200).json({
      success: true,
      booking,
    });
  },
);

export const createBooking = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { propertyId, checkIn, checkOut, guests, telephone } = req.body;
    const { user } = req;

    if (!validator.isUUID(String(propertyId))) {
      throw new Error("Invalid property Id!");
    }

    if (!validator.isMobilePhone(telephone)) {
      throw new Error("Invalid phone number");
    }

    if (!/2376\d{8}/.test(telephone)) {
      throw new Error("Invalid phone number!");
    }

    if (
      isNaN(new Date(checkIn).getTime()) ||
      isNaN(new Date(checkOut).getTime())
    ) {
      throw new Error("Invalid date format!");
    }

    if (
      new Date(checkIn).getTime() < Date.now() ||
      new Date(checkOut).getTime() < Date.now()
    ) {
      throw new Error("The check in and check out dates can't be in the past!");
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      throw new Error(
        "The check out date must be superior to the check in date!",
      );
    }

    const days = Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        1000 /
        60 /
        60 /
        24,
    );

    const property = await prisma.property.findUnique({
      where: {
        id: String(propertyId),
      },
    });

    if (!property) {
      throw new Error("Property not found!");
    }

    if (!Number.isInteger(guests)) {
      throw new Error("Invalid guests number!");
    }

    if (property.guests < Number(guests)) {
      throw new Error(
        `This property can not have more than ${property.guests} guests!`,
      );
    }

    if (property.hostId === user.id) {
      throw new Error("You can't book your own property!");
    }

    const existingBookings = await prisma.booking.findMany({
      where: {
        checkIn: {
          lte: new Date(checkOut),
        },
        checkOut: {
          gte: new Date(checkIn),
        },
        propertyId: String(propertyId),
        OR: [
          {
            status: "ACCEPTED",
          },
          {
            status: "PENDING",
            createdAt: {
              lt: new Date(Date.now() - 15 * 60 * 60 * 1000),
            },
          },
          {
            status: "PENDING_APPROVAL",
            createdAt: {
              lt: new Date(Date.now() - 15 * 60 * 60 * 1000),
            },
          },
        ],
      },
    });

    if (existingBookings.length > 0) {
      throw new Error("You can not book this property during this date range!");
    }

    const result = await prisma.$transaction(
      async (tx) => {
        const booking = await prisma.booking.create({
          data: {
            tenantId: user.id,
            propertyId: String(propertyId),
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            status: "PENDING",
            totalAmount: Math.round(property.price * days * 1.1),
          },
        });
        const payment = await prisma.payment.create({
          data: {
            ref: "ref-" + uuid(),
            status: "PENDING",
            telephone,
            motive: "Payment for booking",
            userId: user.id,
            type: "INCOMING",
            amount: Math.round(property.price * days * 1.1),
            bookingId: booking.id,
          },
        });

        return { booking, payment };
      },
      {
        timeout: 10000,
      },
    );

    const { booking, payment } = result;

    const body = {
      amount: 10,
      currency: "XAF",
      from: telephone,
      description: "Booking",
      last_name: user.name,
      email: user.email,
      external_reference: payment.ref,
      redirect_url: process.env.FRONTEND_URL + "/success",
      failure_redirect_url: process.env.FRONTEND_URL + "/failure",
      payment_options: "MOMO",
      payer_can_pay_more: "no",
    };

    axios
      .post(`${process.env.CAMPAY_URL}get_payment_link/`, body, {
        headers: {
          Authorization: `Token ${process.env.CAMPAY_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        res.status(201).json({
          success: true,
          message: "Booking created successfully!",
          paymentLink: result.data.link,
          booking,
        });
      })
      .catch(async (err) => {
        await prisma.$transaction([
          prisma.payment.delete({
            where: {
              id: payment.id,
            },
          }),
          prisma.booking.delete({
            where: {
              id: booking.id,
            },
          }),
        ]);
        res.json({
          success: false,
          message: err.message,
        });
      });
  },
);

export const cancelBooking = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;

    const booking = await prisma.booking.findUnique({
      where: {
        id: String(id),
      },
      include: {
        payment: true,
      },
    });

    if (!booking) {
      throw new Error("Booking not found!");
    }

    const payment = await prisma.payment.findUnique({
      where: {
        bookingId: booking.id,
      },
    });

    if (!payment) {
      throw new Error("Payment not found!");
    }

    if (payment.status !== "SUCCESS") {
      throw new Error("You can not be refund for this booking!");
    }

    if (
      booking.status === "PENDING" ||
      booking.status === "PENDING_APPROVAL" ||
      (booking.status == "ACCEPTED" &&
        booking.checkIn >= new Date(Date.now() + 24 * 60 * 60 * 1000))
    ) {
      const body = {
        amount: `${Math.round(booking.totalAmount * 0.95)}`,
        to: payment.telephone,
        description: "Refund",
        external_reference: payment.ref,
      };
      const { data } = await axios.post(
        `${process.env.CAMPAY_URL}withdraw/`,
        body,
        {
          headers: {
            Authorization: `Token ${process.env.CAMPAY_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      const { reference } = data;

      const { data: statusData } = await axios.get(
        `${process.env.CAMPAY_URL}transaction/${reference}`,
        {
          headers: {
            Authorization: `Token ${process.env.CAMPAY_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (statusData.status !== "SUCCESSFUL") {
        throw new Error("Could not refund your booking!");
      }

      await prisma.$transaction([
        prisma.booking.update({
          where: {
            id: booking.id,
          },
          data: {
            status: "CANCELLED",
          },
        }),
        prisma.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            status: "REFUNDED",
          },
        }),
      ]);
    } else {
      throw new Error("You can't cancel this booking!");
    }

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully!",
    });
  },
);

export const bookingDecision = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    const { accept } = req.body;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid booking Id!");
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: String(id),
      },
      include: {
        property: true,
      },
    });

    if (!booking) {
      throw new Error("Booking not found!");
    }

    if (booking.property.hostId !== user.id) {
      throw new Error(
        "You are not allowed to accept or refuse this booking since this is not your property!",
      );
    }

    if (
      booking.status !== "PENDING_APPROVAL" ||
      booking.checkIn < new Date(Date.now())
    ) {
      throw new Error("You can't change the status of this booking anymore!");
    }

    const payment = await prisma.payment.findUnique({
      where: {
        bookingId: booking.id,
      },
    });

    if (!payment) {
      throw new Error("Payment not found!");
    }

    if (payment.status !== "SUCCESS") {
      throw new Error("Payment not successfull!");
    }

    if (accept) {
      await prisma.booking.update({
        where: {
          id: String(id),
        },
        data: {
          status: "ACCEPTED",
        },
      });
    } else {
      const body = {
        amount: `${booking.totalAmount}`,
        to: payment.telephone,
        description: "Refund",
        external_reference: payment.ref,
      };
      const { data } = await axios.post(
        `${process.env.CAMPAY_URL}withdraw/`,
        body,
        {
          headers: {
            Authorization: `Token ${process.env.CAMPAY_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      const { reference } = data;

      const { data: statusData } = await axios.get(
        `${process.env.CAMPAY_URL}transaction/${reference}`,
        {
          headers: {
            Authorization: `Token ${process.env.CAMPAY_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (statusData.status !== "SUCCESSFUL") {
        throw new Error("Could not refund this booking!");
      }

      await prisma.$transaction([
        prisma.booking.update({
          where: {
            id: booking.id,
          },
          data: {
            status: "REFUSED",
          },
        }),
        prisma.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            status: "REFUNDED",
          },
        }),
      ]);
    }

    res.status(200).json({
      success: true,
      message: accept
        ? "Booking accepted successfully"
        : "Booking rejected successfully!",
    });
  },
);

export const getPayment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ref } = req.body;

    const payment = await prisma.payment.findUnique({
      where: {
        ref,
      },
      include: {
        booking: {
          include: {
            property: true,
          },
        },
      },
    });

    if (!payment) {
      throw new Error("Payment not found");
    }

    res.status(200).json({
      success: true,
      payment,
    });
  },
);
