import reducer, { clearCategories, addCategory, toggleCategory } from ".";

describe("categories slice", () => {
  const initialState = { categories: [], tickedCategories: [] };

  it("should return the initital state when no action type provided", () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(initialState);
  });

  it("should reset to initial state", () => {
    const state = {
      categories: [{ name: "test 1" }, { name: "test 2" }],
      tickedCategories: ["test 1"],
    };
    const newState = reducer(state, { type: clearCategories.type });

    expect(newState).toEqual(initialState);
  });

  it("should add a category", () => {
    const payload = { name: "test 1" };
    const newState = reducer(initialState, { type: addCategory.type, payload });

    expect(newState).not.toEqual(initialState);
    expect(newState.categories).toHaveLength(1);
  });

  it("should add a ticked category", () => {
    const payload = { name: "test 1" };
    const newState = reducer(initialState, {
      type: toggleCategory.type,
      payload,
    });

    expect(newState).not.toEqual(initialState);
    expect(newState.tickedCategories).toHaveLength(1);
    expect(newState.tickedCategories[0]).toEqual(payload.name);
  });

  it("should remove a ticked category", () => {
    const payload = { name: "test 1" };
    const state = {
      categories: [],
      tickedCategories: ["test 1"],
    };
    const newState = reducer(state, { type: toggleCategory.type, payload });

    expect(newState).not.toEqual(state);
    expect(newState.tickedCategories).toHaveLength(0);
  });
});