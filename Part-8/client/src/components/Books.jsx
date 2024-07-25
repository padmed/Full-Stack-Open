import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "../gql/actions";
import { useEffect, useState } from "react";
import Genres from "./Genres";

const Books = (props) => {
  const [booksToShow, setBooksToShow] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");
  const { loading, data } = useQuery(GET_ALL_BOOKS, {
    variables: { genre: genreFilter },
  });

  useEffect(() => {
    if (data && data.allBooks) {
      setBooksToShow(data.allBooks);
    }
  }, [data]);

  if (!props.show) {
    return null;
  }

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
          {booksToShow.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {booksToShow.length > 0 && <Genres filterByGenre={setGenreFilter} />}
    </div>
  );
};

export default Books;
