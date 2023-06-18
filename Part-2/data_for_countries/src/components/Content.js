import CountryInfo from "./CountryInfo";
import Weather from "./Weather";
import { useState } from "react";

const Content = ({ countries }) => {
  const [countryToShow, setCountryToShow] = useState(null); //Country that is going to be displaied, either by button or by search

  if (!countries) return null; //If no data, nothing's rendered

  //Method avoids the Antarctida case, doesn't show anything instead of an error
  const setCountry = (country) => {
    country.capital ? setCountryToShow(country) : setCountryToShow(null);
  };

  const numOfCountries = countries.length;
  //lists the countries that match the filter (input)
  const listCountries = countries.map((country) => {
    return (
      <li key={country.name.common}>
        {country.name.common}{" "}
        <button onClick={() => setCountry(country)}>show</button>
      </li>
    );
  });

  //returns just one country info
  if (numOfCountries === 1) {
    return (
      <>
        <CountryInfo country={countries[0]} />
        <Weather country={countries[0]} />
      </>
    );
  } // returns list of filter-matched countries with the option to show particular country's info
  else if (numOfCountries < 10) {
    return (
      <>
        <ul>{listCountries}</ul>
        <CountryInfo country={countryToShow} />
        <Weather country={countryToShow} />
      </>
    );
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

export default Content;
