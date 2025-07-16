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
    return res.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    })
  }

  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token not present',
    })
  }

  try {
    const decodedToken = verify(token, authConfig.jwt.secret as Secret);
    const { sub } = decodedToken as JwtPayLoadProps;

    req.user = { id: sub };
    return next();

  } catch (err) {
    return res.status(401).json({
      error: true,
      code: 'token.expired',
      message: 'Access token not present',
    })
  }
}
