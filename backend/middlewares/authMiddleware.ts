import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      req.user = await prisma.user.findUnique({
        where: { id: decoded.userID },
        select: { id: true, fullName: true, email: true },
      });
      next();
    } catch (error) {
      return res.status(401).json({ msg: "No Authorized, Invalid Token" });
    }
  } else {
    return res.status(401).json({ msg: "No Authorized, No Token" });
  }
};
