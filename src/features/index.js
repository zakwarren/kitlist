import React from "react";
import { Switch, Redirect, Route, useLocation } from "react-router-dom";

import { AppShell } from "./appShell";
import { Menu } from "./menu";
import { KitList } from "./kitList";
import { Categories, ManageCategories } from "./categories";
import { Items } from "./items";

export const Layout = () => {
  const { pathname } = useLocation();

  return (
    <AppShell sideBarContent={pathname === "/list" ? <Categories /> : null}>
      <Switch>
        <Route path="/items" exact component={Items} />
        <Route path="/categories" exact component={ManageCategories} />
        <Route path="/list" exact component={KitList} />
        <Route path="/" exact component={Menu} />
        <Redirect to="/" />
      </Switch>
    </AppShell>
  );
};
