import { createSlice } from "@reduxjs/toolkit";

const initialState = { categories: [], tickedCategories: [] };

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategories: () => initialState,
    addCategory: (state, action) => void state.categories.push(action.payload),
    editCategory: (state, action) => {
      const { oldCategory, newCategory } = action.payload;
      const existingIndex = state.categories.findIndex(
        (c) => c.name === oldCategory.name
      );
      state.categories[existingIndex] = newCategory;
    },
    deleteCategory: (state, action) => {
      const cat = action.payload;
      const filtered = state.categories.filter((c) => c.name !== cat.name);
      state.categories = filtered;
    },
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
});

export default categorySlice.reducer;

export const {
  clearCategories,
  addCategory,
  editCategory,
  deleteCategory,
  toggleCategory,
} = categorySlice.actions;

export { selectCategories, selectTickedCategories } from "./selectors";
