import { createSlice } from "@reduxjs/toolkit";

import {
  clearCategories,
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
} from "./thunks";

const initialState = { categories: [], tickedCategories: [] };

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearSelected: (state) => void (state.tickedCategories = []),
    toggleCategory: (state, action) => {
      const cat = action.payload;
      const existing = state.tickedCategories.find((c) => c === cat.name);
      if (existing) {
        return {
          ...state,
          tickedCategories: state.tickedCategories.filter(
            (c) => c !== cat.name
          ),
        };
      }
      state.tickedCategories.push(cat.name);
    },
  },
  extraReducers: {
    [clearCategories.fulfilled]: () => initialState,
    [getCategories.fulfilled]: (state, action) =>
      void (state.categories = action.payload),
    [addCategory.fulfilled]: (state, action) =>
      void state.categories.push(action.payload),
    [editCategory.fulfilled]: (state, action) => {
      const { oldCategory, newCategory } = action.payload;
      const existingIndex = state.categories.findIndex(
        (c) => c.name === oldCategory.name
      );
      state.categories[existingIndex] = newCategory;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      const cat = action.payload;
      const filtered = state.categories.filter((c) => c.name !== cat.name);
      state.categories = filtered;
    },
  },
});

export default categorySlice.reducer;

export const { clearSelected, toggleCategory } = categorySlice.actions;

export {
  clearCategories,
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
};

export { selectCategories, selectTickedCategories } from "./selectors";
