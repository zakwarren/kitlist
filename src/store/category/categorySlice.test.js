import reducer, { clearCategories, addCategory } from ".";

describe("categories slice", () => {
  const initialState = [];

  it("should return the initital state when no action type provided", () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(initialState);
  });

  it("should reset to initial state", () => {
    const state = ["test 1", "test 2"];
    const newState = reducer(state, { type: clearCategories.type });

    expect(newState).toEqual(initialState);
  });

  it("should add a category", () => {
    const payload = "test 1";
    const newState = reducer(initialState, { type: addCategory.type, payload });

    expect(newState).not.toEqual(initialState);
    expect(newState).toHaveLength(1);
  });
});
