import { configureStore } from "@reduxjs/toolkit";

import itemReducer from "./item";
import categoryReducer from "./category";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    item: itemReducer,
  },
});
