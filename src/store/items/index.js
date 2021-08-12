import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    clearItems: () => initialState,
    addItem: (state, action) => void state.push(action.payload),
  },
});

export default itemsSlice.reducer;

export const { clearItems, addItem } = itemsSlice.actions;
