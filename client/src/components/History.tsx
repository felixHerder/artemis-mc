import React from "react";
import { Container, Paper, Typography, Box, Divider, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "80vh",
  },
  tableHead: {
    backgroundColor: theme.palette.primary.light,
    borderBottomColor: theme.palette.primary.main,
    "& th": {
      color: theme.palette.secondary.contrastText,
      borderRight: "1px solid",
      borderRightColor: "#00000033",
    },
  },
  tableBody: {
    "& tr:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.paper,
    },
    "& tr:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[800],
    },
  },
  closeCol: {
    width: theme.spacing(4),
  },
  success:{
    background: theme.palette.success.dark
  },
  failed:{
    background: theme.palette.error.dark
  }
}));

export default function History({launches}:{launches?:LaunchData[]}): JSX.Element {
  const classes = useStyles();
  return (
    <Box position="absolute" width="100vw">
      <Container maxWidth="md" className={classes.container}>
        <Paper variant="outlined" elevation={1} square>
          <Box m={2} clone>
            <Typography variant="h4" component="h2" align="center">
              History
            </Typography>
          </Box>
          <Divider />
          <Box p={2}>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              History of missions including both SpaceX launches and newly scheduled ESA rockets.{" "}
            </Typography>
          </Box>
          <Box px={2} mb={2}>
            <TableContainer component={Paper} elevation={3} square>
              <Table size="small">
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Mission</TableCell>
                    <TableCell>Rocket</TableCell>
                    <TableCell>Destination</TableCell>
                    <TableCell>Customers</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                {launches && launches.length ? 
                launches.filter(l=>!l.upcoming).map((ln,ix)=>(
                <TableRow key={ix} >
                  <TableCell className={ln.success ? classes.success : classes.failed}>{ln.flightNumber}</TableCell>
                  <TableCell>{ln.launchDate.toISOString().split('T')[0]}</TableCell>
                  <TableCell>{ln.mission}</TableCell>
                  <TableCell>{ln.rocket}</TableCell>
                  <TableCell>{ln.destination}</TableCell>
                  <TableCell>{ln.customers?.join(", ")}</TableCell>
                </TableRow>
                )):
                null}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
