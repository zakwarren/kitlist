import React from "react";
import { Switch, Redirect, Route, useLocation } from "react-router-dom";

import { useData } from "./useData";
import { AppShell } from "./appShell";
import { Categories, ManageCategories } from "./categories";
import { Items } from "./items";
import { KitList } from "./kitList";

export const Layout = () => {
  const { pathname } = useLocation();
  useData();

  return (
    <AppShell sideBarContent={pathname === "/" ? <Categories /> : null}>
      <Switch>
        <Route path="/items" exact component={Items} />
        <Route path="/categories" exact component={ManageCategories} />
        <Route path="/" exact component={KitList} />
        <Redirect to="/" />
      </Switch>
    </AppShell>
  );
};
