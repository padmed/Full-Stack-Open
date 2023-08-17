import { useDispatch, useSelector } from "react-redux";
import { voteUp } from "../reducers/anecdoteReducer";
import { writeNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  );

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const handleVote = (anecdote) => {
    dispatch(voteUp(anecdote.id));
    dispatch(writeNotification(`You voted for "${anecdote.content}"`));
  };

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
