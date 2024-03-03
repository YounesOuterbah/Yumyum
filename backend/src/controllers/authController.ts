import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    generateToken(res, newUser._id);
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ msg: "email or password is incorrect" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "email or password is incorrect" });
    }
    generateToken(res, userExist._id);
    return res.status(200).json({ msg: `welcome back ${userExist}` });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async (req: Request, res: Response) => {};
