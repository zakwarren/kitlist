import { createAsyncThunk } from "@reduxjs/toolkit";
import db from "../db";

export const clearCategories = createAsyncThunk(
  "category/clear",
  async () => await db.category.clear()
);

export const getCategories = createAsyncThunk("category/get", async () => {
  const stored = await db.category.toArray();
  return stored;
});

export const addCategory = createAsyncThunk(
  "category/add",
  async (category) => {
    await db.category.add(category);
    return category;
  }
);

export const editCategory = createAsyncThunk(
  "category/edit",
  async ({ oldCategory, newCategory }) => {
    const stored = await db.category.get({ name: oldCategory.name });
    await db.category.update(stored.id, newCategory);
    return { oldCategory, newCategory };
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (category) => {
    await db.category.where("name").equals(category.name).delete();
    return category;
  }
);
