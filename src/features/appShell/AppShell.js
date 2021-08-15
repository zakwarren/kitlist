import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Divider,
  Drawer,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Menu as MenuIcon, GetApp as GetAppIcon } from "@material-ui/icons";

import { useInstaller } from "utils";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
    },
  },
  drawerTitle: { padding: theme.spacing(2), cursor: "pointer" },
  drawerPaper: { width: drawerWidth },
  buttons: {
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      top: "1rem",
      left: `calc(${drawerWidth}px + 1rem)`,
    },
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: { display: "none" },
  },
  content: {
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: { marginLeft: drawerWidth },
  },
}));

export const AppShell = (props) => {
  const { sideBarContent, children } = props;
  const [canInstall, promptForInstall] = useInstaller();
  const css = useStyles();
  const theme = useTheme();
  const { push } = useHistory();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <>
      <Typography
        variant="h4"
        className={css.drawerTitle}
        onClick={() => push("/")}
      >
        Kit List
      </Typography>
      <Divider />
      {sideBarContent}
    </>
  );

  return (
    <>
      <nav className={css.drawer} aria-label="mailbox folders">
        <Drawer
          variant={!isDesktop ? "temporary" : "permanent"}
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={isDesktop || mobileOpen}
          onClose={handleDrawerToggle}
          classes={{ paper: css.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </Drawer>
      </nav>
      <div className={css.buttons}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={css.menuButton}
        >
          <MenuIcon />
        </IconButton>
        {canInstall && (
          <IconButton
            color="inherit"
            aria-label="install app"
            onClick={promptForInstall}
          >
            <GetAppIcon />
          </IconButton>
        )}
      </div>
      <main className={css.content}>{children}</main>
    </>
  );
};

AppShell.propTypes = {
  sideBarContent: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
