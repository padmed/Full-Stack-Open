interface CalculatedValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseArguments {
  target: number;
  progress: number[];
}

const parseArgumentsForExercises = (
  args: string[] | number[]
): exerciseArguments => {
  if (args.length < 3) throw new Error("arguments not provided");

  let passedArguments = args.slice(2);

  passedArguments = passedArguments.map((argument) => {
    if (isNaN(Number(argument))) {
      throw new Error("argument passed is not a number");
    }
    return Number(argument);
  });

  const target = passedArguments[0];
  const progress = passedArguments.slice(1);

  return { target, progress };
};

const calculateExercises = (
  target: number,
  progress: number[]
): CalculatedValues => {
  const { sum, trainingDays } = progress.reduce(
    (acc, day) => {
      if (day !== 0) acc.trainingDays++;
      acc.sum += day;
      return acc;
    },
    { sum: 0, trainingDays: 0 }
  );

  const periodLength = progress.length;
  const average = sum / periodLength;
  const rating = average < target ? 1 : average === target ? 2 : 3;

  const ratingDescriptions = {
    1: "not too bad but could be better",
    2: "good",
    3: "excellent!",
  };

  const ratingDescription = ratingDescriptions[rating];

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, progress } = parseArgumentsForExercises(process.argv);
  console.log(calculateExercises(target, progress));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
