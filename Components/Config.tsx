import React, { Component } from 'react'
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

interface AddConfigProps {
    open: boolean
    handleClose: () => void 
    classes: any 
}


export class Config extends Component <AddConfigProps> {
    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.handleClose}>
            <DialogTitle
              className={this.props.classes.dialogueStyles}
              id="form-dialog-title"
            >
              Set Parameters
            </DialogTitle>
            <DialogContent className={this.props.classes.dialogueStyles}>
              <DialogContentText>
                Please enter universal parameters
              </DialogContentText>
              {/* START USERS INPUT */}

              <div className={this.props.classes.userRoot}>
                <Container>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Paper className={this.props.classes.paper}>
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
                      <Paper className={this.props.classes.paper}>
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
                      <Paper className={this.props.classes.paper}>
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
              <Button onClick={this.props.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.props.handleClose} color="primary">
                Save Configs
              </Button>
            </DialogActions>
          </Dialog>
        )
    }
}
