import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/unauthorized-error";

// Always verify if jwt exists before calling this function
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
