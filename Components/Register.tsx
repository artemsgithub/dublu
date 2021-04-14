import React from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

type RegisterProps = {
  updateToken: any;
  token: string;
};

type RegisterState = {
  email: string;
  password: string;
};

export default class Register extends React.Component<
  RegisterProps,
  RegisterState
> {
  constructor(props: RegisterProps) {
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

    fetch(`http://localhost:3000/user/register`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseObj) => this.props.updateToken(responseObj.sessionToken));
  };

  render() {
    return (
      <div>
        <Container maxWidth="xs">
          <CssBaseline />
          <div className="paper" style={{ marginTop: "30px" }}>
            <h1>Register</h1>
            <form
              onSubmit={this.handleSubmit}
              className="formRegister"
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
                Sign Up
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
