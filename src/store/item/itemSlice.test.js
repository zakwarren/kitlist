import reducer, {
  clearItems,
  clearTicked,
  clearRemoved,
  getItems,
  addItem,
  editItem,
  deleteItem,
  toggleItem,
  removeItem,
} from ".";
import { editCategory, deleteCategory, toggleCategory } from "../category";

describe("items slice", () => {
  const initialState = { items: [], tickedItems: [], removedItems: [] };

  it("should return the initital state when no action type provided", () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(initialState);
  });

  it("should reset to initial state", () => {
    const state = {
      items: [{ name: "test 1" }, { name: "test 2" }],
      tickedItems: ["test 1"],
      removedItems: ["test 2"],
    };
    const newState = reducer(state, { type: clearItems.fulfilled });

    expect(newState).toEqual(initialState);
  });

  it("should clear the ticked items", () => {
    const state = {
      items: [{ name: "test 1" }, { name: "test 2" }],
      tickedItems: ["test 1"],
      removedItems: ["test 2"],
    };
    const newState = reducer(state, { type: clearTicked.type });

    expect(newState).not.toEqual(state);
    expect(newState.items).toHaveLength(state.items.length);
    expect(newState.removedItems).toHaveLength(state.removedItems.length);
    expect(newState.tickedItems).toHaveLength(0);
  });

  it("should clear the removed items", () => {
    const state = {
      items: [{ name: "test 1" }, { name: "test 2" }],
      tickedItems: ["test 1"],
      removedItems: ["test 2"],
    };
    const newState = reducer(state, { type: clearRemoved.type });

    expect(newState).not.toEqual(state);
    expect(newState.items).toHaveLength(state.items.length);
    expect(newState.tickedItems).toHaveLength(state.tickedItems.length);
    expect(newState.removedItems).toHaveLength(0);
  });

  it("should get the items", () => {
    const payload = [
      { name: "test 1", category: "test" },
      { name: "test 2", category: "test" },
    ];
    const newState = reducer(initialState, {
      type: getItems.fulfilled,
      payload,
    });

    expect(newState).not.toEqual(initialState);
    expect(newState.items).toHaveLength(2);
  });

  it("should add an item", () => {
    const payload = { name: "test 1" };
    const newState = reducer(initialState, {
      type: addItem.fulfilled,
      payload,
    });

    expect(newState).not.toEqual(initialState);
    expect(newState.items).toHaveLength(1);
  });

  it("should edit an item", () => {
    const state = {
      items: [{ name: "test 1" }, { name: "test 2" }],
      tickedItems: [],
      removedItems: [],
    };
    const payload = {
      oldItem: { name: "test 1" },
      newItem: { name: "new item" },
    };
    const newState = reducer(state, { type: editItem.fulfilled, payload });

    expect(newState).not.toEqual(state);
    expect(newState.items).toHaveLength(2);
    expect(newState.items[0].name).toEqual("new item");
  });

  it("should delete an item", () => {
    const state = {
      items: [{ name: "test 1" }, { name: "test 2" }],
      tickedItems: [],
      removedItems: [],
    };
    const payload = { name: "test 1" };
    const newState = reducer(state, { type: deleteItem.fulfilled, payload });

    expect(newState).not.toEqual(state);
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].name).toEqual("test 2");
  });

  it("should add a ticked item", () => {
    const payload = { name: "test 1" };
    const newState = reducer(initialState, {
      type: toggleItem.type,
      payload,
    });

    expect(newState).not.toEqual(initialState);
    expect(newState.tickedItems).toHaveLength(1);
    expect(newState.tickedItems[0]).toEqual(payload.name);
  });

  it("should remove a ticked item", () => {
    const payload = { name: "test 1" };
    const state = {
      items: [],
      tickedItems: ["test 1"],
    };
    const newState = reducer(state, { type: toggleItem.type, payload });

    expect(newState).not.toEqual(state);
    expect(newState.tickedItems).toHaveLength(0);
  });

  it("should add a removed item", () => {
    const payload = { name: "test 1" };
    const newState = reducer(initialState, {
      type: removeItem.type,
      payload,
    });

    expect(newState).not.toEqual(initialState);
    expect(newState.removedItems).toHaveLength(1);
    expect(newState.removedItems[0]).toEqual(payload.name);
  });

  it("should remove a removed item", () => {
    const payload = { name: "test 1" };
    const state = {
      items: [],
      removedItems: ["test 1"],
    };
    const newState = reducer(state, { type: removeItem.type, payload });

    expect(newState).not.toEqual(state);
    expect(newState.removedItems).toHaveLength(0);
  });

  it("should update the relevant items when category edited", () => {
    const state = {
      items: [
        { name: "test 1", category: "cat 1" },
        { name: "test 2", category: "cat 1" },
        { name: "test 3", category: "cat 2" },
      ],
      tickedItems: [],
      removedItems: [],
    };
    const payload = {
      oldCategory: { name: "cat 1" },
      newCategory: { name: "catty" },
    };
    const newState = reducer(state, { type: editCategory.fulfilled, payload });

    expect(newState).not.toEqual(state);
    expect(newState.items).toHaveLength(3);
    expect(newState.items[0].category).toEqual("catty");
  });

  it("should remove the relevant items when category deleted", () => {
    const state = {
      items: [
        { name: "test 1", category: "cat 1" },
        { name: "test 2", category: "cat 1" },
        { name: "test 3", category: "cat 2" },
      ],
      tickedItems: [],
      removedItems: [],
    };
    const payload = { name: "cat 1" };
    const newState = reducer(state, {
      type: deleteCategory.fulfilled,
      payload,
    });

    expect(newState).not.toEqual(state);
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].name).toEqual("test 3");
  });

  it("should clear ticked and removed items on category toggle", () => {
    const state = {
      items: [
        { name: "test 1", category: "cat 1" },
        { name: "test 2", category: "cat 1" },
        { name: "test 3", category: "cat 2" },
      ],
      tickedItems: ["test 1"],
      removedItems: ["test 2", "test 3"],
    };
    const payload = { name: "cat 1" };
    const newState = reducer(state, { type: toggleCategory.type, payload });

    expect(newState).not.toEqual(state);
    expect(newState.items).toHaveLength(state.items.length);
    expect(newState.tickedItems).toHaveLength(0);
    expect(newState.removedItems).toHaveLength(1);
    expect(newState.removedItems[0]).toEqual("test 3");
  });
});
