import mongoose from "mongoose";

export type UserType = {
  _id: string;
  fullName: string;
  email: string;
  password: string;
};

const userModel = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userModel);
