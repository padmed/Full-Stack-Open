const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER":
      return action.payload;

    default:
      return state;
  }
};

export const filterAnecdoteAction = (filterStr) => {
  return {
    type: "FILTER",
    payload: filterStr,
  };
};

export default filterReducer;
