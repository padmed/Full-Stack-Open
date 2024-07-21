import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_AUTHOR, GET_ALL_AUTHORS } from "../gql/actions";

const SetAuthorBirth = ({ show }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const { loading, data } = useQuery(GET_ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    variables: { name, setBornTo: born },
  });

  const submit = (e) => {
    e.preventDefault();

    editAuthor(EDIT_AUTHOR);
    setName("");
    setBorn("");
  };

  const authors = data ? data.allAuthors : [];

  if (!show) {
    return null;
  }
  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name:{" "}
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
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
