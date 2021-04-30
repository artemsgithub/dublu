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
import { BiLogOut } from "react-icons/bi"
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

  const handleLogout = () => {
    localStorage.removeItem('token')
    location.reload();
  }

  
// linear-gradient(to top, #0ba360 0%, #3cba92 100%)" green
// linear-gradient(to bottom, #434343 0%, black 100% black 
// "linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%)", carbon
  backgroundBlendMode: "multiply"
  return (

    
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar} style={{background: "" }}>
        <Toolbar>
          <div >
            <Logo />
          </div>
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
        <IconButton color="inherit" onClick={handleLogout}>
          <BiLogOut/>
        </IconButton>
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
