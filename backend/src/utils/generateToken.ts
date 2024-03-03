import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (res: Response, userID: string | number | object) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
