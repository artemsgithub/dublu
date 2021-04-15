import React from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { withRouter } from 'react-router-dom'


type LoginProps = {
  updateToken: any
  token: string
  history: any
  location: any
  match: any
};

type LoginState = {
  email: string
  password: string
};

class Login extends React.Component<
  LoginProps,
  LoginState
> {
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

  handleSubmit = (e: any) => {
    e.preventDefault();
    // const url = `http://localhost:3000/user/register`;
    const body = { user: {
      email: this.state.email,
      password: this.state.password,
    }};

    fetch(`http://localhost:3000/user/login`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseObj) => this.props.updateToken(responseObj.sessionToken))
      .then(() => this.props.history.push('/dashboard'))


  };

  render() {
    return (
      <div>
        <Container maxWidth="xs">
          <CssBaseline />
          <div className="paper" style={{ marginTop: "30px" }}>
            <h1>Login</h1>
            <form
              onSubmit={this.handleSubmit}
              className="formLogin"
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={this.setEmail.bind(this)}
                  />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
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
                <Grid item>

                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter<LoginProps, any>(Login) 
