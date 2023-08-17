import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    writeNotification(state, action) {
      return action.payload;
    },
  },
});

export default notificationSlice.reducer;
export const { writeNotification } = notificationSlice.actions;
