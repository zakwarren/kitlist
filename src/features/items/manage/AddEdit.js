import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import {
  makeStyles,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

import { selectItems, addItem, editItem } from "store/item";

const useStyles = makeStyles({
  form: { display: "flex", flexDirection: "column" },
  close: { position: "absolute", top: 0, right: 0 },
});

export const AddEditItem = (props) => {
  const { isOpen, onClose, isEdit, item } = props;
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const css = useStyles();

  const initialValues = { name: item?.name || "" };
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Enter an item name")
      .test("unique", "Item already exists", (value) => {
        let existing = [];
        if (isEdit) {
          existing = items.filter(
            (i) =>
              i.name.toLowerCase() === value.toLowerCase() &&
              i.name.toLowerCase() !== item.name.toLowerCase()
          );
        } else {
          existing = items.filter(
            (i) => i.name.toLowerCase() === value.toLowerCase()
          );
        }
        return existing.length === 0;
      }),
  });
  const onSubmit = (values, { resetForm }) => {
    if (isEdit) {
      dispatch(editItem({ oldItem: item, newItem: values }));
      onClose();
      return;
    }
    dispatch(addItem(values));
    resetForm();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="Add item dialog"
      fullWidth
      maxWidth="sm"
    >
      <IconButton className={css.close} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>{isEdit ? `Edit ${item.name}` : "Add New"} Item</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, handleChange }) => (
            <Form className={css.form}>
              <Field>
                {({ form }) => (
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    value={form.values.name}
                    onChange={handleChange}
                    error={Boolean(form.touched.name && form.errors.name)}
                    helperText={
                      form.touched.name &&
                      form.errors.name &&
                      String(form.errors.name)
                    }
                  />
                )}
              </Field>
              <DialogActions>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

AddEditItem.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  item: (props, propName) => {
    if (
      props["isEdit"] === true &&
      (props[propName] === undefined || typeof props[propName] !== "object")
    ) {
      return new Error("item is required when isEdit is true");
    }
  },
};
