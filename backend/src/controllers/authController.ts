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
    return res.status(200).json({ msg: `welcome back ${userExist.firstName}` });
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
  const { _id, firstName, lastName, email, password } = req.user; // it should be req.user soon
  const user = {
    _id,
    firstName,
    lastName,
    email,
    password,
  };
  return res.status(200).json(user);
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
      }

      const updatedUser = await user.save();
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
