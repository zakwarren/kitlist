import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    clearItems: () => initialState,
    addItem: (state, action) => void state.push(action.payload),
  },
});

export default itemSlice.reducer;

export const { clearItems, addItem } = itemSlice.actions;
