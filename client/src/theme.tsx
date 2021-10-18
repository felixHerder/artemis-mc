import {createTheme, responsiveFontSizes} from '@mui/material/styles'
import {lightBlue,orange} from '@mui/material/colors';
import '@fontsource/urbanist/latin.css';

const  theme = createTheme({
  palette: {
    mode: 'dark',
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
  components:{
    MuiPaper:{
      styleOverrides:{
        outlined:{
        borderColor: `${lightBlue[900]}88`
      }
      }
    },
    MuiAppBar:{
      styleOverrides:{
        root:{        
          borderTop: "1px solid",
          borderTopColor:`${lightBlue[900]}aa`
        }
      }
    },
    MuiTypography:{
      styleOverrides:{
        h4:{
          fontWeight: 100,
          color: orange[100]
        }
      }
    },
    MuiTableCell:{
      styleOverrides:{
        root:{
          borderBottomColor: `${lightBlue[900]}44`,
        }
      }
    }
  }
});

export default responsiveFontSizes(theme);