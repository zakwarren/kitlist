import React from "react";
import { CssBaseline, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { useGetTheme } from "theme";

const App = () => {
  const theme = useGetTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <nav>
          <Typography variant="h1">Kit List</Typography>
        </nav>
        <header>
          <h2>Select an option</h2>
        </header>
      </main>
    </ThemeProvider>
  );
};

export default App;
