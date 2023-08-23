import { createSlice } from "@reduxjs/toolkit";
import { getAll, createNew } from "../services/anecdotes";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return [...state, ...action.payload];
    },
    voteUp(state, action) {
      const anecdoteToVote = state.find((a) => a.id === action.payload);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };

      return state.map((a) => (a.id === action.payload ? votedAnecdote : a));
    },
    saveAnecdote(state, action) {
      return [...state, action.payload];
    },
  },
});

export default anecdotesSlice.reducer;
export const { voteUp, saveAnecdote, setAnecdotes } = anecdotesSlice.actions;

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
