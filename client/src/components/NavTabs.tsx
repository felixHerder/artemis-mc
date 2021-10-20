import React, { SetStateAction,useContext } from "react";
import {
  Grid,
  Tabs,
  Tab,
  AppBar,
  Container,
  Typography,
  Box,
  IconButton,
  Drawer,
  Toolbar,
  ListItemIcon,
  ListItem,
  List,
  ListItemText,
  Divider,
  Badge,
} from "@mui/material";
import { Menu, ChevronRight, DoubleArrow, Schedule, History } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import planet from "../Assets/jupiter_32.png";
import {LaunchesContext} from '../App';

type NavTabProps = {
  navState: number;
  setNavState: React.Dispatch<SetStateAction<number>>;
};
export default function NavTabs({ navState, setNavState }: NavTabProps): JSX.Element {
  const {badgeInv,setBadgeInv} = useContext(LaunchesContext);
  const [open, setOpen] = React.useState(false);

  const handleNavState = (nv:number)=>{
    setNavState(nv);
    if(nv === 1){
      setBadgeInv(prev=>({...prev,upcoming:true}));
    }
    if(nv === 2){
      setBadgeInv(prev=>({...prev,history:true}));
    }
  }
  return (
    <>
      <AppBar position="relative" sx={{ bgcolor: "grey[800]", color: "text.primary" }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ padding: { xs: "0 6px", sm: "0 12px" } }}>
            <Grid container justifyContent="center">
              <Grid item container xs={10} sm={6} md={4} alignItems="center">
                <img src={planet} width="20px" height="20px" alt="planet logo" />
                <Typography sx={{ ml: 1, fontWeight: 200, fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" } }} variant="h5" component="h1">
                  Hyperion Mission Control
                </Typography>
              </Grid>
              <Grid item container xs={2} sm={6} md={8} alignItems="flex-end" justifyContent="flex-end">
                <Tabs
                  sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiTab-root": {
                      minWidth: { sm: "90px", md: "120px", lg: "180px" },
                    },
                    "& .MuiTabs-scroller": { display: "block" },
                  }}
                  value={navState}
                  textColor="secondary"
                  indicatorColor="secondary"
                  onChange={(e, nv) => handleNavState(nv)}
                >
                  <Tab icon={ <DoubleArrow/>} component={RouterLink} label="Launch" to="/launch" />
                  <Tab icon={ <Badge color="primary" variant="dot" invisible={badgeInv.upcoming}><Schedule /></Badge>} component={RouterLink} label="Upcoming" to="/upcoming" />
                  <Tab icon={ <Badge color="primary" variant="dot" invisible={badgeInv.history}><History /></Badge>} component={RouterLink} label="History" to="/history" />
                </Tabs>

                <IconButton sx={{ display: { xs: "block", sm: "none" } }} onClick={() => setOpen(true)}>
                  <Menu />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer variant="temporary" anchor="right" open={open} onClose={() => setOpen(false)}>
        <List component="nav" onClick={() => setOpen(false)}>
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
