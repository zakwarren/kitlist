import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";

import {
  selectCategories,
  selectTickedCategories,
  toggleCategory,
} from "store/category";

const useStyles = makeStyles({
  header: { display: "flex", justifyContent: "space-between" },
});

export const Categories = () => {
  const categories = useSelector(selectCategories);
  const ticked = useSelector(selectTickedCategories);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const css = useStyles();

  return (
    <List
      aria-labelledby="category-list"
      subheader={
        <ListSubheader className={css.header}>
          Categories{" "}
          <IconButton
            size="small"
            title="Edit Categories"
            onClick={() => push("/categories")}
          >
            <EditIcon />
          </IconButton>
        </ListSubheader>
      }
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
