import deepFreeze from "deep-freeze";
import reducer from "./anecdoteReducer";

describe("anecdoteReducer", () => {
  test("should add new anecdote to a state", () => {
    const initialState = [];
    deepFreeze(initialState);

    const newAnecdote = {
      content: "anecdote 1",
      id: 1,
      votes: 0,
    };

    const action = {
      type: "NEW_ANECDOTE",
      payload: {
        newAnecdote,
      },
    };

    const updatedState = reducer(initialState, action);
    expect(updatedState).toHaveLength(1);
    expect(updatedState).toContainEqual(newAnecdote);
  });

  test("should increment number of likes on like", () => {
    const initialState = [
      {
        content: "anecdote 1",
        id: 1,
        votes: 0,
      },
      {
        content: "anecdote 2",
        id: 2,
        votes: 0,
      },
    ];

    deepFreeze(initialState);

    const action = {
      type: "VOTE",
      payload: {
        id: initialState[1].id,
      },
    };

    const updatedState = reducer(initialState, action);
    expect(updatedState).toHaveLength(2);
    expect(updatedState[1].votes).toBe(1);
    expect(updatedState[0]).toEqual(initialState[0]);
  });
});
