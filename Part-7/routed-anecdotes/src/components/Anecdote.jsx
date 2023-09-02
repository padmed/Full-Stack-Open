import PropTypes from "prop-types";

const Anecdote = ({ anecdoteToShow }) => {
  return (
    <div>
      <h1>{anecdoteToShow.content}</h1>
      <p>has {anecdoteToShow.votes} votes</p>
      <p>
        for more info see{" "}
        <a href={anecdoteToShow.info}>{anecdoteToShow.info}</a>
      </p>
    </div>
  );
};

Anecdote.propTypes = {
  anecdoteToShow: PropTypes.object,
};
export default Anecdote;
