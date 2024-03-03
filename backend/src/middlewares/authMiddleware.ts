import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";
import { NextFunction, Request, Response } from "express";

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
      req.user = await User.findById(decoded.userID).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ msg: "No Authorized, Invalid Token" });
    }
  } else {
    return res.status(401).json({ msg: "No Authorized, No Token" });
  }
};
