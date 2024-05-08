'use client';
import { createTheme } from '@mui/material/styles';
import { Cinzel, Nunito } from 'next/font/google';

export const cinzel = Cinzel({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const nunito = Nunito({
  weight: ['200', '500'],
  subsets: ['latin'],
  display: 'swap',
});

const COLOR_VERY_SOFT_RED = '#FCBCB2';
const COLOR_WHITE = '#ffffff';
const COLOR_BLACK = '#000000';
const COLOR_DARK_GRAYISH_RED = '#9b7d7e';
const COLOR_VERY_DARK_GRAYISH_BLUE = '#3b3c43';
const COLOR_SOFT_RED = '#fcbdb3';

const theme = createTheme({
  palette: {
    primary: {
      main: COLOR_VERY_SOFT_RED,
      contrastText: COLOR_VERY_DARK_GRAYISH_BLUE,
    },
    secondary: {
      main: COLOR_VERY_DARK_GRAYISH_BLUE,
      contrastText: COLOR_WHITE,
    },
    info: {
      main: `#A06054`,
      contrastText: COLOR_WHITE,
    },
    background: {
      main: COLOR_VERY_DARK_GRAYISH_BLUE,
      paper: COLOR_VERY_DARK_GRAYISH_BLUE,
    },
    // text: {
    //   primary: COLOR_VERY_DARK_GRAYISH_BLUE,
    //   secondary: COLOR_SOFT_RED,
    // },
  },
  typography: {
    fontFamily: cinzel.style.fontFamily,
    h1: {
      color: COLOR_VERY_SOFT_RED,
      fontSize: '3rem',
    },
    // h4: {
    //   color: COLOR_VERY_SOFT_RED,
    // },
    // body1: {
    //   color: COLOR_VERY_SOFT_RED,
    // },
    caption: {
      fontSize: '1.2rem',
      letterSpacing: '3px',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '10px 30px',
          fontSize: '1.2rem',
          fontFamily: nunito.style.fontFamily,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // backgroundColor: `red`,
          boxShadow: '10px 0px 0px 0px',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          alignItems: `center`,
          justifyContent: `center`,
          // backgroundColor: `green`,
          // boxShadow: '0px 0px 0px 0px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;
