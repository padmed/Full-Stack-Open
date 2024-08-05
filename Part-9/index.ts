import express from "express";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.listen(4004, () => {
  console.log("server is running");
});
