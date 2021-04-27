import React, { Component } from 'react'

import { FiEdit, FiMapPin } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri"
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";
import TableContainer from '@material-ui/core/TableContainer';
import Link from '@material-ui/core/Link';

interface ListingProps { 
    listings: any[] | null
    configs: any
}



export class Listing extends Component <ListingProps> {

    render() {

        const styles = {
            table: {
                minWidth: '650'
            }
        }
        
        // calculations here

        
        
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
            <TableCell><strong>Estimated Income (Monthly)</strong></TableCell>
            <TableCell align="right"><strong>Edit</strong></TableCell>
            <TableCell align="right"><strong>Map</strong></TableCell>
            <TableCell align="right"><strong>Delete</strong></TableCell>
            

          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.listings != null ? this.props.listings.map((listing, index)  => (
            <TableRow key={index}>
              <TableCell>{listing.propertyAddress}</TableCell>
              <TableCell>{listing.comments}</TableCell>
              <TableCell>{listing.askingPrice}</TableCell>
              <TableCell>{listing.semiTax}</TableCell>
              <TableCell>{listing.estIncome}</TableCell>
              <TableCell align="right"><IconButton size="small"><FiEdit/></IconButton></TableCell>
              <TableCell align="right"><IconButton size="small"><FiMapPin/></IconButton></TableCell>
              <TableCell align="right"><IconButton size="small"><RiDeleteBin6Line/></IconButton></TableCell>
            </TableRow>
          )):''}
        </TableBody>
      </Table>
      </TableContainer>
            </div>
            </React.Fragment>
          
        )
    }
}
