import React from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box"

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import {BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

import LogoLarge from '../Assets/LogoLarge'
import {Description} from '../Components/Description'

import logo from '../Assets/logoFat.png'
import { APIURL } from "../src/helpers/environment";

type LoginProps = {
  updateToken: any;
  token: string;
  history: any;
  location: any;
  match: any;
};

type LoginState = {
  email: string;
  password: string;
};

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  setEmail = (e: any) => {
    this.setState({ email: e.target.value });
  };

  setPassword = (e: any) => {
    this.setState({ password: e.target.value });
  };

  // keep getting invalid hook call error
  // is this a custom hook? how can i convert this to a regular function with styles that
  // i can use to follow the functional component source code of the login template provided.?

  //  useStyles = makeStyles((theme) => ({
  //   root: {
  //     height: '100vh',
  //   },
  // }));

  handleSubmit = (e: any) => {
    e.preventDefault();
    // const url = `${APIURL}/user/register`;
    const body = {
      user: {
        email: this.state.email,
        password: this.state.password,
      },
    };

    fetch(`${APIURL}/user/login`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseObj) => this.props.updateToken(responseObj.sessionToken))
      .then(() => this.props.history.push("/dashboard"));
  };

  render() {
    // const styles = this.useStyles()
    const styles = {
      root: {
        height: "100vh",
      },
      image: {
        backgroundImage: "url(https://images.unsplash.com/photo-1619491202102-088c4afb271c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        
      },
      paper: {
        margin:'64px 32px',
        display: "flex",
        flexDirection: "column" as "column",
        // above is a jank workaround for a css in js issue: https://github.com/cssinjs/jss/issues/1344
        alignItems: "center",
        paddingRight: "40px",
        paddingLeft: "40px",
      },
      form: {
        width: "75%",
        marginTop: '8px',
      },
      txtField: {
        marginBottom: "2vh",
      },

      button: {
        marginBottom: "2vh",
        width: "125%",
        justifyContent: "center",
        height: "40px"
      },
      link: {
        textDecoration: "none"
      }

      
    };


    const logoStyle = {
      width: '50px',
      height: '50px'
    }

    return (
      <Grid container component="main" style={styles.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} style={styles.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div style={styles.paper}>
            <img style={logoStyle} src={logo}></img>
            <LogoLarge />
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <form
              style={styles.form}
              onSubmit={this.handleSubmit}
              className="formLogin"
            >
              <TextField
                style={styles.txtField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.setEmail.bind(this)}
              />

              <TextField
                style={styles.txtField}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.setPassword.bind(this)}
              />
              <Box style={{display: 'flex', padding: 8, justifyContent: "center", alignItems: "center"}}>
              <Button
                style={styles.button}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submitRegister"
              >
                Log Me in
              </Button>
              </Box>
         
              <Grid>
                <Grid item> 
                <Box style={{display: 'flex', padding: 8, justifyContent: "center", alignItems: "center"}}>
                <Button 
                  
                  style={styles.button}
                  color="secondary">
                  <Link style={styles.link} to="/register">
                    {"Don't have an account? Sign Up"}
                  </Link>
                 </Button>
                 </Box>
                </Grid>
              </Grid>
        <Description/>
            </form>
          </div>
        </Grid>
      </Grid>

    );
  }
}

export default withRouter<LoginProps, any>(Login);
