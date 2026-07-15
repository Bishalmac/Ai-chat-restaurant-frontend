import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1B1815',
      paper: '#241F1A',
    },
    primary: {
      main: '#E3A008',
      contrastText: '#2A2420',
    },
    secondary: {
      main: '#2F6E5F',
      contrastText: '#F3ECE0',
    },
    error: {
      main: '#C1401F',
    },
    text: {
      primary: '#F3ECE0',
      secondary: '#B0A493',
    },
    divider: 'rgba(243, 236, 224, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontFamily: '"Fraunces", serif', fontWeight: 600 },
    h2: { fontFamily: '"Fraunces", serif', fontWeight: 600 },
    h3: { fontFamily: '"Fraunces", serif', fontWeight: 600 },
    h4: { fontFamily: '"Fraunces", serif', fontWeight: 500 },
    h5: { fontFamily: '"Fraunces", serif', fontWeight: 500 },
    h6: { fontFamily: '"Fraunces", serif', fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
})
