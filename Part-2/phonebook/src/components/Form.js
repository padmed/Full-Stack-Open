const Form = ({ value, handleSetPersons, handleInputChange }) => (
  <form onSubmit={handleSetPersons}>
    <div>
      name: <input value={value} onChange={handleInputChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default Form;
