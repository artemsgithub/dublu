import React, { Component } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
//@ts-ignore
import Geocode from "react-geocode";

const containerStyle = {
  width: "500px",
  height: "700px",
};


interface MapProps  { 
  propertyAddress: string
}

type MapState = {
    center: any
}


export default class Map extends Component <MapProps, MapState> {

    constructor(props: any) {
        super(props) 
        this.state ={
            center: null
        }
    }

  async loadGeocodeCenter() {
    Geocode.setApiKey("AIzaSyALtJXluvEpi-4NZWvA1Hdbt8G7m0Wi6J4");
    Geocode.setLanguage("en");
    Geocode.setRegion("us");
  
    const response = await Geocode.fromAddress(this.props.propertyAddress);
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
    this.setState({ center: { lat, lng } });
  }

  componentDidMount() {
    this.loadGeocodeCenter();
  }

  render() {
    return (
      <div>
        <h1 style={{marginLeft: '10px'}}>{this.props.propertyAddress}</h1>
        <LoadScript googleMapsApiKey="AIzaSyALtJXluvEpi-4NZWvA1Hdbt8G7m0Wi6J4">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={this.state.center}
            zoom={20}
          >
            <Marker
            position={this.state.center}
            animation='BOUNCE'>
            </Marker>
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }
}
