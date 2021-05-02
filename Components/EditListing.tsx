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

interface EditListingProps {
  propertyAddress: string
  comments: string
  askingPrice: number
  semiTax: number
  estIncome: number
  id: number
}

type EditListingState = {
  propertyAddress: string
  comments: string
  askingPrice: number
  semiTax: number
  estIncome: number

};


export class EditListing extends Component <EditListingProps, EditListingState> {
  constructor(props: any) {
    super(props) 
    this.state = {
      propertyAddress: this.props.propertyAddress,
      comments: this.props.comments,
      askingPrice: this.props.askingPrice,
      semiTax: this.props.semiTax,
      estIncome: this.props.estIncome,
 
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
    askingPrice: this.state.askingPrice,
    semiTax: this.state.semiTax,
    estIncome: this.state.estIncome,
  }};

  fetch(`http://localhost:3000/listings/edit/${this.props.id}`, {
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

    return (
      <form onSubmit={()=> this.handleSubmit(this.props.id)}>
        <DialogTitle
          id="form-dialog-title"
         
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
                  <Paper >
               {/* ASKING PRICE INPUT */}
                    <TextField
                      id="standard-full-width"
                      label="Asking Price"
                      style={{ paddingLeft: 8 }}
                      fullWidth
                      margin="normal"
                      onChange={this.setAskingPrice.bind(this)}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper >
                    {/* SEMI TAX INPUT */}
                    <TextField
                      id="standard-full-width"
                      label="Semi Tax"
                      style={{ margin: 8 }}
                      fullWidth
                      margin="normal"
                      onChange={this.setSemiTax.bind(this)}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper >
                    {/* ESTIMATED INCOME INPUT */}
                    <TextField
                      id="standard-full-width"
                      label="Estimated Monthly Income"
                      style={{ margin: 8 }}
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
