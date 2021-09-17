import React, { SetStateAction } from "react";
import {
  Grid,
  Tabs,
  Tab,
  AppBar,
  Container,
  Typography,
  Box,
  Hidden,
  IconButton,
  Drawer,
  Toolbar,
  ListItemIcon,
  ListItem,
  List,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { Menu, ChevronRight, DoubleArrow, Schedule, History, } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import planet from "../Assets/jupiter_32.png";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.grey[800],
    color: theme.palette.text.primary
  },
  branding:{
    fontWeight:300,
    [theme.breakpoints.down('xs')]:{
      fontSize: "1rem",
    },
  },
  drawerList:{
    width:theme.spacing(24),
  },
  tabs:{
    [theme.breakpoints.down('sm')]:{
      '& .MuiButtonBase-root,':{
        fontSize: "0.65rem"
      },
      '& .MuiTab-root':{
        minWidth:"100px"
      }
    }
  },
  toolbar:{

      [theme.breakpoints.down('sm')]:{
        padding: "0 12px"
      },
      [theme.breakpoints.down('xs')]:{
        padding: "0"
      }
    
  }
}));
type NavTabProps = {
  navState: number;
  setNavState: React.Dispatch<SetStateAction<number>>
}
export default function NavTabs({navState,setNavState}: NavTabProps): JSX.Element {

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  return (
    <>
      <AppBar position="relative" className={classes.root}>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <Grid container justifyContent="center">
              <Grid item container xs={10} sm={6} md={4} alignItems="center">
                <img src={planet} width="24px" alt="planet logo" />
                <Box ml={1} clone>
                  <Typography className={classes.branding} variant="h5" component="h1">
                    Artemis Mission Control
                  </Typography>
                </Box>
              </Grid>
              <Grid item container xs={2} sm={6} md={8} alignItems="flex-end" justifyContent="flex-end">
                <Box display="inline-block">
                  <Hidden  xsDown>
                    <Tabs  className={classes.tabs} value={navState} variant="standard"  indicatorColor="secondary" onChange={(e, nv) => setNavState(nv)}>
                      <Tab icon={<DoubleArrow />} component={RouterLink} label="Launch" to="/launch" />
                      <Tab icon={<Schedule />} component={RouterLink} label="Upcoming" to="/upcoming" />
                      <Tab icon={<History />} component={RouterLink} label="History" to="/history" />
                    </Tabs>
                  </Hidden>
                  <Hidden smUp>
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
      <Drawer  variant="temporary" anchor="right" open={open} onClose={() => setOpen(false)}>
        <List  className={classes.drawerList} component="nav" onClick={() => setOpen(false)}>
          <ListItem button component={RouterLink} to="/launch">
            <ListItemIcon>
              <DoubleArrow />
            </ListItemIcon>
            <ListItemText primary="Launch" />
          </ListItem>
          <ListItem button component={RouterLink} to="/upcoming">
            <ListItemIcon>
              <Schedule />
            </ListItemIcon>
            <ListItemText primary="Upcoming" />
          </ListItem>
          <ListItem button component={RouterLink} to="/history">
            <ListItemIcon>
              <History />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
        </List>
        <Divider />
        <Box ml={1} mt="auto">
          <IconButton size="medium" onClick={() => setOpen(false)}>
            <ChevronRight />
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
}
