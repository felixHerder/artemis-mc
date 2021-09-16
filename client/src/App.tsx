import React from "react";
import { CssBaseline, Fade, Slide, Zoom, Collapse, Slider, Grow } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { Route, BrowserRouter } from "react-router-dom";

import theme from "./theme";
import NavTabs from "./components/NavTabs";
import Launch from "./components/Launch";
import Upcoming from "./components/Upcoming";
import History from "./components/History";
import FixedBkg from "./components/FixedBkg";
import usePlanets from "./hooks/usePlanets";
import { TransitionGroup } from "react-transition-group";

export default function App(): JSX.Element {
  const planets = usePlanets();
  const [navState, setNavState] = React.useState(0);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavTabs {...{ navState, setNavState }} />

        <Route path={["/", "/launch"]} exact>
          <Launch planets={planets} />
        </Route>

        <Route path={"/upcoming"} exact>
          <Upcoming />
        </Route>

        <Route path={"/history"} exact>
          <History />
        </Route>
        
        <FixedBkg />
      </ThemeProvider>
    </BrowserRouter>
  );
}
