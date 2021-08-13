import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
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

import { selectItems, selectTickedItems, toggleItem } from "store/item";
import { useCoreStyles } from "theme";

export const KitList = () => {
  const items = useSelector(selectItems);
  const ticked = useSelector(selectTickedItems);
  const dispatch = useDispatch();
  const coreCss = useCoreStyles();

  const handleToggle = useCallback(
    (value) => () => dispatch(toggleItem(value)),
    [dispatch]
  );

  return (
    <List component={Paper} className={coreCss.list}>
      {items.map((item, i) => (
        <ListItem key={i} divider onClick={handleToggle(item)}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={ticked.includes(item.name)}
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
