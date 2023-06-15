import CountryInfo from "./CountryInfo";
import { useState } from "react";

const Content = ({ countries }) => {
  const [countryToShow, setCountryToShow] = useState(null);

  if (!countries) return null;

  const numOfCountries = countries.length;
  const listCountries = countries.map((country) => {
    return (
      <li key={country.name.common}>
        {country.name.common}{" "}
        <button onClick={() => setCountryToShow(country)}>show</button>
      </li>
    );
  });

  if (numOfCountries === 1) {
    return <CountryInfo country={countries[0]} />;
  } else if (numOfCountries < 10) {
    return (
      <>
        <ul>{listCountries}</ul>
        <CountryInfo country={countryToShow} />
      </>
    );
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

export default Content;
