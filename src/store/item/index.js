import { createSlice } from "@reduxjs/toolkit";

import { editCategory, deleteCategory } from "../category";

const initialState = { items: [], tickedItems: [] };

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    clearItems: () => initialState,
    addItem: (state, action) => void state.items.push(action.payload),
    editItem: (state, action) => {
      const { oldItem, newItem } = action.payload;
      const existingIndex = state.items.findIndex(
        (i) => i.name === oldItem.name
      );
      state.items[existingIndex] = newItem;
    },
    deleteItem: (state, action) => {
      const item = action.payload;
      const filtered = state.items.filter((i) => i.name !== item.name);
      state.items = filtered;
    },
    toggleItem: (state, action) => {
      const item = action.payload;
      const existing = state.tickedItems.find((i) => i === item.name);
      if (existing) {
        return {
          ...state,
          tickedItems: state.tickedItems.filter((i) => i !== item.name),
        };
      }
      state.tickedItems.push(item.name);
    },
  },
  extraReducers: {
    [editCategory.type]: (state, action) => {
      const oldCat = action.payload.oldCategory.name;
      const newCat = action.payload.newCategory.name;
      const items = state.items.map((i) => {
        if (i.category === oldCat) {
          return { ...i, category: newCat };
        }
        return i;
      });
      state.items = items;
    },
    [deleteCategory.type]: (state, action) => {
      const catName = action.payload.name;
      const withCat = state.items.filter((i) => i.category === catName);
      const withCatNames = withCat.map((i) => i.name);
      const ticked = state.tickedItems.filter((i) => !withCatNames.includes(i));
      const filtered = state.items.filter((i) => i.category !== catName);
      return { items: filtered, tickedItems: ticked };
    },
  },
});

export default itemSlice.reducer;

export const { clearItems, addItem, editItem, deleteItem, toggleItem } =
  itemSlice.actions;

export { selectItems, selectTickedItems } from "./selectors";
