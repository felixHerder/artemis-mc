import React from "react";
import { CssBaseline, Grow } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { Route, Switch, useLocation,  } from "react-router-dom";

import theme from "./theme";
import NavTabs from "./components/NavTabs";
import Launch from "./components/Launch";
import Upcoming from "./components/Upcoming";
import History from "./components/History";
import FixedBkg from "./components/FixedBkg";
import usePlanets from "./hooks/usePlanets";
import { TransitionGroup } from "react-transition-group";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import useLaunches,{LaunchData} from './hooks/useLaunches';

export default function App(): JSX.Element {
  const planets = usePlanets();
  const location = useLocation();
  const {submitLaunch,isPendingLaunch} = useLaunches();
  const [navState, setNavState] = React.useState(0);
  const [launchData,setLaunchData] = React.useState<LaunchData>({
    launchDate: new Date(Date.now()),
    mission: '',
    rocket: '',
    target: ''
  });

  React.useEffect(()=>{
    if(location.pathname ==='/launch') setNavState(0);
    if(location.pathname ==='/upcoming') setNavState(1);
    if(location.pathname ==='/history') setNavState(2);
    // eslint-disable-next-line
  },[])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavTabs {...{ navState, setNavState }} />
      <TransitionGroup component={null}>
        <Grow key={location.key} timeout={{enter:300,exit:150}}>
          <TransitionPropsWrapper>
            <Switch location={location}>
              <Route path={["/", "/launch"]} exact>
                <Launch {...{planets,submitLaunch,isPendingLaunch,launchData,setLaunchData}} />
              </Route>
              <Route path={"/upcoming"} exact>
                <Upcoming />
              </Route>
              <Route path={"/history"} exact>
                <History />
              </Route>
            </Switch>
          </TransitionPropsWrapper>
        </Grow>
      </TransitionGroup>
      <FixedBkg />
    </ThemeProvider>
  );
}

class TransitionPropsWrapper extends React.Component<{ children: React.ReactNode } & TransitionProps> {
  render() {
    const { children, ...rest } = this.props;
    return <div {...rest}>{children}</div>;
  }
}
