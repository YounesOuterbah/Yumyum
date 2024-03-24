import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { prisma } from "../config/db";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist) {
      return res.status(400).json({ msg: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    generateToken(res, newUser.id);
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userExist = await prisma.user.findUnique({ where: { email } });
    if (!userExist) {
      return res.status(400).json({ msg: "email or password is incorrect" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "email or password is incorrect" });
    }
    generateToken(res, userExist.id);
    return res.status(200).json({ msg: `welcome back ${userExist.fullName}` });
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json("user logged out successful");
};

export const getUserProfile = (req: Request, res: Response) => {
  const { id, fullName, email, password } = req.user; // it should be req.user soon
  const user = {
    id,
    fullName,
    email,
    password,
  };
  return res.status(200).json(user);
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (user) {
      const updatedUserData = {
        fullName: req.body.fullName || user.fullName,
        email: req.body.email || user.email,
      };

      if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
      }

      const updatedUser = await prisma.user.update({
        where: { id: req.user.id },
        data: updatedUserData,
      });
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
