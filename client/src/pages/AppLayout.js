import {
  useState,
} from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

import usePlanets from "../hooks/usePlanets";
import useLaunches from "../hooks/useLaunches";

import Centered from "../components/Centered";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Launch from "./Launch";
import History from "./History";
import Upcoming from "./Upcoming";

const styles = () => ({
  content: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    margin: "auto",
  },
  centered: {
    flex: 1,
    paddingTop: "20px",
    paddingBottom: "10px",
  },
});

const AppLayout = props => {
  const { sounds, classes } = props;

  const [frameVisible, setFrameVisible] = useState(true);
  const animateFrame = () => {
    setFrameVisible(false);
    setTimeout(() => {
      setFrameVisible(true);
    }, 600);
  };

  const onSuccessSound = () => sounds.success && sounds.success.play();
  const onAbortSound = () => sounds.abort && sounds.abort.play();
  const onFailureSound = () => sounds.warning && sounds.warning.play();

  const {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  } = useLaunches(onSuccessSound, onAbortSound, onFailureSound);

  const planets = usePlanets();

  return <div className={classes.content}>
    <Header onNav={animateFrame} />
    <Centered className={classes.centered}>
      <Switch>
        <Route exact path="/">
          <Launch
            planets={planets}
            submitLaunch={submitLaunch}
            isPendingLaunch={isPendingLaunch} />
        </Route>
        <Route exact path="/launch">
          <Launch

            planets={planets}
            submitLaunch={submitLaunch}
            isPendingLaunch={isPendingLaunch} />
        </Route>
        <Route exact path="/upcoming">
          <Upcoming

            launches={launches}
            abortLaunch={abortLaunch} />
        </Route>
        <Route exact path="/history">
          <History launches={launches} />
        </Route>
      </Switch>
    </Centered>
    <Footer />
  </div>;
};

export default AppLayout;