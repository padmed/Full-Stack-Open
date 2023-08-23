import { useDispatch } from "react-redux";
import { saveAnecdote } from "../reducers/anecdoteReducer";
import { writeNotification } from "../reducers/notificationReducer";
import { createNew } from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const newAnecdote = await createNew(content);
    dispatch(saveAnecdote(newAnecdote));
    dispatch(writeNotification(`Anecdote added: ${content}`));
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
