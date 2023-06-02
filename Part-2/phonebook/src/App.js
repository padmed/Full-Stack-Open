import { useState } from "react";

const Form = ({ value, handleSetPersons, handleInputChange }) => (
  <form onSubmit={handleSetPersons}>
    <div>
      name: <input value={value} onChange={handleInputChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Number = ({ name }) => <p>{name}</p>;
const Numbers = ({ persons }) => {
  const personsToShow = persons.map((person) => {
    return <Number key={person.name} name={person.name} />;
  });

  return <div>{personsToShow}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSetPersons = (event) => {
    event.preventDefault();
    const newPersonObject = {
      name: newName,
    };
    setPersons([...persons, newPersonObject]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Form
        value={newName}
        handleInputChange={handleInputChange}
        handleSetPersons={handleSetPersons}
      />
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  );
};

export default App;
