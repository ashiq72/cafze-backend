import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "@prisma/client";
import { env } from "../../config/env";
import { AppError } from "../errors/app-error";

type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    next(new AppError(401, "Authentication token is required"));
    return;
  }

  try {
    const token = header.slice("Bearer ".length);
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role
    };

    next();
  } catch {
    next(new AppError(401, "Invalid or expired authentication token"));
  }
}

export function requireRoles(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AppError(401, "Authentication token is required"));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(new AppError(403, "You do not have permission to perform this action"));
      return;
    }

    next();
  };
}
