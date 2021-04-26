import React, { Component } from "react";

import { Listing } from './Listing'

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

    return (
      <div>
           <div><Listing configs={this.state.configs} listings={this.state.listings} /></div>
      </div>
    );
  }
}
