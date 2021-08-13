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

import { selectCategories, addCategory, editCategory } from "store/category";

const useStyles = makeStyles({
  form: { display: "flex", flexDirection: "column" },
  close: { position: "absolute", top: 0, right: 0 },
});

export const AddEditCategory = (props) => {
  const { isOpen, onClose, isEdit, category } = props;
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const css = useStyles();

  const initialValues = { name: category?.name || "" };
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Enter a category name")
      .test("unique", "Category already exists", (value) => {
        let existing = [];
        if (isEdit) {
          existing = categories.filter(
            (c) =>
              c.name.toLowerCase() === value.toLowerCase() &&
              c.name.toLowerCase() !== category.name.toLowerCase()
          );
        } else {
          existing = categories.filter(
            (c) => c.name.toLowerCase() === value.toLowerCase()
          );
        }
        return existing.length === 0;
      }),
  });
  const onSubmit = (values, { resetForm }) => {
    if (isEdit) {
      dispatch(editCategory({ oldCategory: category, newCategory: values }));
      onClose();
      return;
    }
    dispatch(addCategory(values));
    resetForm();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="Add category dialog"
      fullWidth
      maxWidth="sm"
    >
      <IconButton className={css.close} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>
        {isEdit ? `Edit ${category.name}` : "Add New"} Category
      </DialogTitle>
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

AddEditCategory.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  category: (props, propName) => {
    if (
      props["isEdit"] === true &&
      (props[propName] === undefined || typeof props[propName] !== "object")
    ) {
      return new Error("category is required when isEdit is true");
    }
  },
};
