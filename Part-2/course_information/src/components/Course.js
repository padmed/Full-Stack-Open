const Header = ({ headerText }) => <h1>{headerText}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => {
  const result = parts.map((part) => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  ));

  return <div>{result}</div>;
};

const Sum = ({ parts }) => {
  const calculate = (sumOfExer, part) => {
    return sumOfExer + part.exercises;
  };

  const sumOfExer = parts.reduce(calculate, 0);

  return (
    <p>
      <b>total of {sumOfExer} exercises</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header headerText={course.name} />
      <Content parts={course.parts} />
      <Sum parts={course.parts} />
    </div>
  );
};

export default Course;
