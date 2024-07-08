import { useQuery } from "@apollo/client";
import { GET_ALL_AUTHORS } from "../gql/actions";

const Authors = (props) => {
  if (!props.show) {
    return null;
  }

  const { loading, data } = useQuery(GET_ALL_AUTHORS);

  if (loading && !data) {
    return <h2>Loading...</h2>;
  }

  const authors = data.allAuthors;

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
    </div>
  );
};

export default Authors;
