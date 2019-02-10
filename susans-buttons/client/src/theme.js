import { createMuiTheme } from '@material-ui/core/styles'
import { red, purple } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: red
  },
  typography: { useNextVariants: true }
})

export default theme
