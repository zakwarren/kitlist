import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCategories } from "store/category";

export const useData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
};
