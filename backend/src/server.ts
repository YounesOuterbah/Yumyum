import express, { Request, Response } from "express";
import "dotenv/config";
import { connectDB } from "./config/db";
import authRouter from "./routes/authRouter";
import cookieParser from "cookie-parser";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log(`server running on PORT: ${PORT}`);
});
