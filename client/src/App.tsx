import React from "react";
import {
  Typography,
  Box,
  Container,
  Paper,
  CssBaseline
} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/core/styles'
import {Switch,Route,BrowserRouter} from 'react-router-dom';

import theme from './theme';
import NavTabs from './components/NavTabs'

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavTabs/>
        <Switch>
        <Route path={['/',"/launch"]} exact>
          <Container maxWidth="md">
            <Paper>
              <Box width="100%" height="100vh">
                <Typography variant="h3">Launch</Typography>
              </Box>
            </Paper>
          </Container>
        </Route>
        <Route path='/upcoming' exact>
          <Container maxWidth="md">
            <Paper>
              <Box width="100%" height="100vh">
                <Typography variant="h3">Upcoming</Typography>
              </Box>
            </Paper>
          </Container>
        </Route>

        <Route path='/history' exact>
          <Container maxWidth="md">
            <Paper>
              <Box width="100%" height="100vh">
                <Typography variant="h3">History</Typography>
              </Box>
            </Paper>
          </Container>
        </Route>
      </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}
