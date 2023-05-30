const Header = ({ headerText }) => <h1>{headerText}</h1>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => {
  const partComponents = parts.map((part) => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  ));

  return <div>{partComponents}</div>;
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

const Courses = ({ courses }) => {
  const courseComponents = courses.map((course) => {
    return <Course key={course.id} course={course} />;
  });

  return <>{courseComponents}</>;
};

export default Courses;
