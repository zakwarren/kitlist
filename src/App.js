import React, { createRef } from "react";
import { CssBaseline, Zoom, makeStyles, Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";

import useGetTheme from "theme";
import { Layout } from "./features";

const useSnackStyles = makeStyles((theme) => ({
  variantSuccess: { backgroundColor: theme.palette.success.main },
  variantInfo: { backgroundColor: theme.palette.info.main },
  variantWarning: { backgroundColor: theme.palette.warning.main },
  variantError: { backgroundColor: theme.palette.error.main },
}));

const useStyles = makeStyles((theme) => ({
  button: { color: theme.palette.common.white },
}));

const Snacked = () => {
  const css = useStyles();
  const snackCss = useSnackStyles();

  const notistackRef = createRef();
  const onClickDismiss = (key) => () => notistackRef.current.closeSnackbar(key);

  return (
    <SnackbarProvider
      preventDuplicate
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={Zoom}
      autoHideDuration={5000}
      classes={snackCss}
      ref={notistackRef}
      action={(key) => (
        <Button className={css.button} onClick={onClickDismiss(key)}>
          Dismiss
        </Button>
      )}
    >
      <Layout />
    </SnackbarProvider>
  );
};

const App = () => {
  const theme = useGetTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Snacked />
    </ThemeProvider>
  );
};

export default App;
