const Number = ({ name, number, id, removePerson }) => {
  return (
    <p>
      {name} {number} <button onClick={() => removePerson(id)}>Delete</button>
    </p>
  );
};

const Numbers = ({ persons, removePerson }) => {
  const personsToShow = persons.map((person) => {
    return (
      <Number
        key={person.name}
        name={person.name}
        number={person.number}
        id={person.id}
        removePerson={removePerson}
      />
    );
  });
  return <div>{personsToShow}</div>;
};

export default Numbers;
