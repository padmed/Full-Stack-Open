import express from "express";
import { Request, Response } from "express";
import CORS from "cors";

const app = express();
app.use(express.json());
app.use(CORS());

app.get("/api/ping", (_req: Request, res: Response) => {
  return res.send("pong");
});

app.listen(3001, () => {
  console.log("Server is running");
});
