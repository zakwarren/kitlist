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
import {
  Visibility as ShowIcon,
  VisibilityOff as HideIcon,
  RadioButtonUnchecked as UncheckIcon,
} from "@material-ui/icons";

import { selectTickedCategories } from "store/category";
import {
  selectItems,
  selectTickedItems,
  selectRemovedItems,
  toggleItem,
  removeItem,
  clearTicked,
  clearRemoved,
} from "store/item";
import { useCoreStyles } from "theme";
import { DownloadButton } from "../download";

const useStyles = makeStyles({
  ticked: { textDecoration: "line-through" },
});

export const KitList = () => {
  const items = useSelector(selectItems);
  const tickedItems = useSelector(selectTickedItems);
  const removedItems = useSelector(selectRemovedItems);
  const tickedCategories = useSelector(selectTickedCategories);
  const dispatch = useDispatch();
  const coreCss = useCoreStyles();
  const css = useStyles();

  const handleToggle = useCallback(
    (value) => () => dispatch(toggleItem(value)),
    [dispatch]
  );
  const handleRemove = useCallback(
    (value) => () => dispatch(removeItem(value)),
    [dispatch]
  );

  const categoryItems = items.filter((i) =>
    tickedCategories.includes(i.category)
  );

  const itemsToDisplay = categoryItems.filter(
    (i) => !removedItems.includes(i.name)
  );

  if (itemsToDisplay.length === 0) {
    return (
      <Typography variant="h5" gutterBottom>
        Select a category to begin
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Check items off as you pack
      </Typography>
      <div>
        <IconButton
          title="Uncheck All"
          aria-label="uncheck all button"
          onClick={() => dispatch(clearTicked())}
        >
          <UncheckIcon />
        </IconButton>
        <IconButton
          title="Show All"
          aria-label="show all button"
          onClick={() => dispatch(clearRemoved())}
        >
          <ShowIcon />
        </IconButton>
        <DownloadButton />
      </div>
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
              <IconButton
                title={`Hide ${item.name}`}
                edge="end"
                aria-label="hide"
                onClick={handleRemove(item)}
              >
                <HideIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};
