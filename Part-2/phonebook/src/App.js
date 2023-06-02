import { useState } from "react";
import Form from "./components/Form";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSetPersons = (event) => {
    event.preventDefault();
    const checkDuplicates = (person) => person.name !== newName;

    if (persons.every(checkDuplicates)) {
      const newPersonObject = {
        name: newName,
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
        handleInputChange={handleInputChange}
        handleSetPersons={handleSetPersons}
      />
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  );
};

export default App;
