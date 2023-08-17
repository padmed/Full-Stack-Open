import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = {
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer,
};

const reduxStore = configureStore({ reducer });

export default reduxStore;
