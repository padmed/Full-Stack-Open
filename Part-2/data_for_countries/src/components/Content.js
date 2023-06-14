const Content = ({ countries }) => {
  if (!countries) return null;
  const numOfCountries = countries.length;

  if (numOfCountries > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
};

export default Content;
