import deepFreeze from "deep-freeze";
import filterReducer from "./filterReducer";

describe("filterReducer", () => {
  test("should return correct filter string", () => {
    const initialState = "";
    deepFreeze(initialState);

    const action = { type: "FILTER", payload: "filter" };
    const updatedFilter = filterReducer(initialState, action);

    expect(updatedFilter).toBe("filter");
  });
});
