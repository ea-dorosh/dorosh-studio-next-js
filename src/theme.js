'use client';
import { collapseClasses } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { Cinzel, Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '300',
});

export const cinzel = Cinzel({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const COLOR_SOFT_RED = '#FCBCB2';
const COLOR_WHITE = '#ffffff';
const COLOR_VERY_DARK_GRAYISH_BLUE = '#3b3c43';
const COLOR_VERY_SOFT_RED = '#FFE9E6';
const COLOR_BRAUN = '#A06054';


const theme = createTheme({
  palette: {
    primary: {
      main: COLOR_VERY_DARK_GRAYISH_BLUE,
      contrastText: COLOR_SOFT_RED,
    },
    secondary: {
      main: COLOR_SOFT_RED,
      contrastText: COLOR_VERY_DARK_GRAYISH_BLUE,
    },
    info: {
      main: COLOR_BRAUN,
      contrastText: COLOR_WHITE,
    },
    background: {
      main: COLOR_VERY_DARK_GRAYISH_BLUE, 
      secondary: COLOR_VERY_SOFT_RED,
      paper: COLOR_SOFT_RED,
      white: COLOR_WHITE,
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
    h1: {
      color: COLOR_VERY_SOFT_RED,
      fontSize: '3rem',
      fontFamily: cinzel.style.fontFamily,
    },
    h2: {
      fontSize: '2.6rem',
      fontFamily: cinzel.style.fontFamily,
      '@media (max-width: 392px)': {
        fontSize: '2.2rem',
      },
    },
    h3: {
      fontSize: '2.2rem',
      fontFamily: cinzel.style.fontFamily,
    },
    caption: {
      fontSize: `1.2rem`,
      letterSpacing: `3px`,
      fontFamily: cinzel.style.fontFamily,
    },
    subtitle1: {
      fontSize: `1.2rem`,
      fontWeight: `200`,
    },
    subtitle2: {
      fontSize: `1.4rem`,
      fontWeight: `400`,
      fontFamily: cinzel.style.fontFamily,
    },
    formOverview: {
      fontSize: `1.1rem`,
    },
    formSubtitle: {
      fontSize: `0.9rem`,
      color: alpha(COLOR_VERY_DARK_GRAYISH_BLUE, 0.5),
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '10px 30px',
          fontSize: '1.2rem',
          fontFamily: poppins.style.fontFamily,
        },
        contained: {
          textTransform: `capitalize`,
        },
        plain : {
          color: `inherit`,
          fontSize: `inherit`,
          fontWeight: `500`,
          backgroundColor: `transparent`,
          padding: 0,
          fontFamily: cinzel.style.fontFamily,
          textTransform: `lowercase`,
        },
        sizeSmall: {
          fontSize: `.8rem`,
          padding: `5px 20px`,
          textTransform: `lowercase`,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: `0.8rem`,
          fontFamily: poppins.style.fontFamily,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: `10px 0px 0px 0px`,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          alignItems: `center`,
          justifyContent: `center`,
        },
      },
    },
  },
});

export default theme;
