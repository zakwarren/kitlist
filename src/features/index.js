import React from "react";
import { Switch, Redirect, Route, useLocation } from "react-router-dom";

import { useComms } from "utils";
import { AppShell } from "./appShell";
import { Menu } from "./menu";
import { KitList } from "./kitList";
import { Categories, ManageCategories } from "./categories";
import { Items } from "./items";
import { Upload } from "./upload";

export const Layout = () => {
  useComms();
  const { pathname } = useLocation();

  return (
    <AppShell sideBarContent={pathname === "/list" ? <Categories /> : null}>
      <Switch>
        <Route path="/upload" exact component={Upload} />
        <Route path="/items" exact component={Items} />
        <Route path="/categories" exact component={ManageCategories} />
        <Route path="/list" exact component={KitList} />
        <Route path="/" exact component={Menu} />
        <Redirect to="/" />
      </Switch>
    </AppShell>
  );
};
