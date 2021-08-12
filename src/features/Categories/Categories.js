import React from "react";
import { useSelector } from "react-redux";
import { List, ListSubheader, ListItem, ListItemText } from "@material-ui/core";

import { selectCategories } from "store/category";

export const Categories = () => {
  const categories = useSelector(selectCategories);

  return (
    <List
      aria-labelledby="category-list"
      subheader={<ListSubheader>Categories</ListSubheader>}
    >
      {categories.map((cat, i) => (
        <ListItem key={i}>
          <ListItemText primary={cat.name} />
        </ListItem>
      ))}
    </List>
  );
};
