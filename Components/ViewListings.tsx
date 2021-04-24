import React, { Component } from "react";

interface ViewLisitngsProps {
  listing: string;
}

type ViewListingState = {
  listing: string;
};

export class ViewListings extends Component<
  ViewLisitngsProps,
  ViewListingState
> {
  constructor(props: ViewLisitngsProps) {
    super(props);
    this.state = {
      listing: "",
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
        this.setState(json);
      })
      .catch((error) => console.error("Error:", error));
  };

  render() {
    return (
      <div>
        <h1>View Listings</h1>
      </div>
    );
  }
}
