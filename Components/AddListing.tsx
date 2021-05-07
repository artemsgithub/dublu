import React, { Component } from "react";
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
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// number format 
import NumberFormat from 'react-number-format';


interface AddListingProps {
  open: boolean;
  handleClose: () => void;
  classes: any;
}

type ListingState = {
  propertyAddress: string
  comments: string
  askingPrice: number
  semiTax: number
  estIncome: number
  isSnackBarOpen: boolean
};

export class AddListing extends Component<AddListingProps, ListingState> {
  constructor(props: AddListingProps) {
    super(props);
    this.state = {
      propertyAddress: "",
      comments: "",
      askingPrice: 0, 
      semiTax: 0,
      estIncome: 0,
      isSnackBarOpen: false
    };
  }

  // FUNCTIONS TO CAPTURE USER INPUT 

  handleSnackBarOpen = () => {

    this.setState({ isSnackBarOpen: true})
  }

  setPropertyAddress = (event: any) => {
    this.setState({ propertyAddress: event.target.value });
  };

 setComments = ( event: any ) => {
   this.setState({ comments: event.target.value })
   console.log(this.state.comments)
 }

 setAskingPrice = (event: any ) => {
   this.setState({ askingPrice: event.target.value})
   console.log(this.state.askingPrice)
 }

setSemiTax = (event: any) => {
  this.setState({ semiTax: event.target.value})
  console.log(this.state.semiTax)
}

setEstimatedIncome = (event: any) => {
  this.setState({ estIncome: event.target.value})
  console.log(this.state.estIncome)
}

handleSubmit = (event: any) => {
  event.preventDefault();
  setTimeout(function(){location.reload()}, 1420.69);
  const listingsBody = { listing: {
    propertyAddress: this.state.propertyAddress,
    comments: this.state.comments,
    askingPrice: parseInt((this.state.askingPrice).split(',').join(''),10),
    semiTax: parseInt((this.state.semiTax).split(',').join(''),10),
    estIncome: parseInt((this.state.estIncome).split(',').join(''),10),
  }};

  fetch(`http://localhost:3000/listings/create`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem('token') ?? '',
      // ?? => if the value before the ?? is undefine or null, then return the value after the double question marks | checks for flasey or truthy 
    }),
    body: JSON.stringify(listingsBody),
  })
    .then((response ) => response.json())

} //last curly for handle submit


  render() {

    const inputFieldStyles = {
      color: "rgba(0, 0, 0, 0.54)",
      padding: "8px",
      textAlign: "center",
      paddingLeft: 8, 
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
    
    const snackBarStyles = {
      marginTop:'20%',
      boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
    }

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
        
      >
        <form onSubmit={this.handleSubmit}>
        <DialogTitle
          className={this.props.classes.dialogueStyles}
          id="form-dialog-title"
         
        >
          Add Listing
        </DialogTitle>
        <DialogContent className={this.props.classes.dialogueStyles}>
          <DialogContentText>
            Please enter listing information
          </DialogContentText>

          {/* START USERS INPUT */}

          <div className={this.props.classes.userRoot}>
            <Container>
          
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={this.props.classes.paper}>

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
                  <Paper className={this.props.classes.paper}>
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
                  <Paper className={this.props.classes.paper}>
               {/* ASKING PRICE INPUT */}
                    Asking Price
                    <NumberFormat
                     thousandSeparator={true}
                     id="standard-full-width"
                     label="Asking Price"
                     style={inputFieldStyles}
                     fullWidth
                     margin="normal"
                     onChange={this.setAskingPrice.bind(this)}>
                      </NumberFormat>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={this.props.classes.paper}>
                    {/* SEMI TAX INPUT */}
                    SemiTax 
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
                  <Paper className={this.props.classes.paper}>
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
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button 
          onClick={this.handleSnackBarOpen}
          color="primary"
          type="submit"
          >
            Add Listing
          </Button>
        </DialogActions>
          </form>
          <Snackbar style={snackBarStyles} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} open={this.state.isSnackBarOpen} autoHideDuration={9000} >
        <Alert  severity="success">
          Listing Added! 
        </Alert>
      </Snackbar>
      </Dialog>
    );
  }
}
