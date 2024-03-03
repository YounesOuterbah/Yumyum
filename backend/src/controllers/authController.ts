import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
  res.json({ msg: "hello from register User" });
};

export const loginUser = async (req: Request, res: Response) => {
  res.json({ msg: "hello from login User" });
};
