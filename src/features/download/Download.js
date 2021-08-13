import React from "react";
import { useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import { SaveAlt as SaveIcon } from "@material-ui/icons";

import { selectCategories, selectTickedCategories } from "store/category";
import { selectItems, selectRemovedItems } from "store/item";

export const DownloadButton = () => {
  const categories = useSelector(selectCategories);
  const tickedCategories = useSelector(selectTickedCategories);
  const items = useSelector(selectItems);
  const removedItems = useSelector(selectRemovedItems);

  const selectedCats = categories.filter((c) =>
    tickedCategories.includes(c.name)
  );
  const catItems = items.filter((i) => tickedCategories.includes(i.category));
  const selectedItems = catItems.filter((i) => !removedItems.includes(i.name));

  const dataToDownload = JSON.stringify({
    categories: selectedCats,
    items: selectedItems,
  });

  return (
    <IconButton
      title="Download"
      aria-label="download button"
      href={`data:text/json;charset=utf-8,${encodeURIComponent(
        dataToDownload
      )}`}
      download="kitlist.json"
    >
      <SaveIcon />
    </IconButton>
  );
};
