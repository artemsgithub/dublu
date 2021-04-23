import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";


import { AiFillFileAdd } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";

import IconButton from "@material-ui/core/IconButton";
import Logo from "../Assets/Logo";

import { Config } from './Config'
import { AddListing } from './AddListing'


const drawerWidth = 0;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },

    userRoot: {
      flexGrow: 1,
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    iconStyle: {
      marginLeft: "auto",
    },

    dialogueStyles: {
      backgroundColor: "#F9F9F9",
    },
  })
);

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  const [isAddListingOpen, setIsAddListingOpen] = React.useState(false);
  const [isConfigOpen, setIsConfigOpen] = React.useState(false);

  //   Open and close add listings
  const handleClickOpen = () => {
    setIsAddListingOpen(true);
  };
  const handleClose = () => {
    setIsAddListingOpen(false);
  };

  //   Open and close configs
  const handleConfigOpen = () => {
    setIsConfigOpen(true);
  };
  const handleConfigClose = () => {
    setIsConfigOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography noWrap>
            <Logo />
          </Typography>
          {/* ICON ADD LISTING */}
          <IconButton
            color="inherit"
            className={classes.iconStyle}
            onClick={handleClickOpen}
          >
            <AiFillFileAdd />
          </IconButton>

          {/* ADD LISTING*/}
         <AddListing classes={classes} open={isAddListingOpen} handleClose={handleClose} /> 

          {/* ICON BUTTON CONFIG */}
          <IconButton color="inherit" onClick={handleConfigOpen}>
            <AiFillSetting />
          </IconButton>

          {/* CONFIG UNIVERSAL PARAMS */}
        <Config classes={classes} open={isConfigOpen} handleClose={handleConfigClose} />
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
      </Drawer>
      <main className={classes.content}></main>
    </div>
  );
}
