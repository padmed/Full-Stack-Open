import CountryInfo from "./CountryInfo";

const Content = ({ countries }) => {
  if (!countries) return null;
  const numOfCountries = countries.length;

  const countryNames = countries.map((country) => {
    return <li key={country.name.common}>{country.name.common}</li>;
  });

  if (numOfCountries === 1) {
    return <CountryInfo country={countries[0]} />;
  } else if (numOfCountries < 10) {
    return <ul>{countryNames}</ul>;
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

export default Content;
