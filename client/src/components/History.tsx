import React from "react";
import { Container, Paper, Typography, Box, Divider, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from "@mui/material";

export default function History({ launches }: { launches?: LaunchData[] }): JSX.Element {
  return (
    <Box position="absolute" width="100%">
      <Container maxWidth="lg" sx={{ mt: 2, display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "80vh" }}>
        <Paper variant="outlined" elevation={0} square sx={{ p: { xs: 0, sm: 1, md: 4 } }}>
          <Typography sx={{ m: 2 }} variant="h4" component="h2" align="center">
            History
          </Typography>
          <Divider />
          <Box p={2}>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              History of missions including both SpaceX launches and newly scheduled ESA rockets.{" "}
            </Typography>
          </Box>
          <Box px={2} mb={2}>
            <TableContainer component={Paper} elevation={3} square>
              <Table size="small">
                <TableHead
                  sx={{
                    bgcolor: "primary.light",
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
                    <TableCell sx={{ width: "80px" }}>Customers</TableCell>
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
                        .filter((l) => !l.upcoming)
                        .map((ln, ix) => (
                          <TableRow key={ix}>
                            <TableCell sx={{ color: ln.success ? "success.main" : "error.main" }}>{ln.flightNumber}</TableCell>
                            <TableCell>{ln.launchDate.toISOString().split("T")[0]}</TableCell>
                            <TableCell>{ln.mission}</TableCell>
                            <TableCell>{ln.rocket}</TableCell>
                            <TableCell>{ln.destination}</TableCell>
                            <TableCell>{ln.customers?.join(", ")}</TableCell>
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
