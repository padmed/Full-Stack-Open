import { createSlice } from "@reduxjs/toolkit";
import { getAll, createNew, update } from "../services/anecdotes";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return [...state, ...action.payload];
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map((a) =>
        a.id === updatedAnecdote.id ? updatedAnecdote : a
      );
    },
    saveAnecdote(state, action) {
      return [...state, action.payload];
    },
  },
});

export default anecdotesSlice.reducer;
export const { saveAnecdote, setAnecdotes, updateAnecdote } =
  anecdotesSlice.actions;

export const initAnecdotes = () => {
  return async (dispatch) => {
    const response = await getAll();
    dispatch(setAnecdotes(response));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const response = await createNew(content);
    dispatch(saveAnecdote(response));
  };
};

export const voteAnecdote = (id) => {
  return (dispatch, getState) => {
    const anecdotes = getState().anecdotes;
    const toVote = anecdotes.find((a) => a.id === id);
    const voted = { ...toVote, votes: toVote.votes + 1 };
    dispatch(updateAnecdote(voted));
    update(voted);
  };
};
