import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS } from "../gql/actions";
import { useEffect, useState } from "react";
import Genres from "./Genres";

const getGenres = (books) => {
  let genres = [];
  books.map((book) => {
    genres = [...genres, ...book.genres];
  });

  return [...new Set(genres)];
};

const Books = (props) => {
  const { loading, data } = useQuery(GET_ALL_BOOKS);
  const [booksToShow, setBooksToShow] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");

  useEffect(() => {
    if (data && data.allBooks) {
      setBooksToShow(data.allBooks);
      const genresToSet = getGenres(data.allBooks);
      setGenres(genresToSet);
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
          {booksToShow
            .filter((b) => b.genres.includes(genreFilter) || genreFilter === "")
            .map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {booksToShow.length > 0 && (
        <Genres genres={genres} filterByGenre={setGenreFilter} />
      )}
    </div>
  );
};

export default Books;
