import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";

import { getCategories, clearSelected, selectCategories } from "store/category";
import { getItems, clearTicked, clearRemoved } from "store/item";
import { MenuItem } from "./MenuItem";

const useStyles = makeStyles({
  title: { textAlign: "center" },
  menu: {
    height: "100%",
    minHeight: "75vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const Menu = () => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const css = useStyles();

  const startList = useCallback(() => {
    dispatch(getCategories());
    dispatch(getItems());
    dispatch(clearSelected());
    dispatch(clearTicked());
    dispatch(clearRemoved());
    push("/list");
  }, [dispatch, push]);
  const continueList = useCallback(() => {
    dispatch(getCategories());
    dispatch(getItems());
    push("/list");
  }, [dispatch, push]);

  return (
    <>
      <Typography variant="h5" gutterBottom className={css.title}>
        Main Menu
      </Typography>
      <section className={css.menu}>
        <MenuItem title="New List" action={startList} />
        {categories.length > 0 && (
          <MenuItem title="Continue List" action={continueList} />
        )}
        <MenuItem title="Upload List" action={() => push("/upload")} />
      </section>
    </>
  );
};
