import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(weight)) || isNaN(Number(height)) || !height || !weight) {
    res.send({
      error: "malformatted parameters",
    });
  }

  const bmi = calculateBmi(Number(weight), Number(height));

  res.send({ height, weight, bmi });
});

app.listen(4004, () => {
  console.log("server is running");
});
