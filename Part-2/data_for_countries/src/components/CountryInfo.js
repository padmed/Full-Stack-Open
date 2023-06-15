const CountryInfo = ({ country }) => {
  const languages = Object.values(country.languages).map((language) => (
    <li key={language}> {language}</li>
  ));

  const imgStyle = {
    width: "10%",
  };

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        Capital: {country.capital}
        <br />
        Area:{country.area}
      </p>
      <b>Languages:</b>
      <ul>{languages}</ul>
      <img style={imgStyle} src={country.flags.svg} alt={country.flags.alt} />
    </div>
  );
};

export default CountryInfo;
