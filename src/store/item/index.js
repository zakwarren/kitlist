import { createSlice } from "@reduxjs/toolkit";

import { clearItems, getItems, addItem, editItem, deleteItem } from "./thunks";
import { editCategory, deleteCategory } from "../category";

const initialState = { items: [], tickedItems: [] };

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
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
    [clearItems.fulfilled]: () => initialState,
    [getItems.fulfilled]: (state, action) =>
      void (state.items = action.payload),
    [addItem.fulfilled]: (state, action) =>
      void state.items.push(action.payload),
    [editItem.fulfilled]: (state, action) => {
      const { oldItem, newItem } = action.payload;
      const existingIndex = state.items.findIndex(
        (i) => i.name === oldItem.name
      );
      state.items[existingIndex] = newItem;
    },
    [deleteItem.fulfilled]: (state, action) => {
      const item = action.payload;
      const filtered = state.items.filter((i) => i.name !== item.name);
      state.items = filtered;
    },
    [editCategory.fulfilled]: (state, action) => {
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
    [deleteCategory.fulfilled]: (state, action) => {
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

export const { toggleItem } = itemSlice.actions;

export { clearItems, getItems, addItem, editItem, deleteItem };

export { selectItems, selectTickedItems } from "./selectors";
