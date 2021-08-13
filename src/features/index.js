import React from "react";
import { Switch, Redirect, Route, useLocation } from "react-router-dom";

import { AppShell } from "./appShell";
import { Categories, ManageCategories } from "./Categories";
import { KitList } from "./KitList";

export const Layout = () => {
  const { pathname } = useLocation();

  return (
    <AppShell sideBarContent={pathname === "/" ? <Categories /> : null}>
      <Switch>
        <Route path="/categories" exact component={ManageCategories} />
        <Route path="/" exact component={KitList} />
        <Redirect to="/" />
      </Switch>
    </AppShell>
  );
};
