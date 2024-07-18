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
      alt: '#024959' // blue
    
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
      main: '#F2F2F2', // gray ('contained' buttons use this by default) 
    },
    secondary: {
      main: '#024959', // blue (using on buttons)
    },
    background: {
      default: '#fff', // white
      paper: '#F2F2F2', // gray
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
      secondary: '#024959', // blue
      alt: '#F2A391', // pink
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
