import React from "react";

import { AppShell } from "./appShell";
import { Categories } from "./Categories";
import { KitList } from "./KitList";

export const Layout = () => (
  <AppShell sideBarContent={<Categories />}>
    <KitList />
  </AppShell>
);
