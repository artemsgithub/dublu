import React, { Component } from 'react'
import Box from '@material-ui/core/Box'

export class Description extends Component {
    render() {
        return (
            <Box style={{padding: 8, justifyContent: 'left', alignItems: 'left'}}>
                <h2>What is Dublu?</h2>
                <div>Dublu is an app designed to organize the process of purchasing an investment property.</div>
                <h2>Why is Dublu?</h2>
                <div>Investing in real estate isn't just for rich people, average people can get started in small ways that make a big diffrence.</div>
                
                <div></div>
            </Box>
        )
    }
}
