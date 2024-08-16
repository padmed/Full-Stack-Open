import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
import { isNumber } from "./helpers";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.post("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!isNumber(weight) || !isNumber(height) || !height || !weight) {
    return res.send({
      error: "malformatted parameters",
    });
  }

  const bmi = calculateBmi(Number(weight), Number(height));

  return res.send({ height, weight, bmi });
});

interface ReqBody {
  target: number;
  daily_exercises: (number | string)[];
}

app.post("/exercises", (req, res) => {
  const body = req.body as ReqBody;
  const { target, daily_exercises } = body;

  // Validate target value
  if (!isNumber(target)) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  // Validate daily exercises
  const allDaysAreNumbers = daily_exercises.every(isNumber);
  if (!allDaysAreNumbers) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  // Convert daily exercises to an array of numbers
  const progress: number[] = daily_exercises.map(Number);

  // Calculate the exercises result
  const result = calculateExercises(target, progress);

  // Send the result as response
  return res.send({ result });
});

app.listen(3003, () => {
  console.log("connected to a server");
});
