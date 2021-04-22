import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

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

  const [open, setOpen] = React.useState(false);
  const [configOpen, setconfigOpen] = React.useState(false);

  //   Open and close add listings
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //   Open and close configs
  const handleConfigOpen = () => {
    setconfigOpen(true);
  };
  const handleConfigClose = () => {
    setconfigOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography noWrap>
            <Logo />
          </Typography>
          {/* ADD LISTING */}
          <IconButton
            color="inherit"
            className={classes.iconStyle}
            onClick={handleClickOpen}
          >
            <AiFillFileAdd />
          </IconButton>

          {/* START DIALOG */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle
              className={classes.dialogueStyles}
              id="form-dialog-title"
            >
              Add Listing
            </DialogTitle>
            <DialogContent className={classes.dialogueStyles}>
              <DialogContentText>
                Please enter listing information
              </DialogContentText>
              {/* START USERS INPUT */}

              <div className={classes.userRoot}>
                <Container>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        <TextField
                          id="standard-full-width"
                          label="Address"
                          style={{ margin: 8 }}
                          helperText="Property Address"
                          fullWidth
                          margin="normal"
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        <TextField
                          id="standard-full-width"
                          label="Comments"
                          style={{ margin: 12 }}
                          fullWidth
                          margin="normal"
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <TextField
                          id="standard-full-width"
                          label="Asking Price"
                          style={{ paddingLeft: 8 }}
                          fullWidth
                          margin="normal"
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <TextField
                          id="standard-full-width"
                          label="Semi Tax"
                          style={{ margin: 8 }}
                          fullWidth
                          margin="normal"
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <TextField
                          id="standard-full-width"
                          label="Estimated Monthly Income"
                          style={{ margin: 8 }}
                          fullWidth
                          margin="normal"
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Container>
              </div>
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
          <IconButton color="inherit" onClick={handleConfigOpen}>
            <AiFillSetting />
          </IconButton>

          {/* START CONFIG DIALOG */}
          <Dialog open={configOpen} onClose={handleConfigClose}>
            <DialogTitle
              className={classes.dialogueStyles}
              id="form-dialog-title"
            >
              Set Parameters
            </DialogTitle>
            <DialogContent className={classes.dialogueStyles}>
              <DialogContentText>
                Please enter universal parameters
              </DialogContentText>
              {/* START USERS INPUT */}

              <div className={classes.userRoot}>
                <Container>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <TextField
                          id="standard-full-width"
                          label="Interest Rate"
                          style={{ paddingLeft: 8 }}
                          fullWidth
                          margin="normal"
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <TextField
                          id="standard-full-width"
                          label="Down Payment"
                          helperText="As percentage, for no down, use 1"
                          style={{ margin: 8 }}
                          fullWidth
                          margin="normal"
                        />
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper className={classes.paper}>
                        <TextField
                          id="standard-full-width"
                          label="Insurance Rate"
                          helperText="Percentage"
                          style={{ margin: 8 }}
                          fullWidth
                          margin="normal"
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </Container>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleConfigClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfigClose} color="primary">
                Save Configs
              </Button>
            </DialogActions>
          </Dialog>
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
