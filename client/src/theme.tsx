import {createTheme} from '@material-ui/core/styles'

const  theme = createTheme({
  palette: {
    type: 'dark',
    background:{
      default:"#222"
    }
  },
  typography:{
    fontFamily:'"Urbanist","Helvetica", "Arial", sans-serif'
  }
})
export default theme;