import { useState } from "react";
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("Add name");
  const [newNumber, setNewNumber] = useState("Add number");
  const [filterStr, setFilterStr] = useState("");

  const handleNameInput = (event) => setNewName(event.target.value);
  const handleNumInput = (event) => setNewNumber(event.target.value);
  const handleFilterStr = (event) => setFilterStr(event.target.value);
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

  const getFilteredNames = () => {
    const filterNames = (person) => {
      const lowerCasePerson = person.name.toLowerCase();
      const lowerCaseFilter = filterStr.toLowerCase();
      return lowerCasePerson.includes(lowerCaseFilter);
    };

    return persons.filter(filterNames);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterStr} handleFilterStr={handleFilterStr} />
      <h2>Add a new contact</h2>
      <Form
        nameValue={newName}
        numValue={newNumber}
        handleNameInput={handleNameInput}
        handleNumInput={handleNumInput}
        handleSetPersons={handleSetPersons}
      />
      <h2>Numbers</h2>
      <Numbers persons={getFilteredNames()} />
    </div>
  );
};

export default App;
