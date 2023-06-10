import { useState, useEffect } from "react";
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import numbers from "./services/phoneNumbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterStr, setFilterStr] = useState("");

  useEffect(() => {
    numbers.getAll().then((initialNums) => setPersons(initialNums));
  }, []);

  const handleInputChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const handleSetPersons = (event) => {
    event.preventDefault();
    const checkDuplicates = (person) => person.name !== newName;

    if (persons.every(checkDuplicates)) {
      const newPersonObject = {
        name: newName,
        number: newNumber,
      };

      numbers.create(newPersonObject).then((newNum) => {
        setPersons([...persons, newNum]);
      });

      setNewName("");
      setNewNumber("");
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
      <Filter
        value={filterStr}
        handleFilterStr={handleInputChange(setFilterStr)}
      />
      <h2>Add a new contact</h2>
      <Form
        nameValue={newName}
        numValue={newNumber}
        handleNameInput={handleInputChange(setNewName)}
        handleNumInput={handleInputChange(setNewNumber)}
        handleSetPersons={handleSetPersons}
      />
      <h2>Numbers</h2>
      <Numbers persons={getFilteredNames()} />
    </div>
  );
};

export default App;
