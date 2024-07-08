import { useQuery } from "@apollo/client";
import { GET_ALL_AUTHORS } from "../gql/actions";
import SetAuthorBirth from "./SetAuthorBirth";

const Authors = (props) => {
  const { loading, data } = useQuery(GET_ALL_AUTHORS);

  if (!props.show) {
    return null;
  }
  if (loading && !data) {
    return <h2>Loading...</h2>;
  }

  const authors = data ? data.allAuthors : [];

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetAuthorBirth authors={authors} />
    </div>
  );
};

export default Authors;
