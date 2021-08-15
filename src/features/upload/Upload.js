import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { DropzoneArea } from "material-ui-dropzone";
import { Typography } from "@material-ui/core";

import { uploadCategories } from "store/category";
import { uploadItems } from "store/item";

const readFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onabort = reject;
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsText(file);
  });

export const Upload = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const onRejected = () => {
    enqueueSnackbar("An error occurred", {
      variant: "error",
      id: "error-upload",
    });
  };

  const parseFile = async (files) => {
    try {
      const rawJson = await readFile(files[0]);
      const result = JSON.parse(rawJson);

      enqueueSnackbar("File successfully uploaded", {
        variant: "success",
        id: "success-upload",
      });

      dispatch(uploadCategories(result.categories));
      dispatch(uploadItems(result.items));
    } catch (error) {
      onRejected();
    } finally {
      setTimeout(() => push("/list"), 500);
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Upload List
      </Typography>
      <DropzoneArea
        acceptedFiles={["application/json"]}
        showAlerts={false}
        onDrop={parseFile}
        onDropRejected={onRejected}
      />
    </>
  );
};
