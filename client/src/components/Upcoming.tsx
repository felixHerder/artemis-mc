import React from "react";
import { Container, Paper, Typography, Box, Divider, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import jupiter from "../Assets/jupiter_128.png";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "80vh",
  },
  tableHead: {
    backgroundColor: theme.palette.secondary.main,
    borderBottomColor: theme.palette.primary.main,
    "& th":{
      color: theme.palette.secondary.contrastText,
      borderRight:"1px solid",
      borderRightColor:"#00000033",
    }
  },
  tableBody: {
    "& tr:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.paper,
    },
    "& tr:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[800],
    },
  },
  closeCol:{
    width:theme.spacing(4)
  }
}));

export default function Upcoming(): JSX.Element {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper variant="outlined" elevation={1} square>
        <Box m={2} clone>
          <Typography variant="h4" component="h2" align="center">
            Upcoming
          </Typography>
        </Box>
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
            <Table size="small">
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Mission</TableCell>
                  <TableCell>Rocket</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell className={classes.closeCol}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>2332-04-92</TableCell>
                  <TableCell>Mission</TableCell>
                  <TableCell>Rocket</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>
                    <Button size="small">✖</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>2332-04-92</TableCell>
                  <TableCell>Mission</TableCell>
                  <TableCell>Rocket</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>
                    <Button size="small">✖</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>2332-04-92</TableCell>
                  <TableCell>Mission</TableCell>
                  <TableCell>Rocket</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>
                    <Button  size="small">✖</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Container>
  );
}
