import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Content from "./components/Content";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState(null);
  const [countriesMatched, setCountriesMatched] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    if (countries) {
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

  const handleInputChange = (e) => {
    setValue(e.target.value);
    setCountriesMatched();
  };

  return (
    <>
      find countries <input value={value} onChange={handleInputChange}></input>
      <Loading value={value} countries={countries} />
      <Content countries={countriesMatched} />
    </>
  );
};

export default App;
