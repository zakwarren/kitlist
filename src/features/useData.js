import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCategories } from "store/category";
import { getItems } from "store/item";

export const useData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getItems());
  }, [dispatch]);
};
