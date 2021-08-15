import { createSlice } from "@reduxjs/toolkit";

import { clearItems, getItems, addItem, editItem, deleteItem } from "./thunks";
import { editCategory, deleteCategory, toggleCategory } from "../category";

const initialState = { items: [], tickedItems: [], removedItems: [] };

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    clearTicked: (state) => void (state.tickedItems = []),
    clearRemoved: (state) => void (state.removedItems = []),
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
    removeItem: (state, action) => {
      const item = action.payload;
      const existing = state.removedItems.find((i) => i === item.name);
      if (existing) {
        return {
          ...state,
          removedItems: state.removedItems.filter((i) => i !== item.name),
        };
      }
      state.removedItems.push(item.name);
    },
    uploadItems: (state, action) => void (state.items = action.payload),
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

      const tickedItems = state.tickedItems.map((ti) => {
        if (ti === oldItem.name) {
          return newItem.name;
        }
        return ti;
      });
      const removedItems = state.removedItems.map((ri) => {
        if (ri === oldItem.name) {
          return newItem.name;
        }
        return ri;
      });

      state.items[existingIndex] = newItem;
      state.tickedItems = tickedItems;
      state.removedItems = removedItems;
    },
    [deleteItem.fulfilled]: (state, action) => {
      const item = action.payload;
      const filtered = state.items.filter((i) => i.name !== item.name);
      const tickedItems = state.tickedItems.filter((ti) => ti !== item.name);
      const removedItems = state.removedItems.filter((ri) => ri !== item.name);
      return { ...state, items: filtered, tickedItems, removedItems };
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
    [toggleCategory.type]: (state, action) => {
      const cat = action.payload;
      const withCat = state.items.filter((i) => i.category === cat.name);
      const withCatNames = withCat.map((i) => i.name);
      const tickedItems = state.tickedItems.filter(
        (ti) => !withCatNames.includes(ti)
      );
      const removedItems = state.removedItems.filter(
        (ri) => !withCatNames.includes(ri)
      );
      return { ...state, tickedItems, removedItems };
    },
  },
});

export default itemSlice.reducer;

export const {
  clearTicked,
  clearRemoved,
  toggleItem,
  removeItem,
  uploadItems,
} = itemSlice.actions;

export { clearItems, getItems, addItem, editItem, deleteItem };

export {
  selectItems,
  selectTickedItems,
  selectRemovedItems,
} from "./selectors";
