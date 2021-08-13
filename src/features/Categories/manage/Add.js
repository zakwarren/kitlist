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
  IconButton,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

import { selectCategories, addCategory } from "store/category";

const useStyles = makeStyles((theme) => ({
  form: { padding: theme.spacing(4), display: "flex", flexDirection: "column" },
  close: { position: "absolute", top: 0, right: 0 },
  submit: { margin: "auto", marginTop: theme.spacing(2), width: "10rem" },
}));

export const AddCategory = (props) => {
  const { isOpen, onClose } = props;
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const css = useStyles();

  const initialValues = { name: "" };
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Enter a category name")
      .test(
        "unique",
        "Category already exists",
        (value) =>
          categories.filter((c) => c.name.toLowerCase() === value.toLowerCase())
            .length === 0
      ),
  });
  const onSubmit = (values, { resetForm }) => {
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
      <DialogTitle>Add New Category</DialogTitle>
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
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              className={css.submit}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

AddCategory.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
