import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Logo from "../Assets/Logo";

import Login from "../Components/Login";
import Register from "../Components/Register";
import Dashboard from "../Components/Dashboard";
import Protector from "../Components/Protector";
import Admin from "../Components/Admin"

type setState = {
  sessionToken: string;
};

class App extends Component<{}, setState> {
  constructor(props: string) {
    super(props);
    this.state = {
      sessionToken: "",
    };
  }

  setToken = (token: string) => {
    if (token) {
      this.setState({ sessionToken: token });
      localStorage.setItem("token", token);
      console.log(token);
    } else {
      this.setState({ sessionToken: localStorage.getItem("token") || "" });
    }
  };

  updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken }); //set the state w/new token
    console.log(newToken);
  };

  render() {
    return (
      <div className="App">
    
        <Router>
          <Switch>
            <Route exact path="/">
              <nav>
              <Login
                updateToken={this.updateToken}
                token={this.state.sessionToken}
              />

              </nav>
            </Route>
            <Route exact path="/register">
              <Register
                updateToken={this.updateToken}
                token={this.state.sessionToken}
              />
            </Route>
            <Route exact path="/admin">
              <Admin/> 
            </Route>
            <Protector
              exact path="/dashboard"
            >
              <Dashboard />
            
            </Protector>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;