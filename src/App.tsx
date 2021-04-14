import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Logo from '../Assets/Logo'

import Login from '../Components/Login'
import Register from '../Components/Register'



type setState ={
  token: string
  newToken: string
}

class App extends Component<{}, setState> {
  constructor(props: string) {
    super(props) 
    this.state={
      token: '',
      newToken: '',
    }
  }


  setToken = (token: string) => {
      if (token) {
        this.setState({ token: token });
        localStorage.setItem("token", token);
        console.log(token)
      } else {
        this.setState({ token: localStorage.getItem("token") || "" });
      }
    };

    updateToken = (
      newToken: string,
    ) => {
      localStorage.setItem("token", newToken);
      console.log(newToken)
    };
    
  
  render(){
    
  return (
    <div className="App">
     <h1>Welcome to <Logo /></h1>

     <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

   
        <Switch>
          <Route exact path ="/"></Route>
          <Route exact path="/register">
            <Register 
            updateToken={this.updateToken}
            token={this.state.token}/>
          </Route>
          <Route exact path="/login">
            <Login 
            updateToken={this.updateToken}
            token={this.state.token}/>
          </Route>
 
        </Switch>
      </div>
    </Router>



    </div>
  )
  }
}

export default App

