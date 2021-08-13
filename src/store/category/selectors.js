import { createSelector } from "@reduxjs/toolkit";

const getCategory = (state) => state.category;

export const selectCategories = createSelector(
  getCategory,
  (category) => category.categories
);

export const selectTickedCategories = createSelector(
  getCategory,
  (category) => category.tickedCategories
);
