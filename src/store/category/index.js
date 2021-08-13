import { createSlice } from "@reduxjs/toolkit";

const initialState = { categories: [], tickedCategories: [] };

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategories: () => initialState,
    addCategory: (state, action) => void state.categories.push(action.payload),
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

export const { clearCategories, addCategory, toggleCategory } =
  categorySlice.actions;

export { selectCategories, selectTickedCategories } from "./selectors";
