import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import theme from "./theme";
import NavTabs from "./components/NavTabs";
import Launch from "./components/Launch";
import Upcoming from "./components/Upcoming";
import History from "./components/History";
import FixedBkg from "./components/FixedBkg";
import usePlanets from "./hooks/usePlanets";

export default function App(): JSX.Element {
  const planets = usePlanets();
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavTabs />
        <Switch>
          <Route path={["/", "/launch"]} exact>
            <Launch planets={planets}/>
          </Route>
          <Route path="/upcoming" exact>
            <Upcoming />
          </Route>
          <Route path="/history" exact>
            <History />
          </Route>
        </Switch>
        <FixedBkg />
      </ThemeProvider>
    </BrowserRouter>
  );
}
