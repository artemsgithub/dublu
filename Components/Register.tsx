import React from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper"

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import LogoLarge from '../Assets/LogoLarge'
import { withRouter } from 'react-router-dom'


type RegisterProps = {
  updateToken: any
  token: string
  history: any
  location: any
  match: any
};

type RegisterState = {
  email: string
  password: string
};

 class Register extends React.Component<RegisterProps,RegisterState
> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  setEmail = (event: any) => {
    this.setState({ email: event.target.value });
  };

  setPassword = (event: any) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    
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
      .then((responseObj) => this.props.updateToken(responseObj.sessionToken))
      .then(() => this.props.history.push('/dashboard'))
  };

  // This fires once, allowing each user one table to make edits
  // to configs which are values that are used universally and should not

  sendDefaultConfigValues = () => {
    
    const configsBody = { config: {
      interestRate: 4,
      downPmt: 5,
      insuranceRate: 6,
      
    }};
    fetch(`http://localhost:3000/configs/createconfig`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('token') ?? '',
      }),
      body: JSON.stringify(configsBody),
    })
    .then((response ) => response.json())
    
  }

  // need to implement a way to

  componentWillUnmount() {
    this.sendDefaultConfigValues()
  }


  render() {

    const styles = {
      paper: {
        marginTop: "20vh",
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
      },
      form: {
        width: '100%',
        marginTop: "2vh"
      },
      button: {
        marginTop: "4vh"
      },
      txtField: {
        marginBottom: "2vh"
      },
      container: {
        paddingLeft: "25px",
        paddingRight: "25px",
        paddingBottom: '25px'
      },
    };

    return (
      
      <div>
        <Container component={Paper} maxWidth="xs" style={styles.container} >
          <CssBaseline />
          <div style={styles.paper} className="paper">
            <br/>
            <br/>

            <LogoLarge/>
            <Typography style={{marginTop: '25px', marginBottom: '15px'}} component="main" variant="h5">Sign up</Typography>
            <form
              onSubmit={this.handleSubmit}
              style={styles.form}
            >
            
                  <TextField
                    style={styles.txtField}
                    variant="outlined"
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
                style={styles.button}
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

export default withRouter<RegisterProps, any>(Register) 
