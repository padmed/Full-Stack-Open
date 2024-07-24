const Genres = ({ genres, filterByGenre }) => {
  return (
    <>
      <h3>Genres: </h3>
      <div>
        {genres.map((genre) => (
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
