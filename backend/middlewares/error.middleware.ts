import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  res.json({
    success: false,
    message: err.message || "Internal server error",
  });
};

export default errorMiddleware;
