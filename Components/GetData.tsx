import React, { Component } from 'react'


interface GetDataState {
    listingID: string
}


export default class GetData extends Component <{},GetDataState>{
    constructor(props: any) {
        super(props)
        this.state = {
            listingID: ''
        }
    }
    
    componentDidMount () {
        // this.GetApiData()
    }

    GetApiData = async () => {
        const result = await fetch(`https://api.bridgedataoutput.com/api/v2/OData/test/Property?access_token=6baca547742c6f96a6ff71b138424f21`)
        const json=await result.json()
        this.setState({
            listingID: json.value[0].ListingId
        })
    
      }

    render() {
        return (
            <div>
                Just a functional API call component for now
            </div>
        )
    }
}


