import React from "react";
import { useSelector } from "react-redux";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

import { selectCategories } from "store/category";

export const ManageCategories = () => {
  const categories = useSelector(selectCategories);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Manage Categories
      </Typography>
      <List>
        {categories.map((cat, i) => (
          <ListItem key={i}>
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
