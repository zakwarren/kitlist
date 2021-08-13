import reducer, {
  clearItems,
  addItem,
  editItem,
  deleteItem,
  toggleItem,
} from ".";
import { editCategory, deleteCategory } from "../category";

describe("items slice", () => {
  const initialState = { items: [], tickedItems: [] };

  it("should return the initital state when no action type provided", () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(initialState);
  });

  it("should reset to initial state", () => {
    const state = {
      items: [{ name: "test 1" }, { name: "test 2" }],
      tickedItems: ["test 1"],
    };
    const newState = reducer(state, { type: clearItems.type });

    expect(newState).toEqual(initialState);
  });

  it("should add an item", () => {
    const payload = { name: "test 1" };
    const newState = reducer(initialState, { type: addItem.type, payload });

    expect(newState).not.toEqual(initialState);
    expect(newState.items).toHaveLength(1);
  });

  it("should edit an item", () => {
    const state = {
      items: [{ name: "test 1" }, { name: "test 2" }],
      tickedItems: [],
    };
    const payload = {
      oldItem: { name: "test 1" },
      newItem: { name: "new item" },
    };
    const newState = reducer(state, { type: editItem.type, payload });

    expect(newState).not.toEqual(state);
    expect(newState.items).toHaveLength(2);
    expect(newState.items[0].name).toEqual("new item");
  });

  it("should delete an item", () => {
    const state = {
      items: [{ name: "test 1" }, { name: "test 2" }],
      tickedItems: [],
    };
    const payload = { name: "test 1" };
    const newState = reducer(state, { type: deleteItem.type, payload });

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

  it("should update the relevant items when category edited", () => {
    const state = {
      items: [
        { name: "test 1", category: "cat 1" },
        { name: "test 2", category: "cat 1" },
        { name: "test 3", category: "cat 2" },
      ],
      tickedItems: [],
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
    };
    const payload = { name: "cat 1" };
    const newState = reducer(state, { type: deleteCategory.fulfilled, payload });

    expect(newState).not.toEqual(state);
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0].name).toEqual("test 3");
  });
});
