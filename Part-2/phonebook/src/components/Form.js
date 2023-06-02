const Form = ({ value, handleSetPersons, handleNameInput, handleNumInput }) => (
  <form onSubmit={handleSetPersons}>
    <label>
      name: <input value={value} onChange={handleNameInput} />
    </label>
    <br />
    <label>
      number: <input onChange={handleNumInput} />
    </label>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default Form;
