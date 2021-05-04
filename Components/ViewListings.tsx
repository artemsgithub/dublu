import React, { Component } from "react";


import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";
import TableContainer from '@material-ui/core/TableContainer';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card'


import { Listing } from '../Components/Listing'


interface ViewLisitngsProps {
  
}

type ViewListingState = {
  listings: any[] | null
  configs: any[] | null
};

export class ViewListings extends Component<
  ViewLisitngsProps,
  ViewListingState
> {
  constructor(props: ViewLisitngsProps) {
    super(props);
    this.state = {
      listings: null,
      configs: null,
    };
  }

  componentDidMount() {
      this.displayMine()
      this.fetchConfigs()
  }



  displayMine = () => {
    fetch("http://localhost:3000/listings/mine/", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") ?? "",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({listings : json});
      })
      .catch((error) => console.error("Error:", error));
  };

  fetchConfigs = () => {
    fetch("http://localhost:3000/configs/myConfigs/", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") ?? "",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({configs : json});
      })
      .catch((error) => console.error("Error:", error));
  };


  render() {
    
    if (this.state.listings === null) {
      return <div style={{marginTop: '25px'}}>Loading</div>
    }



      const styles = {
          table: {
              minWidth: '650'
          }
      }
      
      return (
         
          <React.Fragment>

          <div>
              <h2 style={{marginLeft: '2vh', marginTop: '4vh'}}>View Listings</h2>
              <TableContainer component={Paper}>
              <Table style={styles.table} size="small">
     <TableHead>
        <TableRow>

          <TableCell><strong>Property Address</strong></TableCell>
          <TableCell><strong>Comments</strong></TableCell>
          <TableCell><strong>Asking Price</strong></TableCell>
          <TableCell><strong>SemiTax</strong></TableCell>
          <TableCell><strong>Monthly Income</strong></TableCell>
          <TableCell><strong>Monthly Payment</strong></TableCell>
          <TableCell><strong>Monthly Profit</strong></TableCell>
       
       
          


          <TableCell align="right"><strong>Edit</strong></TableCell>
          <TableCell align="right"><strong>Map</strong></TableCell>
          <TableCell align="right"><strong>More</strong></TableCell>
          <TableCell align="right"><strong>Delete</strong></TableCell>

          

        </TableRow>
      </TableHead>
      <TableBody>
        {this.state.listings.map((listing, index)  => (
          <Listing key={index} listing={listing} configs={this.state.configs} />
        ))}
      </TableBody>
    </Table>
    </TableContainer>
          </div>
          
          </React.Fragment>
        
      )

  }
}
