import React, { useState } from "react";
import {
  makeStyles,
  Divider,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: { display: "none" },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
    },
  },
  drawerTitle: { padding: theme.spacing(2) },
  drawerPaper: { width: drawerWidth },
  content: {
    padding: theme.spacing(3),
    [theme.breakpoints.up("sm")]: { marginLeft: drawerWidth },
  },
}));

export const AppShell = ({ children }) => {
  const css = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <>
      <Typography variant="h4" className={css.drawerTitle}>
        Kit List
      </Typography>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={css.menuButton}
      >
        <MenuIcon />
      </IconButton>
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
      <main className={css.content}>
        <header>
          <Typography variant="h1">Kit List</Typography>
        </header>
        {children}
      </main>
    </>
  );
};