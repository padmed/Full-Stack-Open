import { useState } from "react";
import Form from "./components/Form";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "555-444-33" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameInput = (event) => setNewName(event.target.value);
  const handleNumInput = (event) => setNewNumber(event.target.value);

  const handleSetPersons = (event) => {
    event.preventDefault();
    const checkDuplicates = (person) => person.name !== newName;

    if (persons.every(checkDuplicates)) {
      const newPersonObject = {
        name: newName,
        number: newNumber,
      };

      setPersons([...persons, newPersonObject]);
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Form
        value={newName}
        handleNameInput={handleNameInput}
        handleNumInput={handleNumInput}
        handleSetPersons={handleSetPersons}
      />
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  );
};

export default App;
