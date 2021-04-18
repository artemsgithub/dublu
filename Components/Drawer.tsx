import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import GetData from "./GetData";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';




import { AiFillFileAdd } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";

import IconButton from "@material-ui/core/IconButton";
import Logo from "../Assets/Logo";

const drawerWidth = 0;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
     
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
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
        backgroundColor: "#F9F9F9"
        
    }

  })
);

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
      setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };
 
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography noWrap>
            <Logo/>
          </Typography>
          {/* ADD LISTING */}
          <IconButton color="inherit" className={classes.iconStyle} onClick={handleClickOpen}>
            <AiFillFileAdd />
          </IconButton>

          {/* START DIALOG */}
          <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.dialogueStyles} id="form-dialog-title">Add Listing</DialogTitle>
        <DialogContent className={classes.dialogueStyles} >
          <DialogContentText>
            Please enter listing information
          </DialogContentText>
          <GetData/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add Listing
          </Button>
        </DialogActions>
      </Dialog>
        



          {/* SETTINGS ie. CONFIG */}
          <IconButton color="inherit" >
              <AiFillSetting/>
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
      <main className={classes.content}>
        
      </main>
    </div>
  );
}
