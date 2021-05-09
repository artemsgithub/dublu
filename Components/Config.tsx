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
import { APIURL } from '../src/helpers/environment';

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
      interestRate: .0425,
      downPmt: .20,
      insuranceRate: .0125,
    }
  }

  setInterestRate = (event: any) => {
    this.setState({ interestRate: event.target.value });
    console.log(this.state.interestRate)
  };

  setDownPmt = (event: any) => {
    this.setState({ downPmt: event.target.value });
    console.log(this.state.downPmt)
  };

  setInsuranceRate = (event: any) => {
    this.setState({ insuranceRate: event.target.value });
    console.log(this.state.insuranceRate)
  };

  //  update config values to personal prefrence 
  handleSubmit = (event: any) => {
    
    const configsBody = { config: {
      interestRate: this.state.interestRate,
      downPmt: this.state.downPmt,
      insuranceRate: this.state.insuranceRate,
      
    }};


    fetch(`${APIURL}/configs/edit/`, {
      method: "PUT",
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
                Please enter these percentages as decimals. For example, 4.5% would be .0425
                Default values are .0425, .20, .0125 for interest rate, down payment, and insurance rate, respectively. 
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
                          helperText="For no down, use 1"
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
