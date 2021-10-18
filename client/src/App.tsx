import React, { Suspense, lazy } from "react";
import { CssBaseline, Snackbar, CircularProgress, Box } from "@mui/material";
import { Route, Switch, useLocation } from "react-router-dom";

import NavTabs from "./components/NavTabs";
import FixedBkg from "./components/FixedBkg";
import usePlanets from "./hooks/usePlanets";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import useLaunches from "./hooks/useLaunches";

const Launch = lazy(() => import("./components/Launch"));
const Upcoming = lazy(() => import("./components/Upcoming"));
const History = lazy(() => import("./components/History"));
import "./App.scss";


const LoadingCircular = () => (
  <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <CircularProgress variant="indeterminate" size="64px" />
  </Box>
);

export default function App(): JSX.Element {
  const planets = usePlanets();
  const location = useLocation();
  const { launches, submitLaunch, isPendingLaunch, abortLaunch, submitResponse } = useLaunches();
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
      <NavTabs {...{ navState, setNavState }} />
      <TransitionGroup>
        <CSSTransition timeout={200} classNames="page" key={location.key}>
          <Suspense fallback={<LoadingCircular />}>
            <Switch location={location}>
              <Route path={["/", "/launch"]} exact>
                <Launch {...{ planets, submitLaunch, isPendingLaunch }} />
              </Route>
              <Route path={"/upcoming"} exact>
                <Upcoming {...{ launches, abortLaunch, isPendingLaunch }} />
              </Route>
              <Route path={"/history"} exact>
                <History {...{ launches }} />
              </Route>
            </Switch>
          </Suspense>
        </CSSTransition>
      </TransitionGroup>
      <Snackbar
        sx={{
          "& .MuiSnackbarContent-message": {
            color: "white",
          },
          "& .MuiSnackbarContent-root": {
            minWidth: 0,
            bgcolor: (submitResponse.ok === true) ? "success.dark" : "error.dark",
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
