import reducer, { clearItems, addItem } from ".";

describe("items slice", () => {
  const initialState = [];

  it("should return the initital state when no action type provided", () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(initialState);
  });

  it("should reset to initial state", () => {
    const state = ["test 1", "test 2"];
    const newState = reducer(state, { type: clearItems.type });

    expect(newState).toEqual(initialState);
  });

  it("should add an item", () => {
    const payload = "test 1";
    const newState = reducer(initialState, { type: addItem.type, payload });

    expect(newState).not.toEqual(initialState);
    expect(newState).toHaveLength(1);
  });
});
