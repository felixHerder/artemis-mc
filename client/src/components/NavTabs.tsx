import React from "react";
import { Grid, Tabs, Tab, AppBar, Container, Typography, Box, Hidden, IconButton, Theme, Drawer,Toolbar } from "@material-ui/core";
import { Menu, ChevronRight, DoubleArrow, Schedule, History } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import planet from "../Assets/jupiter_128.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.grey[800],
  },
}));
export default function NavTabs(): JSX.Element {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  return (
    <>
      <AppBar position="relative" className={classes.root}>
        <Container maxWidth="lg">
          <Toolbar>
            <Grid container justifyContent="center">
              <Grid item container xs={10} md={4} alignItems="center">
                <img src={planet} width="24px" alt="planet logo" />
                <Box ml={1}>
                  <Typography variant="h6">Artemis Mission Control</Typography>
                </Box>
              </Grid>
              <Grid item container xs={2}  md={8} alignItems="flex-end" justifyContent="flex-end">
                <Box display="inline-block">
                  <Hidden smDown>
                    <Tabs value={value} variant="standard" indicatorColor="primary" onChange={(e, nv) => setValue(nv)}>
                      <Tab icon={<DoubleArrow />} component={RouterLink} label="Launch" to="/launch" />
                      <Tab icon={<Schedule />} component={RouterLink} label="Upcoming" to="/upcoming" />
                      <Tab icon={<History />} component={RouterLink} label="History" to="/history" />
                    </Tabs>
                  </Hidden>
                  <Hidden mdUp>
                    <IconButton onClick={() => setOpen(true)}>
                      <Menu />
                    </IconButton>
                  </Hidden>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer variant="temporary" anchor="right" open={open}>
        <IconButton onClick={() => setOpen(false)}>
          <ChevronRight />
        </IconButton>
      </Drawer>
    </>
  );
}
