import React, { useContext, useEffect } from "react";
import { Container, Paper, Typography, Box, Divider, InputLabel, FormControl, TextField, Button, Select, Grid, CircularProgress } from "@mui/material";
import usePlanets from "../hooks/usePlanets";
import useRockets from "../hooks/useRockets";
import { LaunchesContext } from "../App";

export default function Launch(): JSX.Element {
  const { submitLaunch, isPendingLaunch, } = useContext(LaunchesContext);
  const planets = usePlanets();
  const rockets = useRockets();
  return (
    <Box position="absolute" width="100%">
      <Container maxWidth="lg" sx={{ mt: 2, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "80vh" }}>
        <Paper variant="outlined" elevation={0} square sx={{ p: { xs: 0, sm: 1, md: 4 } }}>
          <Typography sx={{ m: 2 }} variant="h4" component="h2" align="center">
            Launch
          </Typography>
          <Divider />
          <Box p={2}>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Schedule a mission launch for interstellar travel to one of the Kepler Exoplanets.
              <br />
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
            <form autoComplete="off" onSubmit={submitLaunch}>
              <Grid container justifyContent="space-between">
                <Grid item sm={9} md={8} direction="row" container gap={2}>
                  <Grid item xs={12}>
                    <TextField
                      sx={{
                        "& input[type='date']::-webkit-calendar-picker-indicator": {
                          filter: "invert(1)",
                        },
                      }}
                      fullWidth
                      id="launchDate"
                      label="Launch Date"
                      type="date"
                      variant="outlined"
                      defaultValue="2031-02-15"
                      InputLabelProps={{ shrink: true }}
                      name="launchDate"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth id="misionName" label="Mission Name" variant="outlined" name="missionName" required />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="rocket">Rocket Type</InputLabel>
                      <Select id="rocketType" native label="Rocket Type" name="rocketType" required>
                        <option aria-label="None" value="" />
                        {rockets.map((r, i) => (
                          <option key={i} value={r.name}>
                            {r.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="destination">Destination Exoplanet</InputLabel>
                      <Select id="destination" native label="Destination Exoplanet" name="destination" required>
                        <option aria-label="None" value="" />
                        {planets.map((p, i) => (
                          <option key={i} value={p.keplerName}>
                            {p.keplerName}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs sm={3} md={4}>
                  <Box height="100%" display="flex" alignItems="flex-end" justifyContent="center" pt={2}>
                    <Button
                      sx={{ width: "90%", minHeight: "4em", position: "relative" }}
                      type="submit"
                      size="large"
                      color="secondary"
                      variant="contained"
                      disabled={isPendingLaunch}
                    >
                      Launch Mission
                      {isPendingLaunch ? (
                        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", height: "32px" }}>
                          <CircularProgress color="secondary" variant="indeterminate" size={32} />
                        </Box>
                      ) : null}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
