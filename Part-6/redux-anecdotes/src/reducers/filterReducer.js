import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterSearch(state, action) {
      return action.payload;
    },
  },
});

export const { filterSearch } = filterSlice.actions;
export default filterSlice.reducer;
