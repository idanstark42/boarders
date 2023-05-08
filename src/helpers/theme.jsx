import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  palette: {
    primary:      { main: '#191970' },
    secondary:    { main: '#4B0082' },
    tertiary:     { main: '#8B008B' },
    neutral:      { main: '#808080' },

    success:      { main: '#32CD32' },
    info:         { main: '#1E90FF' },
    warn:         { main: '#FFD700' },
    error:        { main: '#FF4500' },
  }
})

export default function Theme ({ children }) {
  return <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
}
