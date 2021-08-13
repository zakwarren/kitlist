import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
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
} from "@material-ui/icons";

import { selectCategories } from "store/category";
import { useCoreStyles } from "theme";
import { AddEditCategory } from "./AddEdit";
import { DeleteCategory } from "./Delete";

export const ManageCategories = () => {
  const categories = useSelector(selectCategories);
  const coreCss = useCoreStyles();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const onEditClose = useCallback(() => {
    setIsEditOpen(false);
    setSelected(null);
  }, []);

  const editCategory = useCallback(
    (category) => () => {
      setSelected(category);
      setIsEditOpen(true);
    },
    []
  );

  const onDeleteClose = useCallback(() => {
    setIsDeleteOpen(false);
    setSelected(null);
  }, []);

  const deleteCategory = useCallback(
    (category) => () => {
      setSelected(category);
      setIsDeleteOpen(true);
    },
    []
  );

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Manage Categories
      </Typography>
      <Button startIcon={<AddIcon />} onClick={() => setIsEditOpen(true)}>
        Add New Category
      </Button>
      <Divider />
      <List className={coreCss.list}>
        {categories.map((cat, i) => (
          <ListItem key={i}>
            <ListItemText primary={cat.name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={editCategory(cat)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={deleteCategory(cat)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <AddEditCategory
        isOpen={isEditOpen}
        onClose={onEditClose}
        isEdit={Boolean(selected)}
        category={selected}
      />
      <DeleteCategory
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        category={selected}
      />
    </>
  );
};
