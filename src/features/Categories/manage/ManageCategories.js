import React, { useState } from "react";
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
import { AddCategory } from "./Add";

export const ManageCategories = () => {
  const categories = useSelector(selectCategories);
  const coreCss = useCoreStyles();
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Manage Categories
      </Typography>
      <Button startIcon={<AddIcon />} onClick={() => setIsAddOpen(true)}>
        Add New Category
      </Button>
      <Divider />
      <List className={coreCss.list}>
        {categories.map((cat, i) => (
          <ListItem key={i}>
            <ListItemText primary={cat.name} />
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
      <AddCategory isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </>
  );
};
