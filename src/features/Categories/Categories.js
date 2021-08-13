import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from "@material-ui/core";

import {
  selectCategories,
  selectTickedCategories,
  toggleCategory,
} from "store/category";

export const Categories = () => {
  const categories = useSelector(selectCategories);
  const ticked = useSelector(selectTickedCategories);
  const dispatch = useDispatch();

  return (
    <List
      aria-labelledby="category-list"
      subheader={<ListSubheader>Categories</ListSubheader>}
    >
      {categories.map((cat, i) => (
        <ListItem key={i}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={ticked.includes(cat.name)}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": `checkbox-${cat.name}` }}
              onClick={() => dispatch(toggleCategory(cat))}
            />
          </ListItemIcon>
          <ListItemText primary={cat.name} />
        </ListItem>
      ))}
    </List>
  );
};
