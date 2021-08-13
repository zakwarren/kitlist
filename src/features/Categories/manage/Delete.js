import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

import { deleteCategory } from "store/category";

const useStyles = makeStyles({
  close: { position: "absolute", top: 0, right: 0 },
});

export const DeleteCategory = (props) => {
  const { isOpen, onClose, category } = props;
  const dispatch = useDispatch();
  const css = useStyles();

  const deleteCat = useCallback(() => {
    dispatch(deleteCategory(category));
    onClose();
  }, [dispatch, onClose, category]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="Delete category dialog"
      fullWidth
      maxWidth="sm"
    >
      <IconButton className={css.close} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>Delete Category</DialogTitle>
      <DialogContent>
        Are you sure you want to delete {category?.name}? This will delete any
        items under this category as well.
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={deleteCat}>
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteCategory.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  category: PropTypes.exact({ name: PropTypes.string.isRequired }),
};
