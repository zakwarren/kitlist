import { createSlice } from "@reduxjs/toolkit";

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
});

export default itemSlice.reducer;

export const { clearItems, addItem, editItem, deleteItem, toggleItem } =
  itemSlice.actions;

export { selectItems, selectTickedItems } from "./selectors";
