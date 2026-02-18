import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import validator from "validator";
import cloudinary from "../lib/cloudinary";
import transporter from "../lib/nodemailer";

export const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const file = req.file;

    if (!name || !email || !password) {
      throw new Error("Name, email and password are required!");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format!");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Enter a strong password!");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists!");
    }

    let result;

    if (file) {
      result = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar: result ? result.secure_url : null,
      },
    });

    res.status(201).json({
      success: true,
      message: "User created successfully!",
    });
  },
);

export const signIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
      throw new Error("Email and password are required!");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email!");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Enter a strong password!");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordCorrect) {
      throw new Error("Incorrect email or password!");
    }

    const token = jwt.sign(
      { userId: existingUser.id, role: existingUser.role },
      String(process.env.JWT_SECRET_KEY),
      { expiresIn: "7d" },
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "PRODUCTION",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "PRODUCTION" ? "none" : "lax",
      })
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully!",
      });
  },
);

export const signOut = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "PRODUCTION",
        sameSite: process.env.NODE_ENV === "PRODUCTION" ? "none" : "lax",
      })
      .status(200)
      .json({
        success: true,
        message: "Logged out successfully!",
      });
  },
);

export const sendVerificationOTP = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    if (user.isVerified) {
      throw new Error("User already verified!");
    }

    const verificationOTP = `${Math.floor(100000 * Math.random() + 900000)}`;
    const verificationOTPExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        verificationOTP,
        verificationOTPExpiresAt,
      },
    });

    const mailOptions = {
      from: process.env.GOOGLE_USER,
      to: user.email,
      subject: "Verify your email",
      text: `Verification OTP: ${verificationOTP}.\n This OTP expires in 15 minutes`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  },
);

export const verifyEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { OTP } = req.body;

    if (!OTP) {
      throw new Error("OTP is required");
    }

    if (user.isVerified) {
      throw new Error("User already verified!");
    }

    if (!user.verificationOTP === OTP) {
      throw new Error("Incorrect OTP");
    }

    if (new Date(Date.now()) > user.verificationOTPExpiresAt) {
      throw new Error("OTP expired");
    }

    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        verificationOTP: null,
        verificationOTPExpiresAt: null,
        isVerified: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Email verified successfully!",
    });
  },
);

export const sendResetOTP = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const resetOTP = `${Math.floor(100000 + Math.random() * 900000)}`;
    const resetOTPExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        resetOTP,
        resetOTPExpiresAt,
      },
    });

    const mailOptions = {
      from: process.env.GOOGLE_USER,
      to: email,
      subject: "Reset your password",
      text: `Reset OTP: ${resetOTP}.\n This OTP expires in 15 minutes`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Reset OTP sent to your email",
    });
  },
);

export const checkResetOTP = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, OTP } = req.body;

    if (!OTP) {
      throw new Error("OTP is required!");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new Error("User not found!");
    }

    if (existingUser.resetOTP !== OTP) {
      throw new Error("Incorrect OTP");
    }
    

    if (new Date(Date.now()) > existingUser.resetOTPExpiresAt) {
      throw new Error("Reset OTP expired");
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        resetOTP: null,
        resetOTPExpiresAt: null,
      },
    });

    res.status(200).json({
      success: true,
      message: "Reset OTP correct",
    });
  },
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Enter a strong password!");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new Error("User not found!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({
      success: true,
      message: "Password changed successfully!",
    });
  },
);
