import React, { Component } from 'react'

import { FiEdit, FiMapPin } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri"
import { MdMoreVert } from "react-icons/md"
import { BsHouse } from "react-icons/bs"

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
import Dialog from '@material-ui/core/Dialog'
import { CardActionArea, DialogTitle, CardMedia, CardContent } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


import  { EditListing }  from '../Components/EditListing'
import Map from '../Components/Map'
import Meter from '../Components/Meter'
// import '../src/App.css'

// @ts-ignore 
import * as formulajs from '@formulajs/formulajs' 

interface ListingProps { 
    listing: any
    configs: any
   
}

type ListingState ={
  open: boolean
  isEditOpen: boolean
  isMapOpen: boolean
  isSnackBarOpen: boolean
}



export class Listing extends Component <ListingProps, ListingState> {

    
    constructor(props: any) {
      super(props) 
      this.state = {
        open: false,
        isEditOpen: false,
        isMapOpen: false,
        isSnackBarOpen: false,
      }
    }

    handleSnackBarOpen = () => {
      this.setState({ isSnackBarOpen: true})
    }
      
    handleClickOpen = () => {
      this.setState({ open: true });
    };
    handleClose = () => {
      this.setState({ open: false });
    };

    handleEditOpen = () => {
      this.setState({ isEditOpen: true })
    }
    handleEditClose = () => {
      this.setState({ isEditOpen: false})
    }

    handleMapOpen = () => {
      this.setState({ isMapOpen: true });
    };

    handleMapClose = () => {
      this.setState({ isMapOpen: false });
    };




      // const { listing , configs } = this.props
      // console.log(this.props.configs?.[0].interestRate)
      downPaymentValue = () => {
        return Math.round((this.props.configs?.[0].downPmt)*this.props.listing.askingPrice)
      }

      handlePmt = () => {
        // PMT (interestRate/12, 360, AskingPrice-DownPMT, 0)*-1
        let downPmtValue = (this.props.configs?.[0].downPmt)*this.props.listing.askingPrice
        return Math.round(formulajs.PMT(this.props.configs?.[0].interestRate/12, 360, this.props.listing.askingPrice-downPmtValue,)*-1)
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
      handleHomeOwnerIns = () => {
        return Math.round(this.props.listing.askingPrice*this.props.configs?.[0].insuranceRate/12)
      }
      totalMonthlyPmt = () => {
        return this.handlePmt() + this.handleEscrow() + this.handleMortgageIns() + this.handleHomeOwnerIns()
      }
      totalMonthlyProfit = () => {
        return this.props.listing.estIncome - this.totalMonthlyPmt()
      }
      totalYearlyProfit = () => {
        return this.totalMonthlyProfit()*12
      }
      totalYearlyCost = () => {
        return this.totalMonthlyPmt()*12
      }

      dubluRating = () => {
        return ((this.totalYearlyProfit()/this.downPaymentValue())*100).toFixed(2)
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
      <>
          <TableRow className="tableHover">
          <TableCell><Meter dubluRating={this.dubluRating()}/></TableCell>
          <TableCell>{this.props.listing.propertyAddress}</TableCell>
          <TableCell>{this.props.listing.comments}</TableCell>
          <TableCell>{this.props.listing.askingPrice}</TableCell>
          <TableCell>{this.props.listing.semiTax}</TableCell>
          <TableCell>{this.props.listing.estIncome}</TableCell>
          <TableCell>{this.totalMonthlyPmt()}</TableCell>
          <TableCell>{this.totalMonthlyProfit()}</TableCell>

  
          <TableCell align="right"><IconButton size="small" onClick={this.handleEditOpen} ><FiEdit/></IconButton></TableCell>
          <TableCell align="right"><IconButton size="small" onClick={this.handleMapOpen}><FiMapPin/></IconButton></TableCell>
          <TableCell align="right"><IconButton size="small" onClick={this.handleClickOpen}><MdMoreVert/></IconButton></TableCell>
          <TableCell align="right"><IconButton size="small" onClick={() => this.handleDelete(this.props.listing.id)}><RiDeleteBin6Line/></IconButton></TableCell>
        </TableRow>

        <Dialog
        open={this.state.isMapOpen}
        onClose={this.handleMapClose}
        >
       
        <Map propertyAddress={this.props.listing.propertyAddress} />
        </Dialog>
        <Dialog 
        open={this.state.isEditOpen}
        onClose={this.handleEditClose}
        >
        <EditListing 
        propertyAddress={this.props.listing.propertyAddress}
        comments={this.props.listing.comments}
        askingPrice={this.props.listing.askingPrice}
        semiTax={this.props.listing.semiTax}
        estIncome={this.props.listing.estIncome}
        id={this.props.listing.id}
        />
        </Dialog>
        <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        >
        <DialogTitle><BsHouse/>{`  `}<strong>{this.props.listing.propertyAddress}</strong></DialogTitle>
        <Card>
        <CardActionArea>
        <CardContent>
        <DialogContent>
          <DialogContentText>
          <h3>Expenses</h3>
          </DialogContentText>
          <div><strong>Monthly Mortgage Payment: </strong>{this.handlePmt()}</div>
          <div><strong>Mortgage Insurance: </strong>{this.handleMortgageIns()}</div>
          <div><strong>Escrow: </strong>{this.handleEscrow()}</div>
          <div><strong>Homeowners Insurance: </strong>{this.handleHomeOwnerIns()}</div>
          <div><strong>Down Payment Total: </strong>{this.downPaymentValue()}</div>
          <DialogContentText>
          <h3>Profits</h3>
          </DialogContentText>
          <div><strong>Total Yearly Profit: </strong>{this.totalYearlyProfit()}</div>

     
        </DialogContent>

        </CardContent>
        </CardActionArea>
          </Card>

        <div></div>
        </Dialog>

     
        </>
 
        )
    }
}
