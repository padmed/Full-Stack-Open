import { useState, useEffect } from "react";
import Form from "./components/Form";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import numbers from "./services/phoneNumbers";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]); //All person data
  const [newName, setNewName] = useState(""); // Name input state
  const [newNumber, setNewNumber] = useState(""); //Num input state
  const [filterStr, setFilterStr] = useState(""); //Filter input state
  const [notificationMessage, setnotificationMessage] = useState(null);
  const [requestSuccess, setRequestSuccess] = useState(null); //true if request is succ. false if it failed

  useEffect(() => {
    numbers.getAll().then((initialNums) => setPersons(initialNums));
  }, []);

  //Whenever the requestSuccess state changes, showNotification method is triggered.
  //Effect is used to notify user about success/failure of the communication with the server
  useEffect(() => {
    if (requestSuccess !== null) {
      showNotification(newName);
      setNewName("");
      setNewNumber("");
    }
  }, [requestSuccess]);

  const handleInputChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const showNotification = (personName) => {
    //Show notification based on requestSuccess
    const message = requestSuccess
      ? `Added ${personName}`
      : `Information of ${personName} has already been removed from the server`;
    setnotificationMessage(message);
    setTimeout(() => {
      setnotificationMessage(null);
    }, 2000);
  };

  const replacePerson = (newPersonObject) => {
    const personToReplace = persons.find((x) => x.name === newName);
    const confirmation = window.confirm(
      `${newName} is already in a phonebook, replace the old number with the new one?`
    );

    if (confirmation)
      numbers
        .put(personToReplace.id, newPersonObject)
        .then((response) => {
          setPersons([
            ...persons.filter((x) => x.id !== personToReplace.id),
            response.data,
          ]);
          setRequestSuccess(true); //request succeded
        })
        .catch((error) => {
          setRequestSuccess(false); //request failed
          setPersons(persons.filter((x) => x.name !== newPersonObject.name));
        });
  };

  const addPersons = (newPersonObject) => {
    numbers.create(newPersonObject).then((newNum) => {
      setPersons([...persons, newNum]);
      setRequestSuccess(true); //request succeded
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
  };

  const getFilteredNames = () => {
    const filterNames = (person) => {
      //compares every person data with the filter input bar data. if match - return
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
      numbers
        .remove(id)
        .then(() => {
          setPersons(persons.filter((x) => x.id !== id));
        })
        .catch(() => {
          setRequestSuccess(false); //request failed
          setPersons(persons.filter((x) => x.id !== person.id));
        });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        requestSuccess={requestSuccess}
      />
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
