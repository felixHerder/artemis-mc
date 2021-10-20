import React, { Suspense, lazy, createContext } from "react";
import { CssBaseline, Snackbar, CircularProgress, Box, Container } from "@mui/material";
import { Route, Switch, useLocation } from "react-router-dom";

import NavTabs from "./components/NavTabs";
import Footer from "./components/Footer";
import FixedBkg from "./components/FixedBkg";
import usePlanets from "./hooks/usePlanets";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import useLaunches, { useLaunchesInterface } from "./hooks/useLaunches";

const Launch = lazy(() => import("./components/Launch"));
const Upcoming = lazy(() => import("./components/Upcoming"));
const History = lazy(() => import("./components/History"));
import "./App.scss";

const LoadingCircular = () => (
  <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <CircularProgress variant="indeterminate" size="64px" />
  </Box>
);

export const LaunchesContext = createContext<useLaunchesInterface>({} as useLaunchesInterface);

export default function App(): JSX.Element {
  const planets = usePlanets();
  const location = useLocation();
  const useLaunchesHook = useLaunches();
  const { submitResponse, isPendingLaunch } = useLaunchesHook;
  const [navState, setNavState] = React.useState(0);

  React.useEffect(() => {
    if (location.pathname === "/launch") setNavState(0);
    if (location.pathname === "/upcoming") setNavState(1);
    if (location.pathname === "/history") setNavState(2);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <CssBaseline />
      <LaunchesContext.Provider value={useLaunchesHook}>
        <Box component="main" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <NavTabs {...{ navState, setNavState }} />
          <TransitionGroup component={null}>
            <CSSTransition timeout={200} classNames="page" key={location.key}>
              <Suspense fallback={<LoadingCircular />}>
                <Switch location={location}>
                  <Route path={["/", "/launch"]} exact>
                    <Launch />
                  </Route>
                  <Route path={"/upcoming"} exact>
                    <Upcoming />
                  </Route>
                  <Route path={"/history"} exact>
                    <History />
                  </Route>
                </Switch>
              </Suspense>
            </CSSTransition>
          </TransitionGroup>
          <Footer />
        </Box>
      </LaunchesContext.Provider>
      <Snackbar
        sx={{
          "& .MuiSnackbarContent-message": {
            color: "white",
          },
          "& .MuiSnackbarContent-root": {
            minWidth: 0,
            bgcolor: submitResponse.ok === true ? "success.dark" : "error.dark",
          },
        }}
        open={Boolean(submitResponse.message.length) && !isPendingLaunch}
        autoHideDuration={2000}
        message={submitResponse.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
      <FixedBkg />
    </>
  );
}
