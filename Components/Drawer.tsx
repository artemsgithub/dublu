import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip"

import { AiFillFileAdd } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi"
import IconButton from "@material-ui/core/IconButton";
import Logo from "../Assets/Logo";

import { Config } from './Config'
import { AddListing } from './AddListing'

import logo from '../Assets/logoWhite.png'

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
      backgroundColor: '#2196f3'
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
      color: '#cc0074',
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

  const logoStyle = {
    width: '25px',
    height: '25px',
    marginRight: '2vh'
  }  

  return (

    
    <div className={classes.root}>
      <CssBaseline />
      
      <AppBar position="absolute" className={classes.appBar} style={{background: "" }}>
        <Toolbar>
        <img style={logoStyle} src={logo}></img>
          <div >
            
            <Logo />
          </div>
          {/* ICON ADD LISTING */}
          <Tooltip title="Add Listing"> 
          <IconButton
      
            color="inherit"
            className={classes.iconStyle}
            onClick={handleClickOpen}
          >
            <AiFillFileAdd />
          </IconButton>
          </Tooltip>

          {/* ADD LISTING*/}
         <AddListing classes={classes} open={isAddListingOpen} handleClose={handleClose} /> 

          {/* ICON BUTTON CONFIG */}
          <Tooltip title="Edit Configs">
          <IconButton color="inherit" onClick={handleConfigOpen}>
            <AiFillSetting />
          </IconButton>
          </Tooltip>
          {/* CONFIG UNIVERSAL PARAMS */}
        <Config classes={classes} open={isConfigOpen} handleClose={handleConfigClose} />
        <Tooltip title="Logout">
        <IconButton color="inherit" onClick={handleLogout}>
          <BiLogOut/>
        </IconButton>
        </Tooltip>
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
