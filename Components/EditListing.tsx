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
import NumberFormat from 'react-number-format';
import { CSSProperties } from 'react';
import { APIURL } from '../src/helpers/environment';

interface EditListingProps {
  propertyAddress: string
  comments: string
  askingPrice: any
  semiTax: any
  estIncome: any
  id: number
}

type EditListingState = {
  propertyAddress: string
  comments: string
  askingPrice: string
  semiTax: string
  estIncome: string
  

};


export class EditListing extends Component <EditListingProps, EditListingState> {
  constructor(props: any) {
    super(props) 
    this.state = {
      propertyAddress: this.props.propertyAddress,
      comments: this.props.comments,
      askingPrice: (this.props.askingPrice).toString(),
      semiTax: (this.props.semiTax).toString(),
      estIncome: (this.props.estIncome).toString(),
 
    }
  }



  setPropertyAddress = (event: any) => {
    this.setState({ propertyAddress: event.target.value });
  };

 setComments = ( event: any ) => {
   this.setState({ comments: event.target.value })
   
 }

 setAskingPrice = (event: any ) => {
   this.setState({ askingPrice: event.target.value})
 }

setSemiTax = (event: any) => {
  this.setState({ semiTax: event.target.value})
}

setEstimatedIncome = (event: any) => {
  this.setState({ estIncome: event.target.value})
}

handleSubmit = (id: number) => {

  const listingsBody = { listing: {
    propertyAddress: this.state.propertyAddress,
    comments: this.state.comments,
    askingPrice: parseInt((this.state.askingPrice).split(',').join(''),10),
    semiTax: parseInt((this.state.semiTax).split(',').join(''),10),
    estIncome: parseInt((this.state.estIncome).split(',').join(''),10),
  }};

  fetch(`${APIURL}/listings/edit/${this.props.id}`, {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem('token') ?? '',
      // ?? => if the value before the ?? is undefine or null, then return the value after the double question marks | checks for flasey or truthy 
    }),
    body: JSON.stringify(listingsBody),
  })
    .then((response ) => response.json())

  
  }

  componentDidUpdate() {
    console.log(this.props.id)
  }
  
  render() {

    console.log(this.props.id)

    const paperStyles :CSSProperties = {
      padding: '8px',
      textAlign: "center",
      color: "rgba(0, 0, 0, 0.57)",
      outline: 'none'
    }

    const inputFieldStyles :CSSProperties = {
      color: "rgba(0, 0, 0, 0.54)",
      padding: "8px",
      textAlign: "center",
      paddingLeft: '8', 
      font: "inherit",
      width: "100%",
      border: "0",
      height: "1.1876em",
      margin: "0",
      display: "block",
      minWidth: "0",
      background: "none",
      boxSizing: "content-box",
      animationName: "mui-auto-fill-cancel",
      letterSpacing: "inherit",
      animationDuration: "10ms",
      WebkitTapHighlightColor: "transparent",
      outline: 'none'
    }

    return (
      <form onSubmit={()=> this.handleSubmit(this.props.id)}>
        <DialogTitle
          id="form-dialog-title"
          style={{color: '#cc0074'}}
         
        >
          Edit Listing
        </DialogTitle>
        <DialogContent >
          <DialogContentText>
            Please edit listing information
          </DialogContentText>

          {/* START USERS INPUT */}

          <div >
            <Container>
          
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper>

    {/* ADDRESS INPUT */}

                    <TextField
                      id="standard-full-width"
                      label="Address"
                      style={{ margin: 8 }}
                      helperText="Property Address"
                      fullWidth
                      margin="normal"
                      onChange={this.setPropertyAddress.bind(this)}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper>
     {/* COMMENTS INPUT */}
                    <TextField
                      id="standard-full-width"
                      label="Comments"
                      style={{ margin: 12 }}
                      fullWidth
                      margin="normal"
                      onChange={this.setComments.bind(this)}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper style={paperStyles} >
               {/* ASKING PRICE INPUT */}
               Asking Price
                    <NumberFormat 
                     thousandSeparator={true}
                      id="standard-full-width"
                      label="Asking Price"
                      style={inputFieldStyles}
                      fullWidth
                      margin="normal"
                      onChange={this.setAskingPrice.bind(this)}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper style={paperStyles} >
                    {/* SEMI TAX INPUT */}
                    Semi Tax
                    <NumberFormat
                     thousandSeparator={true}
                      id="standard-full-width"
                      label="Semi Tax"
                      style={inputFieldStyles}
                      fullWidth
                      margin="normal"
                      onChange={this.setSemiTax.bind(this)}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper style={paperStyles} >
                    {/* ESTIMATED INCOME INPUT */}
                    Estimated Income
                    <NumberFormat
                     thousandSeparator={true}
                      id="standard-full-width"
                      label="Estimated Monthly Income"
                      style={inputFieldStyles}
                      fullWidth
                      margin="normal"
                      onChange={this.setEstimatedIncome.bind(this)}
                    />
                  </Paper>
                </Grid>
              </Grid>
           
            </Container>
          </div>
        </DialogContent>
        <DialogActions>
          
          <Button 
         
          color="primary"
          type="submit"
          >
            Make Changes
          </Button>
        </DialogActions>
          </form>
    )
  }
}
