import React, { useEffect, useState, useContext } from "react";
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
  TableFooter,
  TablePagination,
  Button,
} from "@mui/material";
import { LaunchesContext } from "../App";

export default function History(): JSX.Element {
  const { launches, getLaunches } = useContext(LaunchesContext);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [order, setOrder] = useState(true);
  const [sort, setSort] = useState("flightNumber");
  useEffect(() => {
    getLaunches(10, 0, false);
  }, [getLaunches]);

  const handlePageChange = async (page: number) => {
    await getLaunches(rows, page, false, sort, !order ? 'asc' : 'desc');
    setPage(page);
  };
  const handleRowChange = async (rows: number) => {
    await getLaunches(rows, 0, false, sort, !order ? 'asc' : 'desc');
    setPage(0);
    setRows(rows);
  };
  const handleSort = async (field: string) => {
    await getLaunches(rows, 0, false, field, order ? 'asc' : 'desc');
    setOrder(!order);
    setSort(field);
    setPage(0);
  };
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
              History of missions including both SpaceX launches and newly scheduled ESA rockets. <br />
              Click on table column to sort.
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
                  <TableRow sx={{ "& button": { width: "100%", color: "secondary.contrastText" } }}>
                    <TableCell sx={{ width: "10%" }}>
                      <Button color="primary" onClick={() => handleSort("flightNumber")}>
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
                    <TableCell sx={{ width: "15%" }}>
                      <Button color="primary" onClick={() => handleSort("rocket")}>
                        Rocket
                      </Button>
                    </TableCell>
                    <TableCell sx={{ width: "10%" }}>
                      <Button color="primary" onClick={() => handleSort("destination")}>
                        Destination
                      </Button>
                    </TableCell>
                    <TableCell sx={{ width: "20%" }}>
                      <Button color="primary" onClick={() => handleSort("customers")}>
                        Customers
                      </Button>
                    </TableCell>
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
                            <TableCell title={ln.customers?.join(", ")}>
                              {ln.customers?.join(", ").slice(0, 16) + (ln.customers?.join(", ").length > 16 ? "..." : "")}
                            </TableCell>
                          </TableRow>
                        ))
                    : null}
                </TableBody>
                <TableFooter sx={{ bgcolor: "primary.light", "& .MuiTablePagination-toolbar": { minHeight: "24px" } }}>
                  <TableRow>
                    <TablePagination
                      sx={{ color: "secondary.contrastText", "& p": { fontWeight: "500", m: 0 }, "& svg": { color: "secondary.contrastText" } }}
                      count={-1}
                      onPageChange={(e, page) => handlePageChange(page)}
                      page={page}
                      rowsPerPage={rows}
                      onRowsPerPageChange={(e) => handleRowChange(+e.target.value)}
                      labelDisplayedRows={({ from, to }) => {
                        return `${from}-${to}`;
                      }}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
