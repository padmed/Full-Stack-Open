const Number = ({ name, number, id, removePerson }) => {
  return (
    <li>
      {name} {number} <button onClick={() => removePerson(id)}>Delete</button>
    </li>
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
  return <ul>{personsToShow}</ul>;
};

export default Numbers;
