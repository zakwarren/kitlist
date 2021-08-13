import React, { useState, useCallback } from "react";
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
import { AddEditItem, DeleteItem } from "./manage";

export const Items = () => {
  const items = useSelector(selectItems);
  const { push } = useHistory();
  const coreCss = useCoreStyles();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const closeEdit = useCallback(() => {
    setIsEditOpen(false);
    setSelected(null);
  }, []);
  const editItem = useCallback(
    (item) => () => {
      setSelected(item);
      setIsEditOpen(true);
    },
    []
  );

  const closeDelete = useCallback(() => {
    setIsDeleteOpen(false);
    setSelected(null);
  }, []);
  const deleteItem = useCallback(
    (item) => () => {
      setSelected(item);
      setIsDeleteOpen(true);
    },
    []
  );

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Manage Items
      </Typography>
      <ButtonGroup variant="text">
        <Button startIcon={<AddIcon />} onClick={() => setIsEditOpen(true)}>
          Add New Item
        </Button>
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
              <IconButton edge="end" aria-label="edit" onClick={editItem(item)}>
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={deleteItem(item)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <AddEditItem
        isOpen={isEditOpen}
        onClose={closeEdit}
        isEdit={Boolean(selected)}
        item={selected}
      />
      <DeleteItem isOpen={isDeleteOpen} onClose={closeDelete} item={selected} />
    </>
  );
};
