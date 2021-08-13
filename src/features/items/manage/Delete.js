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

import { deleteItem } from "store/item";

const useStyles = makeStyles({
  close: { position: "absolute", top: 0, right: 0 },
});

export const DeleteItem = (props) => {
  const { isOpen, onClose, item } = props;
  const dispatch = useDispatch();
  const css = useStyles();

  const deleteItm = useCallback(() => {
    dispatch(deleteItem(item));
    onClose();
  }, [dispatch, onClose, item]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="Delete item dialog"
      fullWidth
      maxWidth="sm"
    >
      <IconButton className={css.close} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>Delete Item</DialogTitle>
      <DialogContent>
        Are you sure you want to delete {item?.name}?
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={deleteItm}>
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteItem.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
};
