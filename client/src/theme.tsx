import React from 'react';
import {createTheme, responsiveFontSizes} from '@material-ui/core/styles'
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
        fontWeight: 100,
        color: orange[100]
      }
    },
    MuiTableCell:{
      root:{
        borderBottomColor: `${lightBlue[900]}44`,
      }
    }
  }
});

export default responsiveFontSizes(theme);