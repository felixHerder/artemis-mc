import React, { useEffect, useContext,useState } from "react";
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
  TableFooter,
  TablePagination,
} from "@mui/material";
import { LaunchesContext } from "../App";

export default function Upcoming(): JSX.Element {
  const { launchesUpcoming, saveLaunchesUpcoming, getLaunches, isPendingLaunch, abortLaunch, resetLaunchData } = useContext(LaunchesContext);
  
  useEffect(() => {
    //on component mount
    setActive(555);
    getLaunches(0, 0, true);
    //on component unmount
    return () => {
      saveLaunchesUpcoming([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const [active, setActive] = useState(0);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [order, setOrder] = useState(true);
  const [sort, setSort] = useState("flightNumber");

  const handlePageChange = async (page: number) => {
    await getLaunches(rows, page, true, sort, !order ? "asc" : "desc");
    setPage(page);
  };
  const handleRowChange = async (rows: number) => {
    await getLaunches(rows, 0, true, sort, !order ? "asc" : "desc");
    setPage(0);
    setRows(rows);
  };
  const handleSort = async (field: string) => {
    await getLaunches(rows, 0, true, field, order ? "asc" : "desc");
    setOrder(!order);
    setSort(field);
    setPage(0);
  };

  return (
    <Box position="static" width="100%">
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
              Warning! Clicking on ✖ aborts the mission.
              <br/>
              Click on table column to sort.
            </Typography>
          </Box>
          <Box px={2} mb={2} sx={{ minHeight: "420px", position: "relative" }}>
            {isPendingLaunch && active === 555 ? (
              <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                <CircularProgress color="secondary" size={64} />
              </Box>
            ) : null}
            <TableContainer component={Paper} elevation={3} square>
              <Table size="small">
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
                  <TableRow sx={{ "& button": { width: "100%", color: "secondary.contrastText",display:"block",textAlign:"left" } }}>
                    <TableCell sx={{ width: "10%" }}>
                      <Button color="secondary" onClick={() => handleSort("flightNumber")}>
                        No.
                      </Button>
                    </TableCell>
                    <TableCell sx={{ width: "15%" }}>
                      <Button color="primary" onClick={() => handleSort("launchDate")}>
                        Date
                      </Button>
                    </TableCell>
                    <TableCell sx={{ width: "30%" }}>
                      <Button color="primary" onClick={() => handleSort("mission")}>
                        Mission
                      </Button>
                    </TableCell>
                    <TableCell sx={{ width: "20%" }}>
                      <Button color="primary" onClick={() => handleSort("rocket")}>
                        Rocket
                      </Button>
                    </TableCell>
                    <TableCell sx={{ width: "15%" }}>
                      <Button color="primary" onClick={() => handleSort("destination")}>
                        Destination
                      </Button>
                    </TableCell>
                    <TableCell sx={{ width: "10%", textAlign: "center" }}>Abort</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody
                  sx={{
                    "& tr:nth-of-type(odd)": {
                      bgcolor: "background.paper",
                    },
                    "& tr:nth-of-type(even)": {
                      bgcolor: "grey.800",
                    },
                  }}
                >
                  {launchesUpcoming && launchesUpcoming.length
                    ? launchesUpcoming
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
                                  <CircularProgress sx={{ color: "error.dark", display: "block", margin: "0 auto" }} size="32px" variant="indeterminate" />
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
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              resetLaunchData();
              setActive(999);
            }}
            sx={{ m: 2, position: "relative" }}
            color="secondary"
            disabled={isPendingLaunch}
          >
            Reset Data
            {isPendingLaunch && active === 999 ? <CircularProgress sx={{ position: "absolute" }} color="warning" variant="indeterminate" size={16} /> : null}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
