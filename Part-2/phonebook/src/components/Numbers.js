const Number = ({ name, number }) => (
  <p>
    {name} {number}
  </p>
);

const Numbers = ({ persons }) => {
  const personsToShow = persons.map((person) => {
    return (
      <Number key={person.name} name={person.name} number={person.number} />
    );
  });
  return <div>{personsToShow}</div>;
};

export default Numbers;
