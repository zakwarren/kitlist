import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  Typography,
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

import { selectTickedCategories } from "store/category";
import { selectItems, selectTickedItems, toggleItem } from "store/item";
import { useCoreStyles } from "theme";

const useStyles = makeStyles({
  ticked: { textDecoration: "line-through" },
});

export const KitList = () => {
  const items = useSelector(selectItems);
  const tickedItems = useSelector(selectTickedItems);
  const tickedCategories = useSelector(selectTickedCategories);
  const dispatch = useDispatch();
  const coreCss = useCoreStyles();
  const css = useStyles();

  const handleToggle = useCallback(
    (value) => () => dispatch(toggleItem(value)),
    [dispatch]
  );

  const itemsToDisplay = items.filter((i) =>
    tickedCategories.includes(i.category)
  );

  if (itemsToDisplay.length === 0) {
    return (
      <Typography variant="h5" gutterBottom>
        Select a category to begin
      </Typography>
    );
  }

  return (
    <List component={Paper} className={coreCss.list}>
      {itemsToDisplay.map((item, i) => (
        <ListItem
          key={i}
          divider
          onClick={handleToggle(item)}
          selected={tickedItems.includes(item.name)}
          classes={{ selected: css.ticked }}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={tickedItems.includes(item.name)}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": `checkbox-${item.item}` }}
            />
          </ListItemIcon>
          <ListItemText primary={item.name} secondary={item.category} />
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
