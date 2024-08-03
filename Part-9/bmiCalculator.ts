const calculateBmi = (weight: number, height: number): string => {
  const bmi = weight / (height * height);

  return `Healthy weight: ${bmi}`;
};

console.log(calculateBmi(20, 80));
