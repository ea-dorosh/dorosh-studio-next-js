'use client';

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

const COLORS = {
  BLACK: '#000000',
  WHITE: '#ffffff',
  CHARCOAL: '#1a1a1a',
  LIGHT_GRAY: '#f5f5f5',
  GOLD: '#D4AF37',
  CRIMSON: '#DC143C',
};

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.BLACK,
      contrastText: COLORS.WHITE,
    },
    secondary: {
      main: COLORS.GOLD,
      contrastText: COLORS.BLACK,
    },
    info: {
      main: COLORS.CHARCOAL,
      contrastText: COLORS.WHITE,
    },
    background: {
      default: COLORS.LIGHT_GRAY,
      paper: COLORS.WHITE,
    },
    error: {
      main: COLORS.CRIMSON,
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
    h1: {
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
    h4: {
      fontSize: '1.8rem',
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
      color: alpha(COLORS.BLACK, 0.5),
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
          fontFamily: `Verdana, Arial, sans-serif`,
          marginLeft: 0,
          marginRight: 0,
          letterSpacing: `1.2px`,
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

export { COLORS };

export default theme;
