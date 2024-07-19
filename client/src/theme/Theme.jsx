import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#024959', // blue - 'contained' buttons  will use this by default-
    },
    secondary: {
      main: '#F2A391', // pink - using on buttons
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
      primary: 'rgba(0, 0, 0, 0.87)', // black - (change to white, once them reworked to be true dark mode)
      secondary: '#fff', // white
      alt: '#024959', // blue
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
      main: '#fff', // white - 'contained' buttons  will use this by default
    },
    secondary: {
      main: '#F2A391', // pink - using on buttons
    },
    background: {
      default: '#fff', // white
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
      primary: '#024959', // blue
      secondary: 'rgba(0, 0, 0, 0.87)', // black
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
