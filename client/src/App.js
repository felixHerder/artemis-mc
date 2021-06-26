import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";


import AppLayout from "./pages/AppLayout";
import LayoutMui from "./pages/LayoutMui";

import { theme, resources, sounds } from "./settings";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/mui'>
          <LayoutMui />
        </Route>
        {/* <Route path='/'>
          <ThemeProvider theme={createTheme(theme)}>
            <SoundsProvider sounds={createSounds(sounds)}>
              <Arwes animate background={resources.background.large} pattern={resources.pattern}>
                {anim => (
                  <AppLayout show={anim.entered} />
                )}
              </Arwes>
            </SoundsProvider>
          </ThemeProvider>
        </Route> */}
      </Switch>
    </Router>
  );
};

export default App;
