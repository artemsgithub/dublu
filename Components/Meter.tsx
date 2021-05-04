import React, { Component } from 'react'
import ReactSpeedometer from "react-d3-speedometer"

interface MeterProps {
    dubluRating: any
}



export default class Meter extends Component <MeterProps> {

    

    render() {
        return (
            <div style={{padding: '0'}}>
                <ReactSpeedometer
                    segments={3}
                    minValue={-400}
                    maxValue={450}
                    value={this.props.dubluRating}
                    width={90}
                    height={90}
                    paddingHorizontal={0}
                    paddingVertical={0}
                    maxSegmentLabels={0}
                    ringWidth={10}
                    needleHeightRatio={.5}
                
                />
      
            </div>
        )
    }
}
