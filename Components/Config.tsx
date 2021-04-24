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

type ConfigState = {
  interestRate: number
  downPmt: number
  insuranceRate: number
}

export class Config extends Component <AddConfigProps, ConfigState> {
  constructor(props: AddConfigProps) {
    super(props) 
    this.state = {
      interestRate: 0,
      downPmt: 0,
      insuranceRate: 0,
    }
  }

  setInterestRate = (event: any) => {
    this.setState({ interestRate: event.target.value });
  };

  setDownPmt = (event: any) => {
    this.setState({ downPmt: event.target.value });
  };

  setInsuranceRate = (event: any) => {
    this.setState({ insuranceRate: event.target.value });
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    const configsBody = { config: {
      interestRate: this.state.interestRate,
      dwnPmt: this.state.downPmt,
      insuranceRate: this.state.insuranceRate,

    }};
  
    fetch(`http://localhost:3000/configs/createconfig`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('token') ?? '',
      }),
      body: JSON.stringify(configsBody),
    })
      .then((response ) => response.json())
  
  }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.handleClose}>
            <form onSubmit={this.handleSubmit}> 
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
                          onChange={this.setInterestRate.bind(this)}
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
                          onChange={this.setDownPmt.bind(this)}
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
                          onChange={this.setInsuranceRate.bind(this)}
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
              <Button onClick={this.props.handleClose} color="primary" type="submit">
                Save Configs
              </Button>
            </DialogActions>
            </form>
          </Dialog>
        )
    }
}
