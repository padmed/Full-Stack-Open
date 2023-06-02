const Number = ({ name }) => <p>{name}</p>;

const Numbers = ({ persons }) => {
  const personsToShow = persons.map((person) => {
    return <Number key={person.name} name={person.name} />;
  });
  return <div>{personsToShow}</div>;
};

export default Numbers;
