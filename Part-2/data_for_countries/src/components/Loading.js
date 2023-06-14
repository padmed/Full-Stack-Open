const Loading = ({ value, countries }) => {
  if (value !== "" && !countries) {
    return <p>Loading...</p>;
  }

  return null;
};

export default Loading;
