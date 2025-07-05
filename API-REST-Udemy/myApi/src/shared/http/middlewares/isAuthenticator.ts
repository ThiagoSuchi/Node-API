import { AppError } from "@shared/utils/errors/AppErro";
import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";
import authConfig from '@config/auth';

type JwtPayLoadProps = {
  sub: string
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError('Failed to verify access token', 401);
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decodedToken = verify(token, authConfig.jwt.secret as Secret);
    const { sub } = decodedToken as JwtPayLoadProps;
    req.user = { id: sub };
    return next();
  } catch (err) {
    throw new AppError('Invalid authentication token', 401);
  }
}
