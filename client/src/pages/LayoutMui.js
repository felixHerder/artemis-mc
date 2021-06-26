import React from 'react'
import AppBar from '@material-ui/core/AppBar';

import Tab from '@material-ui/core/Tabs'
import Tabs from '@material-ui/core/Tabs'


export default function LayoutMui() {
  const [value, setValue] = React.useState(0);
  return (
    <AppBar>
      <Tabs
        value={value} onChange={(e, v) => setValue(v)}
        aria-label="Navigation Tabs">

        <Tab label='Launch' />
        <Tab label='Upcoming' />
        <Tab label='History' />
      </Tabs>
    </AppBar>

  );
}