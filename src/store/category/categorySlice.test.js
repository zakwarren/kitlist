import reducer, {
  clearCategories,
  clearSelected,
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
  toggleCategory,
  uploadCategories,
} from ".";

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
    const newState = reducer(state, { type: clearCategories.fulfilled });

    expect(newState).toEqual(initialState);
  });

  it("should clear the ticked categories", () => {
    const state = {
      categories: [{ name: "test 1" }, { name: "test 2" }],
      tickedCategories: ["test 1"],
    };
    const newState = reducer(state, { type: clearSelected.type });

    expect(newState).not.toEqual(state);
    expect(newState.categories).toHaveLength(state.categories.length);
    expect(newState.tickedCategories).toHaveLength(0);
  });

  it("should get the categories", () => {
    const payload = [{ name: "test 1" }, { name: "test 2" }];
    const newState = reducer(initialState, {
      type: getCategories.fulfilled,
      payload,
    });

    expect(newState).not.toEqual(initialState);
    expect(newState.categories).toHaveLength(2);
  });

  it("should add a category", () => {
    const payload = { name: "test 1" };
    const newState = reducer(initialState, {
      type: addCategory.fulfilled,
      payload,
    });

    expect(newState).not.toEqual(initialState);
    expect(newState.categories).toHaveLength(1);
  });

  it("should edit a category", () => {
    const state = {
      categories: [{ name: "test 1" }, { name: "test 2" }],
      tickedCategories: [],
    };
    const payload = {
      oldCategory: { name: "test 1" },
      newCategory: { name: "new category" },
    };
    const newState = reducer(state, { type: editCategory.fulfilled, payload });

    expect(newState).not.toEqual(state);
    expect(newState.categories).toHaveLength(2);
    expect(newState.categories[0].name).toEqual("new category");
  });

  it("should delete a category", () => {
    const state = {
      categories: [{ name: "test 1" }, { name: "test 2" }],
      tickedCategories: [],
    };
    const payload = { name: "test 1" };
    const newState = reducer(state, {
      type: deleteCategory.fulfilled,
      payload,
    });

    expect(newState).not.toEqual(state);
    expect(newState.categories).toHaveLength(1);
    expect(newState.categories[0].name).toEqual("test 2");
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

  it("should set categories and ticked categories on upload", () => {
    const payload = [{ name: "test 1" }, { name: "test 2" }];
    const newState = reducer(initialState, {
      type: uploadCategories.type,
      payload,
    });

    expect(newState).not.toEqual(initialState);
    expect(newState.categories).toHaveLength(2);
    expect(newState.tickedCategories).toHaveLength(2);
  });
});
