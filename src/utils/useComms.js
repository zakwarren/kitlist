import React, { useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: { color: theme.palette.common.white },
}));

export const useComms = () => {
  const { enqueueSnackbar } = useSnackbar();
  const css = useStyles();

  const handleMessage = useCallback(
    (e) => {
      if (window.location.origin !== e.origin) return;
      if (!e?.data?.tag) return;

      switch (e.data.tag) {
        case "update":
          const update = () => {
            navigator.serviceWorker.controller.postMessage({
              type: "SKIP_WAITING",
            });
            window.location.reload();
          };
          const action = () => (
            <>
              <Button className={css.button} onClick={update}>
                Update
              </Button>
            </>
          );
          enqueueSnackbar("An update is available", {
            variant: "info",
            key: "update",
            action,
          });
          break;
        case "installed":
          enqueueSnackbar("Home is now installed", {
            variant: "info",
            key: "installed",
          });
          break;
        case "offline":
          enqueueSnackbar("Home is running in offline mode", {
            variant: "info",
            key: "offline",
          });
          break;
        default:
          break;
      }
    },
    [enqueueSnackbar, css]
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  });
};
