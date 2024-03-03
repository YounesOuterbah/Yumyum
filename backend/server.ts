import express, { Request, Response } from "express";
const app = express();

app.get("/hi", (req: Request, res: Response) => {
  res.send("hello from backend");
});

app.listen(4000, () => {
  console.log("server running on PORT: 4000");
});
