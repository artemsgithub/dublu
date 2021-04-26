import React, { Component } from "react";

import { Listing } from './Listing'

interface ViewLisitngsProps {

}

type ViewListingState = {
  listings: any[] | null
};

export class ViewListings extends Component<
  ViewLisitngsProps,
  ViewListingState
> {
  constructor(props: ViewLisitngsProps) {
    super(props);
    this.state = {
      listings: null,
    };
  }

  componentDidMount() {
      this.displayMine()
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

  render() {
    
    if (this.state.listings === null) {
      return <div style={{marginTop: '25px'}}>Loading</div>
    }

    return (
      <div>
        <h1>View Listings</h1>
        {this.state.listings.map((listing, index) => {
          return <div key={index}><Listing config={'fakeconfig'} listing={listing} /></div>
        })}
      </div>
    );
  }
}
