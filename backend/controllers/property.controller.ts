import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import validator from "validator";
import prisma from "../lib/prisma";
import cloudinary from "../lib/cloudinary";
import jwt from "jsonwebtoken";

export const getProperties = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { location, category, facilities, page = 1 } = req.query;
    const { token } = req.cookies;

    const where: any = {};

    if (location) {
      if (String(location).trim()) {
        where.OR = [
          {
            city: {
              contains: String(location),
              mode: "insensitive",
            },
          },
          {
            address: {
              contains: String(location),
              mode: "insensitive",
            },
          },
        ];
      }
    }

    if (category) {
      where.categoryId = String(category);
    }

    if (Array.isArray(facilities)) {
      where.propertiesOnFacilities = {
        some: {
          facilityId: {
            in: facilities,
          },
        },
      };
    }

    const totalProperties = await prisma.property.count({ where });

    const propertiesPerPage = 12;

    const totalPages = Math.ceil(totalProperties / propertiesPerPage);

    let properties = await prisma.property.findMany({
      where,
      include: {
        category: {
          select: {
            name: true,
          },
        },
        images: {
          select: {
            url: true,
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      take: propertiesPerPage,
      skip: (Number(page) - 1) * propertiesPerPage,
    });

    const groupReviews = await prisma.review.groupBy({
      where: {
        property: {
          id: {
            in: properties.map((property) => property.id),
          },
        },
      },
      _avg: {
        rate: true,
      },
      by: ["propertyId"],
    });

    let savedProperties = [];

    if (validator.isJWT(String(token))) {
      const { userId } = jwt.verify(token, String(process.env.JWT_SECRET_KEY));

      savedProperties = await prisma.savedProperty.findMany({
        where: {
          userId,
        },
        select: {
          propertyId: true,
        },
      });

      savedProperties = savedProperties.map((item) => item.propertyId);
    }

    properties = properties.map((property) => {
      const groupReview = groupReviews.find(
        (item) => item.propertyId === property.id,
      );
      property.rate = groupReview?._avg.rate || 0;

      property.liked = savedProperties.includes(property.id);
      return property;
    });

    res.status(200).json({
      success: true,
      properties,
      totalPages,
    });
  },
);
export const getProperty = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { token } = req.cookies;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid id!");
    }

    const property = await prisma.property.findUnique({
      where: {
        id: String(id),
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
        host: {
          select: {
            name: true,
            avatar: true,
            id: true,
            createdAt: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        propertiesOnFacilities: {
          select: {
            facility: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        reviews: {
          select: {
            id: true,
            rate: true,
            text: true,
            createdAt: true,
            author: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!property) {
      throw new Error("Property not found!");
    }

    let savedProperty;
    let bookings = [];
    if (token) {
      if (validator.isJWT(token)) {
        const { userId } = jwt.verify(
          token,
          String(process.env.JWT_SECRET_KEY),
        );

        if (!validator.isUUID(userId)) {
          throw new Error("Invalid user Id!");
        }

        savedProperty = await prisma.savedProperty.findUnique({
          where: {
            like: {
              propertyId: String(id),
              userId: String(userId),
            },
          },
        });

        bookings = await prisma.booking.findMany({
          where: {
            propertyId: String(id),
            tenantId: userId,
          },
        });
      }
    }

    const groupReview = await prisma.review.groupBy({
      where: {
        propertyId: String(id),
      },
      by: ["propertyId"],
      _avg: {
        staff: true,
        facilities: true,
        comfort: true,
        cleanliness: true,
        valueForMoney: true,
        geographicSituation: true,
        rate: true,
      },
    });

    property.liked = savedProperty ? true : false;

    property.staff = groupReview[0]?._avg.staff || 0;
    property.facilities = groupReview[0]?._avg.facilities || 0;
    property.comfort = groupReview[0]?._avg.comfort || 0;
    property.cleanliness = groupReview[0]?._avg.cleanliness || 0;
    property.valueForMoney = groupReview[0]?._avg.valueForMoney || 0;
    property.geographicSituation =
      groupReview[0]?._avg.geographicSituation || 0;
    property.rate = groupReview[0]?._avg.rate || 0;

    property.booked = bookings.length > 0 ? true : false;

    res.status(200).json({
      success: true,
      property,
    });
  },
);

export const getPopularProperties = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const groupBookings = await prisma.booking.groupBy({
      by: ["propertyId"],
      orderBy: {
        _count: {
          propertyId: "desc",
        },
      },
      take: 12,
    });

    const { token } = req.cookies;

    const propertiesId = groupBookings.map((item) => item.propertyId);

    let popularProperties = await prisma.property.findMany({
      where: {
        id: {
          in: propertiesId,
        },
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    const ids = popularProperties.map((property) => property.id);

    const groupReviews = await prisma.review.groupBy({
      by: "propertyId",
      where: {
        propertyId: {
          in: ids,
        },
      },
      _avg: {
        rate: true,
      },
    });

    let savedProperties: string | string[] | { propertyId: string }[] = [];

    if (token) {
      if (!validator.isJWT(String(token))) {
        throw new Error("Invalid token");
      }
      const { userId } = jwt.verify(token, String(process.env.JWT_SECRET_KEY));

      if (!validator.isUUID(String(userId))) {
        throw new Error("Invalid user id");
      }
      savedProperties = await prisma.savedProperty.findMany({
        where: {
          userId,
        },
        select: {
          propertyId: true,
        },
      });
    }

    const savedPropertiesIds = savedProperties.map(
      (property) => property.propertyId,
    );

    popularProperties = popularProperties.map((item) => {
      const groupReview = groupReviews.find(
        (review) => review.propertyId === item.id,
      );
      item.rate = groupReview?._avg.rate;
      item.liked = savedPropertiesIds.includes(item.id) ? true : false;
      return item;
    });

    res.status(200).json({
      success: true,
      popularProperties,
    });
  },
);

export const createProperty = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      title,
      description,
      price,
      address,
      latitude,
      longitude,
      bedrooms,
      bathrooms,
      superficy,
      guests,
      city,
      categoryId,
      facilities,
      instantBooking,
    } = req.body;

    const { user } = req;

    if (
      !title ||
      !description ||
      !price ||
      !address ||
      !latitude ||
      !longitude ||
      !bedrooms ||
      !bathrooms ||
      !superficy ||
      !guests ||
      !city ||
      !categoryId ||
      !facilities
    ) {
      throw new Error("All fields are required!");
    }

    if (Number(price) <= 0) {
      throw new Error("The price per day can not be less than 0");
    }

    if (Number(price) > 1000000) {
      throw new Error("");
    }

    if (Number(bedrooms) < 1) {
      throw new Error("The bedroom number must be greater than one");
    }

    if (Number(bathrooms) < 1) {
      throw new Error("The bathroom number must be greater than one");
    }

    if (Number(superficy) <= 0) {
      throw new Error("The superficy must be greater than 0");
    }

    if (Number(guests) < 1) {
      throw new Error("The guests number must be greater than one");
    }

    const images = req.files;

    if (images?.length === 0) {
      throw new Error("You must provide at least one image!");
    }

    if (!validator.isUUID(categoryId)) {
      throw new Error("Invalid category id!");
    }

    const chosenCategory = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!chosenCategory) {
      throw new Error("Category not found");
    }

    const results = await Promise.all(
      images?.map((image: { path: string }) => {
        return cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
      }),
    );

    const urls: String[] = results.map(
      (result: { secure_url: any }) => result.secure_url,
    );

    const data = {
      title: String(title),
      description: String(description),
      price: Number(price),
      address: String(address),
      latitude: Number(latitude),
      longitude: Number(longitude),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      superficy: Number(superficy),
      guests: Number(guests),
      categoryId: String(categoryId),
      city: String(city),
      hostId: user.id,
    };

    if (instantBooking) {
      if (instantBooking === "yes") {
        data.instantBooking = true;
      }
    }

    const property = await prisma.property.create({
      data,
    });

    await Promise.all(
      urls.map((url) =>
        prisma.image.create({
          data: {
            url: String(url),
            propertyId: property.id,
          },
        }),
      ),
    );

    if (!Array.isArray(JSON.parse(facilities))) {
      throw new Error("Invalid facilities format!");
    }

    JSON.parse(facilities).forEach(async (facility: any) => {
      if (!validator.isUUID(String(facility))) {
        return;
      }

      await prisma.propertiesOnFacilities.create({
        data: {
          propertyId: property.id,
          facilityId: facility,
        },
      });
    });

    res.status(201).json({
      success: true,
      property,
    });
  },
);

export const deleteProperty = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid id");
    }

    const property = await prisma.property.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!property) {
      throw new Error("Property not found");
    }

    if (property.hostId !== user.id) {
      throw new Error("You are not allowed to delete this property!");
    }

    await prisma.property.delete({
      where: {
        id: String(id),
      },
    });

    res.status(200).json({
      success: true,
      message: "Property deleted successfully!",
    });
  },
);

export const updateInformations = asyncHandler(
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

    if (property.hostId !== id) {
      throw new Error("You are not allowed to updated this property!");
    }

    Object.entries(req.body).forEach((item) => {
      if (!item) {
        throw new Error("All fields are required!");
      }
    });

    await prisma.property.update({
      where: {
        id: String(id),
      },
      data: {
        ...req.body,
      },
    });

    res.status(200).json({
      success: true,
      message: "Informations updated successfully!",
    });
  },
);

export const updateFacilities = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { facilities } = req.body;
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

    if (property.hostId !== user.id) {
      throw new Error("You are not allowed to update this property!");
    }

    JSON.parse(facilities).forEach(async (facility: any) => {
      const propertyOnFacility = await prisma.propertiesOnFacilities.findUnique(
        {
          where: {
            propertyId_facilityId: {
              propertyId: String(id),
              facilityId: String(facility),
            },
          },
        },
      );

      if (propertyOnFacility) {
        await prisma.propertiesOnFacilities.delete({
          where: {
            propertyId_facilityId: {
              propertyId: String(id),
              facilityId: String(facility),
            },
          },
        });
      } else {
        await prisma.propertiesOnFacilities.create({
          data: {
            propertyId: String(id),
            facilityId: String(facility),
          },
        });
      }
    });

    res.status(200).json({
      success: true,
      message: "Property updated successfully!",
    });
  },
);

export const addImages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { user } = req;
    const images = req.files;

    if (!validator.isUUID(String(id))) {
      throw new Error("Invalid id!");
    }

    const property = await prisma.property.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!property) {
      throw new Error("Property no found");
    }

    if (property.hostId !== user.id) {
      throw new Error("You are not allowed to add images to this property");
    }

    const results = await Promise.all(
      images?.map((image: { path: string }) => {
        return cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
      }),
    );

    const urls = results.map(
      (result: { secure_url: any }) => result.secure_url,
    );

    urls.forEach(async (url: any) => {
      await prisma.image.create({
        data: {
          url,
          propertyId: String(id),
        },
      });
    });

    res.status(201).json({
      success: true,
      message: "Images added successully!",
    });
  },
);

export const deleteImages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { images } = req.body;
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

    if (property.hostId !== user.id) {
      throw new Error(
        "You are not allowed to delete pictures on this property!",
      );
    }

    images.forEach(async (image: string) => {
      if (!validator.isUUID(image)) {
        return;
      }
      await prisma.image.delete({
        where: {
          id: image,
          propertyId: property.id,
        },
      });
    });

    res.status(200).json({
      success: true,
      message: `Image${images.length > 0 && "s"} deleted successfully!`,
    });
  },
);
