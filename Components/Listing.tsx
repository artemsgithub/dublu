import React, { Component } from 'react'

import { FiEdit, FiMapPin } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri"
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

// @ts-ignore 
import * as formulajs from '@formulajs/formulajs' 

interface ListingProps { 
    listing: any
    configs: any
}



export class Listing extends Component <ListingProps> {

    render() {
      
      const { listing } = this.props 

        // calculations here
console.log(
        formulajs.SUM([1, 2 , 5])
        )
        const handleDelete = (id: number) => {

          fetch(`http://localhost:3000/listings/delete/${this.props.listing.id}`, {
              method: 'DELETE',
              headers: new Headers({
                  'Content-Type': 'application/json',
                  Authorization: localStorage.getItem('token') ?? '',
              })
          })
            .then((response) => response.json())//simple refresh would do, right don't really need to get listings again? 
            .then(() => location.reload())
      }
      
        
        return (
        
          <TableRow>
          <TableCell>{listing.propertyAddress}</TableCell>
          <TableCell>{listing.comments}</TableCell>
          <TableCell>{listing.askingPrice}</TableCell>
          <TableCell>{listing.semiTax}</TableCell>
          <TableCell>{listing.estIncome}</TableCell>
          <TableCell align="right"><IconButton size="small"><FiEdit/></IconButton></TableCell>
          <TableCell align="right"><IconButton size="small"><FiMapPin/></IconButton></TableCell>
          <TableCell align="right"><IconButton size="small" onClick={() => handleDelete(listing.id)}><RiDeleteBin6Line/></IconButton></TableCell>
        </TableRow>
          
        )
    }
}
