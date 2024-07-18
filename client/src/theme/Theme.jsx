import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#024959', // blue ('contained' buttons use this by default) 
    },
    secondary: {
      main: '#F2A391', // pink (using on buttons)
    },
    background: {
      default: '#F2F2F2', // grey
      paper: '#fff', // white
    },
    white: {
      main: '#fff', // white
    },
    action: {
      // button
      active: '#024959', // blue
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)', // black
      secondary: '#fff', // white
    
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
      main: '#fff', // white ('contained' buttons use this by default) 
    },
    secondary: {
      main: '#F2A391', // pink (using on buttons)
    },
    background: {
      default: '#fff', // grey
      paper: '#F2F2F2', // white
    },
    white: {
      main: '#fff', // white
    },
    action: {
      // button
      active: '#F2A391', // pink
    },
    text: {
      primary: '#fff', // white
      secondary: 'rgba(0, 0, 0, 0.87)', // black
    
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
