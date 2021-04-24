import React, { Component } from 'react'
import Drawer from './Drawer'
import  ViewListings  from './ViewListings'



export default class Dashboard extends Component  {
    

    
    render() {
   
        return (
            <div>
                <Drawer />
                <ViewListings />
            </div>
        )
    }
}
