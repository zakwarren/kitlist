import Dexie from "dexie";

const db = new Dexie("KitList");

db.version(1).stores({
  category: "++id, name",
  item: "++id, name, category",
});

export default db;
