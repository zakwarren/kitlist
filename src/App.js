import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { useGetTheme } from "theme";
import { Layout } from "features";

const App = () => {
  const theme = useGetTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
};

export default App;
