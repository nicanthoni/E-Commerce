import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#024959', // Backup primary colors: #577399 -
    },
    secondary: {
      main: '#F2A391', // Backup secondary colors: #BDE9B3 - #FACFCE - #54BFA1 - #F28D77 - #F2A391
    },
    background: {
      main: '#F2F2F2',
    },
    white: {
      main: '#fff',
    },
  },
  typography: {
    fontFamily: 'muli, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#F2F2F2',
    },
    secondary: {
      main: '#024959',
    },
    background: {
      main: '#F2F2F2',
    },
    white: {
      main: '#fff',
    },
  },
  typography: {
    fontFamily: 'muli, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});

export { lightTheme, darkTheme };
