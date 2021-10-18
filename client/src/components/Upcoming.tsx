import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  CircularProgress,
} from "@mui/material";

export default function Upcoming({
  launches,
  abortLaunch,
  isPendingLaunch,
}: {
  launches?: LaunchData[];
  abortLaunch: (id: number) => void;
  isPendingLaunch: boolean;
}): JSX.Element {
  const [active, setActive] = React.useState(0);
  return (
    <Box position="absolute" width="100%">
      <Container maxWidth="lg" sx={{ mt: 2, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "80vh" }}>
        <Paper variant="outlined" elevation={0} square sx={{ p: { xs: 0, sm: 1, md: 4 } }}>
          <Typography sx={{ m: 2 }} variant="h4" component="h2" align="center">
            Upcoming
          </Typography>
          <Divider />
          <Box p={2}>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Upcoming missions including both SpaceX launches and newly scheduled ESA rockets.{" "}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Warning! Clicking on the ✖ aborts the mission.
            </Typography>
          </Box>
          <Box px={2} mb={2}>
            <TableContainer component={Paper} elevation={3} square>
              <Table size="medium">
                <TableHead
                  sx={{
                    bgcolor: "secondary.main",
                    borderBottomColor: (theme) => theme.palette.primary.main,
                    "& th": {
                      color: "secondary.contrastText",
                      borderRight: "1px solid",
                      borderRightColor: "#00000033",
                    },
                  }}
                >
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Mission</TableCell>
                    <TableCell>Rocket</TableCell>
                    <TableCell>Destination</TableCell>
                    <TableCell sx={{ width: "80px", textAlign: "center" }}>Abort</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    "& tr:nth-of-type(odd)": {
                      bgcolor: "background.paper",
                    },
                    "& tr:nth-of-type(even)": {
                      bgcolor: "grey[800]",
                    },
                  }}
                >
                  {launches && launches.length
                    ? launches
                        .filter((l) => l.upcoming)
                        .map((ln, ix) => (
                          <TableRow key={ix}>
                            <TableCell>{ln.flightNumber}</TableCell>
                            <TableCell>{ln.launchDate.toISOString().split("T")[0]}</TableCell>
                            <TableCell>{ln.mission}</TableCell>
                            <TableCell>{ln.rocket}</TableCell>
                            <TableCell>{ln.destination}</TableCell>
                            <TableCell>
                              {!isPendingLaunch || !(active === ln.flightNumber) ? (
                                <Button
                                  size="small"
                                  color="warning"
                                  sx={{
                                    color: "error.dark",
                                    "&:hover": {
                                      color: "error.main",
                                    },
                                    minWidth: "64px",
                                    minHeight: "32px",
                                    lineHeight: 0.8,
                                  }}
                                  onClick={() => {
                                    setActive(ln.flightNumber);
                                    abortLaunch(ln.flightNumber);
                                  }}
                                  disabled={isPendingLaunch}
                                >
                                  ✖
                                </Button>
                              ) : (
                                <Box display="flex" justifyContent="center">
                                  <CircularProgress
                                    sx={{ color: "error.dark", display: "block", margin: "0 auto" }}
                                    size="32px"
                                    variant="indeterminate"
                                  />
                                </Box>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
