import { createAsyncThunk } from "@reduxjs/toolkit";
import db from "../db";

export const clearItems = createAsyncThunk(
  "item/clear",
  async () => await db.item.clear()
);

export const getItems = createAsyncThunk("item/get", async () => {
  const stored = await db.item.toArray();
  return stored;
});

export const addItem = createAsyncThunk("item/add", async (item) => {
  await db.item.add(item);
  return item;
});

export const editItem = createAsyncThunk(
  "item/edit",
  async ({ oldItem, newItem }) => {
    const stored = await db.item.get({ name: oldItem.name });
    await db.item.update(stored.id, newItem);
    return { oldItem, newItem };
  }
);

export const deleteItem = createAsyncThunk("item/delete", async (item) => {
  await db.item.where("name").equals(item.name).delete();
  return item;
});
