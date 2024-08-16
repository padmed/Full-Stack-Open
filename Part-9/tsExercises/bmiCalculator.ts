import { isNumber } from "./helpers";

interface argsTypes {
  weight: number;
  height: number;
}

const parseArguments = (args: string[]): argsTypes => {
  if (args.length > 4) throw new Error("Too many arguments");
  if (args.length < 4) throw new Error("argument's missing");

  if (!isNumber(args[2]) || !isNumber(args[3])) {
    console.log(args[3]);
    throw new Error("Argument is not a number");
  }

  return {
    weight: Number(args[2]),
    height: Number(args[3]),
  };
};

const calculateBmi = (weight: number, height: number): string => {
  const mHeight = height / 100;
  const bmi = weight / (mHeight * mHeight);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Overweight";
  } else {
    return "Obesity";
  }
};

try {
  const { weight, height } = parseArguments(process.argv);
  console.log(calculateBmi(weight, height));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}

export default calculateBmi;
