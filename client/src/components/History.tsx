import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  InputLabel,
  FormControl,
  TextField,
  Button,
  Select,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import jupiter from '../Assets/jupiter_128.png';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection:"column",
    justifyContent:"center",
    minHeight:"80vh"
  },
  bkg:{
  }
}));

export default function History(): JSX.Element {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper className={classes.bkg} variant="outlined" elevation={1} square>
        <Box m={2} clone>
          <Typography variant="h4"  component="h2" align="center">
            History
          </Typography>
        </Box>
        <Divider/>
        <Box p={2}>
          <Typography variant="body1" gutterBottom>
            Schedule a mission launch for interstellar travel to one of the Kepler Exoplanets.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Only confirmed planets matching the following criteria are available for the earliest scheduled missions:
          </Typography>
          <Typography component="ul" color="textPrimary">
            <Typography component="li" variant="body2">
              Planetary radius &lt; 1.6 times Earth&apos;s radius
            </Typography>
            <Typography component="li" variant="body2">
              Effective stellar flux &gt; 0.36 times Earth&apos;s value and &lt; 1.11 times Earth&apos;s value
            </Typography>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
