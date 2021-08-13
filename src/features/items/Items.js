import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Typography,
  ButtonGroup,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import {
  AddCircleOutline as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Category as CategoryIcon,
} from "@material-ui/icons";

import { selectItems } from "store/item";
import { useCoreStyles } from "theme";

export const Items = () => {
  const items = useSelector(selectItems);
  const { push } = useHistory();
  const coreCss = useCoreStyles();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Manage Items
      </Typography>
      <ButtonGroup variant="text">
        <Button startIcon={<AddIcon />}>Add New Item</Button>
        <Button
          startIcon={<CategoryIcon />}
          onClick={() => push("/categories")}
        >
          Manage Categories
        </Button>
      </ButtonGroup>
      <Divider />
      <List className={coreCss.list}>
        {items.map((item, i) => (
          <ListItem key={i} divider>
            <ListItemText primary={item.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};
