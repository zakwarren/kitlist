import { createSelector } from "@reduxjs/toolkit";

const getItem = (state) => state.item;

export const selectItems = createSelector(getItem, (item) => item.items);

export const selectTickedItems = createSelector(
  getItem,
  (item) => item.tickedItems
);

export const selectRemovedItems = createSelector(
  getItem,
  (item) => item.removedItems
);
