import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db";
import authRouter from "./routes/authRouter";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
});
