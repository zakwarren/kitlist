import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

const items = [{ item: "Test 1" }, { item: "Test 2" }, { item: "Test 3" }];

const useStyles = makeStyles(() => ({
  list: { width: "clamp(360px, 60%, 100%)" },
}));

export const KitList = () => {
  const css = useStyles();
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value.item);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value.item);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List component={Paper} className={css.list}>
      {items.map((item, i) => (
        <ListItem key={i} divider onClick={handleToggle(item)}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked.indexOf(item.item) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": `checkbox-${item.item}` }}
            />
          </ListItemIcon>
          <ListItemText primary={item.item} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};
