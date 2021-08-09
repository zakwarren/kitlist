import React from "react";
import { Typography } from "@material-ui/core";

import { AppShell } from "./appShell";

export const Layout = () => {
  return (
    <AppShell>
      <section>
        <Typography>Select an option</Typography>
      </section>
    </AppShell>
  );
};
