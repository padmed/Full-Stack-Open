import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    writeNotification(state, action) {
      return action.payload;
    },
    hideNotification(state, action) {
      return "";
    },
  },
});

export default notificationSlice.reducer;
export const { writeNotification, hideNotification } =
  notificationSlice.actions;

let timeoutId;
export const setNotification = (content, time) => {
  return (dispatch) => {
    const seconds = time * 1000;
    dispatch(writeNotification(content));
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      dispatch(hideNotification());
    }, seconds);
  };
};
