const Form = ({
  nameValue,
  numValue,
  handleSetPersons,
  handleNameInput,
  handleNumInput,
}) => (
  <form onSubmit={handleSetPersons}>
    <label>
      name: <input value={nameValue} onChange={handleNameInput} />
    </label>
    <br />
    <label>
      number: <input value={numValue} onChange={handleNumInput} />
    </label>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default Form;
