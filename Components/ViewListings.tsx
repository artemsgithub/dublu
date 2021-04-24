import React, { Component } from "react";

type ViewListingState = {
  listing: any;
};

export default class ViewListings extends Component<ViewListingState> {
  constructor(props: any) {
    super(props);
    this.state = {
      listing: "",
    };
  }

  componentDidMount() {
    this.displayMine();
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
        this.setState({ listing: json})
      })
      .catch((error) => console.error("Error:", error));
  };

  render() {
    return (
      <div>
        <h1>View Listings</h1>
        <div>{this.state.listing.propertyAddress}</div>
      </div>
    );
  }
}
