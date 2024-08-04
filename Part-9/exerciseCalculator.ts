interface CalculatedValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (progress: number[]): CalculatedValues => {
  const target = 2;

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
  const result = calculateExercises([2, 2, 3, 2, 2, 2, 2]);
  console.log(result);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
