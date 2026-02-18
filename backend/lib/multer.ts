import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname + `-${Date.now()}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/gif",
    "image/png",
    "image/avif",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error("File extension not allowed"));
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload