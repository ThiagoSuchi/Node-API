import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";

type JwtPayLoadProps = {
    sub: string
}

export const addUserInfoToReq = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.replace('Bearer ', '');

    try {
        const decodedToken = decode(token);
        const { sub } = decodedToken as JwtPayLoadProps;
        req.user = { id: sub };
        return next();
    } catch (err) {
        throw new Error('Access token not present');
    }
}