import { useQuery } from "@apollo/client";
import { GET_GENRES } from "../gql/actions";
import { useEffect, useState } from "react";

const getGenresSet = (data) => {
  const bookData = data.allBooks;

  let genresSet = [];
  bookData.map((book) => {
    genresSet = [...genresSet, ...book.genres];
  });

  return [...new Set(genresSet)];
};

const Genres = ({ filterByGenre }) => {
  const { data } = useQuery(GET_GENRES);
  const [genresToShow, setGenresToShow] = useState([]);

  useEffect(() => {
    if (data) {
      setGenresToShow(getGenresSet(data));
    }
  }, [data]);

  return (
    <>
      <h3>Genres: </h3>
      <div>
        {genresToShow.map((genre) => (
          <button onClick={() => filterByGenre(genre)} key={genre}>
            {genre}
          </button>
        ))}
        <button onClick={() => filterByGenre("")}>show all</button>
      </div>
    </>
  );
};

export default Genres;
