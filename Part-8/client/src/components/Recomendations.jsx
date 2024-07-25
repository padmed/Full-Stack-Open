import { useQuery } from "@apollo/client";
import { CURRENT_USER, GET_ALL_BOOKS } from "../gql/actions";
import { useEffect, useState } from "react";

const Recomendations = ({ show }) => {
  const currentUser = useQuery(CURRENT_USER);
  const [favoriteGenre, setFavoriteGenre] = useState("");

  useEffect(() => {
    if (currentUser.data && !currentUser.loading) {
      setFavoriteGenre(currentUser.data.me.favoriteGenre);
    }
  }, [currentUser.data, currentUser.loading]);

  const recommendations = useQuery(GET_ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: favoriteGenre === "",
    onError: (e) => {
      console.log(e.message);
    },
  });

  if (!show) {
    return null;
  }

  if (currentUser.loading || recommendations.loading) {
    return <h3>...loading</h3>;
  }

  return (
    <>
      <h2>Recommendations</h2>
      <h4>Books in your favorite genre: {favoriteGenre}</h4>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendations.data.allBooks.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Recomendations;
