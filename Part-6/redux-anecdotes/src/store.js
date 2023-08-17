import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";

const reducer = {
  anecdotes: anecdoteReducer,
  filter: filterReducer,
};

const reduxStore = configureStore({ reducer });

export default reduxStore;
