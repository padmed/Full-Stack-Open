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

  const replacePerson = (newPersonObject) => {
    const personToReplace = persons.find((x) => x.name === newName);
    const confirmation = window.confirm(
      `${newName} is already in a phonebook, replace the old number with the new one?`
    );

    if (confirmation)
      numbers
        .put(personToReplace.id, newPersonObject)
        .then((response) =>
          setPersons([
            ...persons.filter((x) => x.id !== personToReplace.id),
            response.data,
          ])
        );
  };

  const addPersons = (newPersonObject) => {
    numbers.create(newPersonObject).then((newNum) => {
      setPersons([...persons, newNum]);
    });
  };

  const handleSetPersons = (event) => {
    event.preventDefault();
    const checkDuplicates = (person) => person.name !== newName;
    const newPersonObject = {
      name: newName,
      number: newNumber,
    };

    if (persons.every(checkDuplicates)) {
      addPersons(newPersonObject);
    } else {
      replacePerson(newPersonObject);
    }

    setNewName("");
    setNewNumber("");
  };

  const getFilteredNames = () => {
    const filterNames = (person) => {
      const lowerCasePerson = person.name.toLowerCase();
      const lowerCaseFilter = filterStr.toLowerCase();
      return lowerCasePerson.includes(lowerCaseFilter);
    };

    return persons.filter(filterNames);
  };

  const removePerson = (id) => {
    const person = persons.find((x) => x.id === id);
    const confirmation = window.confirm(`Delete ${person.name}?`);

    if (confirmation)
      numbers.remove(id).then(() => {
        setPersons(persons.filter((x) => x.id !== id));
      });
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
      <Numbers persons={getFilteredNames()} removePerson={removePerson} />
    </div>
  );
};

export default App;
