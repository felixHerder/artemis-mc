import React from "react";
import { Container, Paper, Typography, Box, Divider, InputLabel, FormControl, TextField, Button, Select, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {PlanetData} from '../hooks/usePlanets'
import { TransitionProps } from "@material-ui/core/transitions/transition";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "80vh",
  },
  form: {
    "& input[type='date']::-webkit-calendar-picker-indicator": {
      filter: "invert(1)",
    },
  },
  launch:{
    width:"100%",
    minHeight: "4em"
  }
}));
type LaunchProps = TransitionProps & {
  planets: PlanetData[]
}
export default function Launch({planets,...props}: LaunchProps): JSX.Element {
  const classes = useStyles();
  return (
    <Container {...props} maxWidth="md" className={classes.container}>
      <Paper variant="outlined" elevation={1} square>
        <Box m={2} clone>
          <Typography variant="h4" component="h2" align="center">
            Launch
          </Typography>
        </Box>
        <Divider />
        <Box p={2}>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Schedule a mission launch for interstellar travel to one of the Kepler Exoplanets.
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Only confirmed planets matching the following criteria are available for the earliest scheduled missions:
          </Typography>
          <Typography component="ul" color="textSecondary">
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
        <Box p={2}>
          <form noValidate autoComplete="off">
            <Grid container justifyContent="space-between">
              <Grid item  sm={9} md={8} direction="row" container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    classes={{ root: classes.form }}
                    fullWidth
                    id="launchDate"
                    label="Launch Date"
                    type="date"
                    variant="outlined"
                    defaultValue="2023-04-29"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth id="misionName" label="Mission Name" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth id="rocketType" label="Rocket Type" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="destination">Destination Exoplanet</InputLabel>
                    <Select id="destination" native label="Destination Exoplanet">
                      <option aria-label="None" value="" />
                      {planets.map((p,i)=>(
                        <option key={i} value={p.kepler_name}>{p.kepler_name}</option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs sm={3} md={4}>
                <Box height="100%" display="flex" alignItems="flex-end" pt={2}>
                  <Button className={classes.launch} size="large" color="secondary" variant="contained">
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
