import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "../gql/actions";

const SetAuthorBirth = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    variables: { name, setBornTo: born },
  });

  const submit = (e) => {
    e.preventDefault();

    editAuthor(EDIT_AUTHOR);
    setName("");
    setBorn("");
  };

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name:{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          ></input>
        </div>
        <div>
          born:{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          ></input>
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  );
};

export default SetAuthorBirth;
