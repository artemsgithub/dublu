import React from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";


import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import {BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

import LogoLarge from '../Assets/LogoLarge'

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
    // const url = `http://localhost:3000/user/register`;
    const body = {
      user: {
        email: this.state.email,
        password: this.state.password,
      },
    };

    fetch(`http://localhost:3000/user/login`, {
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
        backgroundImage: "url(https://tinyurl.com/dublubackground)",
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
      },
      form: {
        width: "100%",
        marginTop: '8px',
      },

    };
    return (
      <Grid container component="main" style={styles.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} style={styles.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div style={styles.paper}>
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submitRegister"
              >
                Log Me in
              </Button>
              <Grid container justify="flex-end">
                <Grid item></Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link to="/register">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter<LoginProps, any>(Login);
