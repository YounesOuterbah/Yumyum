import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`Connected to MongoDB on ${process.env.MONGO_URI}`);
  } catch (error) {
    console.log("Connection Failed To MongoDB", error);
  }
};
