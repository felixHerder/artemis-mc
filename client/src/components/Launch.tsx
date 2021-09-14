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

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection:"column",
    justifyContent:"center",
    minHeight:"80vh"
  },
  form: {
    "& input[type='date']::-webkit-calendar-picker-indicator": {
      filter: "invert(1)",
    },
  },
}));
export default function Launch(): JSX.Element {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper variant="outlined" elevation={1} square>
        <Box m={2} clone>
          <Typography variant="h4"  component="h2" align="center">
            Launch
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
        <Box my={1}>
          <Divider />
        </Box>
        <Box p={1} mt={3} mb={2}>
          <form noValidate autoComplete="off">
            <Grid container xs={12} justifyContent="center">
              <Grid item xs={12} sm={8} md={6} container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="launchDate"
                    label="Launch Date"
                    type="date"
                    variant="outlined"
                    defaultValue="2023-04-29"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth  id="misionName" label="Mission Name" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth id="rocketType" label="Rocket Type" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth  variant="outlined">
                    <InputLabel htmlFor="destination">Destination Exoplanet</InputLabel>
                    <Select id="destination" native label="Destination Exoplanet">
                      <option aria-label="None" value="" />
                      <option value="10">Ten</option>
                      <option value="20">Twenty</option>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <Box height="100%" display="flex" p={1} mt={1} justifyContent="flex-end" alignItems="flex-end">
                  <Button  size="large" color="secondary" variant="contained">
                    Launch Mission
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}
