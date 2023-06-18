import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Content from "./components/Content";
import countriesData from "./services/countriesData";

const App = () => {
  const [value, setValue] = useState(""); //Input bar's value
  const [countries, setCountries] = useState(null); //Data of all country
  const [countriesMatched, setCountriesMatched] = useState(null); //Countries matched with the filter

  //Gets countries database when app is launched
  useEffect(() => {
    countriesData.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  //if value of input is changed, this filters data and sets state for matched countries
  useEffect(() => {
    if (countries && value !== "") {
      const matchedCountries = countries.filter((country) => {
        const commonName = country.name.common.toLowerCase();
        const officialName = country.name.official.toLowerCase();
        const userInput = value.toLowerCase();

        return (
          officialName.includes(userInput) || commonName.includes(userInput)
        );
      });
      setCountriesMatched(matchedCountries);
    }
  }, [value, countries]);

  //handles input change and sets matched countries state to null, so the new data could be added later
  const handleInputChange = (e) => {
    setValue(e.target.value);
    setCountriesMatched(null);
  };

  //Loading -> is rendered if the API GET request takes too long,
  //user is notified that the data is going to be eventually rendered
  //Content -> takes filtered countries data and renders all the info
  return (
    <>
      find countries <input value={value} onChange={handleInputChange}></input>
      <Loading value={value} countries={countries} />
      <Content countries={countriesMatched} />
    </>
  );
};

export default App;
