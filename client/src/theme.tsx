import React from 'react';
import {createTheme} from '@material-ui/core/styles'
import {lightBlue,orange} from '@material-ui/core/colors';
import '@fontsource/urbanist/latin.css';

const  theme = createTheme({
  palette: {
    type: 'dark',
    primary: lightBlue,
    secondary: orange,
    background:{
      default:"#222",
      paper:"#333333dd",
    }
  },
  typography:{
    fontFamily:'"Urbanist","Helvetica", "Arial", sans-serif'
  },
  custom:{
    paperBorder:"#ff0000"
  },
  overrides:{
    MuiPaper:{
      outlined:{
        borderColor: `${lightBlue[900]}88`
        
      }
    },
    MuiAppBar:{
      root:{        
        borderTop: "1px solid",
        borderTopColor:`${lightBlue[900]}aa`
      }
    },
    MuiTypography:{
      h4:{
        fontWeight: 200
      }
    }
  }
});

declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    custom: {
      paperBorder: React.CSSProperties['color'],
    }
  }
  interface ThemeOptions {
    custom: {
      paperBorder: React.CSSProperties['color']
    }
  }
}
export default theme;