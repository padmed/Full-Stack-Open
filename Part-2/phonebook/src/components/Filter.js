const Filter = ({ handleFilterStr, value }) => {
  return (
    <label>
      filter shown with <input onChange={handleFilterStr} value={value} />
    </label>
  );
};

export default Filter;
