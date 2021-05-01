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
  
    
    constructor(props: any) {
      super(props) 

    }
      
      // const { listing , configs } = this.props
      // console.log(this.props.configs?.[0].interestRate)
      handlePmt = () => {
        // PMT (interestRate/12, 360, AskingPrice-DownPMT, 0)*-1
        let downPmtValue = (this.props.configs?.[0].downPmt)*this.props.listing.askingPrice
        return `$${Math.round(formulajs.PMT(this.props.configs?.[0].interestRate/12, 360, this.props.listing.askingPrice-downPmtValue, 0)*-1)}`
      }

      handleEscrow = () => {
        // SemiTax*12/2
        return Math.round(this.props.listing.semiTax*2/12)
      }
      
      handleMortgageIns = () => {
        // 1% of asking price, <.20 (min) then 0 
        if (this.props.configs?.[0].downPmt < .20) {
          return Math.round((this.props.listing.askingPrice*.01)/12)
        } else {
          return 0 
        }
      }



      handleDelete = (id: number) => {
        
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
      

   
      
      render() {  
  
        return (
        
          <TableRow>
          <TableCell>{this.props.listing.propertyAddress}</TableCell>
          <TableCell>{this.props.listing.comments}</TableCell>
          <TableCell>{this.props.listing.askingPrice}</TableCell>
          <TableCell>{this.props.listing.semiTax}</TableCell>
          <TableCell>{this.props.listing.estIncome}</TableCell>
          <TableCell>{this.handlePmt()}</TableCell>
          <TableCell>{this.handleEscrow()}</TableCell>
          <TableCell>{this.handleMortgageIns()}</TableCell>

          <TableCell align="right"><IconButton size="small"><FiEdit/></IconButton></TableCell>
          <TableCell align="right"><IconButton size="small" ><FiMapPin/></IconButton></TableCell>
          <TableCell align="right"><IconButton size="small" onClick={() => this.handleDelete(this.props.listing.id)}><RiDeleteBin6Line/></IconButton></TableCell>
        </TableRow>
          
        )
    }
}
