import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategories: () => initialState,
    addCategory: (state, action) => void state.push(action.payload),
  },
});

export default categorySlice.reducer;

export const { clearCategories, addCategory } = categorySlice.actions;
