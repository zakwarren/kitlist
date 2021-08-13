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

export const ManageCategories = () => {
  const categories = useSelector(selectCategories);
  const coreCss = useCoreStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const onClose = useCallback(() => {
    setIsOpen(false);
    setSelected(null);
  }, []);

  const selectCategory = useCallback(
    (category) => () => {
      setSelected(category);
      setIsOpen(true);
    },
    []
  );

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Manage Categories
      </Typography>
      <Button startIcon={<AddIcon />} onClick={() => setIsOpen(true)}>
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
                onClick={selectCategory(cat)}
              >
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <AddEditCategory
        isOpen={isOpen}
        onClose={onClose}
        isEdit={Boolean(selected)}
        category={selected}
      />
    </>
  );
};
