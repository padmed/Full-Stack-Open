import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "../gql/actions";

const Books = (props) => {
  const { loading, data } = useQuery(GET_ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (loading && !data) {
    return <h2>Loading...</h2>;
  }

  const books = data ? data.allBooks : [];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return null;
};

export default Books;
