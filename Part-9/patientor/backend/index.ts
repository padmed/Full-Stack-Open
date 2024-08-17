import express from "express";
import { Request, Response } from "express";

const app = express();

app.get("/ping", (_req: Request, res: Response) => {
  return res.send("pong");
});

app.listen(4005, () => {
  console.log("Server is running");
});
