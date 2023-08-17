import deepFreeze from "deep-freeze";
import notificationReducer from "./notificationReducer";

describe("notificationReducer", () => {
  test("should return correct notification", () => {
    const initialState = "";
    deepFreeze(initialState);
    const action = {
      type: "notification/writeNotification",
      payload: "notification by test",
    };

    const updatedNotification = notificationReducer(initialState, action);
    expect(updatedNotification).toBe(action.payload);
  });
});
