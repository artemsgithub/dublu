import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    margin: {
        marginTop: '25px'
    }
  }),
);

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Container>
  
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <TextField 
                id="standard-full-width"
                label="Address"
                style={{ margin: 8 }}
                
                helperText="Property Address"
                fullWidth
                margin="normal"
          
          />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <TextField 
                id="standard-full-width"
                label="Comments"
                style={{ margin: 12 }}
                
               
                fullWidth
                margin="normal"
          />      
              </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          <TextField 
                id="standard-full-width"
                label="Asking Price"
                style={{ paddingLeft: 8 }}
                
               
                fullWidth
                margin="normal"
          
          />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          <TextField 
                id="standard-full-width"
                label="Semi Tax"
                style={{ margin: 8 }}
                
               
                fullWidth
                margin="normal"
          
          />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
          <TextField 
                id="standard-full-width"
                label="Estimated Monthly Income"
                style={{ margin: 8 }}
                
               
                fullWidth
                margin="normal"
          
          />
          </Paper>
        </Grid>


       
 
      </Grid>

    
      </Container>
    </div>
  );
}